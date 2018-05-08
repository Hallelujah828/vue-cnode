<template>
  <div class="panel-wrap">
    <div class="form-wrap height-20" v-if="!loginStatus">
      <div class="input-wrap border-input">
        <i class="iconfont icon-token"></i>
        <input class="clear-input input-content" placeholder="请输入Token" v-model="token">
      </div>
      <mt-button type="primary" size="large" @click="login">登录</mt-button>
    </div>
    <div class="form-wrap height-20" v-if="loginStatus">
      <img :src="userInfo.avatar_url" class="user-avatar">
      <p>{{userInfo.loginname}}</p>
      <mt-button type="primary" size="large" @click="signOut" plain>退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
import request from '@/request/index'
export default {
  name: 'Login',
  data () {
    return {
      token: ''
    }
  },
  components: {},
  computed: {
    ...mapState({
      loginStatus: state => state.user.loginStatus,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    ...mapActions({
      setUserInfo: 'setUserInfo',
      setSignOut: 'setSignOut'
    }),
    login () {
      // token:'2b9c26a5-570c-4a57-ae7c-e39d91e9032f'
      if (!this.token) {
        Toast('Token 不能为空哦～')
        return
      }
      request.Login(this.token)
        .then(res => {
          if (res.success) {
            let userInfo = Object.assign({ token: this.token }, res)
            this.setUserInfo(userInfo)
            Toast('登录成功！')
            this.$router.go(-1)
          }
        })
        .catch(err => {
          Toast(err)
        })
    },
    signOut () {
      this.setSignOut()
      Toast('退出成功！')
    }
  },
  created () {
  }
}
</script>

<style>
.icon-token {
  font-size: 1.375rem;
}
.user-avatar {
  width: 8rem;
  height: 8rem;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
