<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="pa-6">
      <v-card-title>
        <span class="headline">Sign Up</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
            clearable
            prepend-icon="mdi-account"
          ></v-text-field>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" :disabled="!valid" color="primary" @click="validate" outlined>
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
      showPwd: false
    }
  },

  mounted() {
    this.eventBus.$on('signUp', () => {
      this.dialog = true
    })
  },

  methods: {
    validate() {
      this.$refs.form.validate()
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
