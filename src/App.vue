<template>
  <div id="app">
      <el-container>
        <el-header>
          <div class="title" @click="back" >
            <span>软件适配兼容性自动化测试系统</span>
          </div>
        </el-header>
        <el-main>
          <div class="contain">
            <router-view></router-view>
          </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  },
  created () {
    localStorage.clear()
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('store'))))
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding:0;
  box-sizing: border-box;
  color: #2c3e50;
}
#app /deep/ .el-header{
  padding: 0;
  height: 86px;
  background-color: #fff;
  width: 100vw;
  display: flex;
  align-items: center;
}
.title{
  font-size: 34px;
  color: #383874;
  font-weight: bolder;
  padding-left: 2rem;
  cursor: pointer;
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
