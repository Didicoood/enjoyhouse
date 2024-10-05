// pages/profile/index.ts
const app = getApp()
let pageStack = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName:''
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      const app = getApp()
      this.setData({...app.userProfile})
    app.token && this.getUserProfile()
  },
  async getUserProfile() {
       // 调用接口获取昵称和头像
    const {data: {code, data: {avatar, nickName}}} = await wx.http.get('/userInfo')
    // 检测接口是否正常返回结果
    if(code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({avatar: avatar |'', nickName})
    //将用户和头像存放在应用实例中
    app.userProfile = {avatar, nickName}
  },
  getUserNickname(ev) {
    this.updateNickname(ev.detail.value)
  },
//   获取昵称
async updateNickname(nickName) {
    if(nickName === '' ) return
    const res = wx.http.put('/userInfo', {nickName})
    if(res.code !== 10000) return wx.utils.toast('更新昵称失败!')
    // 借助页面站更新pages/my/index的昵称
    pageStack[0].setData({nickName})
    const app = getApp()
    app.userProfile.nickName = nickName
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
//   获取头像
getUserAvatar(ev) {
    this.updateAvatar(ev.detail.avatarUrl)
},
 async updateAvatar(avatar) {
    // 嗲用api上床
    wx.uploadFile({
        // 后端的接口地址
        url:wx.http.baseURL + '/upload',
        // 待上传的临时路径
      filePath: avatar,
    //   后端约定
      name: 'file',
      header: {
          // 用户登录状态
        Authorization: 'Bearer ' + getApp().token
      },
      formData: {type: 'avatar'},
      success:(result)=>{
          // 处理返回的数据
        const data = JSON.parse(result.data)
        // 检测接口是否调用成功
        if(data.code !== 10000) return wx.utils.toast('上传头像失败!')
        // 接触页面站更新头像
        pageStack[0].setData({avatar: data.data.url})
        const app = getApp()
        app.userProfile.avatar = data.data.url
      }
    })
}
})