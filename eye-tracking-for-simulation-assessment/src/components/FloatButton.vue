<template>
  <div>
    <div class="float-group">
      <v-badge
        color="warning"
        :content="upload"
        :value="upload"
        bordered
        overlap
      >
        <v-btn fab large color="primary" @click="dialog = true"
          ><v-icon>mdi-cloud-upload</v-icon></v-btn
        >
      </v-badge>
      <v-badge
        color="warning"
        :content="download"
        :value="download"
        bordered
        overlap
      >
        <v-btn fab large color="primary" @click="download"
          ><v-icon>mdi-cloud-download</v-icon></v-btn
        >
      </v-badge>
    </div>
    <v-dialog v-model="dialog" max-width="500" persistent>
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
          <v-btn color="warning darken-1" text @click="dialog = false">
            Reject
          </v-btn>
          <v-btn color="primary darken-1" text @click="uploadRecords">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getLocalRecords, syncRecord } from '../utils/indexedDB.js'
var lodash = require('lodash')

export default {
  data() {
    return {
      upload: 0,
      download: 0,
      dialog: false,
    }
  },

  async mounted() {
    this.eventBus.$on('newRecord', () => {
      this.upload++
    })

    let records = await getLocalRecords()
    records.forEach((value, index, array) => {
      if (value.sync == 0) {
        this.upload++
      }
    })
  },

  methods: {
    async uploadRecords() {
      this.eventBus.$emit('startProgress')
      let records = await getLocalRecords()
      records.forEach((value, index, array) => {
        if (value.sync == 0) {
          // 构建对象
          const eyeTracking = new this.leanCloud.Object('EyeTracking')
          eyeTracking.set('userId', value.user)
          eyeTracking.set('simulation', value.simulation)
          eyeTracking.set('visualization', value.visualization)
          eyeTracking.set('userScore', value.userScore)
          eyeTracking.set('calculatedScore', value.calculatedScore)
          eyeTracking.set('date', value.date)
          // 将对象保存到云端
          eyeTracking.save().then(
            (eyeTracking) => {
              // 成功保存之后，执行其他逻辑
              console.log('upload success')
              syncRecord(value.id)
              this.upload--
            },
            (error) => {
              console.log('upload failed')
            }
          )
        }
      })
      this.dialog = false
      this.eventBus.$emit('uploadRecord')
      this.eventBus.$emit('finishProgress')
    },
  },
}
</script>

<style scoped>
.float-group {
  position: fixed;
  bottom: 80px;
  right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  z-index: 999;
}
</style>
