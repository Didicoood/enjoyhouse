import http from 'wechat-http'

// 配置基础路径
http.baseURL = 'https://live-api.itheima.net'
// 配置拦截器
http.intercept.request = function (options) {
    // heade
    const defaultHeader = {}
    defaultHeader.Authorization = 'Bearer ' + getApp().token
    options.header = Object.assign({}, defaultHeader, options.header)
    return options
}
//配置响应拦截器
http.intercept.response = async function({data, config}) {
    if(data.code === 401) {
        // if the toke outdate, redirecting to login
        if(config.url.includes('/refreshToken')) {
            const pageStack = getCurrentPages()
            const currentPage = pageStack.pop()
            const redirectURL = currentPage.route
            // 跳转到login页面
            wx.redirectTo({
                url: '/pages/login/index?redirectURL=/' + redirectURL,
            })
        }
        const app = getApp()
        // 调用接口获取新的token
        const res = await http({
            url: '/refreshToken',
            method: 'POST',
            header: {
                Authorization: 'Bearer ' + app.refreshToken,
            }
        })
        // 判断请求全款
        if (res.code !== 10000) return wx.utils.toast('更新token失败!')
        // 重新存储token
        app.setToken('token', res.data.token)
    app.setToken('refreshToken', res.data.refreshToken)
    // 在重新刷新token后再次发起业务请求
    config = Object.assign(config, {
        header: {
            // 更新后的 token
        Authorization: 'Bearer ' + res.data.token,
        }
    })
    // 重新发起业务请求
    return http(config)
    }
    return data
}
// 挂在全局
wx.http = http

// 导出
export default http