//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      show:false,
      active:'active',
      lists:[
        {
          id:1,
          text:"今天你学习了吗",
          finish:false
        },{
          id:2,
          text:"知不知道？只有你能帮你自己",
          finish: false
        },
        {
          id: 3,
          text: "知不知道？只有你能帮你自己",
          finish: false
        },
        {
          id: 4,
          text: "知不知道？只有你能帮你自己",
          finish: false
        }]
  },
  showComfirm(){
    this.setData({show:true})
  },
  cancelComfirm(){
    this.setData({show:false})
  },
  addToDo(e){
   let lists = this.data.lists
   let item = {
     id:lists.length+1,
     text:e.detail,
     finish:false
   }
   if(e.detail){
     lists.unshift(item)
     this.setData({ lists: lists })
     this.cancelComfirm()
   }
  },
  destoryToDo(e){
    let index = e.currentTarget.dataset.index
    let lists = this.data.lists
    lists[index].finish=true
    this.setData({lists:lists})
    
  }
})
