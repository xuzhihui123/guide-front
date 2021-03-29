<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BScroll',
  components: {},
  props: {
    myprobeType: {
      type: Number,
      default () {
        return 0
      }
    },
    mypullUpLoad: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 与滚动有关
        probeType: this.myprobeType,
        // 上拉加载选项
        pullUpLoad: this.mypullUpLoad
      })

      this.scroll.on('scroll', () => {
      })

      // 上拉加载
      this.scroll.on('pullingUp', () => {
        // 这边上拉加载一次 需要做的业务 就是加载数据
      })
    })
  },
  methods: {
    // 刷新
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 完成上拉加载
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    // 滚动到莫个位置
    scrollTo (x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>
<style lang='less' scoped>
</style>
