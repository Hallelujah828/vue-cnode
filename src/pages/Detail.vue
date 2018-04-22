<template>
  <div class="panel-wrap" v-if="topicDetail.data!==null && topicDetail.data!==undefined">
    <div class="card-wrap">
      <img :src="topicDetail.data.author.avatar_url" class="com-avator">
      <div class="info-wrap">
        <p>{{topicDetail.data.author.loginname}}</p>
        <div class="tab-wrap">
          <i class="iconfont icon-tag"></i>
          <span v-if="topicDetail.data.top" class="com-line-tag">置顶</span>
          <span v-if="topicDetail.data.good" class="com-line-tag">精华</span>
          <span class="com-line-tag">{{topicDetail.data.tab | tabFormat}}</span>
        </div>
        <div class="icon-wrap">
          <div class="icon-item">
            <i class="iconfont icon-clock"></i><span class="info-font">{{topicDetail.data.last_reply_at | timeFormat}}</span>
          </div>
          <div class="icon-item" @click="jump('#comment')">
            <i class="iconfont icon-comments"></i><span class="info-font">{{topicDetail.data.reply_count}}</span>
          </div>
          <div class="icon-item">
            <i class="iconfont icon-browse"></i><span class="info-font">{{topicDetail.data.visit_count}}</span>
          </div>
        </div>
      </div>
      <div class="star-wrap" :class="{'active-collect':topicDetail.data.is_collect}" @click="collectTopic(topicDetail.data.id)">
        <i class="iconfont icon-collect"></i>
        <p class="star-font">{{topicDetail.data.is_collect?'已':''}}收藏</p>
      </div>
    </div>
    <div class="topic_content">
      <h1 class="topic-title">{{topicDetail.data.title}}</h1>
      <div v-html="topicDetail.data.content" class="panel"></div>
      <div class="comment-wrap" id="comment">
        <p class="comment-record">共{{topicDetail.data.reply_count}}条回复</p>
        <div v-for="(item, index) in topicDetail.data.replies" :key="index" class="comment-info-wrap">
          <img :src="item.author.avatar_url" class="comment-avatar">
          <div class="comment-info">
            <span>{{item.author.loginname}}</span>
            <span class="comment-time">{{item.create_at | timeFormat}}</span>
            <div v-html="item.content"></div>
            <div class="good-wrap" @click="replyUp(index)">
              <i class="iconfont icon-good" :class="{'active-good':item.is_uped}"></i>
              <span class="good-font">{{item.ups.length}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      token: state => state.user.userInfo.token
    }),
    ...mapGetters({
      topicDetail: 'topicDetail'
    })
  },
  components: {},
  methods: {
    getDetails () {
      this.$store.dispatch('getDetail', this.$route.params.id)
    },
    collectTopic (id) {
      if (!this.token) {
        return this.$router.push({ name: 'Login' })
      }
      let data = this.topicDetail.data
      data.is_collect = !data.is_collect
    },
    replyUp (index) {
      if (!this.token) {
        return this.$router.push({ name: 'Login' })
      }
      let data = this.topicDetail.data.replies[index]
      let prama = {id: data.id, token: this.token, index: index}
      this.$store.dispatch('setReplyStatus', prama)
    },
    jump (selector) {
      var anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop - 138
      document.documentElement.scrollTop = anchor.offsetTop - 138
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getDetails()
    })
  }
}
</script>

<style>
.card-wrap {
  width: 100%;
  padding: 0.625rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.tab-wrap,
.icon-wrap {
  margin-top: 0.625rem;
}
.info-wrap {
  flex: 1;
  margin-left: 0.625rem;
}
.icon-wrap {
  display: flex;
  font-size: 0.875rem;
}
.icon-item:not(:first-child) {
  margin-left: 0.9375rem;
}
.info-font {
  margin-left: 0.375rem;
}
.topic_content {
  background: #fff;
  padding: 0.625rem;
  box-sizing: border-box;
  line-height: 1.2;
}
.topic-title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
}
.star-wrap {
  display: flex;
  padding: 0 0.625rem;
  flex-direction: column;
  font-size: 0.75rem;
  align-items: center;
}
.star-font {
  padding-top: 0.25rem;
}
.markdown-text {
  line-height: 1.6;
}
blockquote {
  padding: 0 0 0 15px;
  margin: 0 0 20px;
  border-left: 5px solid #eee;
}

