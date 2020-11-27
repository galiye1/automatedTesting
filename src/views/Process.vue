<template>
  <div class="process">
    <div class="process-left">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :show-header="header"
      >
        <el-table-column
          ><template slot-scope="scope">
            <div>1</div>
          </template>
        </el-table-column>
        <el-table-column
          ><template slot-scope="scope">
            <div>已测试</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="process-right">
      <div class="right-header">
        <div>操作系统：{{ detail.os }}</div>
        <div>浏览器：{{ detail.browser }}</div>
        <div>测试用例：123</div>
      </div>
      <div class="right-content">
        <div
          v-for="(item, index) in detail.steps"
          :key="index"
          class="font-content"
        >
          {{ JSON.stringify(item) }}
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
      header: false,
      startTime: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      websock: null,
      useTime: "",
      detail: {
        total: 0,
        steps: [],
      },
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

      this.$axios.getDetail(1).then(
        (res) => {
          let test = {
            browser: "chrome",
          };
          test.testCase = res.data.tests[0];
          console.log(test);
          this.$axios.proExecute(test).then(
            (res) => {},
            (reject) => {}
          );
        },
        (reject) => {}
      );
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
    websocketonmessage(e) {
      //数据接收
      console.log(JSON.parse(e.data));
      this.detail = JSON.parse(e.data);
      this.useTime = new Date().getTime() - this.detail.startTime;

      if (this.detail.costTime) {
        setTimeout(() => {
          this.$axios.getDetail(1).then(
            (res) => {
              let test = {
                browser: "chrome",
              };
              test.testCase = res.data.tests[1];
              this.$axios.proExecute(test).then(
                (res) => {},
                (reject) => {}
              );
            },
            (reject) => {}
          );
        }, 2000);
      }
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
  created() {
    this.initWebSocket();
  },
  destroyed() {
    if (this.websock) {
      this.websock.close(); //离开路由之后断开websocket连接
    }
  },
};
</script>
<style scope="scope" lang="less">
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