// pages/tomato/tomato.js
import http from "../../utils/util.js"
Page({
  timer:null,
  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 5,
    fontSize:56,
    isTimeout:false,
    toggle:false,
    show:false,
    cancalBtn:false,
    finish:false,
    time:'',
    tomato:{}
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
    http("POST","/tomatoes").then(res=>{
      this.setData({ tomato:res.res.data.resource})
      console.log(this.data.tomato)
    })
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
      this.setData({isTimeout:true,finish:true})
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
    let content = e.detail
    http("PUT", `/tomatoes/${this.data.tomato.id}`,{
      description: content, aborted: true 
    }).then(res=>{
      wx.navigateBack({
        to:-1
      })
    })
  },
  cancel(){
    this.setData({show:false})
    this.onlyTimer()
    this.setData({ toggle: false })
  },
  again(){
    this.setData({ defaultSecond: 5, isTimeout:false})
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
  onHide(){
    if (this.data.defaultSecond !== 0){
      http("PUT", `/tomatoes/${this.data.tomato.id}`, {
        description: "退出放弃", aborted: true
      })
    }else{
      http("PUT", `/tomatoes/${this.data.tomato.id}`, {
        aborted: false
      })
    }
    
  },
  onUnload(){
    if (this.data.defaultSecond !== 0) {
      http("PUT", `/tomatoes/${this.data.tomato.id}`, {
        description: "退出放弃", aborted: true
      })
    } else {
      http("PUT", `/tomatoes/${this.data.tomato.id}`, {
        aborted: false
      })
    }
  },
  finishToDo(e){
    http("PUT", `/tomatoes/${this.data.tomato.id}`, {
      description: e.detail, aborted: false
    })
    this.setData({ finish: false })
  }
})