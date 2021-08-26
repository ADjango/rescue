// pages/complete/complete.js
const testAPI = [
  '/new',
  '/inprogress',
  '/complete',
  '/dispatch',
  '/finance'
]
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let missiontype = options.missiontype
    this.getMissionList(missiontype)
  },

  getMissionList(missiontype){
    let apiurl = testAPI[missiontype-1]
    wx.request({
      url: 'https://www.fastmock.site/mock/83f4a99542db6937dbc6ffb19e61e443/api'+apiurl,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.statusCode == 200) {
          console.log(res.data)
          this.setData({missionList: res.data.data})
        }
      }
    })
  },

  toDetailPage(e){
    let missionId = e.currentTarget.dataset.id
    let missiontype = e.currentTarget.dataset.missiontype
    let pageurl = testAPI[missiontype-1]
    wx.navigateTo({
      url: '/pages' + pageurl + pageurl + '?missionId='+missionId,
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