<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="To">
        <el-input v-model="form.emailTo"></el-input>
      </el-form-item>
      <el-form-item label="CC">
        <el-input v-model="form.emailCC"></el-input>
      </el-form-item>

      <el-form-item label="Email Body">
        <el-input type="textarea" v-model="form.body"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      nodeData: Object,
      lf: Object || String
    },
    mounted() {
      const { properties } = this.$props.nodeData
      if (properties) {
        this.$data.form = Object.assign({}, this.$data.form, properties)
      }
    },
    data() {
      return {
        form: {
          emailTo: '',
          emailCC: '',
          body: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        // const { id } = this.$props.nodeData
        // this.$props.lf.setProperties(id, this.$data.form);
        const nodeData = this.$props.nodeData
        nodeData.properties = this.$data.form
        this.$props.lf.setProperties(nodeData.id, this.$data.form)
        this.$emit('onClose')
      }
    }
  }
</script>
<style scoped></style>
