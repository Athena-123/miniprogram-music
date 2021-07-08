// index.js
import wxp from '../../utils/request'
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false
    swiperList: [],
    // 导航栏信息
    navInfo:[
      {
        icon:"iconfont icon-meirituijian-",
        id:1,
        text:'每日推荐'
      },
      {
        icon:"iconfont icon-gedan1",
        id:2,
        text:'歌单'
      },
      {
        icon:"iconfont icon-icon-ranking",
        id:3,
        text:'排行榜'
      },
      {
        icon:"iconfont icon-diantai",
        id:4,
        text:'电台'
      },
      {
        icon:"iconfont icon-zhiboguankanliangbofangsheyingshexiangjixianxing",
        id:5,
        text:'直播'
      },
    ],
    songList:[],      // 推荐歌曲列表
    onceSongItem:[],  // 每次滚动获取新的推荐歌曲数据
    topList:[]        // 排行榜列表
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getSwiperList()
    this.getSongInfo(6)
    this.getTopInfo(6)
  },
  getSwiperList(){
      wxp.request({
        url: '/banner',
      }).then(({data:res})=>{
        if(res.code != '200'){
          wx.showToast({
            title: res.errMsg || '轮播图数据获取失败!',
          })
        } else {
          this.setData({
            swiperList : res.banners
          })
        }
      })
  },
  getSongInfo(limit){
    wxp.request({
      url:"/personalized?limit=" + limit
    }).then(({data:res})=>{
      if(res.code != "200") {
        wx.showToast({
          title: '推荐歌曲数据获取失败！',
        })
      } else {
        let arr = [...this.data.songList,...res.result];
        let obj = {}
        let ress = arr.reduce((current,item)=>{
          obj[item.id] ? "" : (obj[item.id] = true && current.push(item))
          return current
        },[])
        this.setData({
          songList:ress,
          onceSongItem:res.result
        })
      }
    })
  },
  getTopInfo(idx){
    wxp.request({
      url:"/top/list?idx=" + idx,
    }).then(({data:res})=>{
      console.log(res,"res");
      if(res.code != "200"){
        wx.showToast({
          title: '排行榜数据获取失败！',
        })
      } else {
        // this.setData({
        //   topList:
        // })
      }
    })
  },
  scroll(e) {
    if(this.data.onceSongItem.length > 0) {
      let length = this.data.songList.length + 5;
      this.getSongInfo(length)
    } else {
      return
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
