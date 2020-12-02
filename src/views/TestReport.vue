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
          <a-button v-if="record.screenShot !== null" @click="imgShowBtn(record)">查看</a-button>
        </template>
      </a-table>
      <a-modal v-model="imgModal" :footer="null" :centered="true" :width="1500">
        <img :src="record.screenShot"/>
      </a-modal>
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
      cpu: '',
      imgModal: false,
      record: {}
    }
  },
  methods: {
    imgShowBtn (record) {
      this.record = record
      this.imgModal = true
    }
  },
  created () {
    this.$store.state.testExample.map((item, index) => {
      if (item.id == this.$route.query.exampleId) {
        for (let i = 0; i < item.steps.length; i++) {
          if (item.steps[i].screenShot !== null) {
            item.steps[i].screenShot = 'http://192.168.102.99:13500' + item.steps[i].screenShot + '.jpg'
          } else {
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
@import "../assets/css/testReport";
</style>
