Page({
    data: {
        houseDetail: {}
    },
    onLoad(id) {
        this.getHouseDetail(id)
    },
    async getHouseDetail(id) {
        if(!id) return wx.utils.toast('params error')
        const {code, data: houseDetail} = await wx.http.get('/room/' + id)
        // 检查接口成否
        if(code !== 10000) return wx.utils.toast()
        // 渲染数据
        this.setData({
            houseDetail
        })
    },
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index',
    })
  },
  
})
