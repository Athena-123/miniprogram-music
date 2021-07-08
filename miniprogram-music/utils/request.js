let BaseURL = 'http://localhost:3000'
export default {
  request(options){
    return new Promise((reject,req)=>{
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: BaseURL + options.url,
        data:options.data,
        method:options.method || "GET",
        success:(res)=>{
          wx.hideLoading()
          return reject(res)
        },
        fail:(err)=>{
          wx.hideLoading()
          return req(err)
        }
      })
    })
  }
}