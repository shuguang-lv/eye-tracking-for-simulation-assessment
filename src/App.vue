<template>
  <v-app>
    <Navbar app />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- <scrollbar> -->
        <!-- Provides the application the proper gutter -->
        <v-container class="mt-16">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </v-container>
      <!-- </scrollbar> -->
    </v-main>
  </v-app>
</template>

<script>
// import './utils/indexedDB.js'
import Navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({}),

  mounted() {
    // error handling
    this.eventBus.$on('error', (msg) => {
      this.eventBus.$emit('showSnackbar', msg)
    })
    this.$electron.ipcRenderer.on('error', (event, msg) => {
      this.eventBus.$emit('showSnackbarError', msg)
    })
  },

  created() {
    this.initUser()
    // hide loading page
    document.getElementById('Loading').style.display = 'none'
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

  methods: {
    /**
     * initialize user login module in leancloud
     */
    initUser() {
      const currentUser = this.user.current()
      if (currentUser != null) {
        currentUser.isAuthenticated().then((authenticated) => {
          if (authenticated) {
            console.log('session token is valid')
            this.user.become(currentUser.getSessionToken()).then(
              (user) => {
                console.log(user)
              },
              (error) => {
                console.log(error)
                this.eventBus.$emit('error', error)
                this.user.logOut()
              }
            )
          } else {
            console.log('session token invalid')
            this.eventBus.$emit('error', 'Invalid session token')
            this.user.logOut()
          }
        })
      }
    },
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

.page-title {
  border-left: 6px solid #1eb980;
  background-color: #1eb9801e;
}

/* smooth scrolling */
* {
  scroll-behavior: smooth;
  user-select: none;
}
</style>
