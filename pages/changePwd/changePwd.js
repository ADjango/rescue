// pages/changePwd/changePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    phone: '',
    newInputPassword: '',
    newInputAgainPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindPhoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },

  bindPasswordInput(e){
    this.setData({
      newInputPassword: e.detail.value
    })
  },

  bindPasswordInputAgain(e){
    this.setData({
      newInputAgainPassword: e.detail.value
    })
  },

  onSubmit(){
    if (this.data.newInputPassword !== this.data.newInputAgainPassword) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一样，请重新输入！',
        showCancel: false
      })
    }
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