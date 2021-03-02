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
    <v-dialog v-model="dialog" max-width="400" persistent>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog = false">
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
export default {
  data() {
    return {
      upload: 0,
      download: 0,
      dialog: false,
    }
  },

  mounted() {
    this.eventBus.$on('newRecord', () => {
      this.upload++
    })

    if ('records' in localStorage) {
      let records = JSON.parse(localStorage.getItem('records'))
      records.forEach((value, index, array) => {
        if (!value.sync) {
          this.upload++
        }
      })
    }
  },

  methods: {
    uploadRecords() {
      if ('records' in localStorage) {
        let records = JSON.parse(localStorage.getItem('records'))
        records.forEach((value, index, array) => {
          if (!value.sync) {
            // 构建对象
            const EyeTracking = this.leanCloud.Object.extend('EyeTracking')
            const eyeTracking = new EyeTracking()
            eyeTracking.set('user', value.user)
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
                value.sync = true
                this.upload--
              },
              (error) => {
                console.log('upload failed');
              }
            )
          }
        })
        localStorage.setItem('records', records)
      }
      this.dialog = false
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
