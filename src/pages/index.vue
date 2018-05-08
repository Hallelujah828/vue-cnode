<template>
  <div class="panel-wrap">
    <mt-navbar v-model="selected" class="tabs">
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="good">精华</mt-tab-item>
      <mt-tab-item id="share">分享</mt-tab-item>
      <mt-tab-item id="ask">问答</mt-tab-item>
      <mt-tab-item id="job">招聘</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="all">
        <keep-alive>
          <all-list :list="allList.value"></all-list>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="good">
        <keep-alive>
          <good-list :list="goodList.value"></good-list>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="share">
        <keep-alive>
          <share-list :list="shareList.value"></share-list>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="ask">
        <keep-alive>
          <ask-list :list="askList.value"></ask-list>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="job">
        <keep-alive>
          <job-list :list="jobList.value"></job-list>
        </keep-alive>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import List from '@/components/List'
import { mapState } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      selected: 'all'
    }
  },
  components: {
    'all-list': List,
    'good-list': List,
    'share-list': List,
    'ask-list': List,
    'job-list': List
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.addEventListener('scroll', vm.scrollTopicList, false)
    })
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.scrollTopicList, false)
    next()
  },
  watch: {
    selected: function (value) {
      let arr = ['all', 'good', 'share', 'ask', 'job']
      if (arr.includes(value)) {
        this.$router.push({ name: 'Index', query: { tab: value } })
        if (this[`${value}List`].value.length === 0) {
          this.getTopic(value)
        }
      } else {
        this.$router.replace({ name: 'Index', query: null })
        this.$router.go(0)
      }
    }
  },
  methods: {
    getTopic (tab) {
      let params = {tab: tab, page: this[`${tab}List`].page}
      this.$store.dispatch('getTopicsList', params)
    },
    scrollTopicList () {
      let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY)
      if (document.body.clientHeight <= totalheight) {
        this.getTopic(this.selected)
      }
    }
  },
  computed: {
    ...mapState({
      allList: state => state.topic.allList,
      goodList: state => state.topic.goodList,
      shareList: state => state.topic.shareList,
      askList: state => state.topic.askList,
      jobList: state => state.topic.jobList
    })
  },
  created () {
    this.selected = this.$route.query.tab || 'all'
    if (this.allList.value.length === 0) {
      this.getTopic('all')
    }
  }
}
</script>

<style>
.tab-wrap {
  background: #fff;
}
.tabs {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 98%;
  height: 3.75rem;
  background-color: #f6f6f6;
  z-index: 999;
}
.mint-navbar .mint-tab-item {
  padding: 0;
  font-size: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mint-navbar .mint-tab-item.is-selected {
  border: none;
  margin: 0;
}
.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
  background-color: #80bd01;
  color: #fff;
  padding: 0.1875rem 0.25rem;
  border-radius: 3px;
  display: inline;
}
.mint-tab-item-label {
  font-size: 1rem;
}
.loading-wrap{
  margin:.9375rem auto;
  text-align:center;
}
</style>
