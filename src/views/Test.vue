<template>
  <div id="test">
    <a-layout>
      <a-layout-header>Project:{{this.$store.state.projectName}}</a-layout-header>
      <a-layout>
        <a-layout-sider>
          <a-button class="scriptPutBtn">脚本上传</a-button><a-button class="allTestBtn">全部测试</a-button><br/>
          <a-button class="addBtn" @click="addTestExample">+</a-button><br/>
          <div class="testExampleList">
            <div v-for="(item, index) in testExampleCache" :key="index">
              <a-button class="testExample" @click="testExampleClick(index)">{{item.testExampleName}}</a-button>
            </div>
          </div>
          <a-button class="allSave">全部保存</a-button>
        </a-layout-sider>
        <a-layout-content>
          <a-button class="startTest" @click="startTest">开始测试</a-button>
          <a-input ref="urlInp" placeholder="请输入测试的url"/>
          <router-view />
          <a-button class="save">保存</a-button>
        </a-layout-content>
      </a-layout>
      <a-layout-footer>
        <router-link to="/TestReport">
          <a class="readTest">点击查看测试报告</a>
        </router-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      testExampleCache: []
    }
  },
  methods: {
    addTestExample () {
      const testExampleObj = {
        testExampleId: this.$store.state.testExampleId++,
        testExampleName: '用例' + this.$store.state.testExampleId,
        testExampleData: [
          {
            key: 0,
            command: 0,
            target: 0,
            value: 0
          },
          {
            key: 1,
            command: 0,
            target: 0,
            value: 0
          }
        ]
      }
      this.testExampleCache.push(testExampleObj)
      const str = '/test/testExample' + (this.testExampleCache.length - 1)
      this.$router.push({ path: str, query: { index: this.testExampleCache.length - 1 } })
    },
    testExampleClick (index) {
      this.$router.push({ path: `/test/testExample${index}`, query: { index } })
    },
    startTest () {
      if (this.$refs.urlInp.stateValue === '') {
        alert('请输入测试的url')
      } else {
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #components-layout-demo-basic {
    text-align: center;
  }
  .ant-layout-header, .ant-layout-footer {
    font-size: 2em;
    background: #7dbcea;
  }
  .ant-layout-footer {
    line-height: 1.5;
  }
  .ant-layout-sider {
    background-color: #3ba0e9;
    line-height: 60px;
    height: auto;
  }
  .testExampleList {
    height: 240px;
    overflow: auto;
    overflow-y: overlay;
  }
  .ant-layout-content {
    background-color: rgba(16, 142, 233, 1);
    color: #fff;
    height: auto;
    line-height: 60px;
    position: relative;
  }
  .ant-layout {
    margin-bottom: 48px;
  }
  .ant-layout:last-child {
    margin: 0;
  }
  .ant-input {
    margin-left: 10px;
    width: 95%;
  }
  #testExampleTable {
    margin-left: 37px;
    width: 95%;
  }
  .save{
    position: absolute;
    bottom: 10px;
    right: 10px;
    margin-right: 3%;
    float: right;
  }
  .readTest{
    color: white !important;
  }
  .readTest:hover{
    color: #3ba0e9 !important;
  }
</style>
