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

  getTabList(){
    wxp.request({
      url: '/video/group/list',
    }).then(({data:res})=>{
      console.log(res,"list");
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
    this.getTabList()
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