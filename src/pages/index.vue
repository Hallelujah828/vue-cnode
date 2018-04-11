<template>
  <div class="panel-wrap">
    <Tab :tabs="tabs" :curIndex="curIndex" @changeTabs="changeTabs">
      <keep-alive>
        <component :is="curComponent">
        </component>
      </keep-alive>
    </Tab>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import List from '@/components/List'

export default {
  name: 'Test',
  data () {
    return {
      tabs: [
        {
          name: '全部',
          component: 'List'
        },
        {
          name: '精华',
          component: 'List'
        },
        {
          name: '分享',
          component: 'List'
        },
        {
          name: '问答',
          component: 'List'
        },
        {
          name: '招聘',
          component: 'List'
        }
      ],
      curIndex: 0,
      curComponent: 'List',
      tabType: ['all', 'good', 'share', 'ask', 'job']
    }
  },
  components: {
    Tab,
    List
  },
  methods: {
    changeTabs (index) {
      this.curIndex = index
      this.curComponent = this.tabs[index].component
      this.$router.push({path: '/', query: { tab: this.tabType[index] }})
    }
  }
}
</script>

<style>
.panel-wrap{
  width: 98%;
  overflow: hidden;
  padding-top: 8.625rem;
  margin: 0 auto;
}
.tab-wrap{
  background: #fff;
}
.tabs{
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 98%;
  padding: 1.25rem 0;
  background-color: #f6f6f6;
}
.tab-active{
  background-color: #80bd01;
  color: #fff;
  padding: .1875rem .25rem;
  border-radius: 3px;
}
</style>
