<template>
  <v-chart style="width:1300px; height:1000px;" :option="option" />
</template>

<script>
import '../assets/rally'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  SingleAxisComponent,
  VisualMapComponent,
} from 'echarts/components'
import { default as VChart, THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  SingleAxisComponent,
  VisualMapComponent,
])

export default {
  name: 'Heatmap',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'rally',
  },
  methods: {},
  data() {
    return {
      option: {
        tooltip: {
          position: 'top',
        },
        grid: {
          height: '50%',
        },
        xAxis: {
          type: 'category',
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
          ],
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 15,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '32%',
          textStyle: {
            color: '#ffffffe0',
          },
        },
        series: [
          {
            type: 'heatmap',
            data: 0,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    }
  },
  mounted() {
    // data = data.map(function(item) {
    //   return [item[1], item[0], item[2] || '-']
    // })
    // this.option.xAxis.data = x
    // this.option.yAxis.data = y
    // this.option.series[0].data = data
  },
}
</script>

<style scoped></style>
