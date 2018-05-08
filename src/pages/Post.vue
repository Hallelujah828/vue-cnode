<template>
  <div class="panel-wrap">
    <div class="form-wrap">
      <div class="input-wrap border-input">
        <i class="iconfont icon-title"></i>
        <input class="clear-input input-content" placeholder="请输入标题" v-model="form.title">
      </div>
      <div class="input-wrap">
        <i class="iconfont icon-select"></i>
        <select class="clear-select input-content" v-model="form.tab">
          <option value="" disabled selected>请选择发布专区</option>
          <option value="dev">开发</option>
          <option value="ask">问答</option>
          <option value="share">分享</option>
          <option value="job">招聘</option>
        </select>
        <i class="iconfont icon-triangle"></i>
      </div>
      <div class="textarea-wrap">
        <textarea class="clear-textarea" placeholder="请输入要发布的内容..." v-model="form.content">
        </textarea>
      </div>
      <mt-button type="primary" size="large" @click="submit()">发布</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import request from '@/request/index'

export default {
  name: 'Post',
  data () {
    return {
      form: {
        topic_id: '',
        title: '',
        tab: '',
        content: '',
        token: ''
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.userInfo.token
    })
  },
  methods: {
    submit () {
      if (!this.token) return this.$router.push({ path: '/login' })
      this.form.token = this.token
      if (!this.form.title) {
        return Toast('标题不能为空哦～')
      } else if (!this.form.tab) {
        return Toast('没有选择分区哦～')
      } else if (!this.form.content) {
        return Toast('没有填写内容哦～')
      }
      let params = `accesstoken=${this.form.token}&title=${this.form.title}&tab=${this.form.tab}&content=${this.form.content}`
      request.PostTopic(params)
        .then(res => {
          if (res.success) {
            Toast('发布成功！')
            this.$router.push({ path: `/topic/${res.topic_id}` })
          }
        }).catch(err => {
          if (err.response) {
            Toast(err.response.data.error_msg)
          }
        })
    }
  }
}
</script>

<style scoped>
.textarea-wrap{
  width: 100%;
  display: flex;
}
textarea{
  width: 100%;
  height: 10rem;
  background: #eee;
  padding: 0.25rem;
  font-size: 1rem;
}
</style>
