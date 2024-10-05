const utils = {
    /**
     * 消息反馈
     */
    toast(title = '数据加载失败') {
        wx.showToast({
          title,
          mask: true,
          icon: 'none'
        })
    }
}
// 挂在全局
wx.utils = utils

// 模块导出
export default utils