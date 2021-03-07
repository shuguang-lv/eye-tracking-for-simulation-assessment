<template>
  <v-row class="mb-4">
    <v-col cols="12" class="d-flex mb-8">
      <h1 class="page-title px-5">
        {{ name }}
        <v-icon class="ml-2">
          mdi-eye
        </v-icon>
      </h1>
      <v-spacer></v-spacer>
    </v-col>
    <v-col cols="6" class="d-flex justify-center">
      <v-card class="pa-4 overflow-hidden elevation-1" max-height="700">
        <v-card-text>
          <p class="display-1 primary--text font-weight-bold">
            User Score
          </p>
          <p class="subtitle-1 text--secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
            illum debitis. Architecto, doloribus voluptatum nulla itaque facilis
            dolor quas provident laudantium asperiores non. Maxime vel
            aspernatur commodi deserunt assumenda perspiciatis.
          </p>
          <div class="d-flex justify-center">
            <GaugeChart ref="gauge" />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6" class="d-flex justify-center">
      <v-card class="pa-4 overflow-hidden elevation-1" max-height="700">
        <v-card-text>
          <p class="display-1 primary--text font-weight-bold">
            Calculated Score
          </p>
          <p class="subtitle-1 text--secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
            illum debitis. Architecto, doloribus voluptatum nulla itaque facilis
            dolor quas provident laudantium asperiores non. Maxime vel
            aspernatur commodi deserunt assumenda perspiciatis.
          </p>
          <div class="d-flex justify-center">
            <GaugeChart />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="pa-4 overflow-hidden elevation-1" max-height="900">
        <v-card-text>
          <p class="display-1 primary--text font-weight-bold">
            Heatmap of Eye Movements
          </p>
          <p class="subtitle-1 text--secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
            illum debitis. Architecto, doloribus voluptatum nulla itaque facilis
            dolor quas provident laudantium asperiores non. Maxime vel
            aspernatur commodi deserunt assumenda perspiciatis.
          </p>
          <div class="d-flex justify-center">
            <Heatmap ref="heatmap" />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import GaugeChart from '../components/GaugeChart'
import Heatmap from '../components/Heatmap'

export default {
  components: {
    GaugeChart,
    Heatmap,
  },

  data() {
    return {
      name: 'Visualization',
    }
  },

  mounted() {
    // this.initScore()
    // this.initHeatmap()
    // this.eventBus.$on('newRecord', this.updateChart)
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.name) {
        vm.name = `Visualization for ${to.params.name}`
      }
      if (to.params.score) {
        vm.$refs.gauge.option.series[0].data[0].value = to.params.score / 100
      }
      if (to.params.map) {
        console.log(to.params.map)
        vm.$refs.heatmap.option.series[0].data = to.params.map.map(function(
          item
        ) {
          return [item[1], item[0], item[2] || '-']
        })
      }
      vm.eventBus.$emit('finishProgress')
    })
  },

  methods: {},
}
</script>

<style scoped></style>
