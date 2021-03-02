<template>
  <nav>
    <TopBar />
    <Drawer />
    <RegisterForm />
    <LoginForm />
    <FloatButton />

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
import FloatButton from './FloatButton'

export default {
  components: {
    TopBar,
    Drawer,
    RegisterForm,
    LoginForm,
    FloatButton,
  },

  data() {
    return {
      bottomNavActive: true,
      progress: false,
    }
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
