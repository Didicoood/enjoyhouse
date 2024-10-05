// pages/notify/index.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
      notices: []
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.getNotices()
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
    // 调用公告列表接口
    async getNotices() {
      // 请求接口
      const {data:{code, data: notices, message}} = await wx.http.get('/announcement')
      // 检测接口是否调用成功
      console.log(code);
      if(code !== 10000) return wx.utils.toast(message)
      // 渲染数据
      this.setData({notices})
    }
  })