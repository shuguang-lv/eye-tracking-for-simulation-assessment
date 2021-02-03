<template>
  <div class="home dark d-flex flex-column justify-center align-center">
    <v-btn depressed color="primary" @click="runPython">
      spawn python
    </v-btn>
    <v-btn depressed color="primary" @click="changeMode">
      mode
    </v-btn>
    <v-alert v-if="isRun" type="success">success</v-alert>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <iframe
      width="1000"
      height="650"
      loading="lazy"
      allowfullscreen="true"
      frameborder="0"
      importance="high"
      src="https://cloud.anylogic.com/assets/embed?modelId=78d1f8ac-cf3f-4126-b5e4-cbbde700e20d"
    ></iframe>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',

  components: {
    HelloWorld,
  },

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
    changeMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
}
</script>
