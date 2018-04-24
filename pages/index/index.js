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
  onLoad: function () {
    console.log('onLoad');
  }
})
