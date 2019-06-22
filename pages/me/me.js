// pages/me/me.js
import http from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabName:"tomato",
    height:0,
    tomatoes:{},
    todos:{}
  },
  choose(e){
    let name = e.currentTarget.dataset.name
    this.setData({tabName:name});
  },
  getScrollWidth(){
    const res = wx.getSystemInfoSync()
    let windowHeight = res.windowHeight
    let query = wx.createSelectorQuery().in(this);
    query.select('.header').boundingClientRect();
    query.select('.tab').boundingClientRect();
    query.exec((res) => {
      // 分别取出navbar和header的高度
      let headerHeight = res[0].height;
      let tabHeight = res[1].height;

      // 然后就是做个减法
      let scrollViewHeight = windowHeight - headerHeight - tabHeight;

      // 算出来之后存到data对象里面
      this.setData({
        height: scrollViewHeight
      });
    });
  },
  onShow(){
    this.fetchTomatos()
    this.fetchTodos()
  },
  fetchTomatos(){
    http("GET","/tomatoes",{
      is_group: "yes"
    }).then(res=>{
      this.setData({ tomatoes:res.res.data.resources})
    })
  },
  fetchTodos(){
    http("GET","/todos",{
      is_group: "yes"
    }).then(res => {
      this.setData({ todos: res.res.data.resources })
    })
  },
  onLoad(){
    this.getScrollWidth()
  }
})