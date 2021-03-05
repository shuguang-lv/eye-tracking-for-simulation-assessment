<template>
  <v-app>
    <Navbar />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container class="mt-12">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
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

  mounted() {},

  created() {
    this.initUser()
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
    initUser() {
      const currentUser = this.user.current()
      if (currentUser != null) {
        currentUser.isAuthenticated().then((authenticated) => {
          if (authenticated) {
            console.log('session token 有效')
            this.user.become(currentUser.getSessionToken()).then(
              (user) => {
                console.log(user)
              },
              (error) => {
                console.log(error)
                this.user.logOut()
              }
            )
          } else {
            console.log('session token 无效')
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
  background-color: #3a3a44;
}
</style>
