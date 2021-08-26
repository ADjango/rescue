// app.js
App({
  onLaunch() {
    //判断本地是否存有用户信息，如果没有需要用户重新登陆
    //如果上次登录和本次登录的时间超过多久，就需要用户重新登陆(如需使用JWT，请自行添加逻辑)
    
  },
  globalData: {
    userInfo: null
  }
})
