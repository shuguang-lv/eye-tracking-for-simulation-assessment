<template>
  <v-row>
    <v-col cols="12" class="d-flex">
      <h1 class="page-title px-5">
        Eye Tracking
      </h1>
      <v-spacer></v-spacer>
    </v-col>
    <v-col cols="6">
      <video id="webcam" width="400" height="300" autoplay></video>
    </v-col>
    <v-col cols="6">
      <canvas id="overlay" width="400" height="300"></canvas>
    </v-col>
    <v-col cols="6">
      <canvas id="eyes" width="50" height="25"></canvas>
    </v-col>
  </v-row>
</template>

<script>
// import '../assets/clmtrackr'

export default {
  data() {
    return {
      video: null,
      ctrack: null,
      overlay: null,
      overlayCC: null,
    }
  },

  mounted() {
    this.video = document.getElementById('webcam')
    this.overlay = document.getElementById('overlay')
    this.overlayCC = document.getElementById('overlay').getContext('2d')
    this.ctrack = new clm.tracker()
    this.ctrack.init()
    navigator.mediaDevices.getUserMedia({ video: true }).then(this.onStreaming)
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
        const eyesRect = this.getEyesRectangle(currentPosition)
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
  },
}
</script>

<style scoped></style>
