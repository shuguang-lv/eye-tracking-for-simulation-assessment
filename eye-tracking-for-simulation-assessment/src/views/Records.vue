<template>
  <div class="flex-row">
    <v-data-table
      dark
      :headers="headers"
      :items="items"
      :items-per-page="20"
      :search="search"
      class="elevation-1 mt-8"
      item-key="number"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-icon class="mr-2">mdi-history</v-icon>
          <v-toolbar-title>
            Records
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-btn class="mx-4 my-2" color="primary" @click="showChart(item)">
            Visualization
            <v-icon right>mdi-eye-check</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <!-- <v-col v-for="card in cards" :key="card" cols="12">
        <v-card>
          <v-subheader>{{ card }}</v-subheader>
          <v-list two-line>
            <template v-for="n in 6">
              <v-list-item :key="n">
                <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Message {{ n }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nihil repellendus distinctio similique
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col> -->
  </div>
</template>

<script>
import { getRecords } from '../utils/indexedDB.js'
var lodash = require('lodash')

export default {
  data: () => ({
    selectedScore: 0,
    selectedName: '',
    search: '',
    headers: [
      { text: 'No.', value: 'number' },
      { text: 'Simulation', value: 'simulation' },
      { text: 'User Score', value: 'userScore' },
      { text: 'Calculated Score', value: 'calculatedScore' },
      { text: 'Date', value: 'date' },
      { text: 'Uploaded', value: 'sync' },
      { text: '', value: 'data-table-expand' },
    ],
    items: [],
  }),

  mounted() {
    this.eventBus.$on('newRecord', () => {
      this.update()
    })
    this.eventBus.$on('uploadRecord', () => {
      this.update()
    })
    this.update()
  },

  methods: {
    async update() {
      this.items = []
      let count = 1
      let records = await getRecords()
      records.forEach((value, index, array) => {
        this.items.push({
          number: count++,
          simulation: value.simulation,
          userScore: value.userScore,
          calculatedScore: value.calculatedScore,
          date: value.date,
          sync: value.uid == '' ? 'No' : 'Yes',
          visualization: '',
        })
      })
    },

    showChart(item) {
      this.eventBus.$emit('startProgress')
      this.selectedScore = item.userScore
      this.selectedName = item.simulation
      this.$electron.ipcRenderer.on(
        'mapLoaded' + this.selectedName + ' ',
        (event, arg) => {
          this.$router.push({
            name: 'Visualization',
            params: {
              name: this.selectedName,
              score: this.selectedScore,
              map: arg,
            },
          })
        }
      )
      this.$electron.ipcRenderer.send('loadMap', this.selectedName + ' ')
    },
  },
}
</script>

<style scoped></style>
