import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectId: 0,
    testExampleId: 0,
    projectNums: 0,
    homeDataSource: [],
    projectName: '',
    testExample: [],
    testExampleDataSource: [
      [
        {
          key: 0,
          command: 0,
          target: 0,
          value: 0
        },
        {
          key: 0,
          command: 0,
          target: 0,
          value: 0
        },
        {
          key: 0,
          command: 0,
          target: 0,
          value: 0
        },
        {
          key: 0,
          command: 0,
          target: 0,
          value: 0
        }
      ]
    ],
    testReport: [
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 1,
        testExampleName: '用例2',
        system: 'linux',
        browser: 'firefox',
        startTime: '2020年11月20日13时31分',
        endTime: '2020年11月20日13时32分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      },
      {
        key: 0,
        testExampleName: '用例1',
        system: 'windows',
        browser: 'chrome',
        startTime: '2020年11月20日13时30分',
        endTime: '2020年11月20日13时31分'
      }
    ],
    testResult: [
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      },
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      },
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      },
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      },
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      },
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      },
      {
        key: 0,
        progress: '0',
        img: '0',
        info: '0'
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
