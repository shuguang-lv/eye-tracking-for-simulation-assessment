<template>
  <nav>
    <v-app-bar app dense dark class="primary">
      <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>
      <v-tabs center-active dark class="drag">
        <v-tab class="no-drag" :to="{ path: '/' }">Home</v-tab>
        <v-tab class="no-drag" :to="{ path: '/simulation' }">Simulation</v-tab>
        <v-tab class="no-drag" :to="{ path: '/visualization' }">Visualization</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
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
          <v-list-item
            v-ripple="{ center: true }"
            @click="bottomNavActive = !bottomNavActive"
          >
            Toggle Bottom Bar
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn plain dark @click="minimizeApp">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn plain dark @click="closeApp">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              John Leider
            </v-list-item-title>
            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list>
        <v-list-item>© Team11 GRP 2020</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-navigation
      v-model="value"
      :input-value="bottomNavActive"
      class="primary"
      app
      dark
      shift
      grow
    >
      <v-btn>
        <span>Video</span>
        <v-icon>mdi-television-play</v-icon>
      </v-btn>
      <v-btn>
        <span>Music</span>
        <v-icon>mdi-music-note</v-icon>
      </v-btn>
      <v-btn>
        <span>Book</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <v-btn>
        <span>Image</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      selectedItem: 0,
      items: [
        { text: 'Login', icon: 'mdi-login' },
        { text: 'Logout', icon: 'mdi-logout' },
        { text: 'Records', icon: 'mdi-history' },
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'About', icon: 'mdi-information' },
        { text: 'Blog', icon: 'mdi-blogger' },
        { text: 'FAQ', icon: 'mdi-frequently-asked-questions' },
      ],
      value: 1,
      bottomNavActive: true,
    }
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
