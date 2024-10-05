// app.js
import '/utils/utils.js'
import '/utils/http.js'
App({
  globalData: {},
  onLaunch(){
this.getToken()
  },
  getToken() {
    //   将token数据记录到应用实例中
    this.token = wx.getStorageSync('token')
    this.refreshToken = wx.getStorageSync('refreshToken')
  },
  setToken(key, token) {
      this[key] = token
    wx.setStorageSync(key, token)
  }
})
