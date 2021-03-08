<template>
  <v-row>
    <v-col cols="12" class="my-16 d-flex justify-center">
      <v-hover v-slot="{ hover }">
        <v-img
          src="../assets/logo.png"
          max-width="500"
          max-height="500"
          class="logo-hover"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex primary display-1 justify-center align-center"
              style="height: 100%;"
            >
              xxx<br>xxx<br>xxx
            </div>
          </v-expand-transition></v-img
        >
      </v-hover>
    </v-col>
    <v-col cols="12" class="my-16 d-flex justify-center">
      <div
        class="display-3 font-weight-bold"
        elevation="5"
        style="word-spacing: 0.3em;"
      >
        Eye Tracking for Simulation Assessment
      </div>
    </v-col>
    <v-col cols="12" class="d-flex justify-center"
      ><v-btn
        depressed
        rounded
        color="primary"
        large
        width="300"
        height="60"
        to="simulation"
        elevation="5"
        class="rounded-lg"
      >
        <div class="headline font-weight-medium mr-5" style="word-spacing: 0.3em;">
          start now
        </div>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-col>
    <!-- <v-col cols="12" class="mb-8 text-center">
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
    </v-col> -->
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

.logo-hover {
  border-radius: 50%;
  overflow: hidden;
}
</style>
