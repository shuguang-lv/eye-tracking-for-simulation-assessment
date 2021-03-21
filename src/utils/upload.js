import { getRecordById, syncRecord } from '../utils/indexedDB.js'

export default {
    data: () => ({
    }),
  
    methods: {
      upload(item) {
        this.eventBus.$emit('startProgress')
        if (item.sync == 'No') {
          // create record instance
          const eyeTracking = new this.leanCloud.Object('EyeTracking')
          eyeTracking.set('userId', item.user)
          eyeTracking.set('simulation', item.simulation)
          eyeTracking.set('visualization', item.visualization)
          eyeTracking.set('userScore', item.userScore)
          eyeTracking.set('calculatedScore', item.calculatedScore)
          eyeTracking.set('date', item.date)
          // save instance into leancloud
          eyeTracking.save().then(
            (eyeTracking) => {
              console.log('upload success')
              syncRecord(item.id, eyeTracking.id)
            },
            (error) => {
              console.log('upload failed')
              this.eventBus.$emit('showSnackbarError', 'Upload failed')
            }
          )
          this.uploadFile(item.visualization)
        }
        this.eventBus.$emit('checkUpdate')
        this.eventBus.$emit('updateRecord')
        this.eventBus.$emit('finishProgress')
        this.eventBus.$emit('showSnackbar', 'Upload records successfully!')
      },
  
      uploadFile(fileName) {
        // listen to ipcMain event
        this.$electron.ipcRenderer.on('mapCopied' + fileName, (event, arg) => {
          try {
            const data = { base64: arg }
            const file = new this.leanCloud.File(fileName + '.txt', data)
            file.save().then(
              (file) => {
                console.log(`文件保存完成。objectId：${file.id}`)
              },
              (error) => {
                this.eventBus.$emit('showSnackbarError', 'File uploading failed')
              }
            )
          } catch (error) {
            this.eventBus.$emit('showSnackbarError', 'File uploading failed')
          }
        })
        this.$electron.ipcRenderer.send('copyMap', fileName)
      },
    },
  }