Component({
  data: {
    contentValue:""
  },
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:""
    },
    show:{
      type:Boolean,
      value:false
    },
    cancel:{
      type:Boolean,
      value:true
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue(e){
      // this.setData({contentValue:e.detail.value})
      this.data.contentValue = e.detail.value //赋值但不改变他
    },
    showConfirm(event){
      this.triggerEvent('comfirm', this.data.contentValue)
    },
    cancelConfirm(){
      this.triggerEvent('cancel', "")
    }
  }
})
