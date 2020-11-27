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
    scriptData: {},
    browserConfig: []
  },
  mutations: {
    setId (state, id) {
      state.projectId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
