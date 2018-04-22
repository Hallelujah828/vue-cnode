var moment = require('moment')

export const tabFormat = (tab) => {
  switch (tab) {
    case 'share':
      return '分享'
    case 'good':
      return '精华'
    case 'ask':
      return '问答'
    case 'job':
      return '招聘'
  }
}

export const timeFormat = (time) => {
  moment.locale('zh-cn')
  return moment(time).fromNow()
}
