<template>
  <v-app>
    <Navbar />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-content>
        <transition name="fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
import './utils/storeUtil.js'
import Navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    
  }),

  mounted() {},

  created() {
    document.body.removeChild(document.getElementById('Loading'))
  },

  methods: {

  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
