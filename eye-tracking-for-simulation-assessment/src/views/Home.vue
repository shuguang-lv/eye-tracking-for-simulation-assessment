<template>
  <v-layout column class="dark">
    <v-flex align-self-center class="button-start">
      <v-btn depressed rounded color="primary" large width="170" to="simulation">
        start now !
      </v-btn>
    </v-flex>
    <v-flex align-self-center>
      <v-btn depressed color="primary" @click="runPython">
        spawn python
      </v-btn>
    </v-flex>
    <v-alert v-if="isRun" type="success">success</v-alert>
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
    runPython() {
      this.$electron.ipcRenderer.send('run')
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
