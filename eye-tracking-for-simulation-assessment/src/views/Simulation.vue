<template>
  <v-row>
    <v-col cols="12" class="mb-8 d-flex">
      <h1 class="page-title px-5">
        Simulation
        <v-icon class="ml-2">
          mdi-youtube
        </v-icon>
      </h1>
      <v-spacer></v-spacer>
    </v-col>
    <v-col v-for="n in 9" :key="n" cols="4">
      <Card :name="'Simulation' + n" />
    </v-col>
  </v-row>
</template>

<script>
import Card from '../components/Card'

export default {
  components: {
    Card,
  },

  data() {
    return {}
  },

  methods: {},
}
</script>

<style scoped></style>
