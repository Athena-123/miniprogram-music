// pages/video/video.js
import wxp from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabListInfo:[],    // 导航栏列表
    type:null,         // 标签列表选择项
  },

  handleType(event){
    const type = event.currentTarget.dataset.type;
    this.setData({
      type: type,
    });
  },

  // 得到每个列表下的视频
  getVideoItem(id){
    wxp.request({
      url:`/video/group?id=${id}`
    }).then(({data:res})=>{
      console.log(res,"video");
    })
  },

  getTabList(){
    wxp.request({
      url: '/video/group/list',
    }).then(({data:res})=>{
      if(res.code != '200') {
        wx.showToast({
          title: '导航栏标签列表数据获取失败！',
        })
      } else {
        this.setData({
          tabListInfo:res.data,
          type:res.data[0].id
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 判断用户是否授权登录
    wx.getSetting({
      success: function (res) {
        // 判断是否授权
        if (res.authSetting['scope.userInfo']) {
           //获取用户信息
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过，添加用户信息
              // var that = this
              //wx.setStorageSync('nickName', res.userInfo.nickName)
              //wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
              this.getTabList()
            }
          });
        } else{
          wx.showToast({
             title: '请授权登录！',
             icon: 'none',
             duration: 1500,
             success: function () {
             //定时器，未授权1.5秒后跳转授权页面
               setTimeout(function () {
                  wx.reLaunch({
                  url: '/pages/login/login',
                })
              }, 1500);
             }
            })
        }
      }
    })
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
    // if(res.msg == '需要登录') {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
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