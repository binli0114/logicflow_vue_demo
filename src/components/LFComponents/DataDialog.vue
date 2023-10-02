<template>
  <div>
    <button @click="downloadData">Download JSON</button>
    <vue-json-pretty :path="'res'" :data="graphData"> </vue-json-pretty>
  </div>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'

  export default {
    props: {
      graphData: Object
    },
    components: {
      VueJsonPretty
    },
    methods: {
      downloadData() {
        const blob = new Blob([JSON.stringify(this.graphData, null, 2)], {
          type: 'application/json'
        })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'graphData.json'
        link.click()
        URL.revokeObjectURL(link.href)
      }
    }
  }
</script>

<style scoped></style>
