<template>
  <div id="home-item_bar">
    <div class="home-item_bar_left">
         <span class="flag"></span>
         <span class="text"><slot name="left">优选向导</slot></span>
         <span class="text-flag">NEW</span>
    </div>
    <div class="home-item_bar_right" @click="goMore">
        <span>查看全部</span>
        <van-icon name="arrow" size="0.24rem" color="#444444"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeItemBar',
  methods: {
    goMore () {
      this.$emit('goPreGuideMore')
    }
  }
}
</script>

<style scoped lang="less">
  #home-item_bar {
    padding: 0.2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    > div.home-item_bar_left {
      display: flex;
      flex-direction: row;
      align-items: center;
      .flag{
        width: 0.1rem;
        height: 0.4rem;
        background-color: var(--main-color);
      }
      .text{
        font-weight: 700;
        color: #000;
        font-size: 0.3rem;
        display: flex;
        margin-left: 0.1rem;
      }
      .text-flag{
        font-size: 0.18rem;
        height: 0.25rem;
        padding: 0 0.1rem;
        line-height: 0.25rem;
        color: #fff;
        background-color: #f5601c;
        margin-left: 0.1rem;
        border-radius: 0.05rem;
      }
    }

    > div.home-item_bar_right {
      display: flex;
      align-items: center;
      >span{
        font-size: 0.24rem;
        color: #444;
      }
    }
  }
</style>
