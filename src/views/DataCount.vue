<template>
  <div id="dataCount">
    <h1 class="exampleTypeTitle">功能性</h1>
    <h2 class="exampleCountTitle">总测试步骤</h2>
    <div class="detail">
      <div class="detailData">总测数:{{stepData.total}}</div>
      <div class="detailData">未测数:{{stepData.unfinished}}</div>
      <div class="detailData">失败数:{{stepData.failures}}</div>
    </div>
    <h1 class="performanceTitle">性能</h1>
    <h2>成功</h2>
    <div class="detail">
      <div class="detailData">平均响应时间:{{stepData.averageCostTime}}</div>
      <div class="detailData">1秒内:{{stepData.littleThan2s}}</div>
      <div class="detailData">2-3秒内:{{stepData.between2sAnd3s}}</div>
      <div class="detailData">3秒外:{{stepData.greaterThan3s}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCount',
  data () {
    return {
      stepData: {},
      exampleIdList: []
    }
  },
  mounted () {
    this.exampleIdList = this.$store.state.exampleIdList
    this.$axios.getStepData(this.exampleIdList).then(res => {
      console.log(res.data)
      this.stepData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/dataCount";
</style>
