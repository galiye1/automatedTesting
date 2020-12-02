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
          <a-modal title="" v-model="envSet" :destroyOnClose="true" :maskClosable="false" :footer="null">
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
            <div class="modalFooter">
              <a-button class="notStatic" @click="cancel">非静默测试</a-button>
              <a-button class="static" @click="ok">静默测试</a-button>
            </div>
          </a-modal>
        </a-layout-sider>
        <a-layout-content>
          <button class="uploadScript" @click="uploadScriptClick">导入脚本</button>
          <a-modal title="新建测试" v-model="addTest" :destroyOnClose="true" cancelText="取消" okText="确定" @ok="addTestBtn">
            <div class="scriptUploadTitle">
              <div class="scriptUpload">脚本</div>
              <a-upload class="upload" action="http://127.0.0.1:13500/project/upload/1" name="file"
                        :before-upload="beforeUpload">
                <button class="uploadBtn">上传<a-icon type="upload" /></button>
              </a-upload>
            </div>
          </a-modal>
          <router-view/>
          <a-button class="dataCountBtn" @click="dataCountClick">数据统计</a-button>
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
      testExampleCache: [],
      chromchose:[],
      file: ''
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
      if (this.chromchose.length > 0) {
        if (this.exampleIndex === -1) {
          this.$store.state.scriptDataExample = []
          this.receiveData.tests.map((item, index) => {
            this.$store.state.scriptDataExample.push(item)
          })
        } else {
          this.$store.state.scriptDataExample = []
          this.$store.state.scriptDataExample.push(this.receiveData.tests[this.exampleIndex])
        }
        this.$store.state.headless = false
        this.$router.push({ path: '/Process' })
      } else {
        alert('请配置浏览器')
        this.envSet = true
      }
    },
    ok () {
      this.envSet = false
      if (this.chromchose.length > 0) {
        if (this.exampleIndex === -1) {
          this.$store.state.scriptDataExample = []
          this.receiveData.tests.map((item, index) => {
            this.$store.state.scriptDataExample.push(item)
          })
        } else {
          this.$store.state.scriptDataExample = []
          this.$store.state.scriptDataExample.push(this.receiveData.tests[this.exampleIndex])
        }
        this.$store.state.headless = true
        this.$router.push({ path: '/Process' })
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
      xhr.open('post', 'http://192.168.102.99:13500/project/upload/' + projectId)
      xhr.send(formData)
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.receiveData = JSON.parse(xhr.responseText)
          this.$store.state.scriptData = this.receiveData
        }
      }
      location.reload()
    },
    beforeUpload (file) {
      this.file = file
      return false
    },
    terminalCheckbox (checkedList) {
      this.testAllSet.terminal = checkedList
    },
    browserCheckbox (checkedList) {
      this.chromchose = checkedList
      this.testAllSet.browser = this.chromchose
      this.$store.state.browserConfig = this.testAllSet.browser
    },
    dataCountClick () {
      this.$router.push({ path: '/dataCount' })
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
@import "../assets/css/test";
</style>
