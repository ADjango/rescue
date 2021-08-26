#准备工作
git, 微信开发者工具

##小程序后台配置：
小程序注册及发布流程参考：https://developers.weixin.qq.com/miniprogram/introduction/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%B3%A8%E5%86%8C
AppID
1. 进入微信公众平台：https://mp.weixin.qq.com/
2. 在设置中找到AppID(小程序ID)
3. 替换project.config.json中的appid

##腾讯地图位置服务 key(免费)：
将一下文件中的key替换成你刚申请的key
- complete.js
- dispatch.js
- finance.js
- inprogress.js
- new.js
```javascript
  var QQMapWX = require('../../static/qqmap-wx-jssdk.js')
  const qqmapsdk = new QQMapWX({
    key: '你申请的key'
  });
```
        
#小程序项目结构：
##主要分为三大块：
- 个人信息
   - 个人登录，个人信息修改(修改密码)
- 首页展示
- 详情展示
   - 几种不同类型的任务详情分别做了一个页面，方便随时新增删减内容
      - 最新任务："pages/new/new"
      - 进行中的任务："pages/inprogress/inprogress"
      - 已完成任务："pages/complete/complete"
      - 调度待审核："pages/dispatch/dispatch"
      - 财务待审核："pages/finance/finance"
