<template>
  <div class="float-group">
    <v-badge color="warning" :content="upload" :value="upload" bordered overlap>
      <v-btn fab large color="primary" @click="upload"
        ><v-icon>mdi-cloud-upload</v-icon></v-btn
      >
    </v-badge>
    <v-badge
      color="warning"
      :content="download"
      :value="download"
      bordered
      overlap
    >
      <v-btn fab large color="primary" @click="download"
        ><v-icon>mdi-cloud-download</v-icon></v-btn
      >
    </v-badge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upload: 0,
      download: 0,
    }
  },

  mounted() {
    this.eventBus.$on('newRecord', () => {
      this.upload++
    })

    if ('records' in localStorage) {
      let records = JSON.parse(localStorage.getItem('records'))
      records.forEach((value, index, array) => {
        if (!value.sync) {
          this.upload++
        }
      })
    }
  },
}
</script>

<style scoped>
.float-group {
  position: fixed;
  bottom: 80px;
  right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  z-index: 999;
}
</style>
