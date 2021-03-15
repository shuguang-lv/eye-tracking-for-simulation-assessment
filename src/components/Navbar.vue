<template>
  <nav>
    <TopBar app />
    <Drawer app />
    <RegisterForm />
    <LoginForm />
    <Logout />

    <v-snackbar
      rounded
      right
      v-model="snackbar"
      timeout="3000"
      elevation="3"
      transition="slide-x-reverse-transition"
      class="mb-2 mr-2"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      rounded
      right
      v-model="snackbarError"
      timeout="3000"
      elevation="3"
      transition="slide-x-reverse-transition"
      class="mb-2 mr-2"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbarError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- <v-bottom-navigation
      v-model="value"
      :input-value="bottomNavActive"
      class="primary"
      app
      dark
      shift
      grow
    >
    </v-bottom-navigation> -->

    <!-- progress bar -->
    <v-footer padless app height="20">
      <v-progress-linear
        :indeterminate="progress"
        color="primary"
        height="20"
      ></v-progress-linear>
    </v-footer>
  </nav>
</template>

<script>
import TopBar from './TopBar'
import Drawer from './Drawer'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Logout from './Logout'

export default {
  components: {
    TopBar,
    Drawer,
    RegisterForm,
    LoginForm,
    Logout,
  },

  data() {
    return {
      bottomNavActive: true,
      progress: false,
      snackbar: false,
      snackbarError: false,
      text: '',
    }
  },

  mounted() {
    this.eventBus.$on('startProgress', () => {
      this.progress = true
    })
    this.eventBus.$on('finishProgress', () => {
      this.progress = false
    })
    this.eventBus.$on('showSnackbar', (text) => {
      this.text = text
      this.snackbar = true
    })
    this.eventBus.$on('showSnackbarError', (text) => {
      this.text = text
      this.snackbarError = true
    })
  },

  methods: {
    upload() {},
    download() {},
  },
}
</script>

<style scoped>
.drag {
  -webkit-app-region: drag !important;
}

.no-drag {
  -webkit-app-region: no-drag !important;
}
</style>
