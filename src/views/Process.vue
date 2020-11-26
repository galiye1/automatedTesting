<template>
  <div class="process">
    <div class="process-left">
      <el-table :data="tableData" stripe style="width: 100%" :show-header="header" >
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
          <div>
              测试环境：本机
          </div>
          <div>
              浏览器：360
          </div>
          <div>
              测试用例：123
          </div>
      </div>
      <div class="right-content"></div>
      <div class="right-bottom">
          <div class="bottom-font">
              进度：300/900
          </div>
          <div class="bottom-font">
              开始时间：2020-1201-20
          </div>
          <div class="bottom-font">
              耗时：200min
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        header:false,
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
    };
  },
};
</script>
<style scope="scope" lang="less">
.process{
    display: flex;
    justify-content:space-around;
    margin-top: 35px;
}
.process-left{
    width: 224px;
}
.process-right{
    color: #383874;
    font-weight: bolder;
    font-size: 20px;
    width: 1540px;
    height: 933px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right-header{
        display: flex;
        justify-content: space-between;
    }
    .right-content{
        height: 825px;
        width: 100%;
        background-color: #2a2a30;
    }
    .right-bottom{
        display: flex;
        justify-content: flex-end;
        .bottom-font{
            margin-left: 120px;
            color: #7778a3;
        }
    }
}
</style>