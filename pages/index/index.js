//index.js
//获取应用实例

var app = getApp()
Page({
  data: {
  },
  toDetail: function (event) {
    wx.navigateTo({
      url: '/pages/view-scale/index',
    })
  },
  getQRcode: function (event){
    wx.scanCode({
      success: (res) => {
        console.log(res);
        app.globalData.location = res.result;
        wx.navigateTo({
          url: '/pages/view-scale/index',
        })
      }
    })
    
  },
  onLoad: function () {
    console.log('onLoad');
    wx.navigateTo({
      // url: '/pages/view-scale/index',
      url: '/pages/view-scale-chose/index',
      
    })
  }
})
