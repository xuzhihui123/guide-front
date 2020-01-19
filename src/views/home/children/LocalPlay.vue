<template>
  <div id="local-play">
    <div class="local-play_header">
                  <span class="flag">

                  </span>
                  <span class="text">
                      当地必玩
                  </span>
      <span class="text-flag">LIFE</span>
    </div>
    <div class="local-play_content">
        <local-play-item/>
        <local-play-item/>
        <local-play-item/>
        <local-play-item/>
        <local-play-item/>
        <local-play-item/>
    </div>
  </div>
</template>

<script>
  import LocalPlayItem from "content/localplayitem/LocalPlayItem";

  export default {
    name: "LocalPlay",
    components: {
      LocalPlayItem
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  #local-play {
    display: flex;
    flex-direction: column;

    .local-play_header {
      padding: 0.2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      .flag {
        width: 0.1rem;
        height: 0.4rem;
        background-color: var(--main-color);
      }

      .text {
        font-weight: 700;
        color: #000;
        font-size: 0.3rem;
        margin-left: 0.1rem;
      }
      .text-flag{
        font-size: 0.18rem;
        height: 0.28rem;
        padding: 0 0.15rem;
        line-height: 0.28rem;
        color: #fff;
        background-color: rgb(255, 74, 40);
        margin-left: 0.1rem;
        border-radius: 0.05rem;
      }
    }
    .local-play_content{
      padding: 0.2rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>