<template>
  <div id="testExampleTable">
    <a-table :data-source="this.$store.state.testExample" :columns="columns" :pagination="false" :scroll="{ y: 752 | true}"
    :row-selection="rowSelection">
      <template slot="operation" slot-scope="text, record">
        <a class="readBtn" @click="readTestResult(record.id)">查看</a>
        <a class="deleteBtn" @click="deleteExampleData(record.key, record.id)">删除</a>
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
          title: '总步骤数',
          dataIndex: 'total'
        },
        {
          title: '已完成数',
          dataIndex: 'success'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      idList: []
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRows)
          this.idList = []
          for (let i = 0; i < selectedRows.length; i++) {
            this.idList.push(selectedRows[i].id)
          }
          this.$store.state.exampleIdList = this.idList
        }
      }
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
    &:hover {
      color: deepskyblue;
    }
    margin-right: 10%;
    color: #383874;
    background-color: white;
    border: none;
  }
  .deleteBtn{
    color: red;
    border: none;
  }
</style>
