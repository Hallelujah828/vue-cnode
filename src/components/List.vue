<template>
  <div class="list-wrap"
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
    <div v-for="(item, index) in list" :key="index" class="list-item">
      <div class="list-head inline-flex">
        <img :src="item.author.avatar_url" class="list-avator"/>
        <span class="list-tag" :class="{'top-tag': item.top}">{{item.tab}}</span>
        <p class="list-name">{{item.author.loginname}}</p>
      </div>
      <p class="list-content overflow-line">{{item.title}}</p>
      <div class="list-btm inline-flex">
        <p><span class="purple-txt">{{item.reply_count}}</span>/{{item.visit_count}}</p>
        <p>{{item.time}}前</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'List',
  data () {
    return {
      list: []
    }
  },
  computed: {},
  methods: {
    loadMore () {
      if (this.loading) {
        return false
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2500)
    }
  },
  created () {
    axios
      .get('https://cnodejs.org/api/v1/topics', {
        params: {
          page: 1,
          tab: '',
          limit: 20,
          mdrender: true
        }
      })
      .then((response) => {
        this.list = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
.list-wrap {
  display: flex;
  flex-direction: column;
  padding-top: 3.875rem;
}
.list-item {
  width: 100%;
  padding: 0.625rem;
  box-sizing: border-box;
  border-top: 1px solid #eee;
}
.inline-flex {
  display: flex;
  align-items: center;
}
.list-avator {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
  overflow: hidden;
  background: #eee;
}
.list-tag {
  margin-left: 0.625rem;
  font-size: 0.875rem;
  padding: 0.25rem;
  border-radius: 4px;
  background-color: #e5e5e5;
  color: #999;
}
.top-tag {
  color: #fff;
  background: #80bd01;
}
.list-name {
  margin-left: 0.625rem;
  color: #444;
}
.list-content {
  margin-top: 0.375rem;
  line-height: 1.2;
}
.list-btm {
  justify-content: space-between;
  margin-top: 0.375rem;
  font-size: 0.875rem;
}
.purple-txt {
  color: #9e78c0;
}
</style>
