<template>
  <div id="test">
    <a-layout>
      <a-layout-header>
        <h1 class="tableTitle">测试报告</h1>
      </a-layout-header>
      <a-layout class="middle">
        <a-layout-sider>
          <div class="exampleHeader">
            <div class="square"></div>
            <div :title="this.$store.state.projectName" class="testExampleTitle" @click="showAllExample">{{ this.$store.state.projectName }}</div>
            <img class="allPlay" ref="allPlayBtn" :src="allPlayImg" @click="runAllTest"/>
          </div>
          <div class="exampleList" v-for="(item, index) in receiveData.tests" :key="index">
            <div class="example">
              <div class="circle"></div>
              <div :title="item.name" class="exampleName" @click="showExample(item)">{{ item.name }}</div>
              <img class="playBtn" ref="playBtnRef" :src="playImg" @click="runTest($event, index)"/>
            </div>
          </div>
          <a-modal title="" v-model="envSet" :destroyOnClose="true" cancelText="静默测试" okText="非静默测试" @cancel="ok" @ok="cancel" :maskClosable="false">
            <div class="terminal">
              <div class="terminalTitle">播放测试终端：</div>
              <a-checkbox-group :options="terminalOptions" @change="terminalCheckbox">
              </a-checkbox-group>
            </div>
            <div class="browserSelect">
              <div class="terminalTitle">测试浏览器：</div>
              <a-checkbox-group :options="browserOptions" @change="browserCheckbox">
              </a-checkbox-group>
            </div>
          </a-modal>
        </a-layout-sider>
        <a-layout-content>
          <button class="uploadScript" @click="uploadScriptClick">导入脚本</button>
          <a-modal title="新建测试" v-model="addTest" :destroyOnClose="true" okText="确定" @ok="addTestBtn">
            <div class="scriptUploadTitle">
              <div class="scriptUpload">脚本</div>
              <a-upload class="upload" action="http://127.0.0.1:13500/project/upload/1" name="file"
                        :before-upload="beforeUpload">
                <button class="uploadBtn">上传<a-icon type="upload" /></button>
              </a-upload>
            </div>
          </a-modal>
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'Test',
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
          dataIndex: 'stratTime'
        },
        {
          title: '耗时(ms)',
          dataIndex: 'costTime'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      receiveData: {},
      playImg: require('../assets/img/stop.png'),
      allPlayImg: require('../assets/img/allStop.png'),
      allPlayBtn: true,
      envSet: false,
      addTest: false,
      testAllSet: {
        terminal: [],
        browser: []
      },
      exampleIndex: -1,
      terminalOptions: ['本机'],
      browserOptions: ['uos', '360', 'chrome', 'firefox'],
      testExampleCache: []
    }
  },
  methods: {
    runTest (event, index) {
      if (event.target.getAttribute('src') === require('../assets/img/stop.png')) {
        this.envSet = true
      }
      this.exampleIndex = index
    },
    runAllTest (event) {
      if (event.target.getAttribute('src') === require('../assets/img/allStop.png')) {
        this.envSet = true
      }
    },
    showExample (example) {
      const exampleList = []
      for (let i = 0; i < this.testExampleCache.length; i++) {
        if (this.testExampleCache[i].name === example.name) {
          exampleList.push(this.testExampleCache[i])
        }
      }
      this.$store.state.testExample = exampleList
    },
    showAllExample () {
      this.$store.state.testExample = this.testExampleCache
    },
    cancel () {
      this.envSet = false
      if (this.$store.state.browserConfig.length > 0) {
        if (this.exampleIndex === -1) {
          this.$store.state.scriptDataExample = []
          this.receiveData.tests.map((item, index) => {
            this.$store.state.scriptDataExample.push(item)
          })
        } else {
          this.$store.state.scriptDataExample = []
          this.$store.state.scriptDataExample.push(this.receiveData.tests[this.exampleIndex])
        }
        this.$router.push({ path: '/Process' })
      } else {
        alert('请配置浏览器')
        this.envSet = true
      }
    },
    ok () {
      this.envSet = false
      if (this.$store.state.browserConfig.length > 0) {
        if (this.exampleIndex === -1) {
          this.$store.state.scriptDataExample = []
          this.receiveData.tests.map((item, index) => {
            this.$store.state.scriptDataExample.push(item)
          })
        } else {
          this.$store.state.scriptDataExample = []
          this.$store.state.scriptDataExample.push(this.receiveData.tests[this.exampleIndex])
        }
      } else {
        alert('请配置浏览器')
        this.envSet = true
      }
    },
    uploadScriptClick () {
      this.addTest = true
    },
    addTestBtn () {
      this.addTest = false
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      const projectId = this.$store.state.projectId
      formData.append('file', this.file)
      xhr.open('post', 'http://http://192.168.102.99/:13500/project/upload/' + projectId)
      xhr.send(formData)
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.receiveData = JSON.parse(xhr.responseText)
          this.$store.state.scriptData = this.receiveData
        }
      }
    },
    beforeUpload (file) {
      this.file = file
      return false
    },
    terminalCheckbox (checkedList) {
      this.testAllSet.terminal = checkedList
    },
    browserCheckbox (checkedList) {
      this.testAllSet.browser = checkedList
      this.$store.state.browserConfig = this.testAllSet.browser
    }
  },
  mounted () {
    this.$axios.getDetail(this.$store.state.projectId).then((res) => {
      this.$store.state.testExample = []
      this.$store.state.projectName = res.data.name
      for (let i = 0; i < res.data.reports.length; i++) {
        const report = {
          model: '天玥TR1252',
          cpu: '飞腾FT-2000'
        }
        report.key = i
        report.id = res.data.reports[i].id
        report.name = res.data.reports[i].name
        report.os = res.data.reports[i].os
        report.browser = res.data.reports[i].browser
        report.startTime = res.data.reports[i].startTime
        report.costTime = res.data.reports[i].costTime
        report.steps = res.data.reports[i].steps
        report.total = res.data.reports[i].total
        report.success = res.data.reports[i].successes
        this.$store.state.testExample.push(report)
      }
      this.testExampleCache = JSON.parse(JSON.stringify(this.$store.state.testExample))
      this.receiveData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
  #components-layout-demo-basic {
    text-align: center;
  }
  .ant-layout-header{
    font-size: 2em;
    background-color: white;
    text-align: left;
  }
  .tableTitle{
    display: inline-block;
    margin-left: 45%;
    color: #383874;
    font-weight: bold;
  }
  .ant-layout-footer {
    line-height: 1.5;
  }
  .middle{
    background-color: #e7e4e4;
  }
  .ant-layout-sider {
    background-color: white;
    line-height: 40px;
    height: 880px;
    margin-top: 10px;
  }
  .testExampleList {
    height: 240px;
    overflow: auto;
    overflow-y: overlay;
  }
  .ant-layout-content {
    color: #fff;
    height: 900px;
    line-height: 60px;
    position: relative;
    margin-left: 20px;
  }
  .ant-layout {
    margin-bottom: 48px;
  }
  .ant-layout:last-child {
    margin: 0;
  }
  .script{
    display: inline-block;
    font-size: 2em;
    color: #383874;
    font-weight: bold;
  }
  .uploadScript{
    height: 40px;
    width: 100px;
    line-height: 40px;
    margin-left: 90%;
    margin-top: 15px;
    margin-bottom: 20px;
    border-radius: 5%;
    border: none;
    background-color: #383874;
  }
  .exampleHeader{
    height: 30px;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-top: 10px;
    margin-right: 15%;
    border-bottom: 1px solid #383874;
  }
  .square{
    height: 12px;
    width: 12px;
    background-color: #383874;
  }
  .testExampleTitle{
    width: 70%;
    margin-left: 5px;
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  .allPlay{
    height: 20px;
    width: 20px;
  }
  .example{
    height: auto;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-right: 15%;
    border-bottom: 1px dashed #383874;
  }
  .circle{
    height: 8px;
    width: 8px;
    background-color: #383874;
    border-radius: 50%;
  }
  .exampleName{
    width: 60%;
    margin-left: 5%;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .playBtn{
    margin-left: 5%;
    height: 15px;
    width: 15px;
  }
  /deep/ .ant-table-header {
    background-color: #383874;
  }
  /deep/ .ant-table-header .ant-table-thead th{
    color: white;
    background-color: #383874;
    text-align: center;
  }
  /deep/ .ant-table-tbody td{
    text-align: center;
  }
  .terminal{
    margin-left: 10%;
    margin-top: 10%;
    color: #383874;
  }
  .browserSelect{
    margin-left: 10%;
    margin-top: 10%;
    color: #383874;
  }
  .terminalTitle{
    display: inline-block;
    width: 100px;
  }
  .ant-checkbox-wrapper{
    color: #7778a3;
  }
  /deep/ .ant-modal-footer{
    display: flex;
    justify-content: center;
  }
  /deep/ .ant-modal-footer .ant-btn:first-child{
    background-color: #383874;
    color: white;
  }
  /deep/ .ant-modal-footer .ant-btn{
    background-color: #383874;
  }
  .testNameTitle{
    margin-left: 10%;
  }
  .scriptUploadTitle{
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: 30%;
  }
  .testName{
    width: 100px;
    text-align: center;
    display: inline-block;
    color: #383874;
  }
  .testNameInp{
    width: 250px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #383874;
    display: inline-block;
  }
  .scriptUpload{
    width: 100px;
    text-align: center;
    display: inline-block;
    color: #383874;
  }
  .uploadScript{
    width: 80px;
    display: inline-block;
  }
  .uploadBtn{
    border-radius: 10px;
    border-color: #383874;
    background-color: white;
    color: #383874;
  }
  /deep/ .upload .ant-upload-list-item-info{
    margin-left: 22%;
  }
  /deep/ .upload .ant-upload-list-item-card-actions{
    right: 50%;
  }
</style>
