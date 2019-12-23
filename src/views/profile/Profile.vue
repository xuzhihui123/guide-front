<template>
  <div id="profile">
    <div class="profile-top_bg">

      <img src="~assets/mybg.png" alt="">
      <div class="profile-top_login_view">
        <!--        头像-->
        <img :src="singleUserInfo.user_avatar || getDefaultAvator" alt="">

        <!--        头像的照相机图标-->
        <span class="camera-icon" v-show="changeUpLoader">
           <img src="~assets/camera.svg" alt="">
        </span>

        <!--        这边覆盖了头像 可以input1点击-->
        <van-uploader :after-read="afterRead" :before-read="beforeRead" :max-count="1" v-model="imgList"
                      :preview-image="false" v-if="changeUpLoader">
          <div class="avator-change">

          </div>
        </van-uploader>
        <div class="submit-login" @click="toLogin" v-show="topSubmitLogin">
          点击登录
        </div>
        <div class="profile-top_login_view_detail" v-show="topProfileView">
          <div class="top">
            <span class="nick_name">{{singleUserInfo.user_nick}}</span>
            <p class="nick_name_profile" @click="goProfileDetail"><span>编辑资料</span>
              <van-icon name="arrow" color="#ccc" size="0.3rem"/>
            </p>
          </div>
          <div class="bottom">
            <p class="fenxsi">粉丝<span>0</span></p>
            <p class="guanzhu">关注<span>0</span></p>
          </div>
        </div>
      </div>
    </div>
    <profile-list class="profilelist" :iphone-code="singleUserInfo.user_phone || ''"/>


    <div class="cropper-wrapper" v-show="cropperView">
      <vue-cropper
              ref="cropper"
              :mode="option.mode"
              :img="option.img"
              :outputType="option.outputType"
              :info="false"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="option.fixedBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :canScale="option.canScale"
      ></vue-cropper>
      <div class="cropper-btn">
        <a @click="hiddenCropperView">取&nbsp;消</a>
        <a @click="finish('base64')">确&nbsp;定</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  //导入组件
  import ProfileList from 'views/profile/children/ProfileList'
  import {VueCropper} from 'vue-cropper'


  //导入network
  import {submitAvator, changeUserAvator, getUserInfoById} from "network/profile";


  //导入工具commonjs
  import baseTofile from 'commonjs/base64'

  export default {
    name: "Profile",
    components: {
      ProfileList,
      VueCropper
    },
    data() {
      return {
        singleUserInfo: {},
        topProfileView: false,
        topSubmitLogin: true,
        //默认头像地址
        getDefaultAvator: require('assets/avator.png'),
        imgList: [],


        //cropper出现和隐藏
        cropperView: false,
        // cropper配置的参数
        option: {
          img: '',//裁切图片的地址
          outputSize: 1,//裁剪生成图片的质量 0.1-1
          full: false,//是否输出原图比例的截图
          outputType: 'png',//裁剪生成图片的格式
          canMove: true,//上传图片是否可以移动
          fixedBox: false,//固定截图框大小 不允许改变
          original: false,//上传图片按照原始比例渲染
          canMoveBox: true,//截图框能否拖动
          autoCrop: true,//是否默认生成截图框
          autoCropWidth: 200,
          autoCropHeight: 200,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1],
          canScale: true,
          mode: '100%'
        },
      }
    },
    methods: {
      //跳到登录页
      toLogin() {
        this.$router.push('/login')
        this.changeTabBarShow(false)
      },

      ...mapMutations(['changeTabBarShow']),

      //获取localstorage的用户信息
      getUserInfo() {
        this.singleUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      },


      //读取头像之后 可发ajax给后台
      afterRead(file) {


        this.option.img = file.content
        this.cropperView = true

        // let f = new FormData()
        // f.append('file', data.file)
        //
        // submitAvator(f).then(r => {
        //   console.log(r);
        // })

      },

      //读取头像之前 判断上传文件
      beforeRead(file) {
        if (!(/\/(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/.test(file.type))) {
          this.$toast({
            type: 'fail',
            message: '您上传的不是图片格式哦~',
            icon: 'cross',
            duration: 1500
          })
          return false
        } else {
          return true
        }
      },

      //截图完成
      finish(type) {
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob(() => {

          })
        } else {
          this.$refs.cropper.getCropData((data) => {

            //转换file对象 上传服务器
            let TrueFile = baseTofile.dataURLtoFile(data, 'avator')

            let d = new FormData()
            d.append('file', TrueFile)


            submitAvator(d).then(r => {
              if (r.length === 0) {
                this.$toast({
                  type: 'fail',
                  message: '上传头像失败!',
                  icon: 'cross',
                  duration: 1500
                })
                this.cropperView = false
                //清空
                this.imgList = []
              } else {
                changeUserAvator({
                  userAvatar: r,
                  userId: this.singleUserInfo.user_id
                }).then(res => {
                  if (res.code === '200') {
                    this.$toast({
                      type: 'success',
                      message: '头像更换成功！',
                      duration: 1500
                    })
                    //隐藏cropper剪切
                    this.cropperView = false
                    //清空
                    this.imgList = []
                    //重新获取个人用户信息
                    getUserInfoById({userId: this.singleUserInfo.user_id}).then(resData => {
                      if (resData.status.code === '200') {
                        //获取新的用户信息
                        let {user_avatar: change_user_acator} = resData.data
                        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                        //跟改本地头像地址储存
                        userInfo.user_avatar = change_user_acator
                        //跟改本地头像地址储存
                        localStorage.setItem('userInfo',JSON.stringify(userInfo))
                        this.getUserInfo()
                      }
                    })
                  }
                })
              }
            })
          })
        }
      },
      //取消截图  就隐藏cropper
      hiddenCropperView() {
        // this.$refs.cropper.stopCrop()
        this.cropperView = false

        //清空
        this.imgList = []
      },


      goProfileDetail(){
        this.$router.push('/profiledetail')
      },

    },
    created() {
      this.getUserInfo()
    },
    watch: {
      singleUserInfo(newValue) {
        if (newValue.user_nick !== undefined) {
          this.topProfileView = true
          this.topSubmitLogin = false
        } else {
          this.topProfileView = false
          this.topSubmitLogin = true
        }
      }
    },
    computed: {
      changeUpLoader() {
        if (this.singleUserInfo.user_nick !== undefined) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .profile-top_bg {
    position: relative;

    img {
      width: 100%;
      height: 3rem;
    }

    .profile-top_login_view {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      width: 95%;
      position: absolute;
      height: 1.6rem;
      border-radius: 0.2rem;
      left: 50%;
      display: flex;
      align-items: center;
      flex-direction: row;
      transform: translateX(-50%);
      bottom: -0.8rem;
      background-color: #fff;
      box-shadow: 0.01rem 0.15rem 0.3rem rgba(0, 0, 0, 0.15);

      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }

      span.camera-icon {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        background-color: var(--main-color);
        border-radius: 50%;
        left: 1.1rem;
        top: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 0.2rem;
          height: 0.2rem;
        }
      }

      .submit-login {
        border: 0.02rem solid #FF699C;
        font-size: 0.24rem;
        padding: 0 0.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #FF699C;
        margin-left: 1.2rem;
        border-radius: 0.1rem;
      }

      .profile-top_login_view_detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 0.2rem;
        height: 100%;

        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: nowrap;
          margin-top: 0.4rem;

          .nick_name {
            font-size: 0.28rem;
          }

          .nick_name_profile {
            font-size: 0.28rem;
            display: flex;
            align-items: center;

            span {
              margin-right: 0.2rem;
            }
          }
        }

        .bottom {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          margin-top: 0.2rem;

          .fenxsi {
            font-size: 0.28rem;

            span {
              color: var(--main-color);
              padding-left: 0.3rem;
            }
          }

          .guanzhu {
            margin-left: 0.3rem;
            font-size: 0.28rem;

            span {
              color: var(--main-color);
              padding-left: 0.3rem;
            }
          }
        }
      }

      .avator-change {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  .profilelist {
    margin-top: 1rem;
  }

  #profile {
    padding-bottom: 55px;
    position: relative;
    height: 100vh;
  }

  /deep/ .van-uploader__input-wrapper {
    width: 1.2rem;
    height: 1.2rem;
  }

  /deep/ .van-uploader {
    left: 0.2rem;
    position: absolute;
  }


  .cropper-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }

  .vue-cropper {
    background: black;
    background-image: none !important;
  }

  .cropper-btn {
    height: 1rem;
    background: rgba(255, 255, 255, .3);
    width: 100%;
    padding: 0 15px;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .cropper-btn a {
    font-size: .3rem;
    line-height: 1rem;
    width: 1rem;
    text-align: center;
    color: #fff;
  }


  /deep/ .cropper-view-box {
    outline: 0.02rem solid var(--main-color);
  }
</style>