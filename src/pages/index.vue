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
          <allList :list="allList"></allList>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="good">
        <keep-alive>
          <goodList :list="goodList"></goodList>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="share">
        <keep-alive>
          <shareList :list="shareList"></shareList>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="ask">
        <keep-alive>
          <askList :list="askList"></askList>
        </keep-alive>
      </mt-tab-container-item>
      <mt-tab-container-item id="job">
        <keep-alive>
          <jobList :list="jobList"></jobList>
        </keep-alive>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import List from '@/components/List'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      selected: 'all'
    }
  },
  components: {
    allList: List,
    goodList: List,
    shareList: List,
    askList: List,
    jobList: List
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
      this.$router.push({ name: 'Index', query: { tab: value } })
      if (value === 'all' && this.allList.length === 0) {
        this.getTopic(value)
      } else if (value === 'good' && this.goodList.length === 0) {
        this.getTopic(value)
      } else if (value === 'share' && this.shareList.length === 0) {
        this.getTopic(value)
      } else if (value === 'ask' && this.askList.length === 0) {
        this.getTopic(value)
      } else if (value === 'job' && this.jobList.length === 0) {
        this.getTopic(value)
      }
    }
  },
  methods: {
    getTopic (tab) {
      let params = {tab: tab, page: `${tab}Page`}
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
      allPage: state => state.topic.allList.page,
      goodPage: state => state.topic.goodList.page,
      sharePage: state => state.topic.shareList.page,
      askPage: state => state.topic.askList.page,
      jobPage: state => state.topic.jobList.page
    }),
    ...mapGetters({
      allList: 'allValue',
      goodList: 'goodValue',
      shareList: 'shareValue',
      askList: 'askValue',
      jobList: 'jobValue'
    })
  },
  created () {
    this.selected = this.$route.query.tab || 'all'
    if (this.allList.length === 0) {
      let params = {tab: 'all', page: 0}
      this.$store.dispatch('getTopicsList', params)
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
