<template>
  <v-row>
    <v-col cols="12" class="mb-8">
      <h1 class="pageTitle">
        Simulation
      </h1>
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
