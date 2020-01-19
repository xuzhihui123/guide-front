<template>
  <div id="local-play_item">
    <img src="~assets/banner1.jpg" alt="">
    <div class="local_detail">
          <span class="local_detail_left">
                【周划水专业导游~带你飞上蓝蓝的天~】哈哈
          </span>
      <div class="money">
        <span>￥400</span>
        <span>/起</span>
      </div>
    </div>
    <div class="local-bottom">
      <div class="local-bottom_left">
        <span class="count">0.2</span>
        <span class="countt">分&nbsp;|&nbsp;已售20</span>
        <span class="pl">(0条评论)</span>
      </div>
      <div class="local-bottom_right">
        <img src="~assets/position-icon.svg" alt="">
        <span class="address">福建</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LocalPlayItem"
  }
</script>

<style scoped lang="less">
  #local-play_item {
    width: 7.2rem;
    background-color: #fff;
    overflow: hidden;
    border-radius: 0.15rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0.1rem 0.2rem 0.1rem rgba(0, 0, 0, .15);
    margin-bottom: 0.3rem;
    > img {
      width: 100%;
      height: 3.6rem;
    }

    .local_detail {
      padding-top: 0.3rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      padding-bottom: 0.2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .local_detail_left {
        width: 80%;
        font-size: 0.28rem;
        font-weight: 700;
        color: #444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .money {
        display: flex;
        flex: 1;
        align-items: baseline;
        justify-content: flex-end;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span:nth-child(1) {
          color: var(--main-color);
          font-size: 0.28rem;
        }

        span:nth-child(2) {
          color: #666;
          font-size: 0.24rem;
        }
      }
    }

    .local-bottom {
      padding: 0 0.2rem;
      display: flex;
      padding-bottom: 0.2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .local-bottom_left {
        display: flex;
        font-size: 0.26rem;

        span.count {
          color: var(--main-color);
        }

        span.countt, span.pl {
          color: #666;
        }

        span.pl {
          margin-left: 0.1rem;
        }
      }

      .local-bottom_right {
        display: flex;
        flex-direction: row;
        align-items: center;

        > img {
          width: 0.3rem;
          height: 0.3rem;
        }

        span.address {
          margin-left: 0.1rem;
          color: #666;
          font-size: 0.26rem;
        }
      }
    }
  }

  @media screen and (min-width: 360px) and (max-width: 360px) {
    #local-play_item {
      width: 8.2rem;

      > img {
        height: 4.1rem;
      }
    }
  }

  @media screen and (min-width: 800px) and (max-width: 800px) {
    #local-play_item {
      width: 7.6rem;

      > img {
        height: 3.8rem;
      }


    }
  }
</style>