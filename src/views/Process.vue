<template>
  <div class="process">
    <div class="process-left">
      <div class="left-tabel">
        <ul :class="{'single':(pndex%2)==0}" v-for="(item , pndex) in tabelData " :key="pndex">
        <li class="name" @click="detailChose(pndex)">{{item.name}}</li>
        <li class="success" @click="detailChose(pndex)" v-show="item.test=='测试完成'"><img src="../assets/img/success.png" alt=""> 测试完成</li>
        <li class="ing" @click="detailChose(pndex)" v-show="item.test=='测试中'"><img src="../assets/img/ing.png" alt=""></li>
        <li class="wait" @click="detailChose(pndex)" v-show="item.test=='未测试'"><img src="../assets/img/wait.png" alt=""> 未测试</li>
      </ul>
      </div>
    </div>
    <div class="process-right">
      <div class="right-header">
        <div>操作系统：{{ detail.os }}</div>
        <div>浏览器：{{ detail['browser'] }}</div>
        <div>测试用例:{{detail['name']}}</div>
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
  data () {
    return {
      step: 0,
      header: false,
      startTime: '',
      tabelData: [],
      websock: null,
      useTime: '',
      detail: {
        total: 0,
        steps: [
        ]
      },
      testData: [],
      stepsDetail: []
    }
  },
  mounted () {
    this.testData = []
    this.$store.state.browserConfig.forEach((item) => {
      this.$store.state.scriptDataExample.forEach((item2) => {
        const data = {}
        const tabel = {}
        data.browser = item
        data.headless = this.$store.state.headless
        data.testCase = JSON.parse(JSON.stringify(item2))
        tabel.name = data.testCase.name
        tabel.test = '未测试'

        //生成测试数据
        this.testData.push(data)
        //生成渲染数据
        this.tabelData.push(tabel)
      })
    })
    this.initWebSocket()
  },
  methods: {
    initWebSocket () {
      // 初始化weosocket
      const wsuri = 'ws://127.0.0.1:13500/socket/1'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () {
      // 连接建立之后执行send方法发送数据
      const actions = { test: '12345' }
      const date = new Date()
      this.startTime = date.toLocaleTimeString()
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror () {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) {
      // 数据接收
      console.log(JSON.parse(e.data))

      if (JSON.parse(e.data).message == '连接成功') {
        this.sendData(this.step)
      } else if (JSON.parse(e.data).endTime > 0) {
        this.stepsDetail.push(JSON.parse(e.data))
        this.useTime = JSON.parse(e.data).costTime
        setTimeout(() => {
          this.step = this.step + 1
          if (this.step < this.testData.length) {
            this.sendData(this.step)
          } else {
            this.tabelData[this.step - 1].test = '测试完成'
          }
        }, 2000)
      }else {
        this.detail = JSON.parse(e.data)
      }
    },
    detailChose(index){
      this.detail = this.stepsDetail[index]
      this.useTime = this.stepsDetail[index]['costTime']
    },
    sendData (index) {
      this.detail.steps = []
      if (index == 0) {
        this.tabelData[0].test = '测试中'
      } else {
        this.tabelData[index - 1].test = '测试完成'
        if(this.tabelData[index]){
          this.tabelData[index].test = '测试中'
        }
      }
      this.$axios.proExecute(this.testData[index]).then(
        (res) => {},
        (reject) => {}
      )
    },
    websocketsend (Data) {
      // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) {
      // 关闭
      console.log('断开连接', e)
    }
  },

  destroyed () {
    if (this.websock) {
      this.websock.close() // 离开路由之后断开websocket连接
    }
  }
}
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

.process {
  display: flex;
  justify-content: space-around;
  margin-top: 35px;
}
.process-left {
  position: relative;
  width: 224px;
  .left-tabel{
    height: 100%;
    overflow-y:scroll;
    width: 100%;
  }
  .single{
    background-color: #fff;
  }
  ul{
    height: 54px;
    padding:0;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
    li{
      cursor: pointer;
      width: 50%;
      list-style: none;
      text-align: center;
    }
    .success{
      color:#15b769
    }
    .wait{
      color: #bbbbbb;
    }
  }
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
    color: #1f7d24;
    .font-content {
      margin: 20px;
      text-align: start;
      font-size: 25px;
      letter-spacing: 1px;
      span{
        margin-right: 10px;
      }
    }
    overflow-y: scroll;
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
