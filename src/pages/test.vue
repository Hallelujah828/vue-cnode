<template>
  <div class="hello">
    <tab :tabs="tabs" :curIndex="curIndex" @changeTabs="changeTabs">
      <keep-alive>
        <component :is="curComponent">
        </component>
      </keep-alive>
    </tab>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import One from '@/components/One'

export default {
  name: 'Test',
  data () {
    return {
      tabs: [
        {
          name: 'TAB一',
          component: 'one'
        },
        {
          name: 'TAB二',
          component: {
            name: 'two',
            template: '<ol><li>Ttab2的列表1</li><li>Ttab2的列表2</li><li>Ttab2的列表3</li></ol>'
          }
        }
      ],
      curIndex: 0,
      curComponent: 'one'
    }
  },
  components: {
    tab: Tab,
    One
  },
  methods: {
    changeTabs (index) {
      this.curIndex = index
      this.curComponent = this.tabs[index].component
    }
  }
}
</script>

<style scoped>

</style>
