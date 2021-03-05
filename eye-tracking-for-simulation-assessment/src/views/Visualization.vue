<template>
  <v-row>
    <v-col cols="12">
      <h1 class="pageTitle">{{ name }}</h1>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <GaugeChart ref="gauge" />
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <Heatmap ref="heatmap" />
    </v-col>
    <v-col v-for="n in 9" :key="n" cols="4">
      <v-card height="300"></v-card>
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
      if (localStorage.score) {
        vm.$refs.gauge.option.series[0].data[0].value =
          localStorage.getItem('score') / 100
      }
      if (to.params.map) {
        console.log(to.params.map);
        vm.$refs.heatmap.option.series[0].data = to.params.map.map(function(item) {
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
