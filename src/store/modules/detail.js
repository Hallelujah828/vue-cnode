import * as types from '../types'
import request from '@/request/index'

const state = {
  detail: {}
}

const getters = {
  topicDetail: state => state.detail
}

const mutations = {
  [types.GET_TOPICS_DETAIL] (state, res) {
    state.detail = res
  },
  [types.SET_REPLY_STATUS] (state, status) {
    let replayData = state.detail.data.replies[status.index]
    if (status.success) {
      replayData.is_uped = !replayData.is_uped
      if (status.action === 'up') {
        replayData.ups.length++
      } else if (status.action === 'down' && replayData.ups.length > 0) {
        replayData.ups.length--
      }
    }
  },
  [types.SET_COLLECT_STATUS] (state, status) {
    state.detail.data.is_collect = status
  }
}

const actions = {
  getDetail ({ commit }, id) {
    request.TopicsDetail(id).then(res => {
      commit(types.GET_TOPICS_DETAIL, res)
    })
  },
  setReplyStatus ({ commit }, parma) {
    request.ReplyUp(parma.id, parma.token).then(res => {
      let replyData = Object.assign({index: parma.index}, res)
      commit(types.SET_REPLY_STATUS, replyData)
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
