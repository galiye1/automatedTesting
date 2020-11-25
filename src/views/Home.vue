<template>
    <div id="home">
      <a-button class="btn" @click="createTestProject">新建测试项目</a-button>
      <div class="testManageTable">
        <span class="testManage">测试计划管理</span>
        <a-table :data-source="this.$store.state.homeDataSource" :columns="columns" :pagination="false" :scroll="{ y: 590 | true }">
          <template slot="projectName" slot-scope="text">
            <router-link to="/test">{{text}}</router-link>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              title="确认删除?"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
      <a-modal title="环境配置" :destroyOnClose="true" v-model="envSetModal" :maskClosable="false" @ok="envSetModalOk">
        <a-tree-select search-placeholder="请选择浏览器" tree-checkable :show-checked-strategy="SHOW_PARENT" @change="onChange">
          <a-tree-select-node title="windows" value="windows" key="0-0">
            <a-tree-select-node title="windows chrome" value="windows chrome" key="0-0-0"></a-tree-select-node>
            <a-tree-select-node title="windows firefox" value="windows firefox" key="0-0-1"></a-tree-select-node>
            <a-tree-select-node title="windows ie" value="windows ie" key="0-0-2"></a-tree-select-node>
            <a-tree-select-node title="windows opera" value="windows opera" key="0-0-3"></a-tree-select-node>
          </a-tree-select-node>
          <a-tree-select-node title="linux" value="linux" key="0-1">
            <a-tree-select-node title="linux chrome" value="linux chrome" key="0-1-0"></a-tree-select-node>
            <a-tree-select-node title="linux firefox" value="linux firefox" key="0-1-1"></a-tree-select-node>
            <a-tree-select-node title="linux opera" value="linux opera" key="0-1-2"></a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
      </a-modal>
      <a-modal title="项目名" :destroyOnClose="true" v-model="projectInputModal" @ok="projectInputModalOk">
        <a-input v-model="projectName" placeholder="请输入项目名"/>
      </a-modal>
    </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'

export default {
  name: 'Home',
  data () {
    return {
      config: [], // 环境配置
      envSetModal: false,
      projectInputModal: false,
      projectName: '',
      columns: [
        {
          title: '名称',
          width: '10%',
          dataIndex: 'projectName',
          scopedSlots: { customRender: 'projectName' }
        },
        {
          title: '当前状态',
          dataIndex: 'currentState'
        },
        {
          title: '通过率',
          dataIndex: 'throughputRate'
        },
        {
          title: '已测用例',
          dataIndex: 'completeExample'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      SHOW_PARENT: TreeSelect.SHOW_PARENT
    }
  },
  methods: {
    createTestProject () {
      this.envSetModal = true
    },
    envSetModalOk () {
      this.envSetModal = false
      this.projectInputModal = true
    },
    projectInputModalOk () {
      this.projectInputModal = false
      this.$store.state.projectName = this.projectName
      const projectObj = {
        key: this.$store.state.projectId++,
        projectName: this.projectName,
        currentState: '未测试',
        throughputRate: 0,
        completeExample: '0/0',
        config: this.config
      }
      this.$store.state.homeDataSource.push(projectObj)
    },
    onDelete (key) {
      this.$store.state.homeDataSource = this.$store.state.homeDataSource.filter(item => item.key !== key)
    },
    onChange (value) {
      this.config = value
    }
  }
}
</script>

<style lang="less" scoped>
  .btn{
    float: right;
    margin-bottom: 20px;
    background-color: #007bff;
  }
  .testManageTable{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .testManage{
    width: 10%;
  }
  .ant-table-wrapper{
    width: 90%;
  }
  .ant-select{
    width: 100%;
  }
  a{
    font-weight: normal !important;
    color: #007bff !important;
  }
</style>
