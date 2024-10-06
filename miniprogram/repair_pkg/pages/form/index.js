import wxValidate from 'wechat-validate'
Page({
    behaviors: [wxValidate],
  data: {
    mobile:'',

    houseId: '',
    repairItemId:'',
    repairItemName: '',
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [{ name: '水路卫浴' }, { name: '电路灯具' }, { name: '管道疏通' }, { name: '开锁换锁' }],
    attachment: [],
    description: '',
    appointment: '',
    dateLayerVisible: false
  },
  rules: {
    houseId: [
        {required: true, message: '请选择报修房屋'}
    ],
    repairItemId: [
        {required: true, message: '请选择维修的项目!'}
      ],
      mobile: [
        {required: true, message: '请填写手机号码!'},
        {pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码!'},
      ],
      appointment: [
        {required: true, message: '请选择预约日期!'}
      ],
      description: [
        {required: true, message: '请填写问题描述!'}
      ],
  },
  async submitForm() {
    //   验证表单数据
    if(!this.validate()) return
    // 提取接口需要的数据
    const {id, houseId, repairItemId, mobile, appointment, description, attachment} = this.data
    // 调用接口
    const {code} = await wx.http.post('/repair', {
        id,
        houseId,
        repairItemId,
        mobile,
        appointment,
        description,
        attachment,
      })
      // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('在线报修失败!')
    // 跳转到报修列表页面
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  },
  onLoad({id}) {
    this.getRepairItem()
    // 判读id是否存在
    if(id) this.getRepairDetail(id)
  },
//   获取待修改的保修消息
async getRepairDetail(id) {
    // 调用接口
    const { code, data: repairDetail } = await wx.http.get('/repair/' + id)
    // 检测是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ ...repairDetail })
},
//   获取羡慕
async getRepairItem() {
// 调用接口
const { code, data: repairItem } = await wx.http.get('/repairItem')
// 检测接口是否调用成功
if (code !== 10000) return wx.utils.toast()
// 渲染数据
this.setData({ repairItem })
},
// 获取用户选择的维修羡慕
selectRepairItemInfo(ev) {
    this.setData({
        repairItemId: ev.detail.id,
      repairItemName: ev.detail.name,
    })
},
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
  async getHouseList() {
      // 调用接口
    const { code, data: houseList } = await wx.http.get('/house')
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ houseList })
  },
  selectHouseInfo(ev) {
      this.setData({
        houseId: ev.detail.id,
        houseName: ev.detail.name,
      })
  },
  selectDateInfo(ev) {
      this.setData({
        appointment: wx.utils.dataFormat(ev.detail),
        dateLayerVisible: false,
      })
  },

  uploadPicture(ev) {
    //  上传的文件消息
    const {file} = ev.detail
    // 调用微信的api上传
    wx.uploadFile({
      filePath: file.url,
      name: 'file',
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: 'Bearer ' + getApp().token
      },
      success: (result) => {
        // 处理成功的json数据
        const data = JSON.parse(result.data)
        // 检测接口是否调用成功
        if (data.code !== 10000) return wx.utils.toast('文件上传失败!')
        // 先获取之前的图片
        const {attachment} = this.data
        // 追加新 的上床的图片
        attachment.push(data.data)
        // 渲染数据
        this.setData({attachment})
      }
    })
  }
})
