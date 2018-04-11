<template>
  <div class="tab-wrap">
    <ul class="tabs">
      <li
      v-for="(item,index) in tabs"
      :key="index"
      @click="changeTabs(index)"
      :class="{'tab-active':curIndex===index}"
      >
      {{item.name}}
      </li>
    </ul>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default () {
        return [{name: 'tab1'}, {name: 'tab2'}]
      }
    },
    curIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeTabs (index) {
      this.$emit('changeTabs', index)
    }
  }
}
</script>

<style>
</style>
