<template>
  <div class="table">
    <div class="input">
      <el-button @click="create">新增</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="项目ID"> </el-table-column>
      <el-table-column prop="name" label="项目名称"> </el-table-column>
      <el-table-column label="绑定"
        ><template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >绑定设备</el-button
          >
          <el-button size="mini" @click="handleDelete(scope.$index, scope.row)"
            >绑定数据</el-button
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
export default {
  mounted() {
    this.init()
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
          console.log(res);
          this.tableData = res.data;
        },
        (reject) => {}
      );
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/Process");
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    del() {
      console.log(this.multipleSelection);
    },
    create() {
      this.dialogVisible = true;
    },
    submit() {
      console.log(this.name)
      this.dialogVisible = false;
      this.$axios.postProject(this.name).then(res=>{
        console.log(res)
        this.init()
      },reject=>{

      })
    },
  },
};
</script>
<style scope="scope" lang="less">
.input {
  float: right;
  margin-bottom: 1rem;
}
.table /deep/ .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>