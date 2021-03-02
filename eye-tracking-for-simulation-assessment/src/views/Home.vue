<template>
  <v-row>
    <v-col cols="12" class="mb-8"
      ><h1 class="pageTitle">Eye Tracking for Simulation Assessment</h1>
    </v-col>
    <v-carousel
      cycle
      height="700"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-col cols="12" class="mb-8 text-center">
      <v-chip class="ma-2" color="success" outlined>
        <v-icon left>
          mdi-server-plus
        </v-icon>
        Server Status
      </v-chip>
      <v-chip class="ma-2" color="primary" outlined pill>
        User Account
        <v-icon right>
          mdi-account-outline
        </v-icon>
      </v-chip>
      <v-chip class="ma-2" color="deep-purple accent-4" outlined>
        <v-icon left>
          mdi-wrench
        </v-icon>
        Update Settings
      </v-chip>
      <v-chip class="ma-2" close color="indigo darken-3" outlined>
        <v-icon left>
          mdi-fire
        </v-icon>
        New Posts Available
      </v-chip>
    </v-col>
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
  </v-row>
</template>

<script>
export default {
  name: 'Home',

  components: {},

  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    }
  },

  mounted() {},

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
