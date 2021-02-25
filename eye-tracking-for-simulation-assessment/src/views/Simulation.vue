<template>
  <v-row>
    <v-col cols="12" class="mb-8">
      <h1 class="pageTitle">
        Simulation
      </h1>
    </v-col>
    <v-col v-for="j in 9" :key="`${n}${j}`" cols="4">
      <v-card class="" dark height="300" @click="dialog = true">
        <v-img
          class=""
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>
        <v-card-title class="mt-4">
          Number 10
        </v-card-title>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" width="1000" persistent>
      <v-card>
        <v-img
          class=""
          height="400px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>
        <v-card-title class="mt-4 text-h4">
          Number 10
        </v-card-title>
        <v-card-text class="mb-4 text--secondary text-body-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-expand-transition>
          <v-data-table
            dark
            v-if="showRecord"
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1 mb-12"
            item-key="number"
            show-expand
          >
            <template v-slot:expanded-item="{ headers }">
              <td :colspan="headers.length">More info</td>
            </template>
          </v-data-table>
        </v-expand-transition>
        <v-divider></v-divider>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            class="mr-4 px-4"
            color="primary"
            :loading="loading"
            :disabled="loading"
            large
            @click="play"
          >
            Play
            <v-icon right>mdi-play-circle</v-icon>
          </v-btn>
          <v-btn class="mr-4 px-4" color="warning" large @click="showRecords">
            Records
            <v-icon right>mdi-history</v-icon>
          </v-btn>
          <v-btn class="px-4" color="disabled" large @click="dialog = false">
            Close
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="rateDialog" persistent>
      <v-card class="elevation-16 pa-4 mx-auto" width="500">
        <v-card-title class="headline">
          Rate Our Framework
        </v-card-title>
        <v-card-text>
          If you enjoy using Vuetify, please take a few seconds to rate your
          experience with the framework. It really helps!
          <v-slider
            class="mt-12"
            v-model="rating"
            step="10"
            thumb-label
            ticks
          ></v-slider>
          <!-- <div class="text-center mt-12">
            <v-rating
              v-model="rating"
              background-color="warning"
              color="warning"
              hover
              half-increments
            ></v-rating>
          </div> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-space-between mt-4">
          <v-btn text @click="rateDialog = false">
            No Thanks
          </v-btn>
          <v-btn color="primary" text>
            Rate Now
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
      rateDialog: false,
      loading: false,
      rating: 0,
      showRecord: false,
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
    }
  },

  mounted() {
    this.$electron.ipcRenderer.on('success', () => {
      this.loading = false
      this.rateDialog = true
    })
  },

  methods: {
    play() {
      this.loading = true
      this.$electron.ipcRenderer.send('play')

      // this.$electron.ipcRenderer.send(
      //   'download',
      //   'https://6772-grp2020-4glv8fo5cd87cf9a-1302562267.tcb.qcloud.la/calc.py?sign=0a48a152394001da0e724f5a02ed9544&t=1613720364'
      // )

      // this.$electron.ipcRenderer.send('run')
      // this.$cloudbase
      //   .downloadFile({
      //     fileID:
      //       'cloud://grp2020-4glv8fo5cd87cf9a.6772-grp2020-4glv8fo5cd87cf9a-1302562267/calc.py',
      //   })
      //   .then((res) => {
      //     console.log(res)
      //   })
      // this.$cloudbase
      //   .getTempFileURL({
      //     fileList: ['cloud://grp2020-4glv8fo5cd87cf9a.6772-grp2020-4glv8fo5cd87cf9a-1302562267/calc.py'],
      //   })
      //   .then((res) => {
      //     // fileList 是一个有如下结构的对象数组
      //     // [{
      //     //    fileID: 'cloud://webtestjimmy-5328c3.7765-webtestjimmy-5328c3-1251059088/腾讯云.png', // 文件 ID
      //     //    tempFileURL: '', // 临时文件网络链接
      //     //    maxAge: 120 * 60 * 1000, // 有效期
      //     // }]
      //     console.log(res.fileList)
      //     this.$electron.ipcRenderer.send('download', res.fileList[0].tempFileURL)
      //   })
      //   this.$cloudbase
      //     .callFunction({
      //       // 云函数名称
      //       name: 'eye-tracking',
      //       // 传给云函数的参数
      //       data: {
      //       },
      //     })
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch(error)
    },

    showRecords() {
      this.showRecord = !this.showRecord
    },
  },
}
</script>

<style scoped></style>
