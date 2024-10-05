const app = getApp()
Page({
    data: {
        avatar: '',
        nickName:''
      },
      onLoad() {
        app.token && this.getUserProfile()
      },
      async getUserProfile() {
        // 调用接口获取昵称和头像
     const {data: {code, data: {avatar, nickName}}} = await wx.http.get('/userInfo')
     // 检测接口是否正常返回结果
     if(code !== 10000) return wx.utils.toast()
     // 渲染数据
     this.setData({avatar, nickName})
   },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
})
