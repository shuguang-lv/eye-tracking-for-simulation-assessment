<template>
  <v-layout column class="dark">
    <h1>{{ this.leanCloud.User.current() }}</h1>
    <v-flex align-self-start>
      <v-btn depressed color="primary" class="ml-4" @click="test">
        test
      </v-btn>
    </v-flex>
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
    }
  },

  mounted() {
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
