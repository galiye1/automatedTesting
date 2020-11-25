<template>
  <div id="testExampleTable">
    <a-table :data-source="this.$store.state.testExample[this.$route.query.index].testExampleData" :columns="columns" :pagination="false" :scroll="{ y: 160 | true }">
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'TestExampleTable',
  data () {
    return {
      columns: [
        {
          title: '指令',
          dataIndex: 'command'
        },
        {
          title: '目标',
          dataIndex: 'target'
        },
        {
          title: '值',
          dataIndex: 'value'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
