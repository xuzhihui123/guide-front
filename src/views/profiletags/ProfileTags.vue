<template>
  <div id="profiletags">
    <nav-bar>
      <div slot="left" class="left" @click="savaUserTags">
        <img src="~assets/arrow-left.svg" alt="">
      </div>
      <div slot="center" class="center">
        标签
      </div>
    </nav-bar>

    <div class="profile-tags_content">
      <div class="now_selected">
        <p class="title">已选择&nbsp;<span>(最多选6个，点击可删除)</span></p>
        <div class="now_selected_content">
          <div class="now_selected_content_flag" v-for="(item,i) in nowSelectedTags" :key="i"
               @click="deleteCurrentTag(item)">{{item}}
          </div>
        </div>
      </div>

      <div class="no_selected" v-for="(item,i) in userAllTags" :key="i">
        <p class="title">{{item.typeName}}</p>
        <div class="now_selected_content">
          <div :class="['now_selected_content_flag',initSelectItemObj[cItem]===true?'active':'']"
               v-for="(cItem,i) in item.tags" :key="i" @click="selectTagItem(cItem)">{{cItem}}
          </div>
        </div>
      </div>

      <!--      <div class="zdy_tgs now_selected">-->
      <!--        <p class="title">自定义</p>-->
      <!--        <div class="zdy_tgs-click">+</div>-->
      <!--      </div>-->
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

// 导入组件
import NavBar from 'common/navbar/NavBar'

// 导入network
import { getUserAllTags, getGuideAllTags } from 'network/profile'

export default {
  name: 'ProfileTags',
  data () {
    return {
      userAllTags: [],
      nowSelectedTags: [],
      initSelectItemObj: {}
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow', 'changeProfileTags']),

    // 获取用户所有标签库
    getUserTags () {
      const data = JSON.parse(localStorage.getItem('userInfo')).is_guide

      if (data) {
        getGuideAllTags().then(r => {
          this.userAllTags = r
        })
      } else {
        getUserAllTags().then(r => {
          this.userAllTags = r
        })
      }
    },

    // 选中标签点击
    selectTagItem (item) {
      this.initSelectItemObj[item] = !this.initSelectItemObj[item]
      if (this.initSelectItemObj[item]) {
        this.nowSelectedTags.push(item)
      } else {
        this.nowSelectedTags.some((Citem, i) => {
          if (Citem === item) {
            this.nowSelectedTags.splice(i, 1)
            return true
          }
        })
      }
      // 判断大于6个就不能 出现 点击的样式
      if (this.nowSelectedTags.length > 6) {
        this.nowSelectedTags.some(Citem => {
          if (Citem === item) {
            return true
          }
        })
        this.initSelectItemObj[item] = false
      }
    },

    // 删除当前已选中的标签
    deleteCurrentTag (item) {
      // 删除掉
      this.nowSelectedTags.forEach((Citem, i) => {
        if (Citem === item) {
          this.nowSelectedTags.splice(i, 1)
        }
      })
      // 找到已经选中的样式去除
      this.initSelectItemObj[item] = false
    },

    savaUserTags () {
      if (this.nowSelectedTags.length === 0) {
        return this.$toast({
          type: 'fail',
          message: '请添加标签在保存哦~'
        })
      }
      const tagsStr = this.nowSelectedTags.join(',')

      // 保存到vuex
      this.changeProfileTags(tagsStr)

      this.$router.push('/profiledetail')
    }
  },
  components: {
    NavBar
  },
  watch: {

    // 初始化没被选中的标签
    userAllTags (newValue) {
      const cFlag = []
      newValue.forEach(item => {
        item.tags.forEach(Citem => {
          cFlag.push(Citem)
        })
      })
      cFlag.forEach(item => {
        this.$set(this.initSelectItemObj, item, false)
      })
    },

    // 监听选中的标签的个数
    nowSelectedTags (newValue) {
      if (newValue.length > 6) {
        this.$toast({
          type: 'danger',
          message: '不能超过6个标签哦~'
        })
        this.nowSelectedTags.pop()
      }
    }
  },
  created () {
    this.getUserTags()
  },
  deactivated () {
    this.changeTabBarShow(true)
  },
  activated () {
    this.changeTabBarShow(false)
  }
}
</script>

<style scoped lang="less">
  .left {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  .right {
    padding-right: 0.2rem;
    font-weight: 400;
  }

  /deep/ #navbar .center {
    font-weight: 400;
  }

  #navbar {
    border-bottom: 0.01rem solid #eee;
  }

  .profile-tags_content {
    margin-top: 1rem;
    padding-top: 0.4rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    display: flex;
    flex-direction: column;

    .now_selected, .no_selected {
      display: flex;
      flex-direction: column;

      p.title {
        font-size: 0.34rem;

        span {
          font-size: 0.3rem;
          color: #bbb;
        }
      }

      .now_selected_content {
        margin-top: 0.2rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .now_selected_content_flag {
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.2rem;
          border-radius: 0.3rem;
          font-size: 0.24rem;
          color: var(--main-color);
          margin-right: 0.3rem;
          border: 0.01rem solid var(--main-color);
          margin-bottom: 0.2rem;
        }
      }
    }

    .no_selected {
      padding-top: 0.2rem;

      .now_selected_content {
        .now_selected_content_flag {
          border: 0.01rem solid #444;
          color: #444;
        }

        .now_selected_content_flag.active {
          border: 0.01rem solid var(--main-color);
          color: var(--main-color);
        }
      }
    }

    /*.zdy_tgs{*/
    /*  padding-top: 0.2rem;*/
    /*  .zdy_tgs-click{*/
    /*    width: 1rem;*/
    /*    height: 0.4rem;*/
    /*    border: 0.01rem solid var(--main-color);*/
    /*    color: var(--main-color);*/
    /*    border-radius: 0.3rem;*/
    /*    font-weight: 700;*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    font-size: 0.34rem;*/
    /*    margin-top: 0.2rem;*/
    /*  }*/
    /*}*/
  }
</style>
