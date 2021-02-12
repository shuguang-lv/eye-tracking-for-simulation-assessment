<template>
  <v-layout column class="dark">
    <v-flex>
      <v-btn depressed color="primary" class="mr-4" @click="runPython">
        spawn python
      </v-btn>
    </v-flex>
    <v-alert v-if="isRun" type="success">success</v-alert>
    <iframe
      width="1000"
      height="650"
      loading="lazy"
      allowfullscreen="true"
      frameborder="0"
      importance="high"
      src="https://cloud.anylogic.com/assets/embed?modelId=78d1f8ac-cf3f-4126-b5e4-cbbde700e20d"
    ></iframe>
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
