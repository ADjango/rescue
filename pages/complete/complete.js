// pages/detail/detail.js
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
    uploadImages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02',
      success: (location) => {
        console.log(location)
        const latitude = location.latitude
        const longitude = location.longitude
        qqmapsdk.reverseGeocoder({
          location:''+latitude+','+longitude,
          success: getlocation => {
            console.log(getlocation)
            let user_location = getlocation.result.address
            let user_recommend_location = getlocation.result.formatted_addresses.recommend
            this.setData({user_location,user_recommend_location})
          }
        })
      }
    })

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

  takePhoto() {
    console.log("taking photo.....")
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          tempfilePaths: res.tempFilePaths[0],
          istake: 1,
          backgroundimage: res.tempFilePaths[0],
          background: ""
        })
        console.log(res)
        if (!that.data.needUpload) {
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: (ress) => {
              console.log(ress)
              let date = util.formatTime(new Date());
              
              let user_location = 'dddd'
              let ctx = wx.createCanvasContext('firstCanvas')
              let textToWidth = ress.width / 3 * 0.5
              let textToHeight = ress.height / 3 * 0.9
              that.setData({
                canvasHeight: ress.height / 3,
                canvasWidth: ress.width / 3
              })

              //将图片src放到cancas内，宽高为图片大小
              ctx.drawImage(res.tempFilePaths[0], 0, 0, ress.width / 3, ress.height / 3)
              //将声明的时间放入canvas
              ctx.setFontSize(14) //注意：设置文字大小必须放在填充文字之前，否则不生效
              ctx.setFillStyle('blue')
              ctx.fillText(date, 0, textToHeight)
              ctx.fillText(that.data.user_location, 0, textToHeight+20)
              ctx.fillText(that.data.user_recommend_location, 0, textToHeight+40)
              // ctx.strokeText(date, ress.width, ress.height)
              wx.showLoading({
                title: '制作水印中...',
              })
              ctx.draw(false, () => {
                setTimeout(()=>{
                  wx.canvasToTempFilePath({
                    canvasId: 'firstCanvas',
                    success: (res) => {
                      console.log(res)
                      that.setData({
                        backgroundimage: res.tempFilePath,
                        shuiyinPaths: res.tempFilePath,
                        uploadImages: that.data.uploadImages.concat(res.tempFilePath)
                      })
                      wx.hideLoading()
                    },
                    fail: (e) => {
                      console.log(e)
                    }
                  })
                },500)
                }
              )

            }
          })
        }

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: this.data.uploadImages[e.currentTarget.id], // 当前显示图片的http链接
      urls: this.data.uploadImages // 需要预览的图片http链接列表
    })
  },

  onsubmit(){
    console.log("submit mission")
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