let globalData = getApp().globalData

const http = (method,url,data)=>{
  return new Promise((resolve, reject)=>{
    wx.request({
      url: `${globalData.host}${url}`,
      method:method,
      data: data,
      header: {
        Authorization: `Bearer ${wx.getStorageSync('X-token')}`,
        "t-app-id": globalData.t_app_id,
        "t-app-secret": globalData.t_app_secret
        
      },
      dataType:"json",
      success(res) {
        let statusCode =res.statusCode
        if (statusCode >=400){
          reject({statusCode,res})
        }else{
          resolve({statusCode, res})
        }
      },
      fail(error){
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
        reject(error)
      }
    })
  })
}

export default http