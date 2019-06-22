// pages/login/login.js
import http from "../../utils/util.js"
let globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login(e){
    let app_id = globalData.app_id
    let app_secret = globalData.app_secret
    let iv = e.detail.iv
    let encrypted_data = e.detail.encryptedData
    let code
    
    wx.login({
      success(res) {
        code=res.code
        http("POST","/sign_in/mini_program_user",{
           app_id,
           app_secret,
           iv,
           encrypted_data,
           code
         }).then(res=>{
           let token = res.res.header["X-token"]
           wx.setStorageSync("X-token", token)
           wx.setStorageSync("me", res.res.data.resource)
           wx.reLaunch({
             url: '/pages/index/index',
           })
         })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync("me")){
      wx.reLaunch({
        url: '/pages/index/index',
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