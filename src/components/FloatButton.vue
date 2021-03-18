<template>
  <div class="d-flex">
    <!-- upload button -->
    <v-badge color="warning" :value="upload" dot overlap class="mr-3">
      <v-btn small icon @click="dialogUpload = true"
        ><v-icon>mdi-cloud-upload</v-icon></v-btn
      >
      <!-- <v-icon @click="dialog = true">mdi-cloud-upload</v-icon> -->
    </v-badge>
    <!-- download button -->
    <v-badge color="warning" :value="download" dot overlap>
      <v-btn small icon @click="dialogDownload = true"
        ><v-icon>mdi-cloud-download</v-icon></v-btn
      >
      <!-- <v-icon @click="dialog = true">mdi-cloud-upload</v-icon> -->
    </v-badge>
    <!-- upload dialog -->
    <v-dialog v-model="dialogUpload" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">
          Upload the local records?
        </v-card-title>
        <v-card-text
          >This will upload your local records data (including visualization
          files of eye tracking) to the cloud storage. You could download and
          review them next time you reinstall or run this App in a new
          machine</v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="uploadRecords">
            Accept
          </v-btn>
          <v-btn color="warning darken-1" text @click="dialogUpload = false">
            Reject
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- download dialog -->
    <v-dialog v-model="dialogDownload" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">
          Download the records from cloud?
        </v-card-title>
        <v-card-text
          >This will download your records data in cloud (including
          visualization files of eye tracking) and save them into the local
          storage.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="downloadRecords">
            Accept
          </v-btn>
          <v-btn color="warning darken-1" text @click="dialogDownload = false">
            Reject
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  getUnsyncedRecords,
  getSyncedRecords,
  syncRecord,
  insertRecord,
} from '../utils/indexedDB.js'

export default {
  data() {
    return {
      upload: 0,
      download: 0,
      dialogUpload: false,
      dialogDownload: false,
    }
  },

  async mounted() {
    this.eventBus.$on('newRecord', () => {
      this.upload++
    })

    // calculate number of records to be uploaded
    let records = await getUnsyncedRecords()
    this.upload = records.length

    // calculate number of records to be downloaded
    let recordId = (await getSyncedRecords()).map(function(item) {
      return item.uid
    })
    const query = new this.leanCloud.Query('EyeTracking')
    query.equalTo('userId', localStorage.getItem('userName'))
    query.find().then((records) => {
      records.forEach((value, index, array) => {
        if (!recordId.includes(value.id)) {
          this.download++
        }
      })
    })
  },

  methods: {
    async uploadRecords() {
      this.eventBus.$emit('startProgress')
      let records = await getUnsyncedRecords()
      records.forEach((value, index, array) => {
        if (value.uid == '') {
          // create record instance
          const eyeTracking = new this.leanCloud.Object('EyeTracking')
          eyeTracking.set('userId', value.user)
          eyeTracking.set('simulation', value.simulation)
          eyeTracking.set('visualization', value.visualization)
          eyeTracking.set('userScore', value.userScore)
          eyeTracking.set('calculatedScore', value.calculatedScore)
          eyeTracking.set('date', value.date)
          // save instance into leancloud
          eyeTracking.save().then(
            (eyeTracking) => {
              console.log('upload success')
              syncRecord(value.id, eyeTracking.id)
            },
            (error) => {
              console.log('upload failed')
              this.eventBus.$emit('showSnackbarError', 'Upload failed')
            }
          )
          this.uploadFile(value.visualization)
          this.upload--
        }
      })
      // while (this.upload > 0) {
      //   continue
      // }
      this.dialogUpload = false
      this.eventBus.$emit('updateRecord')
      this.eventBus.$emit('finishProgress')
      this.eventBus.$emit('showSnackbar', 'Upload records successfully!')
    },

    uploadFile(fileName) {
      let waiting = true

      // listen to ipcMain event
      this.$electron.ipcRenderer.on('mapCopied' + fileName, (event, arg) => {
        const data = { base64: arg }
        const file = new this.leanCloud.File(fileName + '.txt', data)
        file.save().then(
          (file) => {
            console.log(`File uploaded. objectId：${file.id}`)
            waiting = false
          },
          (error) => {
            console.log(`File uploading failed: ${error}`)
            this.eventBus.$emit('showSnackbarError', 'File uploading failed')
            waiting = false
          }
        )
      })
      this.$electron.ipcRenderer.send('copyMap', fileName)

      while (waiting) {
        continue
      }
    },

    async downloadRecords() {
      this.eventBus.$emit('startProgress')
      let recordId = (await getSyncedRecords()).map(function(item) {
        return item.uid
      })

      // configure query
      const query = new this.leanCloud.Query('EyeTracking')
      query.equalTo('userId', localStorage.getItem('userName'))
      query.find().then((records) => {
        records.forEach((value, index, array) => {
          if (!recordId.includes(value.id)) {
            insertRecord({
              uid: value.id,
              user: localStorage.getItem('userName'),
              simulation: value.get('simulation'),
              visualization: value.get('visualization'),
              userScore: value.get('userScore'),
              calculatedScore: value.get('calculatedScore'),
              date: value.get('date'),
            })
            this.downloadFile(value.get('visualization'))
            this.download--
          }
        })
        // while (this.download > 0) {
        //   continue
        // }
        this.dialogDownload = false
        this.eventBus.$emit('updateRecord')
        this.eventBus.$emit('finishProgress')
        this.eventBus.$emit('showSnackbar', 'Download records successfully!')
      })
    },

    downloadFile(fileName) {
      let waiting = true

      var url
      const query = new this.leanCloud.Query('_File')
      query.equalTo('name', fileName + '.txt')
      query.find().then((records) => {
        if (records[0]) {
          url = records[0].attributes.url
          // listen to ipcMain event
          this.$electron.ipcRenderer.on(
            'mapDownloaded' + fileName,
            (event, arg) => {
              waiting = false
            }
          )
          this.$electron.ipcRenderer.send('downloadMap', url, fileName)
        } else {
          waiting = false
        }
      })

      while (waiting) {
        continue
      }

      // console.log(url);
      // if (!url) {
      //   return
      // }
      // this.$electron.ipcRenderer.on(
      //   'mapDownloaded' + fileName,
      //   (event, arg) => {}
      // )
      // this.$electron.ipcRenderer.send('downloadMap', url, fileName)
    },
  },
}
</script>

<style scoped>
.float-group {
  position: fixed;
  bottom: 30px;
  right: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  z-index: 999;
}
</style>
