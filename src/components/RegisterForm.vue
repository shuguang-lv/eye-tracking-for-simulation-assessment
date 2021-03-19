<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="pa-6">
      <v-card-title>
        <span class="headline">Sign Up</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- username -->
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
            clearable
            prepend-icon="mdi-account"
          ></v-text-field>
          <!-- password -->
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            clearable
            prepend-icon="mdi-lock"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'"
            counter
            @click:append="showPwd = !showPwd"
          ></v-text-field>
          <!-- email -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            clearable
            prepend-icon="mdi-email"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-alert v-model="warning" dense text type="error">
        Signup failed! The username has been taken
      </v-alert>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          :disabled="!valid || loading"
          color="primary"
          @click="validate"
          outlined
          :loading="loading"
        >
          Submit
        </v-btn>
        <v-btn class="mr-2" color="error" @click="reset" outlined>
          Reset Form
        </v-btn>
        <v-btn class="mr-2" color="warning" @click="resetValidation" outlined>
          Reset Validation
        </v-btn>
        <v-btn color="disabled" @click="dialog = false" outlined>
          Close
        </v-btn>
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
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Min 8 characters',
      ],
      showPwd: false,
      warning: false,
    }
  },

  mounted() {
    this.eventBus.$on('signUp', () => {
      this.dialog = true
    })
    this.initUser()
  },

  methods: {
    /**
     * validate registration
     */
    validate() {
      if (this.$refs.form.validate()) {
        if (this.currentUser != null) {
          // anonymous user
          this.currentUser.setUsername(this.name)
          this.currentUser.setPassword(this.password)
          this.currentUser.setEmail(this.email)
          this.currentUser.signUp().then(
            (user) => {
              console.log('currentUser has become a formal user')
              localStorage.setItem('userName', this.name)
              localStorage.setItem('userEmail', this.email)
              this.eventBus.$emit('updateUserInfo')
              this.eventBus.$emit('showSnackbar', 'Register successfully!')
              this.dialog = false
            },
            (error) => {
              console.log('register failed')
              this.warning = true
            }
          )
        } else {
          // create new user instance
          const newUser = new this.user()
          newUser.setUsername(this.name)
          newUser.setPassword(this.password)
          newUser.setEmail(this.email)

          this.warning = false
          newUser.signUp().then(
            (user) => {
              // register successfully
              console.log(`注册成功。objectId：${newUser.id}`)
              localStorage.setItem('userName', this.name)
              localStorage.setItem('userEmail', this.email)
              this.eventBus.$emit('updateUserInfo')
              this.eventBus.$emit('showSnackbar', 'Register successfully!')
              this.dialog = false
            },
            (error) => {
              console.log('register failed')
              this.warning = true
            }
          )
        }
      }
    },

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

    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped></style>
