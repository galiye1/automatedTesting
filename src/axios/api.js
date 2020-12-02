/**
 * @Description:
 * @author wxj
 * @date 2020-10-12-13:38
 */
import axios from './http'
const serve = {
  getProject () {
    return axios('/project', {
      method: 'get'
    })
  },
  postProject (data) {
    return axios('/project', {
      method: 'post',
      data: {
        name: data
      }
    })
  },
  delProject (id) {
    return axios(`/project/${id}`, {
      method: 'delete'
    })
  },
  getDetail (id) {
    return axios(`/project/${id}`, {
      method: 'get'
    })
  },
  proExecute (data) {
    return axios('/test/execute', {
      method: 'post',
      data: data
    })
  },
  deleteExample (id) {
    return axios(`report/${id}`, {
      method: 'delete'
    })
  },
  getStepData (data) {
    return axios('report/statistics', {
      method: 'post',
      data
    })
  }
}

export default serve
