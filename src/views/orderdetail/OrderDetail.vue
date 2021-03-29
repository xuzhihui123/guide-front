<template>
  <div class="order-detail">
    <b-scroll ref="bscroll" class="wrapper">
      <div class="top">
        <img src="~assets/arrow-left-white.svg" alt="" @click="goBack">
        <!--           订单进行中-->
        <div class="top_title">
          <span>订单进行中</span>
          <van-icon name="arrow" size="0.3rem" color="#ffffff"/>
        </div>

<!--        显示导游提示信息-->
        <div class="guide-toast" v-show="isShowGuide">
           亲爱的{{userData.guide_trueName}}导游，订单已生成，可以电话联系客户了哦
        </div>
        <div class="guide-toast" v-show="!isShowGuide">
          亲爱的{{userData.user_nick}}，请时刻注意导游得来电哦~
        </div>
      </div>
      <!--    订单信息-->
      <div class="detail-item posi">
        <div class="detail-item_inner title">
          订单信息
        </div>
        <!--      订单详细地址-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">详细地址</div>
          <div class="content">{{userData.detailedLocation}}</div>
        </div>
        <!--      订单状态-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">订单状态</div>
          <div class="content" style="color:#ff0000">{{userData.orderStatus}}</div>
        </div>
        <!--      订单来源-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">订单来源</div>
          <div class="content">{{userData.orderFrom}}</div>
        </div>
        <!--      订单价格-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">订单价格</div>
          <div class="content">{{userData.orderPrice}}</div>
        </div>
        <!--      订单目的地-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">目的地</div>
          <div class="content">{{userData.orderDst}}</div>
        </div>
      </div>
      <!--      导游信息-->
      <div class="detail-item" style="margin-top: 0.2rem" v-show="!isShowGuide">
        <div class="detail-item_inner title">
          <span>导游信息</span>
          <img :src="userData.guide_avatar" alt="">
        </div>
        <!--      订单详细地址-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">导游姓名</div>
          <div class="content">{{userData.guide_trueName}}</div>
        </div>
        <!--      订单状态-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">导游电话</div>
          <div class="content">{{userData.guide_phone}}</div>
        </div>
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">导游昵称</div>
          <div class="content">{{userData.guide_nick}}</div>
        </div>
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">导游性别</div>
          <div class="content">{{userData.guide_sex===0?'男': '女'}}</div>
        </div>
      </div>
      <!--      用户付款操作-->
      <div class="user-pay" style="margin-top: 0.2rem" v-show="!isShowGuide">
        <div class="cancel-pay" @click="cancelOrder">
          取消订单
        </div>
        <div class="submit-pay" @click="userPay">
          确认付款
        </div>
      </div>

      <!--      用户信息-->
      <div class="detail-item" style="margin-top: 0.2rem" v-show="isShowGuide">
        <div class="detail-item_inner title">
          <span>用户信息</span>
          <img :src="userData.user_avatar" alt="">
        </div>
        <!--      订单详细地址-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">用户昵称</div>
          <div class="content">{{userData.user_nick}}</div>
        </div>
        <!--      订单状态-->
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">用户电话</div>
          <div class="content">{{userData.user_phone}}</div>
        </div>
        <div class="detail-item_inner">
          <div class="detail-item_inner_title">用户性别</div>
          <div class="content">{{userData.user_sex===0?'男':'女'}}</div>
        </div>
      </div>

      <van-dialog v-model="isShowOpinion" title="订单意见" @confirm="submitFinishOrder">
        <van-field v-model="opinionText" :placeholder="holder"/>
      </van-dialog>

      <van-dialog v-model="isShowCancel" title="取消原因" @confirm="submitCancelOrder">
        <van-field v-model="cancelText" placeholder="请输入您的取消原因吧！"/>
      </van-dialog>
    </b-scroll>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BScroll from 'common/bscroll/BScroll'

import { userPay, orderOpinion, orderFinish } from 'network/order'

