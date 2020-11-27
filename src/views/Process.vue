<template>
  <div class="process">
    <div class="process-left">
      <div class="back" @click.stop="back"><img src="../assets/img/back.png" alt=""> 返回</div>
      <el-table
        :data="tabelData"
        stripe
        style="width: 100%"
        :show-header="header"
      >
        <el-table-column prop="name" label="项目ID" class="name2"> </el-table-column>
        <el-table-column prop="test" label="项目ID" class="test2"> </el-table-column>
      </el-table>
    </div>
    <div class="process-right">
      <div class="right-header">
        <div>操作系统：{{ detail.os }}</div>
        <div>浏览器：{{ testData[step]['browser'] }}</div>
        <div>测试用例:{{tabelData[step]['name']}}</div>
      </div>
      <div class="right-content">
        <div
          v-for="(item, index) in detail.steps"
          :key="index"
          class="font-content"
        >
          <span> 操作内容:{{item.content}}</span>
          <span> 花费时间:{{item.costTime}}</span>
          <span> 返回结果:{{item.message}}</span>
          <span> 截图地址:{{item.screenShot}}</span>
          <span > 测试结果:{{item.success}}</span>
          <!-- <span v-show="!item.success" style="color:red"> 测试结果:{{item.success}}</span> -->
        </div>
      </div>
      <div class="right-bottom">
        <div class="bottom-font">
          进度：{{ detail["steps"].length }}/{{ detail.total }}
        </div>
        <div class="bottom-font">开始时间：{{ startTime }}</div>
        <div class="bottom-font">耗时：{{ useTime }}毫秒</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 0,
      header: false,
      startTime: "",
      tabelData:[],
      websock: null,
      useTime: "",
      detail: {
        total: 0,
        steps: [],
      },
      testData: [],
    };
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://192.168.102.99:13500/socket/1";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      let date = new Date();
      this.startTime = date.toLocaleDateString();
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    ceshi(data){
      console.log(data)
    },
    websocketonmessage(e) {
      //数据接收
      console.log(JSON.parse(e.data));
      this.detail = JSON.parse(e.data);
      this.useTime = new Date().getTime() - this.detail.startTime;
      if(JSON.parse(e.data)['message']=='连接成功'){
        this.sendData(this.step)
      }else{
        this.detail.steps.forEach(item=>{
          item.content
        })
      }
      if (JSON.parse(e.data).costTime>0) {
        setTimeout(() => {
          this.step = this.step+1
          if(this.step<this.testData.length){
            this.sendData(this.step)
          }else{
            this.tabelData[this.step-1]['test']='测试完成'
          }
        }, 2000);
      }
    },
    sendData(index) {
      this.detail.steps = []
      if(index == 0){
        this.tabelData[0].test = '测试中'
      }else{
        this.tabelData[index-1].test = '测试完成'
        this.tabelData[index].test = '测试中'
      }
      console.log(this.testData[index])
      this.$axios.proExecute(this.testData[index]).then(
        (res) => {},
        (reject) => {}
      );
    },
    back(){
      this.$router.push("/Test")
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
  mounted() {
    let test = this.$store.state.scriptData.tests;
    this.testData = [];
    this.$store.state.browserConfig.forEach((item) => {
      this.$store.state.scriptData.tests.forEach((item2) => {
        let data = {};
        let tabel = {}
        data.browser = item;
        data.testCase = JSON.parse(JSON.stringify(item2)) ;
        tabel.name = data.testCase.name
        tabel.test = "未测试"
        this.testData.push(data);
        this.tabelData.push(tabel)
      });
    });
    // this.initWebSocket()
  },
  destroyed() {
    if (this.websock) {
      this.websock.close(); //离开路由之后断开websocket连接
    }
  },
};
</script>
<style scope="scope" lang="less">
.process-left /deep/ .el-table .el-table__body .el-table__row td{
  font-size: 20px;
  letter-spacing: 1px;
  overflow: hidden;
  word-wrap: nowrap;
  :first-child{
    color:#383874;
    font-weight: bolder;
  }
}
.process-left{
  position: relative;
}
.back{
  position: absolute;
  font-size: 25px;
  font-weight: bolder;
  letter-spacing: 1px;
  bottom: 45px;
  left: 25px;
  z-index: 1000;
  cursor: pointer;
  img{
    padding-bottom: 5px;
  }
}
  
.process {
  display: flex;
  justify-content: space-around;
  margin-top: 35px;
}
.process-left {
  width: 224px;
}
.process-right {
  color: #383874;
  font-weight: bolder;
  font-size: 20px;
  width: 1540px;
  height: 933px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .right-header {
    display: flex;
    justify-content: space-between;
  }
  .right-content {
    height: 825px;
    width: 100%;
    background-color: #2a2a30;
    color: #1b4f1e;
    .font-content {
      margin: 20px;
      text-align: start;
      font-size: 25px;
      letter-spacing: 1px;
      span{
        margin-right: 10px;
      }
    }
    overflow: scroll;
  }
  .right-bottom {
    display: flex;
    justify-content: flex-end;
    .bottom-font {
      margin-left: 120px;
      color: #7778a3;
    }
  }
}
</style>