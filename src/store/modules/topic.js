import * as types from '../types'
import request from '@/request/index'

const state = {
  allList: { tab: 'all', value: [], page: 0 },
  goodList: { tab: 'good', value: [], page: 0 },
  shareList: { tab: 'share', value: [], page: 0 },
  askList: { tab: 'ask', value: [], page: 0 },
  jobList: { tab: 'job', value: [], page: 0 }
}

const mutations = {
  [types.GET_TOPICS_LIST] (state, res) {
    let formatList = res.data
    state[res.topicsList].value = state[res.topicsList].value.concat(formatList)
  },
  [types.GET_TOPICS_PAGE] (state, topicsList) {
    state[topicsList].page += 1
  }
}

const actions = {
  getTopicsList ({commit}, params) {
    commit(types.GET_TOPICS_PAGE, `${params.tab}List`)
    let curPage = state[`${params.tab}List`].page
    request.Topic(`?tab=${params.tab}&page=${curPage}&limit=20`)
      .then(res => {
        let listData = Object.assign({topicsList: `${params.tab}List`}, res)
        commit(types.GET_TOPICS_LIST, listData)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
