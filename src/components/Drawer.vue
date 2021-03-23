<template>
  <v-navigation-drawer app v-model="drawer" class="py-12" temporary>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon large>
            mdi-account-circle
          </v-icon>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ userName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userEmail }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-if="userName == 'unknown'" @click="login">
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userName == 'unknown'" @click="register">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userName != 'unknown'" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="{ path: '/' + item.link }"
        >
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
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      selectedItem: 0,
      items: [
        { text: 'Records', icon: 'mdi-history', link: 'records' },
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'About', icon: 'mdi-information', link: 'about' },
        { text: 'Guide', icon: 'mdi-book', link: 'guide' },
      ],
      value: 1,
      userName: '',
      userEmail: '',
    }
  },

  mounted() {
    // fetch user information
    this.userName =
      this.currentUser == null || this.currentUser.isAnonymous()
        ? 'unknown'
        : this.currentUser.getUsername()
    this.userEmail =
      this.currentUser == null || this.currentUser.isAnonymous()
        ? ''
        : this.currentUser.getEmail()
    this.eventBus.$on('updateUserInfo', () => {
      let name = localStorage.getItem('userName')
      this.userName = name == '' ? 'unknown' : name
      this.userEmail = localStorage.getItem('userEmail')
    })
    this.eventBus.$on('openDrawer', () => {
      this.drawer = true
    })
  },

  methods: {
    register() {
      this.eventBus.$emit('signUp')
    },
    login() {
      this.eventBus.$emit('login')
    },
    logout() {
      this.eventBus.$emit('logout')
    },
  },
}
</script>

<style scoped></style>
