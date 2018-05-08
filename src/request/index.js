import axios from 'axios'
import { Indicator } from 'mint-ui'

export function request (url, method = 'GET', loading = false) {
  return new Promise((resolve, reject) => {
    if (loading) {
      Indicator.open()
    }
    axios({
      method: method,
      url: '/api' + url
    }).then((res) => {
      resolve(res.data)
      Indicator.close()
    }).catch((err) => {
      Indicator.close()
      reject(err)
    })
  })
}

export default {
  Login (token) {
    return request(`/accesstoken?accesstoken=${token}`, 'POST')
  },
  UserInfo (name) {
    return request(`/user/${name}`, 'GET')
  },
  Topic (params) {
    return request(`/topics/${params}`, 'GET', true)
  },
  TopicsDetail (id) {
    return request(`/topic/${id}`, 'GET', true)
  },
  ReplyUp (id, token) {
    return request(`/reply/${id}/ups?accesstoken=${token}`, 'POST')
  },
  CollectTopic (id, token) {
    return request(`/post/topic_collect/collect?accesstoken=${token}&topic_id=${id}`, 'POST')
  },
  Delcollect (id, token) {
    return request(`/post/topic_collect/de_collect?accesstoken=${token}&topic_id=${id}`, 'POST')
  },
  PostTopic (form) {
    return request(`/topics?${form}`, 'POST', true)
  }
}
