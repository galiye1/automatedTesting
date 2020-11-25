<template>
  <div id="testReport">
    <h1>测试报告</h1>
    <a-table :data-source="this.$store.state.testReport" :columns="columns" :pagination="false" :scroll="{ y: 616 | true }">
      <template slot="testResult" slot-scope="text, record">
        <button class="read" @click="readResultBtn(record)">查看</button>
      </template>
    </a-table>
    <a-modal title="测试结果" v-model="testResult" :destroyOnClose="true" :footer="null" @ok="ok">
      <a-table class="testResultTable" :data-source="this.$store.state.testResult" :columns="columnsResult"
               :pagination="false" :scroll="{ y: 268 | true }">
      </a-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'TestReport',
  data () {
    return {
      testResult: false,
      columns: [
        {
          title: '用例名',
          dataIndex: 'testExampleName'
        },
        {
          title: '系统',
          dataIndex: 'system'
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
          title: '结束时间',
          dataIndex: 'endTime'
        },
        {
          title: '测试结果',
          dataIndex: 'testResult',
          scopedSlots: { customRender: 'testResult' }
        }
      ],
      columnsResult: [
        {
          title: '步骤',
          dataIndex: 'progress'
        },
        {
          title: '截图',
          dataIndex: 'img'
        },
        {
          title: '信息',
          dataIndex: 'info'
        }
      ]
    }
  },
  methods: {
    readResultBtn (record) {
      this.testResult = true
    },
    ok () {
      this.testResult = false
    }
  }
}
</script>

<style lang="less" scoped>
  .read{
    border: none;
    background-color: white;
    color: #007bff;
  }
</style>
