// house_pkg/pages/locate/index.
import qqmap from '../../../utils/qqmap'
import QQMap from '../../../utils/qqmap'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points: {},
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
// 获取用户经纬度
this.getLoaction()
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
  async getLoaction() {
    //  调用小程序api获取用户位置
    const {latitude, longitude} = wx.getLocation()
    // 获取周边小区
    this.getPoint(latitude, longitude)
  },
//   重新选择地址
chooseLocation() {
// 调用小程序重新获取新的位置
const {latitude, longitude} = wx.chooseAddress()
// 获取新的位置附近的小区
this.getPoint(latitude, longitude)
},
  getPoint(latitude, longitude) {
    //   根据经纬度来获取地址
    QQMap.reverseGeocoder({
        location: [latitude, longitude].join(','),
        success: ({result: {address}}) => {
            this.setData({address})
        },
        fail: (err) => {
            console.log(err);
        }
    })
    //   QQMap的方法
    QQMap.search({
        // 搜索关键词
        keyword: '住宅小区',
        location:[latitude, longitude].join(','),
        page_size: 5,
        success: (result) => {
            过滤多余的数据
            const points = result.map(({id, title, _distance}) => {
                return {id, title, _distance}
            })
            this.setData({points})
        }
    })
  }

})