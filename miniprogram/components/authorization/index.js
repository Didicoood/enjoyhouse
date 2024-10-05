// components/authorization/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
      attached() {
          const isLogin = !!getApp().token
          this.setData({
              isLogin
          })
        //   获取页面赞
        const pageStack = getCurrentPages()
        // 获取当前页面赞
        const currentPage = pageStack.pop()
          if(!isLogin) {
              wx.redirectTo({
                url: '/pages/login/index?redirectURL=/' + currentPage.route,
              })
          }
      }
  }
})