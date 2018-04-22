// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import { InfiniteScroll, Navbar, TabItem, TabContainer, TabContainerItem, Button, Spinner } from 'mint-ui'
import 'mint-ui/lib/style.css'
import * as filters from './utils/index'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)

Vue.use(Vuex)
Vue.use(InfiniteScroll)
Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
