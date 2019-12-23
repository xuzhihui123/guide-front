<template>
  <div id="navbar" :style="{'background-color':navBarBg}">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    props: {
      navBarBg: {
        type: String,
        default() {
          return '#ffff'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    align-items: center;
    padding: 0 0.2rem;

    > div {
      width: 33.3%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .left {
      height: 100%;
    }

    .center {
      font-size: 0.34rem;
      font-weight: 700;
      justify-content: center;
    }
    .right{
      justify-content: flex-end;
      font-size: 0.34rem;
    }
  }
</style>