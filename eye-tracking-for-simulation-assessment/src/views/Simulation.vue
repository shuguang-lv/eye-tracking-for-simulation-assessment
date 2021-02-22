<template>
  <v-row>
    <h1>
      Simulation
    </h1>
    <template v-for="n in 4">
      <v-col :key="n" class="mt-2" cols="12">
        <h3>Category {{ n }}</h3>
      </v-col>
      <!-- <v-col v-for="j in 6" :key="`${n}${j}`" cols="3" md="2">
          <v-sheet height="200"></v-sheet>
        </v-col> -->
      <v-col v-for="n in 3" :key="n" cols="12" md="4">
        <v-item>
          <v-card class="d-flex align-center" dark height="300" @click="dialog = true"> </v-card>
        </v-item>
      </v-col>
    </template>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped></style>
