//index.js
//获取应用实例
const app = getApp()
import http from "../../utils/util.js"

Page({
  data: {
      show:false,
      active:'active',
      fadeOut:"fadeOut",
      lists:[]
  },
  onShow(){
    http("GET","/todos?completed=false").then(res=>{
      this.setData({ lists: res.res.data.resources})
    })
  },
  showComfirm(){
    this.setData({show:true})
  },
  cancelComfirm(){
    this.setData({show:false})
  },
  addToDo(e){

   let lists = this.data.lists
   
   if(e.detail){
     http("POST", "/todos", {
       description: e.detail
     }).then(res=>{
       let item = {
         id: res.res.data.resource.id,
         description: e.detail,
         completed: false
       }
       lists.unshift(item)
       this.setData({ lists: lists })
       this.cancelComfirm()
     })
     
   }
  },
  destoryToDo(e){
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    http("PUT", `/todos/${id}`,{
      completed:true
    }).then(res=>{
      let lists = this.data.lists
      lists[index].completed = true
      this.setData({ lists: lists, fadeOut:"fadeOut fadeOut-none" })
      setTimeout(()=>{},10000)
    })
    
    
    
  }
})
