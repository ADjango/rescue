// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: '',
    userPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isLogin = this.checkUserStatus()
    this.setData({isLogin: isLogin})
    if(isLogin) {
      this.getAllList()
    }
  },

  toListPage(e){
    let missiontype = e.currentTarget.dataset.missiontype
    wx.navigateTo({
      url: '/pages/list/list?missiontype='+missiontype,
    })
  },

  toChangePwd(){
    wx.navigateTo({
      url: '/pages/changePwd/changePwd',
    })
  },

  bindPhoneInput(e){
    this.setData({
      userPhone: e.detail.value
    })
  },

  bindPasswordInput(e){
    this.setData({
      userPassword: e.detail.value
    })
  },

  loginSubmit(){
    console.log("user login here")
    //post phone and password to API
    //get user info back
    
    if (this.data.userPhone == '11' & this.data.userPassword == '11') {
      this.setData({isLogin: true})
      this.getUserInfo()
    }
  },

  checkUserStatus(){
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({userInfo})
      //如果上次登录和本次进入小程序的时间超过一段时间，就需要用户重新登陆(如需使用JWT，请自行添加逻辑)
      // if (new Date() - userInfo.lastLoginDateTime) {
      //   return false
      // }
      return true
    } else return false
  },

  getUserInfo(){
    //get user info & set to local storage
    wx.request({
      url: 'https://www.fastmock.site/mock/83f4a99542db6937dbc6ffb19e61e443/api/user',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.statusCode == 200) {
          let userInfo = res.data.data
          let lastLoginDateTime = new Date()
          wx.setStorageSync('userInfo', {...userInfo,lastLoginDateTime:lastLoginDateTime})
          this.setData({userInfo: res.data.data})
        }
      }
    })
  },

  getAllList(){
    wx.request({
      url: 'https://www.fastmock.site/mock/83f4a99542db6937dbc6ffb19e61e443/api/all',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.statusCode == 200) {
          console.log(res.data.data)
          this.setData({allmission: res.data.data})
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})