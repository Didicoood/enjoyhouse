import wxValidate from 'wechat-validate'
const app = getApp()
Page({
    onLoad({redirectURL}) {
        this.redirectURL = redirectURL
    },
  data: {
    countDownVisible: false,
    mobile: '',
    code: '',
    redirectURL: ''
  },
  behaviors:[wxValidate],
  rules: {
    mobile: [
        {required: true, message: '请填写手机号码!'},
        {pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!'}
    ],
    code: [
        {required: true, message: '请填写验证码!'},
      {pattern: /^\d{6}$/, message: '请填写正确的验证码!'}
    ]
  },
//   获取验证码



  async getSMSCode() {
    const {valid, message} = this.validate('mobile')
    if(!valid) return wx.utils.toast(message)
    this.setData({
        countDownVisible: true  
    })
    const res = await wx.http.get('/code', {mobile: this.data.mobile})
    if(res.data.code !== 10000) return  wx.utils.toast('发送失败，稍后重试!')
  },
 async submitForm() {
    //  兜底
    if(!this.validate()) return
    // 调用接口
    const res = await wx.http.post('/login', {
        mobile: this.data.mobile,
        code: this.data.code
      })
      console.log(res);
      if(res.data.code !== 10000) return wx.utils.toast('登录失败，稍后重试!')
      app.setToken('token', res.data.data.token)
      app.setToken('refreshToken', res.data.data.refreshToken)
      wx.redirectTo({
        url: this.redirectURL,
      })
  },
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
})
