<template>
  <div id="testExampleTable">
<!--    [this.$route.query.index]-->
    <a-table :data-source="this.$store.state.testExample" :columns="columns" :pagination="false" :scroll="{ y: 300 | true}">
      <template slot="operation" slot-scope="text, record">
        <a-button class="readBtn" @click="readTestResult(record.id)">查看</a-button>
        <a-button class="deleteBtn" @click="deleteExampleData(record.key, record.id)">删除</a-button>
      </template>
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
          title: '用例名',
          dataIndex: 'name'
        },
        {
          title: '机型',
          dataIndex: 'model'
        },
        {
          title: 'cpu',
          dataIndex: 'cpu'
        },
        {
          title: '系统',
          dataIndex: 'os'
        },
        {
          title: '浏览器',
          dataIndex: 'browser'
        },
        {
          title: '开始时间',
          dataIndex: 'startTime'
        },
        {
          title: '耗时',
          dataIndex: 'costTime'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  methods: {
    deleteExampleData (key, exampleId) {
      this.$store.state.testExample.splice(key, 1)
      this.$axios.deleteExample(exampleId)
    },
    readTestResult (exampleId) {
      this.$router.push({ path: '/testReport', query: { exampleId } })
    }
  }
}
</script>

<style lang="less" scoped>
  .readBtn{
    color: #383874;
    background-color: white;
    border: none;
  }
  .deleteBtn{
    color: red;
    background-color: white;
    border: none;
  }
</style>
