import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import topic from './modules/topic'
import loading from './modules/loading'
import detail from './modules/detail'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    topic,
    loading,
    detail
  }
})

export default store
