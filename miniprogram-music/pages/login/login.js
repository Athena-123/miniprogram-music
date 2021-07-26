import wxp from '../../utils/request'
// pages/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:'#d43b33',
    form:{
      telephone:"",
      password:""
    }
  },
  // 点击左上角返回首页
  goHome(e){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 用户登录按钮
  loginBtn(e){
    // console.log(e,"form");
    let tel = e.detail.value.tel;
    let pwd = e.detail.value.pwd
    wxp.request({
      url: `/login/cellphone?phone=${tel}&password=${pwd}`,
    }).then(({data:res})=>{
      console.log(res,"res");
      if(res.code == '400') {
        wx.showToast({
          title: '手机号错误',
          success:function(){
            wx.hideToast()
          },
          fail:function(){
            wx.hideToast()
          }
        })
      } else if(res.code == '502') {
        wx.showToast({
          title: '密码错误',
          success:function(){
            wx.hideToast()
          },
          fail:function(){
            wx.hideToast()
          }
        })
      } else if(res.code == '200') {
        // 代表登录成功
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.redirectTo({
      url: '/pages/index/index',
    })
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