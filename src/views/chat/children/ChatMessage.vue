<template>
  <div  :class="[direction ? 'left' : 'right', 'message-item']">
    <img :src="avatar" alt="" v-if="direction" class="left-img" @click="goProfile(id)"/>
    <div :class="[direction ? 'left-fl' : 'left-r', 'message-item_m']">
      {{message}}
    </div>
    <img :src="avatar" alt="" v-if="!direction" @click="goProfile(id)"/>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    itemData: {
      type: Number,
      default () {
        return null
      }
    },
    direction: {
      type: Boolean,
      default () {
        return false
      }
    },
    message: {
      type: String,
      default () {
        return '说点啥~'
      }
    },
    avatar: {
      type: String,
      default () {
        return require('assets/banner1.jpg')
      }
    }
  },
  data () {
    return {
      id: null
    }
  },
  watch: {
    itemData: {
      immediate: true,
      handler (newV) {
        this.id = newV
      }
    }
  },
  methods: {
    goProfile (id) {
      this.$emit('goProfile', id)
    }
  }
}
</script>
<style lang='less' scoped>
.message-item {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 0.2rem;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  .left-img {
    margin-left: 0;
  }
  > .left-fl {
    margin-left: 0.2rem;
    &::after {
      left: -0.22rem;
      border: solid 0.13rem;
      border-color: transparent #11e40d transparent transparent;
    }
  }
  > .left-r {
    &::after {
      right: -0.22rem;
      border: solid 0.13rem;
      border-color: transparent transparent transparent #11e40d;
    }
  }
  > .message-item_m {
    background-color: #11e40d;
    border-radius: 0.1rem;
    font-size: 0.26rem;
    padding: 0.1rem;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
    }
  }
  > img {
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.2rem;
  }
}
</style>
