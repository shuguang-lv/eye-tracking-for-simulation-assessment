<template>
  <nav>
    <TopBar />
    <Drawer />
    <RegisterForm />
    
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
import TopBar from './TopBar'
import Drawer from './Drawer'
import RegisterForm from './RegisterForm'

export default {
  components: {
    TopBar,
    Drawer,
    RegisterForm
  },

  data() {
    return {
      bottomNavActive: true,
    }
  },

  methods: {
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
