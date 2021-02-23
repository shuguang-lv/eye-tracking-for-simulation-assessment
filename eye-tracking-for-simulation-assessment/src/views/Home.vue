<template>
  <v-layout column class="dark">
    <h1>{{ this.leanCloud.User.current() }}</h1>
    <v-flex align-self-start>
      <v-btn depressed color="primary" @click="play">
        play simulation
      </v-btn>
      <v-btn depressed color="primary" class="ml-4" @click="test">
        test
      </v-btn>
    </v-flex>
    <v-alert v-if="isRun" border="left" type="success" dismissible>success</v-alert>
    <v-flex align-self-center class="button-start">
      <v-btn
        depressed
        rounded
        color="primary"
        large
        width="170"
        to="simulation"
      >
        start now !
      </v-btn>
    </v-flex>
    <!-- <iframe
      width="1000"
      height="650"
      loading="lazy"
      allowfullscreen="true"
      frameborder="0"
      importance="high"
      src="https://cloud.anylogic.com/assets/embed?modelId=78d1f8ac-cf3f-4126-b5e4-cbbde700e20d"
    ></iframe> -->
  </v-layout>
</template>

<script>
export default {
  name: 'Home',

  components: {},

  data() {
    return {
      isRun: false,
    }
  },

  mounted() {
    this.$electron.ipcRenderer.on('success', () => {
      this.isRun = true
    })
  },

  methods: {
    test() {
      const data = { base64: 'TGVhbkNsb3Vk' }
      // resume.txt 是文件名
      const file = new this.leanCloud.File('resume.txt', data)
      file.save().then(
        (file) => {
          console.log(`文件保存完成。objectId：${file.id}`)
        },
        (error) => {
          // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
        }
      )
    },

    play() {
      this.$electron.ipcRenderer.send('play')

      // this.$electron.ipcRenderer.send(
      //   'download',
      //   'https://6772-grp2020-4glv8fo5cd87cf9a-1302562267.tcb.qcloud.la/calc.py?sign=0a48a152394001da0e724f5a02ed9544&t=1613720364'
      // )

      // this.$electron.ipcRenderer.send('run')
      // this.$cloudbase
      //   .downloadFile({
      //     fileID:
      //       'cloud://grp2020-4glv8fo5cd87cf9a.6772-grp2020-4glv8fo5cd87cf9a-1302562267/calc.py',
      //   })
      //   .then((res) => {
      //     console.log(res)
      //   })
      // this.$cloudbase
      //   .getTempFileURL({
      //     fileList: ['cloud://grp2020-4glv8fo5cd87cf9a.6772-grp2020-4glv8fo5cd87cf9a-1302562267/calc.py'],
      //   })
      //   .then((res) => {
      //     // fileList 是一个有如下结构的对象数组
      //     // [{
      //     //    fileID: 'cloud://webtestjimmy-5328c3.7765-webtestjimmy-5328c3-1251059088/腾讯云.png', // 文件 ID
      //     //    tempFileURL: '', // 临时文件网络链接
      //     //    maxAge: 120 * 60 * 1000, // 有效期
      //     // }]
      //     console.log(res.fileList)
      //     this.$electron.ipcRenderer.send('download', res.fileList[0].tempFileURL)
      //   })
      //   this.$cloudbase
      //     .callFunction({
      //       // 云函数名称
      //       name: 'eye-tracking',
      //       // 传给云函数的参数
      //       data: {
      //       },
      //     })
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch(error)
    },
  },
}
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
}

.button-start {
  position: fixed;
  bottom: 20vh;
}
</style>
