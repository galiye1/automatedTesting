﻿<template>
  <div id="app">
      <el-container>
        <el-header>
          <div class="title" @click="back" v-if="this.$route.path!='/Process'">
            <span>软件适配兼容性自动化测试系统</span>
          </div>
          <div class="back" @click="back2" v-if="this.$route.path=='/Process'">
            <img src="./assets/img/back.png" alt=""> 返回
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
  methods: {
    back () {
      this.$router.push('/')
    },
    back2 () {
      this.$router.push('/Test')
    },
  },
  created () {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
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
  padding-left: 3%;
  cursor: pointer;
}
.back{
  font-size: 25px;
  font-weight: bolder;
  padding-left: 3%;
  letter-spacing: 1px;
  z-index: 1000;
  cursor: pointer;
  img{
    padding-bottom: 5px;
  }
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
