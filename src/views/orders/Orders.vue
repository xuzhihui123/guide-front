<template>
  <div class="orders-main">
    <van-nav-bar
            title="待处理订单"
            class="navbar"
    />
    <!--&lt;!&ndash;    //订单信息开始&ndash;&gt;   导游的订单!ifShowEmpty && isShowGuide-->
    <div class="content" v-show="!ifShowEmpty && isShowGuide" @click="goOrderDetails">
      <!--      放用户的头像-->
      <img :src="userData.user_avatar" alt="">
      <div class="left-content">
        <div class="left-content_head">
          <!--            放详细地址-->
          <div class="left-title">
            <div class="inner-title">{{userData.detailedLocation}}</div>
            <van-icon name="arrow" size="0.28rem"/>
          </div>
          <div class="right-status">订单进行中</div>
        </div>
<!--        写订单来源-->
        <div class="left-content_order_from">
          订单来源：{{userData.orderFrom}}
        </div>
<!--        写用户的电话和待付款-->
        <div class="left-content_user">
            <div class="left-content_user_left">
              用户电话：{{userData.user_phone}}
            </div>
          <div class="left-content_user_right" style="color: #ff0000">
             待付款
          </div>
        </div>

      </div>
    </div>

    <!--    用户的订单!ifShowEmpty && !isShowGuide-->
    <div class="content" v-show="!ifShowEmpty && !isShowGuide"  @click="goOrderDetails">
      <!--      放导游的头像-->
      <img :src="userData.guide_avatar" alt="">
      <div class="left-content">
        <div class="left-content_head">
          <!--            放详细地址-->
          <div class="left-title">
            <div class="inner-title">{{userData.detailedLocation}}</div>
            <van-icon name="arrow" size="0.28rem"/>
          </div>
          <div class="right-status">订单进行中</div>
        </div>
        <!--        写订单来源-->
        <div class="left-content_order_from">
          订单来源：{{userData.orderFrom}}
        </div>
        <!--        写导游的电话和待付款-->
        <div class="left-content_user">
          <div class="left-content_user_left">
            导游电话：{{userData.guide_phone}}
          </div>
          <div class="left-content_user_right" style="color: #ff0000">
            待付款
          </div>
        </div>
