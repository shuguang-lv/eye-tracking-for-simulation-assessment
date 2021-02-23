<template>
  <div class="flex-row">
    <v-data-table
      dark
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :search="search"
      class="elevation-1 mt-8"
      item-key="number"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
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
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">More info</td>
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
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'No.',
        align: 'start',
        // sortable: false,
        value: 'number',
      },
      { text: 'Topic', value: 'topic' },
      { text: 'Score', value: 'score' },
      { text: 'Date', value: 'date' },
      { text: '', value: 'data-table-expand' },
    ],
    items: [
      {
        number: '1',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '2',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '3',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '4',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '5',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '6',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '7',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '8',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '9',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
      {
        number: '10',
        topic: 'Airport',
        score: 6.0,
        date: '10/23/2020',
      },
    ],
  }),
}
</script>

<style scoped></style>
