<template>
  <div id="app">
    <header class="vel-flex">
      <!-- eslint-disable -->
      <div class="search-wrap">
        <i class="iconfont icon-search"></i>
        <input placeholder="搜了也没用..." class="clear-input input-search">
      </div>
      <Nav :nav="nav" :navWrap="navWrap" :curIndex="curIndex" @changeNavs="changeNavs"></Nav>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  data () {
    return {
      search: '',
      nav: [
        {name: '首页', url: '/', query: null},
        {name: '发帖', url: '/post', query: null},
        {name: '登录', url: '/login', query: null}
      ],
      navWrap: 'navWrap',
      curIndex: 0
    }
  },
  components: {
    Nav
  },
  methods: {
    changeNavs (index) {
      this.curIndex = index
    }
  },
  created () {
    let route = this.$route.name
    if (route === 'Login') {
      this.curIndex = 2
    } else if (route === 'Post') {
      this.curIndex = 1
    } else if (route === 'Index') {
      this.curIndex = 0
    }
  }
}
</script>

<style>
@import '../src/styles/reset.css';
@import '../src/styles/common.css';
@import '../src/styles/rem.css';
@import '../src/styles/icon.css';

header {
  background: #444;
  padding: .5rem;
  height: 8.625rem;
  position: fixed;
  width: 100%;
  z-index: 999;
  box-sizing: border-box;
}
.search-wrap{
  width: 13.75rem;
  height: 2rem;
  padding:.25rem .625rem;
  display: flex;
  align-items: center;
  background: #eee;
  border-radius: 1rem;
  box-sizing: border-box;
  color: #444;
  margin-top: 1.875rem;
}
.search-wrap:hover {
  background: #fff;
}
.input-search{
  padding-left: .25rem;
  color: #444;
  font-size: .875rem;
}

.navWrap{
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 1.25rem 1rem auto;
  color: rgb(204, 204, 204);
}

.navWrap li{
  flex: 1;
}

.navWrap li>a{
  display: block;
  text-align: center;
}

.nav-active{
  color: #fff;
}

.panel-wrap {
  width: 98%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding-top: 8.625rem;
  margin: 0 auto;
}
.com-avator {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
  overflow: hidden;
  background: #eee;
}
.com-tag {
  margin-left: 0.625rem;
  font-size: 0.875rem;
  padding: 0.25rem;
  border-radius: 4px;
  background-color: #e5e5e5;
  color: #999;
}
.com-line-tag{
  font-size: .8125rem;
  padding: 0 0.25rem;
  border-radius: 4px;
  border: 1px solid #999;
  box-sizing: border-box;
}
.top-tag {
  color: #fff;
  background: #80bd01;
}
.good-tag {
  color: #fff;
  background: #e6be68;
}
.form-wrap {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 6px;
  padding: 1.875rem;
  box-sizing: border-box;
  margin-top: 0.3125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.form-wrap > div:not(:first-child), .form-wrap > button{
  margin-top: 1.25rem;
}
.height-20{
  height: 20rem;
}
.input-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
}
.border-input {
  border-bottom: 1px solid #444;
}
.input-content {
  height: 100%;
  flex: 1;
  font-size: 1rem;
  padding-left: 0.625rem;
}
.mint-button--primary{
  background-color: #444;
}
.mint-button--primary.is-plain{
  color: #444;
  border: 1px solid #444;
}
</style>
