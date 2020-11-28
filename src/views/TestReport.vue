<template>
  <div id="testReport">
    <router-link to="/Test">
      <div class="return">
        <img src="../assets/img/return.png" />
        <span>返回</span>
      </div>
    </router-link>
    <div class="content">
      <h1>测试结果</h1>
      <span class="icon"></span><span>基础信息</span>
      <div>
        <div class="firstLine">
          <span>机型：xxx</span><span>机型：xxx</span><span>机型：xxx</span><span>机型：xxx</span>
        </div>
        <div class="secondLine">
          <span>机型：xxx</span><span>机型：xxx</span><span>机型：xxx</span><span>机型：xxx</span>
        </div>
      </div>
      <a-table :data-source="this.$store.state.testReport" :columns="columns" :pagination="false" :scroll="{ y: 616 | true }">
        <template slot="testResult" slot-scope="text, record">
          <button class="read" @click="readResultBtn(record)">查看</button>
        </template>
      </a-table>
    </div>
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
  .return{
    text-align: left;
    margin-left: 3%;
  }
</style>
