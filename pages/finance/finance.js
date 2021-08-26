// pages/finance/finance.js
const util = require('../../utils/util.js')
var QQMapWX = require('../../static/qqmap-wx-jssdk.js')
const qqmapsdk = new QQMapWX({
  key: 'FTOBZ-EHCWP-ECCDE-LOALS-26J6H-WZFKL'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    missionInfo: {
      // rescueLocation: '四川省成都市高新区天府二街',
      // checkLocation: '四川省成都市高新区天府三街',
      // driverInfo:{
      //   name: 'lucas',
      //   phone: '18889899090'
      // },
      // vehicleInfo: '川ANE777',
      // orderFee: {
      //   fee: 200.00,
      //   type: '现金'
      // },
      // dispatchInfo: {
      //   name: 'john',
      //   time: '8/23 12:00'
      // },
      // rescueInfo: {
      //   name: 'matin',
      //   carLicense: '川A88888',
      //   time: '8/23 13:00'
      // },
      // missionRemark: '',
    },
    additionalFee: 200,
    additionalInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //id
    let missionId = options.missionId
    //get info by id
    this.getInfoById(missionId)
  },

  getInfoById(id){
    wx.request({
      //the API url maybe like this https://www.fastmock.site/mock/83f4a99542db6937dbc6ffb19e61e443/api/info/{id}
      url: 'https://www.fastmock.site/mock/83f4a99542db6937dbc6ffb19e61e443/api/info',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.statusCode == 200) {
          console.log(res.data)
          this.setData({missionInfo: res.data.data.missionInfo})
        }
      }
    })
  },

  openRescueLocation(e){
    let location = e.currentTarget.dataset.location
    qqmapsdk.geocoder({
      address: location,
      success: function(res) {
        console.log(res)
        let latitude = res.result.location.lat
        let longitude = res.result.location.lng
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: "救援地点",
          address: location
        })
      }
    })
  },

  openCheckLocation(e){
    let location = e.currentTarget.dataset.location
    qqmapsdk.geocoder({
      address: location,
      success: function(res) {
        console.log(res)
        let latitude = res.result.location.lat
        let longitude = res.result.location.lng
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: "托运地点",
          address: location
        })
      }
    })
  },

  phoneCall(e){
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
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