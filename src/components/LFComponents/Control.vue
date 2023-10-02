<template>
  <div>
     <el-button-group>
      <el-button type="plain" size="small" @click="$_zoomIn">Zoom In</el-button>
      <el-button type="plain" size="small" @click="$_zoomOut">Zoom Out</el-button>
      <el-button type="plain" size="small" @click="$_zoomReset">Zoom Reset</el-button>
      <el-button type="plain" size="small" @click="$_translateRest">Reset Position</el-button>
      <el-button type="plain" size="small" @click="$_reset">Reset Size&Position</el-button>
      <el-button type="plain" size="small" @click="$_undo" :disabled="undoDisable">Prev (ctrl+z)</el-button>
      <el-button type="plain" size="small" @click="$_redo" :disabled="redoDisable">Next (ctrl+y)</el-button>
       <input type="file" ref="fileInput" accept=".json" @change="$_emitFile" style="display: none" />
      <el-button type="plain" size="small" @click="$_triggerFileUpload">Upload</el-button>
      <el-button type="plain" size="small" @click="$_download">Download</el-button>
      <el-button type="plain" size="small" @click="$_catData">Data</el-button>
      <el-button v-if="catTurboData" type="plain" size="small" @click="$_catTurboData">Turbo Data</el-button>
      <el-button type="plain" size="small" @click="$_showMiniMap">Mini Map</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean
  },
  data () {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    }
  },
  mounted () {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble
      this.$data.redoDisable = !redoAble
    });
  },
  methods: {
    $_zoomIn(){
      this.$props.lf.zoom(true);
    },
    $_zoomOut(){
      this.$props.lf.zoom(false);
    },
    $_zoomReset(){
      this.$props.lf.resetZoom();
    },
    $_translateRest(){
      this.$props.lf.resetTranslate();
    },
    $_reset(){
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo(){
      this.$props.lf.undo();
    },
    $_redo(){
      this.$props.lf.redo();
    },
    $_download(){
      this.$props.lf.getSnapshot();
    },
    $_triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    $_emitFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.$emit('file-selected', file);
      }
    },
    $_catData(){
      this.$emit('catData');
    },
    $_catTurboData(){
      this.$emit('catTurboData');
    },
    $_showMiniMap() {
      const { lf } = this.$props;
      lf.extension.miniMap.show(lf.graphModel.width - 150, 40)
    }
  }
}
</script>
<style scoped>
</style>
