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
          <a-modal title="" v-model="envSet" :maskClosable="false" cancelText="取消" okText="确定" @cancel="resetForm" @ok="() => {
            if (onSubmitForm()) {
              ok()
            }
          }">
            <a-form-model ref="ruleForm" :model="form" :rules="rules">
              <a-form-model-item label="播放测试终端：" prop="terminalType">
                  <a-checkbox-group v-model="form.terminalType">
                    <a-checkbox value="本机">本机</a-checkbox>
                  </a-checkbox-group>
              </a-form-model-item>
              <a-form-model-item label="测试浏览器：" prop="browserType">
                  <a-checkbox-group v-model="form.browserType">
                    <a-checkbox value="uos">uos</a-checkbox>
                    <a-checkbox value="360">360</a-checkbox>
                    <a-checkbox value="chrome">chrome</a-checkbox>
                    <a-checkbox value="firefox">firefox</a-checkbox>
                  </a-checkbox-group>
              </a-form-model-item>
<!--              <div class="cookieList">-->
<!--                <div v-for="(item, index) in cookieList" :key="index">-->
<!--                  <a-form-model-item class="cookieKey" label="cookieKey:" :prop="'cookieKey'+index">-->
<!--                    <a-input class="cookieInp" v-model="form.cookieKey[index]"/>-->
<!--                  </a-form-model-item>-->
<!--                  <a-form-model-item class="cookieValue" label="cookieValue:" :prop="'cookieValue'+index">-->
<!--                    <a-input class="cookieInp" v-model="form.cookieValue[index]"/>-->
<!--                  </a-form-model-item>-->
<!--                  <a-form-model-item class="cookieAdd" v-if="item">-->
<!--                    <a-icon type="plus-square" :style="{fontSize: '20px'}" @click="cookieAdd(index + 1)"/>-->
<!--                  </a-form-model-item>-->
<!--                </div>-->
<!--              </div>-->
              <a-form-model-item label="是否静默测试" prop="headlessType">
                <a-radio-group v-model="form.headlessType">
                  <a-radio value="false">非静默测试</a-radio>
                  <a-radio value="true">静默测试</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-form-model>
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
      testExampleCache: [],
      file: '',
      cookie: [{ cookieKey: '', cookieValue: '' }],
      form: {
        terminalType: ['本机'],
        browserType: [],
        cookieKey: [],
        cookieValue: [],
        headlessType: 'false'
      },
      rules: {
        terminalType: [{ type: 'array', required: true, message: '请配置终端', trigger: 'change' }],
        browserType: [{ type: 'array', required: true, message: '请配置浏览器', trigger: 'change' }],
        cookieKey0: [{ required: false, message: '请输入key', trigger: 'blur' }],
        cookieValue0: [{ required: false, message: '请输入Value', trigger: 'blur' }],
        headlessType: [{ required: true, message: '请配置是否需要静默测试', trigger: 'change' }]
      },
      cookieList: [true]
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
        if (this.receiveData.tests.length > 0) this.envSet = true
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
    onSubmitForm () {
      let flag = false
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      })
      return flag
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    ok () {
      if (this.exampleIndex === -1) {
        this.$store.state.scriptDataExample = []
        this.receiveData.tests.map((item, index) => {
          this.$store.state.scriptDataExample.push(item)
        })
      } else {
        this.$store.state.scriptDataExample = []
        this.$store.state.scriptDataExample.push(this.receiveData.tests[this.exampleIndex])
      }
      this.testAllSet.browser = this.form.browserType
      this.$store.state.browserConfig = this.testAllSet.browser
      this.$store.state.headless = this.form.headlessType == 'true'
      for (let i = 0; i < this.cookie.length; i++) {
        if (!this.form.cookieKey[i] && this.form.cookieValue[i]) {
          this.rules['cookieKey' + i][0].required = true
          this.onSubmitForm()
          this.rules['cookieKey' + i][0].required = false
          return
        }
      }
      for (let i = 0; i < this.cookie.length; i++) {
        if (this.form.cookieKey[i]) {
          this.cookie[i].cookieKey = this.form.cookieKey[i]
        }
        if (this.form.cookieValue[i]) {
          this.cookie[i].cookieValue = this.form.cookieValue[i]
        }
      }
      console.log(this.cookie)
      this.$store.state.cookie = this.cookie
      this.envSet = false
      this.$router.push({ path: '/Process' })
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
    dataCountClick () {
      if (this.$store.state.exampleIdList.length > 0) {
        this.$router.push({ path: '/dataCount' })
      } else {
        alert('请选择用例')
      }
    },
    cookieAdd (index) {
      this.cookieList[this.cookieList.length - 1] = false
      this.cookieList.push(true)
      this.cookie.push({ cookieKey: '', cookieValue: '' })
      this.rules['cookieKey' + index] = [{ required: false, message: '请输入key', trigger: 'blur' }]
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
