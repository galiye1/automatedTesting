<template>
  <div id="testReport">
    <router-link to="/Test">
      <div class="return">
        <img src="../assets/img/back.png" />
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
          <span :title="name" class="detailInfo">用例名：{{name}}</span>
          <span :title="model" class="detailInfo">机型：{{model}}</span>
          <span :title="cpu" class="detailInfo">cpu：{{cpu}}</span>
          <span :title="os" class="detailInfo">系统：{{os}}</span>
        </div>
        <div class="secondLine">
          <span :title="browser" class="detailInfo">浏览器：{{browser}}</span>
          <span :title="startTime" class="detailInfo">开始时间：{{startTime}}</span>
          <span :title="costTime" class="detailInfo">耗时：{{parseInt(costTime/1000/60)}}分{{parseInt(costTime/1000)}}秒</span>
        </div>
      </div>
      <a-table :data-source="testResult" :columns="columns" :pagination="false" :scroll="{ y: 600 | true }">
        <template slot="screenShot" slot-scope="text, record">
          <img :src="record.screenShot" v-if="!record.screenShot.length === 0"/>
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
      columns: [
        {
          title: '步骤',
          dataIndex: 'content'
        },
        {
          title: '截图',
          dataIndex: 'screenShot',
          scopedSlots: { customRender: 'screenShot' }
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
      costTime: '',
      model: '',
      cpu: ''
    }
  },
  methods: {
  },
  created () {
    this.$store.state.testExample.map((item, index) => {
      if (item.id == this.$route.query.exampleId) {
        for (let i = 0; i < item.steps.length; i++) {
          if (item.steps[i].screenShot !== null) {
            item.steps[i].screenShot = 'http://127.0.0.1:13500' + item.steps[i].screenShot + '.jpg'
          } else {
            item.steps[i].screenShot = ''
          }
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
        this.model = item.model
        this.cpu = item.cpu
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
