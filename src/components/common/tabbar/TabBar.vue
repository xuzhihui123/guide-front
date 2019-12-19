<template>
  <div>
    <van-tabbar v-model="active" :active-color="activeColor" route>
      <van-tabbar-item v-for="item in tabBarIcon" :key="item.active" :to="item.router">
        <span>{{item.name}}</span>
        <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? item.active : item.inactive"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    props:{
      tabBarIcon:{
        type:Array,
        default(){
          return []
        }
      },
      activeColor:{
        type:String,
        default(){
          return "#000"
        }
      }
    },
    data(){
      return {
        active:0
      }
    }
  }
</script>

<style scoped lang="less">
  .van-tabbar{
    border-top: 1px solid #eee;
  }
</style>