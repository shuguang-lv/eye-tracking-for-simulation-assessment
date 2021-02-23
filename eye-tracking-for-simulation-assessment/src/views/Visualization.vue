<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1>
          Choose the way you want to visualize the results
        </h1>
      </v-col>
      <v-col v-for="n in 9" :key="n" cols="4">
        <v-card height="300"></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
