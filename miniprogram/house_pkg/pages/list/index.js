Page({
  data: {
    dialogVisible: false,
    houseList: [],
    isEmpty: false
  },
  onshow() {
    // 获取列表
    this.getHouseList()
  },
  goDetail(ev) {
    wx.navigateTo({
        url: '/house_pkg/pages/detail/index?id=' + ev.mark.id
    })
  },
 async getHouseList() {
    // 调用接口
    const {code, data: houseList} = await wx.http.get('/room')
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({
        houseList,
        isEmpty:houseList.length === 0
    })
  },
  swipeClose(ev) {
    const { position, instance } = ev.detail
    if(position === 'right') {
        // 显示对话款
        this.setData({dialogVisible: true,})
        // 记录id和索引，请求时用到
        this.cellId = ev.mark.id
        this.cellIndex = ev.mark.index
        // 滑块关闭
        instance.close()
    }
  },

  goDetail() {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index',
    })
  },
  dialogClose(ev) {
// 点击确定删除数据
if(ev.detail === 'confirm') this.deleteHouse()
  },
  async deleteHouse() {
    if(!this.cellId) return wx.utils.toast('参数有误!')
    // 调用接口
    const { code } = await wx.http.delete('/room/' + this.cellId)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 删除数据
    this.data.houseList.splice(this.cellIndex, 1)
    // 渲染数据
    this.setData({
        houseList: this.data.houseList,
        isEmpty: this.data.houseList.length === 0,
    })
  },
  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
