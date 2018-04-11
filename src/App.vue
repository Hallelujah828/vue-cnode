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
      <router-view/>
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
        {name: '关于', url: '/about', query: null},
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
  background: #888;
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

.nav-active{
  color: #fff;
}
</style>
