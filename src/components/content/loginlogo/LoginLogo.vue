<template>
  <!--    logo-->
  <div class="logo">
    <div class="logo-inner">
      <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2492633268,262337583&fm=26&gp=0.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLogo'
}
</script>

<style scoped lang="less">
  .logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem;
    padding-top: 0.2rem;

    .logo-inner {
      width: 3.4rem;
      height: 3.4rem;
      background-color: #eee;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0.1rem 0.15rem 0.3rem rgba(0, 0, 0, .15);

      img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
      }
    }
  }
</style>
