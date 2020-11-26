<template>
  <div id="app">
    <div id="nav">
      <el-container>
      <el-header>
        <div class="title">
          软件适配兼容性自动化测试系统
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
.title{
  font-size: 36px;
  color: #383874;
  font-weight: bolder;
  display:flex;
  margin-left: 2rem;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
