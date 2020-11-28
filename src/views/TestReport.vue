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
      <div class="infoTitle">
        <div class="icon"></div>
        <div class="baseInfo">基础信息</div>
      </div>
      <div class="mainLine">
        <div class="firstLine">
          <span class="detailInfo">用例名：{{name}}</span><span class="detailInfo">系统：{{os}}</span><span class="detailInfo">浏览器：{{browser}}</span><span class="detailInfo">开始时间：{{startTime}}</span>
        </div>
        <div class="secondLine">
          <span class="detailInfo">耗时：{{costTime}}</span>
        </div>
      </div>
      <a-table :data-source="testResult" :columns="columns" :pagination="false" :scroll="{ y: 600 | true }">
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestReport',
  data () {
    return {
      columns: [
        {
          title: '地址',
          dataIndex: 'content'
        },
        {
          title: '截图',
          dataIndex: 'screenShot'
        },
        {
          title: '耗时(ms)',
          dataIndex: 'costTime'
        },
        {
          title: '是否成功',
          dataIndex: 'success'
        },
        {
          title: '信息',
          dataIndex: 'message'
        }
      ],
      testResult: [],
      name: '',
      os: '',
      browser: '',
      startTime: '',
      costTime: ''
    }
  },
  methods: {
  },
  created () {
    this.$store.state.testExample.map((item, index) => {
      if (item.id == this.$route.query.exampleId) {
        for (let i = 0; i < item.steps.length; i++) {
          if (item.steps[i].success == true) {
            item.steps[i].success = '是'
          } else {
            item.steps[i].success = '否'
          }
        }
        this.testResult = item.steps
        this.name = item.name
        this.os = item.os
        this.browser = item.browser
        this.startTime = item.startTime
        this.costTime = item.costTime
      }
    })
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  .return{
    text-align: left;
    margin-left: 3%;
    color: #383874;
    font-size: 1.5em;
    font-weight: bold;
  }
  .content{
    height: 100%;
    width: 80%;
    margin-top: 20px;
    margin-left: 10%;
    text-align: left;
  }
  h1{
    color: #383874;
    font-weight: bold;
  }
  .infoTitle{
    margin-top: 10px;
  }
  .icon{
    display: inline-block;
    height: 10px;
    width: 5px;
    background-color: #383874;
  }
  .baseInfo{
    margin-left: 5px;
    color: #383874;
    display: inline-block;
  }
  .mainLine{
    margin-top: 10px;
    color: #383874;
  }
  .secondLine{
    margin-top: 10px;
  }
  .detailInfo{
    width: 200px;
    margin-right: 100px;
  }
  .ant-table-wrapper{
    margin-top: 20px;
  }
  /deep/ .ant-table-header{
    background-color: #383874;
  }
  /deep/ .ant-table-wrapper .ant-table-thead th{
    text-align: center;
    background-color: #383874;
    color: white;
  }
  /deep/ .ant-table-wrapper td{
    text-align: center;
  }
</style>
