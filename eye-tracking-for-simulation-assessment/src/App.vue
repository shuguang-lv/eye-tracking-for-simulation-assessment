<template>
  <v-app>
    <v-app-bar app dense dark class="primary">
      <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>
      <v-tabs center-active dark class="drag">
        <v-tab class="no-drag" :to="{ path: '/' }">One</v-tab>
        <v-tab class="no-drag" :to="{ path: '/about' }">Two</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn plain dark>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn plain dark @click="minimizeApp">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn plain dark @click="closeApp">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <!-- <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
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
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <transition name="fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <div class="text-center mb-8">
          <v-btn
            color="deep-purple"
            outlined
            @click="bottomNavActive = !bottomNavActive"
          >
            Toggle Navigation
          </v-btn>
        </div>
      </v-container>
    </v-main>

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
  </v-app>
</template>

<script>
import './utils/storeUtil.js'
import Header from './components/Header'
import BottomNav from './components/BottomNav'

export default {
  name: 'App',

  components: {
    Header,
    BottomNav,
  },

  data: () => ({
    drawer: false,
    group: null,
    value: 1,
    bottomNavActive: true,
    selectedItem: 0,
    items: [
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
    ],
  }),

  mounted() {},

  created() {
    document.body.removeChild(document.getElementById('Loading'))
    document.body.removeChild(document.getElementById('LoadingBg'))
  },

  methods: {
    closeApp() {
      this.$electron.remote.app.quit()
    },
    minimizeApp() {
      this.$electron.remote.getCurrentWindow().minimize()
    },
  },
}
</script>

<style>
html::-webkit-scrollbar {
  display: none;
}

.drag {
  -webkit-app-region: drag !important;
}

.no-drag {
  -webkit-app-region: no-drag !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
