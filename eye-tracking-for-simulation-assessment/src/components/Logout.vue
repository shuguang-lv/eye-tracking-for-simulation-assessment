<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="pa-6">
      <v-card-title>
        <span class="headline">Logout</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Please make sure that all records in your local machine have been
        uploaded to the cloud
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="logout">
            Confirm
          </v-btn>
          <v-btn color="warning darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dialog: false,
    }
  },

  mounted() {
    this.eventBus.$on('logout', () => {
      this.dialog = true
    })
  },

  methods: {
    logout() {
      this.user.logOut()
      localStorage.setItem('userName', '')
      localStorage.setItem('userEmail', '')
      this.eventBus.$emit('updateUserInfo')
      this.dialog = false
    },
  },
}
</script>

<style scoped></style>
