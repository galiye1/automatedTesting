<template>
  <div class="table">
    <div class="input">
      <el-button @click="create">新增项目</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="项目ID"> </el-table-column>
      <el-table-column prop="name" label="项目名称"> </el-table-column>
      <el-table-column label="操作"
        ><template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-link
          >
          <el-link type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新建项目"
      :visible.sync="dialogVisible"
      width="30%"
      top="0vh"
    >
      <el-input v-model="name" placeholder="请输入项目名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      name: "",
    };
  },
  methods: {
    init() {
      this.$axios.getProject().then(
        (res) => {
          this.tableData = [];
          this.tableData = res.data;
        },
        (reject) => {}
      );
    },
    handleEdit(index, row) {
      console.log(row.id)
      this.$store.commit('setId',row.id)
      this.$router.push("/Test");
      console.log(this.$store.state.projectId)
    },
    handleDelete(index, row) {
      console.log(row.id);
      this.$axios.delProject(row.id).then(
        (res) => {
          this.init();
          Message({
            message: "删除成功",
            type: "success",
            duration: 1 * 1000,
          });
        },
        (reject) => {}
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    create() {
      this.dialogVisible = true;
    },
    submit() {
      this.name = this.name.replace(/\s+/g, "");
      if (this.name != "" && this.name != null) {
        this.dialogVisible = false;
        this.$axios.postProject(this.name).then(
          (res) => {
            console.log(res);
            this.init();
            Message({
              message: "新增成功",
              type: "success",
              duration: 1 * 1000,
            });
          },
          (reject) => {}
        );
      } else {
        Message({
          message: "项目名称不能为空",
          type: "error",
          duration: 1 * 1000,
        });
      }
    },
  },
};
</script>
<style scope="scope" lang="less">
.input {
  float: right;
  margin-bottom: 5%;
  /deep/ .el-button {
    background-color: #383874;
    color: #fff;
    letter-spacing: 1px;
    font-size: 20px;
  }
}
.table /deep/ .el-table .el-link{
  margin-right: 10px;
}
.table /deep/ .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table /deep/ .el-dialog .el-dialog__header {
  display: flex;
  margin-left: 5%;
  padding-left: 0;
  width: 90%;
  border-bottom: 1px solid #5059d5;
  /deep/ .el-dialog__title {
    color: #383874;
    font-size: 15px;
    font-weight: bolder;
    letter-spacing: 1px;
  }
}
.table /deep/ .el-dialog .el-dialog__footer {
  /deep/ .dialog-footer .el-button {
    height: 34px;
    width: 80px;
    color: #fff;
    border-radius: 8px;
    border: none;
  }
  /deep/ .dialog-footer .el-button--default {
    background-color: #383874;
  }
  /deep/ .dialog-footer .el-button--primary {
    background-color: #ee4b4a;
  }
}
.table /deep/ .el-table .el-table__header .has-gutter tr th {
  background-color: #383874;
  color: #fff;
  letter-spacing: 1px;
}
</style>
