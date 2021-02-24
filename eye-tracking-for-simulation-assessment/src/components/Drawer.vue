<template>
  <v-navigation-drawer app v-model="drawer" class="py-12" absolute temporary>
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
            {{ this.currentUser.getUsername() }}
          </v-list-item-title>
          <v-list-item-subtitle>{{
            this.currentUser.getEmail()
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-if="currentUser.isAnonymous()" @click="register">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign up</v-list-item-title>
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
      currentUser: this.leanCloud.User.current(),
      drawer: false,
      selectedItem: 0,
      items: [
        { text: 'Records', icon: 'mdi-history', link: 'records' },
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'About', icon: 'mdi-information', link: 'about' },
        { text: 'Blog', icon: 'mdi-blogger' },
        { text: 'FAQ', icon: 'mdi-frequently-asked-questions', link: 'faq' },
      ],
      value: 1,
    }
  },

  mounted() {
    this.eventBus.$on('openDrawer', () => {
      this.drawer = true
    })
  },

  methods: {
    register() {
        this.eventBus.$emit('signUp')
    }
  },
}
</script>

<style scoped></style>
