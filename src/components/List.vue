<template>
  <div class="list-wrap">
    <div v-for="(item, index) in list" :key="index" class="list-item">
      <router-link :to="{name:'Detail',params:{id:item.id}}">
        <div class="list-head inline-flex">
          <img :src="item.author.avatar_url" class="com-avator"/>
          <span class="com-tag top-tag" v-if="item.top">置顶</span>
          <span class="com-tag good-tag" v-else-if="item.good">精华</span>
          <span class="com-tag" v-else>{{item.tab | tabFormat}}</span>
          <p class="list-name">{{item.author.loginname}}</p>
        </div>
        <p class="list-content overflow-line">{{item.title}}</p>
        <div class="list-btm inline-flex">
          <p><span class="purple-txt">{{item.reply_count}}</span>/{{item.visit_count}}</p>
          <p>{{item.last_reply_at | timeFormat}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'List',
  data () {
    return {}
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.list-wrap {
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  background: #fff;
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

.list-name {
  margin-left: 0.625rem;
  color: #444;
}
.list-content {
  margin-top: 0.375rem;
  line-height: 1.2;
  color: #444;
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
