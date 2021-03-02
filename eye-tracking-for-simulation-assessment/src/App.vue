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
    this.initUser()
    if (!localStorage.records) {
      localStorage.setItem(
        'records',
        JSON.stringify([])
      )
    }
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
    initDB() {
      let openRequest = indexedDB.open('records', 1)

      openRequest.onupgradeneeded = function(event) {
        // 如果客户端没有数据库则触发
        // ...执行初始化...
        // 现有的数据库版本小于 2（或不存在）
        let db = openRequest.result
        switch (
          event.oldVersion // 现有的 db 版本
        ) {
          case 0:
          // 版本 0 表示客户端没有数据库
          // 执行初始化
          case 1:
          // 客户端版本为 1
          // 更新
        }
      }

      openRequest.onerror = function() {
        console.error('Error', openRequest.error)
      }

      openRequest.onsuccess = function() {
        let db = openRequest.result
        // 继续使用 db 对象处理数据库
        db.onversionchange = function() {
          db.close()
          alert('Database is outdated, please reload the page.')
        }

        // ……数据库已经准备好，请使用它……
      }

      openRequest.onblocked = function() {
        // 如果我们正确处理了 onversionchange 事件，这个事件就不应该触发
        // 这意味着还有另一个指向同一数据库的连接
        // 并且在 db.onversionchange 被触发后，该连接没有被关闭
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

.pageTitle {
  padding-left: 15px;
  border-left: 6px solid #1eb980;
}
</style>