blockquote p {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25 !important;
}

blockquote small {
  color: #999;
}

blockquote small:before {
  content: '\2014 \00A0';
}

blockquote.pull-right {
  float: right;
  padding-right: 15px;
  padding-left: 0;
  border-right: 5px solid #eee;
  border-left: 0;
}

blockquote.pull-right p,
blockquote.pull-right small {
  text-align: right;
}

blockquote.pull-right small:before {
  content: '';
}

blockquote.pull-right small:after {
  content: '\00A0 \2014';
}

blockquote:after,
blockquote:before,
q:after,
q:before {
  content: '';
}

code,
pre {
  padding: 0 3px 2px;
  box-sizing: border-box;
  font-family: Monaco, Menlo, Consolas, 'Courier New', monospace;
  font-size: 0.75rem;
  color: #333;
  border-radius: 3px;
}
pre code {
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
}
pre {
  background: #fee9cc;
  border: 1px dashed #ccc;
  line-height: 22px;
}

code {
  padding: 0;
  border: none;
}

p code {
  background: 0 0;
  color: #7f7f7f;
  margin: 0 1px;
  padding: 1px 4px;
  border-radius: 1px;
}

div pre.prettyprint {
  font-size: 0.875rem;
  border-radius: 0;
  padding: 0 15px;
  border: none;
  border-width: 1px 0;
  background: #f7f7f7;
  -o-tab-size: 4;
  -moz-tab-size: 4;
  tab-size: 4;
}

.markdown-text p,
.preview p {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 2rem;
  margin: 1rem 0;
}

.markdown-text > :last-child,
.preview > :last-child,
textarea#title {
  margin-bottom: 1em;
}

.markdown-text > :first-child,
.preview > :first-child {
  margin-top: 0;
}

.markdown-text li,
.preview li {
  font-size: 14px;
  line-height: 2em;
}

.markdown-text li code,
.markdown-text p code,
.preview li code,
.preview p code {
  color: #000;
  background-color: #fcfafa;
  padding: 4px 6px;
}

.markdown-text img {
  cursor: pointer;
  max-width: 100%;
}

.markdown-text h1 code,
.markdown-text h2 code,
.markdown-text h3 code,
.markdown-text h4 code,
.markdown-text h5 code,
.markdown-text h6 code {
  font-size: inherit;
  color: inherit;
}

.panel .markdown-text a {
  color: #08c;
}

.preview {
  padding: 0.5em;
  font-size: 15px;
  min-height: 200px;
  word-break: break-all;
}

.preview p > img {
  max-width: 100%;
  display: block;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}

.markdown_editor .markdown_in_editor,
.markdown_editor .markdown_in_preview {
  display: none;
}

.markdown_editor.in_editor .markdown_in_editor,
.markdown_editor.in_preview .markdown_in_preview {
  display: block;
}
.comment-wrap {
  border-top: 1px solid #eee;
  padding-top: 1.25rem;
}
.comment-info-wrap {
  margin-top: 1.25rem;
  display: flex;
}
.comment-info {
  flex: 1;
  margin-left: 0.625rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.625rem;
}
.comment-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
}
.comment-time {
  font-size: 0.875rem;
  margin-left: 0.625rem;
  color: #999;
}
.good-wrap {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  float: right;
}
.icon-good {
  margin-right: 0.625rem;
}
.active-good {
  color: crimson;
}
.active-collect {
  color: #e6be68;
}
.good-font {
  font-size: 0.875rem;
}
</style>
