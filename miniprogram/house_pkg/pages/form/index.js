// \u4e00-\u9fa5] 中文验证规则
// 表单兜底插件
import wxValidate from 'wechat-validate'
Page({
    // 注册插件，behavious类似vue2的mixin
    behaviors: [wxValidate],
  data: {
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
    point: '',
    building: '',
    room: '',
    name: '',
    gender: 1,
    mobile: '',
    idcardFrontUrl: '',
    idcardBackUrl: '',
  },
  rules: {
    name: [
        { required: true, message: '业主姓名不能为空!' },
      { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '业主姓名只能为中文!' },
    ],
    mobile: [
        { required: true, message: '业主手机号不能为空!' },
        { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号!' },
      ],
      idcardFrontUrl: [
        { required: true, message: '请上传身份证国徽面!' }
      ],
      idcardBackUrl: [
        { required: true, message: '请上传身份证照片面!' }
      ]
  },
//   提交审核
async submitForm() {
    // 验证数据
    if(!this.validate())return
    const {__webviewId__, status, ...data} = this.data
    const {code} = await wx.http.post('/room', data)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('提交数据失败!')
    // 返回房屋列表页面
    wx.navigateBack({
        delta: 4
    })
},
  onLoad({point, building, room, id}) {
    //   判断id是否编辑还是新增
    if(id) return this.getHouseDetail(id)
      this.setData({point, building, room})
  },
  async getHouseDetail() {
// 调用接口
const {code, data: houseList} = await wx.http.get('/room/' + id)
// 检擦接口成否
if(code !== 10000) return wx.utils.toast()
// 渲染数据
this.setData({...houseDetail})
  },
  async uploadPicture(ev) {
      const type = ev.mark.type
      try{

      
    // 打开相册或拍照
    const media = await wx.chooseMedia({
        count : 1,
        mediaType:['image'],
        sizeType: ['compressed']
    })
    wx.uploadFile({
      filePath: media.tempFiles[0].tempFilePath,
      name: 'file',
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: 'Bearer ' + getApp().token,
      },
      success: (result) => {
        const data = JSON.parse(result.data)
        if(data.code !== 10000) return wx.utils.toast('上传图片失败!')
        this.setData({[tyoe]: data.data.url})
      }
    })
}catch(err) {
    wx.utils.toast()
}
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
})
