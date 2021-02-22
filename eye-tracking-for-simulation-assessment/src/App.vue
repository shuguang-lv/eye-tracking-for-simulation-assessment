<template>
  <v-app>
    <Navbar />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container class="mt-12">
        <transition name="fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
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

  data: () => ({}),

  mounted() {},

  created() {
    document.body.removeChild(document.getElementById('Loading'))
    this.leanCloud.User.loginAnonymously().then((user) => {
      console.log(user);
    })
    // await this.$cloudbase
    //   .auth({ persistence: 'local' })
    //   .anonymousAuthProvider()
    //   .signIn()
    //   .then(() => {
    //     console.log('登录成功');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  },

  methods: {},
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
