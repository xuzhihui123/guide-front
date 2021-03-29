<template>
  <div class="histroy-detail_orders" v-if="singleOrderData.length>0">
    <div class="order-detail">
      <b-scroll ref="bscroll" class="wrapper">
        <div class="top">
          <img src="~assets/arrow-left-white.svg" alt="" @click="goBack">
          <!--           订单进行中-->
          <div class="top_title">
            <span>订单已结束</span>
            <van-icon name="arrow" size="0.3rem" color="#ffffff"/>
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
            <div class="content">{{singleOrderData[0].detailedlocation}}</div>
          </div>
          <!--      订单状态-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">订单状态</div>
            <div class="content" style="color:#ff0000">{{singleOrderData[0].orderstatus === '订单正常完结' ? '订单正常完结'
              :'订单已取消'}}
            </div>
          </div>
          <!--      订单来源-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">订单来源</div>
            <div class="content">{{singleOrderData[0].orderfrom}}</div>
          </div>
          <!--      订单价格-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">订单价格</div>
            <div class="content">{{singleOrderData[0].orderprice}}</div>
          </div>
          <!--      订单目的地-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">目的地</div>
            <div class="content">{{singleOrderData[0].orderdst}}</div>
          </div>
        </div>
        <!--      导游信息-->
        <div class="detail-item" style="margin-top: 0.2rem">
          <div class="detail-item_inner title">
            <span>导游信息</span>
            <img :src="singleOrderData[1].guide_avatar" alt="">
          </div>
          <!--      订单详细地址-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">导游姓名</div>
            <div class="content">{{singleOrderData[1].guide_trueName}}</div>
          </div>
          <!--      订单状态-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">导游电话</div>
            <div class="content">{{singleOrderData[1].guide_phone}}</div>
          </div>
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">导游昵称</div>
            <div class="content">{{singleOrderData[1].guide_nick}}</div>
          </div>
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">导游性别</div>
            <div class="content">{{singleOrderData[1].guide_sex === 0 ? '男' : '女'}}</div>
          </div>
        </div>

        <!--      用户信息-->
        <div class="detail-item" style="margin-top: 0.2rem">
          <div class="detail-item_inner title">
            <span>用户信息</span>
            <img :src="singleOrderData[2].user_avatar" alt="">
          </div>
          <!--      订单详细地址-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">用户昵称</div>
            <div class="content">{{singleOrderData[2].user_nick}}</div>
          </div>
          <!--      订单状态-->
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">用户电话</div>
            <div class="content">{{singleOrderData[2].user_phone}}</div>
          </div>
          <div class="detail-item_inner">
            <div class="detail-item_inner_title">用户性别</div>
            <div class="content">{{singleOrderData[2].user_sex === 0 ? '男' : '女'}}</div>
          </div>
        </div>
      </b-scroll>
    </div>
  </div>
</template>

<script>
import { getSingleOrderById } from 'network/order'
import BScroll from 'common/bscroll/BScroll'

export default {
  name: 'HistroyOrderDetails',
  components: {
    BScroll
  },
  data () {
    return {
      singleOrderData: []
    }
  },
  created () {
    this.getDetail()
    this.$notify({
      message: '感谢您使用寻导平台~',
      duration: 3000,
      type: 'success'
    })
  },
  methods: {
    // 获取当前的orderid的详细信息
    async getDetail () {
      const data = await getSingleOrderById(this.$route.params.id)
      this.singleOrderData = data.data
    },

    //
    goBack () {
      this.$router.go(-1)
    }
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
      bottom: 55px;
      left: 0;
      right: 0;

      .top {
        width: 100%;
        height: 4rem;
        background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);

        .guide-toast {
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
        box-shadow: 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, .1);

        > .detail-item_inner {
          padding: 0.2rem 0;
          font-size: 0.28rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 0.01rem solid #eee;

          > img {
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
        margin-top: -2.2rem;
      }
    }
  }
</style>
