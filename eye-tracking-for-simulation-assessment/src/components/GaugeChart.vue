<template>
  <v-chart style="width:1300px; height:700px;" :option="option" />
</template>

<script>
import '../assets/rally'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import { default as VChart, THEME_KEY } from 'vue-echarts'

use([CanvasRenderer, GaugeChart])

export default {
  name: 'GaugeChart',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'rally',
  },
  mounted() {
    // this.eventBus.$on('newRecord', this.updateScore)
  },
  methods: {
    //   updateScore() {
    //       this.option.series[0].data[0].value = localStorage.getItem('score') / 100
    //   }
  },
  data() {
    return {
      option: {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#1EB980'],
                ],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            splitLine: {
              length: 30,
              lineStyle: {
                color: 'auto',
                width: 5,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#eeeeee',
              },
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 30,
              textStyle: {
                color: '#eeeeee',
              },
            },
            detail: {
              fontSize: 50,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function(value) {
                return Math.round(value * 100) + '%'
              },
              color: 'auto',
            },
            data: [
              {
                value: 0,
                name: 'Score',
              },
            ],
          },
        ],
      },
    }
  },
}
</script>

<style scoped></style>
