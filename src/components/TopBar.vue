<template>
  <v-app-bar app dense dark class="primary">
    <v-app-bar-nav-icon class="mr-8" @click="openDrawer"> </v-app-bar-nav-icon>
    <v-tabs center-active class="drag">
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab class="no-drag" active-class="font-weight-bold" :to="{ path: '/' }"
        >Home</v-tab
      >
      <v-tab
        class="no-drag"
        active-class="font-weight-bold"
        :to="{ path: '/simulation' }"
        >Simulation</v-tab
      >
      <v-tab
        class="no-drag"
        active-class="font-weight-bold"
        :to="{ path: '/visualization' }"
        >Visualization</v-tab
      >
      <v-tab class="no-drag" :to="{ path: '/eyeTracking' }">Eye Tracking</v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <div class="text-no-wrap mr-4">
      {{ userName }}
    </div>

    <FloatButton class="mr-6" />

    <!-- dropdown menu -->
    <!-- <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn plain dark v-bind="attrs" v-on="on">
          <v-icon left>mdi-menu-down</v-icon>
          <span>Settings</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-ripple="{ center: true }" @click="changeMode">
          Alter Theme
        </v-list-item>
        <v-list-item v-ripple="{ center: true }" @click="toggleBottomNav">
          Toggle Bottom Bar
        </v-list-item>
      </v-list>
    </v-menu> -->

    <v-btn plain dark @click="minimizeApp">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-btn plain dark @click="closeApp">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import FloatButton from './FloatButton'

export default {
  components: {
    FloatButton,
  },

  data() {
    return {
      userName: '',
    }
  },

  mounted() {
    // fetch user name
    this.userName =
      this.currentUser == null || this.currentUser.isAnonymous()
        ? ''
        : 'Hi, ' + this.currentUser.getUsername()

    this.eventBus.$on('updateUserInfo', () => {
      let name = localStorage.getItem('userName')
      this.userName = name == '' ? '' : 'Hi, ' + name
    })
  },

  methods: {
    closeApp() {
      this.$electron.remote.app.quit()
    },
    minimizeApp() {
      this.$electron.remote.getCurrentWindow().minimize()
    },
    changeMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    openDrawer() {
      this.eventBus.$emit('openDrawer')
    },
    toggleBottomNav() {
      this.eventBus.$emit('toggleBottomNav')
    },
  },
}
</script>

<style scoped></style>
