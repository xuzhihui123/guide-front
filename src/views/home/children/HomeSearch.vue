<template>
  <div class="home-search">
    <!--        定位-->
    <div class="home-position">
      <span class="address">福州</span>
      <img src="~assets/home_up.svg" alt="">
    </div>
    <div class="home-search_input">
      <input type="text" class="home-search_input_inner" v-model="searchText" @focus="searchFocus">
      <img src="~assets/search-icon.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeSearch",
    data(){
      return {
        searchText:'搜索目的地/向导/玩法'
      }
    },
    methods:{
      searchFocus(){
          this.$router.push('/search')
      }
    }
  }
</script>

<style scoped lang="less">
  .home-search {
    display: flex;
    flex-direction: row;
    padding-top: 0.4rem;
    padding-left: 0.3rem;

    .home-search_input {
      display: flex;
      width: 75%;
      height: 0.65rem;
      position: relative;
      input.home-search_input_inner {
        width: 100%;
        height: 0.65rem;
        border: none;
        background-color: #fff;
        border-radius: 0.3rem;
        font-size: 0.28rem;
        color: #666;
        text-align: center;
      }
      >img{
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        left: 17%;
        top:50%;
        transform: translateY(-50%);
      }
    }
  }

  .home-position {
    display: flex;
    align-items: center;
    margin-right: 0.3rem;

    span.address {
      font-size: 0.28rem;
      color: #000;
      margin-right: 0.1rem;
    }

    img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
</style>