export default {
  name: 'OrderDetail',
  components: {
    BScroll
  },
  data () {
    return {
      userData: {},
      isShowGuide: false,
      isShowOpinion: false,
      isShowCancel: false,
      cancelText: '',
      opinionText: '',
      holder: ''
    }
  },
  watch: {
    userIsPay: {
      immediate: true,
      handler (newValue) {
        if (newValue === true) {
          this.$toast({
            message: '用户已付款，订单完成！',
            type: 'success'
          })
          localStorage.removeItem('orders')
          const d = JSON.parse(localStorage.getItem('receiveFlag'))
          d.flag = false
          // 设置导游可以继续接单
          localStorage.setItem('receiveFlag', JSON.stringify(d))
          this.$store.commit('changeReceiveFlag', false)
          this.changeOrderObj({})
          // 重新设置
          this.$store.commit('changeUserIsPay', false)
          this.$router.go(-1)
        }
      }
    },
    userIsCancel: {
      immediate: true,
      handler (newValue) {
        if (newValue === true) {
          this.$toast({
            message: '用户已取消订单！',
            type: 'success'
          })
          localStorage.removeItem('orders')
          const d = JSON.parse(localStorage.getItem('receiveFlag'))
          d.flag = false
          // 设置导游可以继续接单
          localStorage.setItem('receiveFlag', JSON.stringify(d))
          this.$store.commit('changeReceiveFlag', false)
          this.changeOrderObj({})
          // 重新设置
          this.$store.commit('changeUserCancel', false)
          // 返回订单页面
          this.$router.go(-1)
        }
      }
    }
  },
  computed: {
    ...mapState(['orderObj', 'userIsPay', 'userIsCancel'])
  },
  methods: {
    ...mapMutations(['changeTabBarShow', 'changeOrderObj']),
    // 获取vuex保存的信息
    getData () {
      const data = JSON.parse(localStorage.getItem('userInfo')).is_guide
      if (data) {
        this.isShowGuide = true
        this.$toast({
          message: '订单已生成~赶紧联系客户吧',
          type: 'success'
        })
      } else {
        this.isShowGuide = false
        this.$toast({
          message: '订单已生成~请保持电话通畅哦',
          type: 'success'
        })
      }
      // 如果是导游
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
        this.userData.user_sex = this.orderObj.userModel.user_sex
        this.userData.guide_trueName = this.orderObj.guideModel.guide_trueName
        this.userData.guide_phone = this.orderObj.guideModel.guide_phone
        this.userData.guide_id = this.orderObj.guideModel.guide_id
        this.userData.guide_avatar = this.orderObj.guideModel.guide_avatar
        this.userData.guide_nick = this.orderObj.guideModel.guide_nick
        this.userData.guide_sex = this.orderObj.guideModel.guide_sex
      } else {
        this.userData.user_nick = ''
        this.userData.user_phone = ''
        this.userData.user_avatar = ''
        this.userData.user_sex = ''
        this.userData.guide_trueName = ''
        this.userData.guide_phone = ''
        this.userData.guide_avatar = ''
        this.userData.guide_nick = ''
        this.userData.guide_sex = ''
      }
    },

    // 返回
    goBack () {
      this.$router.go(-1)
    },

    // 用户付款
    userPay () {
      const user_id = this.userData.user_id
      this.$dialog.confirm({
        title: '提示',
        message: '测试阶段，不调用详细付款接口，确认此订单吗？'
      }).then(async () => {
        try {
          const d = await userPay(user_id)
          if (d.status.code === '200') {
            this.$toast({
              message: '付款成功拉！',
              type: 'success'
            })
            setTimeout(() => {
              this.isShowOpinion = true
              this.holder = '请输入您宝贵的意见'
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
      })
    },

    // 取消订单
    async cancelOrder () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认要取消订单吗'
      }).then(() => {
        // 显示取消原因框
        this.isShowCancel = true
      }).catch(() => {

      })
    },

    // 完成意见  订单保存数据库
    async submitFinishOrder () {
      const d = await orderOpinion({ user_id: this.userData.user_id, opinion: this.opinionText })
      if (d.code === '200') {
        this.$toast({
          message: '提交成功！寻导感谢您的到来',
          type: 'success'
        })
        localStorage.removeItem('orders')
        this.changeOrderObj({})
        this.$router.go(-1)
      }
    },

    async submitCancelOrder () {
      const d = await orderFinish({ user_id: this.userData.user_id, cause: this.cancelText })
      if (d.status.code === '200') {
        this.$toast({
          message: '取消成功！寻导欢迎您的下次到来！',
          type: 'success'
        })
        localStorage.removeItem('orders')
        this.changeOrderObj({})
        this.$router.go(-1)
      }
    }
  },
  created () {
    this.changeTabBarShow(false)
    this.getData()
  },
  destroyed () {
    this.changeTabBarShow(true)
  }
}
</script>

<style scoped lang="less">
  .order-detail {
    position: relative;
    background-color: #eee;
    height: 100vh;

    .wrapper {
      position: absolute;
      top: 0;
      bottom: 0.2rem;
      left: 0;
      right: 0;

      .top {
        width: 100%;
        height: 4rem;
        background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
        .guide-toast{
          font-size: 0.28rem;
          color: #ffffff;
          margin-left: 0.3rem;
          margin-top: 0.1rem;
        }
        > img {
          margin-top: 0.2rem;
          margin-left: 0.3rem;
          width: 0.4rem;
          height: 0.4rem;
        }

        .top_title {
          margin-left: 0.3rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 0.1rem;

          > span {
            margin-right: 0.1rem;
            font-size: 0.45rem;
            font-weight: 700;
            color: #fff;
          }
        }
      }

      .detail-item {
        width: 95%;
        margin: 0 auto;
        padding: 0 0.2rem;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        border-radius: 0.1rem;
        box-shadow: 0.1rem 0.5rem 0.1rem rgba(0,0,0,.1);
        > .detail-item_inner {
          padding: 0.2rem 0;
          font-size: 0.28rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 0.01rem solid #eee;
          >img{
            width: 0.5rem;
            height: 0.5rem;
          }
          .content {
            width: 70%;
            color: #999;
            font-size: 0.26rem;
            display: flex;
            justify-content: flex-end;
          }
        }

        .title {
          font-weight: 700;
        }
      }

      .user-pay {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
        padding: 0.2rem;
        margin-top: 0.2rem;
        display: flex;
        justify-content: flex-end;
        background-color: #fff;

        > .cancel-pay {
          padding: 0 0.2rem;
          font-size: 0.28rem;
          border: 0.01rem solid orangered;
          color: orangered;
          height: 0.5rem;
          line-height: 0.5rem;
          border-radius: 0.05rem;
        }

        > .submit-pay {
          padding: 0 0.2rem;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.28rem;
          border: 0.01rem solid #03a9f4;
          color: #03a9f4;
          border-radius: 0.05rem;
          margin-left: 0.2rem;
        }
      }

      .posi {
        margin-top: -1.6rem;
      }
    }
  }
</style>
