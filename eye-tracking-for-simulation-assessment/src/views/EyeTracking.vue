<template>
  <v-row>
    <v-col cols="12">
      <h1>
        Eye Tracking
      </h1>
    </v-col>
    <v-col cols="6">
      <video id="webcam" width="400" height="300" autoplay></video>
    </v-col>
    <v-col cols="6">
      <canvas id="overlay" width="400" height="300"></canvas>
    </v-col>
    <v-col cols="6">
      <canvas id="eyes" width="50" height="25"></canvas>
      <v-btn color="success" id="train" @click="fitModel">Train!</v-btn>
    </v-col>
    <div id="target"></div>
  </v-row>
</template>

<script>
// import '../assets/clmtrackr'

const dataset = {
  train: {
    n: 0,
    x: null,
    y: null,
  },
  val: {
    n: 0,
    x: null,
    y: null,
  },
}

let currentModel

export default {
  data() {
    return {
      video: document.getElementById('webcam'),
      ctrack: null,
      overlay: null,
      overlayCC: null,
      mouse: null,
    }
  },

  mounted() {
    // Track mouse movement:
    this.mouse = {
      x: 0,
      y: 0,
    }

    document.onmousemove = this.handleMouseMove

    document.body.onkeyup = (event) => {
      // On space key:
      if (event.keyCode == 32) {
        this.captureExample()

        event.preventDefault()
        return false
      }
    }

    this.overlay = document.getElementById('overlay')
    this.overlayCC = document.getElementById('overlay').getContext('2d')
    this.ctrack = new clm.tracker()
    this.ctrack.init()
    navigator.mediaDevices.getUserMedia({ video: true }).then(this.onStreaming)

    setInterval(this.moveTarget, 100)
  },

  methods: {
    onStreaming(stream) {
      this.video.srcObject = stream
      this.ctrack.start(this.video)
      this.trackingLoop()
    },
    trackingLoop() {
      // Check if a face is detected, and if so, track it.
      requestAnimationFrame(this.trackingLoop)

      let currentPosition = this.ctrack.getCurrentPosition()
      this.overlayCC.clearRect(0, 0, 400, 300)

      if (currentPosition) {
        this.ctrack.draw(this.overlay)

        // Get the eyes rectangle and draw it in red:
        const eyesRect = getEyesRectangle(currentPosition)
        this.overlayCC.strokeStyle = 'red'
        this.overlayCC.strokeRect(
          eyesRect[0],
          eyesRect[1],
          eyesRect[2],
          eyesRect[3]
        )

        // The video might internally have a different size, so we need these
        // factors to rescale the eyes rectangle before cropping:
        const resizeFactorX = this.video.videoWidth / this.video.width
        const resizeFactorY = this.video.videoHeight / this.video.height

        // Crop the eyes from the video and paste them in the eyes canvas:
        const eyesCanvas = document.getElementById('eyes')
        const eyesCC = eyesCanvas.getContext('2d')

        eyesCC.drawImage(
          this.video,
          eyesRect[0] * resizeFactorX,
          eyesRect[1] * resizeFactorY,
          eyesRect[2] * resizeFactorX,
          eyesRect[3] * resizeFactorY,
          0,
          0,
          eyesCanvas.width,
          eyesCanvas.height
        )
      }
    },
    getEyesRectangle(positions) {
      const minX = positions[23][0] - 5
      const maxX = positions[28][0] + 5
      const minY = positions[24][1] - 5
      const maxY = positions[26][1] + 5

      const width = maxX - minX
      const height = maxY - minY

      return [minX, minY, width, height]
    },
    getImage() {
      // Capture the current image in the eyes canvas as a tensor.
      return tf.tidy(function() {
        const image = tf.browser.fromPixels(document.getElementById('eyes'))
        // Add a batch dimension:
        const batchedImage = image.expandDims(0)
        // Normalize and return it:
        return batchedImage
          .toFloat()
          .div(tf.scalar(127))
          .sub(tf.scalar(1))
      })
    },
    captureExample() {
      // Take the latest image from the eyes canvas and add it to our dataset.
      tf.tidy(function() {
        const image = this.getImage()
        const mousePos = tf.tensor1d([this.mouse.x, this.mouse.y]).expandDims(0)

        // Choose whether to add it to training (80%) or validation (20%) set:
        const subset = dataset[Math.random() > 0.2 ? 'train' : 'val']

        if (subset.x == null) {
          // Create new tensors
          subset.x = tf.keep(image)
          subset.y = tf.keep(mousePos)
        } else {
          // Concatenate it to existing tensors
          const oldX = subset.x
          const oldY = subset.y

          subset.x = tf.keep(oldX.concat(image, 0))
          subset.y = tf.keep(oldY.concat(mousePos, 0))
        }

        // Increase counter
        subset.n += 1
      })
    },
    createModel() {
      const model = tf.sequential()

      model.add(
        tf.layers.conv2d({
          kernelSize: 5,
          filters: 20,
          strides: 1,
          activation: 'relu',
          inputShape: [
            document.getElementById('eyes').height,
            document.getElementById('eyes').width,
            3,
          ],
        })
      )

      model.add(
        tf.layers.maxPooling2d({
          poolSize: [2, 2],
          strides: [2, 2],
        })
      )

      model.add(tf.layers.flatten())

      model.add(tf.layers.dropout(0.2))

      // Two output values x and y
      model.add(
        tf.layers.dense({
          units: 2,
          activation: 'tanh',
        })
      )

      // Use ADAM optimizer with learning rate of 0.0005 and MSE loss
      model.compile({
        optimizer: tf.train.adam(0.0005),
        loss: 'meanSquaredError',
      })

      return model
    },
    fitModel() {
      let batchSize = Math.floor(dataset.train.n * 0.1)
      if (batchSize < 4) {
        batchSize = 4
      } else if (batchSize > 64) {
        batchSize = 64
      }

      if (currentModel == null) {
        currentModel = this.createModel()
      }

      currentModel.fit(dataset.train.x, dataset.train.y, {
        batchSize: batchSize,
        epochs: 20,
        shuffle: true,
        validationData: [dataset.val.x, dataset.val.y],
      })
    },
    moveTarget() {
      if (currentModel == null) {
        return
      }
      tf.tidy(function() {
        const image = this.getImage()
        const prediction = currentModel.predict(image)

        // Convert normalized position back to screen position:
        const targetWidth = document.getElementById('target').outerwidth
        const targetHeight = document.getElementById('target').outerheight

        // It's okay to run this async, since we don't have to wait for it.
        prediction.data().then((prediction) => {
          const x = ((prediction[0] + 1) / 2) * (window.width - targetWidth)
          const y = ((prediction[1] + 1) / 2) * (window.height - targetHeight)

          // Move target there:
          const $target = document.getElementById('target')
          $target.css('left', x + 'px')
          $target.css('top', y + 'px')
        })
      })
    },
    handleMouseMove(event) {
      // Get the mouse position and normalize it to [-1, 1]
      this.mouse.x = (event.clientX / window.width) * 2 - 1
      this.mouse.y = (event.clientY / window.height) * 2 - 1
    },
  },
}
</script>

<style scoped>
#target {
  background-color: lightgreen;
  position: absolute;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  transition: all 0.1s ease;
  box-shadow: 0 0 20px 10px white;
  border: 4px solid rgba(0, 0, 0, 0.5);
}
</style>
