// pages/tomato/tomato.js
Page({
  timer:null,
  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 1500,
    fontSize:56,
    isTimeout:false,
    toggle:false,
    show:false,
    time:''
  },
  initTime(){
    let m = Math.floor(this.data.defaultSecond / 60) 
    let s = Math.floor(this.data.defaultSecond % 60)
    if(m<10){
      m="0"+m
    }
    if(s<10){
      s="0"+s
    }
    let time = `${m}:${s}`
    this.setData({time:time})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onlyTimer()
  },
  startTimer(){
    this.timer = setInterval(() => {
      this.data.defaultSecond--
      this.clearTimer()
      this.initTime()
    }, 1000)
  },
  clearTimer(){
    if (this.data.defaultSecond === 0) {
      this.xxx()
      this.setData({isTimeout:true})
      return
    }
  },
  stop(){
    if(this.data.toggle){
      this.onlyTimer()
    }else{
      this.xxx()
    }
    this.setData({ toggle: !this.data.toggle})
  },
  abando(){
    this.setData({show:true})
    this.xxx()
  },
  comfirmAbando(e){
    console.log(e.detail)
  },
  cancel(){
    this.setData({show:false})
    this.onlyTimer()
    this.setData({ toggle: false })
  },
  again(){
    console.log(1)
    this.setData({ defaultSecond: 1500, isTimeout:false})
    this.startTimer()
  },
  onlyTimer(){
    if(!this.timer){
      this.startTimer()
    }
  },
  xxx(){
    clearInterval(this.timer)
    this.timer=null
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