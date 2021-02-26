<template>
  <nav>
    <TopBar />
    <Drawer />
    <RegisterForm />
    <LoginForm />

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
    <div class="float-group">
      <v-btn fab large color="primary" @click="upload"
        ><v-icon>mdi-cloud-upload</v-icon></v-btn
      >
      <v-btn fab large color="primary" @click="download"
        ><v-icon>mdi-cloud-download</v-icon></v-btn
      >
    </div>
    <v-footer padless app>
      <v-progress-linear
        indeterminate
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

export default {
  components: {
    TopBar,
    Drawer,
    RegisterForm,
    LoginForm,
  },

  data() {
    return {
      bottomNavActive: true,
    }
  },

  methods: {
    upload() {

    },
    download() {

    }
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

.float-group {
  position: fixed;
  bottom: 80px;
  right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  z-index: 999;
}
</style>