<!--        用户操作模块-->
<!--        取消订单-->
        <div class="user-submit_control">
             <div class="submit_content" @click.stop="userPay">
                确认付款
             </div>
        </div>
      </div>
    </div>


    <div class="empty-show" v-show="ifShowEmpty">
      <img src="~assets/main-logo.png" alt="">
      <span>暂无新的订单信息哦~</span>
    </div>


    <van-dialog v-model="isShowOpinion" title="订单意见" @confirm="submitFinishOrder">
      <van-field v-model="opinionText" placeholder="请输入您宝贵的意见"/>
    </van-dialog>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'


  import {userPay, orderOpinion} from "network/order";
  //导入组件

  export default {
    name: "Orders",
    components: {},
    data() {
      return {
        ifShowEmpty: false,
        isShowGuide: false,
        isShowOpinion: false,
        opinionText: '',
        userData: {},
      }
    },
    computed: {
      ...mapState(['orderObj', 'userIsPay','userIsCancel'])
    },
    watch: {
      orderObj: {
        immediate: true,
        handler(newValue) {
          if (!newValue.userModel) {
            this.ifShowEmpty = true
          } else {
            this.ifShowEmpty = false
          }
        }
      },
      userIsPay: {
        immediate: true,
        handler(newValue) {
          if (newValue === true) {
            this.$toast({
              message: '用户已付款，订单完成！',
              type: 'success'
            })
            localStorage.removeItem('orders')
            let d = JSON.parse(localStorage.getItem('receiveFlag'))
            d.flag = false
            //设置导游可以继续接单
            localStorage.setItem('receiveFlag', JSON.stringify(d))
            this.$store.commit('changeReceiveFlag', false)
            this.changeOrderObj({})
            //重新设置
            this.$store.commit('changeUserIsPay', false)
            this.getData()
          }
        }
      },
      userIsCancel:{
        immediate:true,
        handler(newValue){
          if (newValue === true) {
            this.$toast({
              message: '用户已取消订单！',
              type: 'success'
            })
            localStorage.removeItem('orders')
            let d = JSON.parse(localStorage.getItem('receiveFlag'))
            d.flag = false
            //设置导游可以继续接单
            localStorage.setItem('receiveFlag', JSON.stringify(d))
            this.$store.commit('changeReceiveFlag', false)
            this.changeOrderObj({})
            //重新设置
            this.$store.commit('changeUserCancel', false)
            this.getData()
          }
        }
      }

    },
    methods: {
      ...mapMutations(['changeTabBarShow', 'changeOrderObj']),

      //获取vuex保存的信息
      getData() {
        let data = JSON.parse(localStorage.getItem('userInfo') || "{}").is_guide
        //如果是导游
        if (data) {
          this.isShowGuide = true
        } else {
          this.isShowGuide = false
        }
        this.userData.orderDst = this.orderObj.orderDst || ''
        this.userData.detailedLocation = this.orderObj.detailedLocation || ''
        this.userData.orderStatus = this.orderObj.orderStatus || ''
        this.userData.orderFrom = this.orderObj.orderFrom || ''
        this.userData.orderPrice = this.orderObj.orderPrice || ''
        if (this.orderObj.userModel) {
          this.userData.user_nick = this.orderObj.userModel.user_nick
          this.userData.user_avatar = this.orderObj.userModel.user_avatar
          this.userData.user_phone = this.orderObj.userModel.user_phone
          this.userData.user_id = this.orderObj.userModel.user_id
          this.userData.guide_trueName = this.orderObj.guideModel.guide_trueName
          this.userData.guide_phone = this.orderObj.guideModel.guide_phone
          this.userData.guide_id = this.orderObj.guideModel.guide_id
          this.userData.guide_avatar = this.orderObj.guideModel.guide_avatar
        } else {
          this.userData.user_nick = ''
          this.userData.user_phone = ''
          this.userData.user_avatar = ''
          this.userData.guide_trueName = ''
          this.userData.guide_phone = ''
          this.userData.guide_avatar = ''
        }
      },

      //用户付款订单完成
      userPay() {
        let user_id = this.userData.user_id
        this.$dialog.confirm({
          title: '提示',
          message: '测试阶段，不调用详细付款接口，确认此订单吗？'
        }).then(async () => {
          try {
            let d = await userPay(user_id)
            if (d.status.code === '200') {
              this.$toast({
                message: '付款成功拉！',
                type: 'success'
              })
              setTimeout(() => {
                this.isShowOpinion = true
              }, 1000)
            }
          } catch (e) {
            this.$toast({
              message: '服务器错误！',
              type: 'fail'
            })
          }
        }).catch(() => {
          // on cancel
          this.$toast({
            message: '您已取消付款！',
            type: 'success'
          })
        });
      },

      //完成意见  订单保存数据库
      async submitFinishOrder() {
        let d = await orderOpinion({user_id: this.userData.user_id, opinion: this.opinionText})
        if (d.code === '200') {
          this.$toast({
            message: '提交成功！寻导感谢您的到来',
            type: 'success'
          })
          localStorage.removeItem('orders')
          this.changeOrderObj({})
          this.getData()
        }
      },


      //goOrderDetails  去订单详情页
      goOrderDetails(){
        this.$router.push('/orderDetails')
      }

    },
    created() {
      this.changeTabBarShow(true)
      this.getData()
    },
  }
</script>

<style scoped lang="less">
  .orders-main {
    padding-bottom: 60px;
  }

  .navbar {
    background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
  }

  /deep/ .van-nav-bar__title {
    color: #fff;
    font-weight: 700;
  }

  .content {
    width: 100%;
    padding: 0 0.2rem;
    display: flex;
    padding-top: 0.3rem;
    &:active{
      background-color: rgba(0,0,0,.1);
    }
    > img {
      width: 0.6rem;
      height: 0.6rem;
    }

    .left-content {
      padding-bottom: 0.3rem;
      flex: 1;
      min-width: 0;
      margin-left: 0.2rem;
      border-bottom: 0.01rem solid #eee;
      display: flex;
      flex-direction: column;
      .left-content_head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .left-title {
          width: 70%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          > .inner-title {
            width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.3rem;
            color: #000;
            font-weight: bold;
            word-break: break-word;
          }
        }

        .right-status {
          color: #000;
          font-size: 0.28rem;
        }
      }
      .left-content_order_from{
        flex: 1;
        font-size: 0.26rem;
        color: #999;
      }
      .left-content_user{
        width: 100%;
        font-size: 0.26rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.2rem;
        .left-content_user_right{
          font-weight: 700;
        }

      }
      .user-submit_control{
        margin-top: 0.3rem;
        display: flex;
        justify-content: flex-end;
        >div{
          padding: 0 0.25rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 0.05rem;
          border: 0.01rem solid #ff5822;
          color: #ff5822;
          font-size: 0.28rem;
        }
      }
    }
  }

  .empty-show {
    padding-top: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
    }

    span {
      margin-top: 0.2rem;
      font-size: 0.4rem;
      color: #ccc;
    }
  }
</style>