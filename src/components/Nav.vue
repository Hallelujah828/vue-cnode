<template>
  <ul :class="navWrap">
    <li
    v-for="(item,index) in nav"
    :key="index"
    @click="changeNavs(index)"
    >
    <router-link :to='{path: item.url, query: item.query}' :class="{'nav-active':curIndex===index}">
      {{item.name}}
    </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    navWrap: {
      type: String,
      default () {
        return 'navWrap'
      }
    },
    nav: {
      type: Array,
      default () {
        return [
          {name: 'nav1', url: '', query: null},
          {name: 'nav2', url: '', query: null},
          {name: 'nav3', url: '', query: null}
        ]
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
    changeNavs (index) {
      this.$emit('changeNavs', index)
    }
  }
}
</script>

<style>
</style>
