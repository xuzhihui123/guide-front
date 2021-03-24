<template>
  <div id="post-requestion">
    <!--          //头部-->
    <nav-bar class="head">
      <div slot="left" class="left" @click="goBack">取消</div>
      <div slot="center">提问</div>
    </nav-bar>

    <!--       问题-->
    <div class="requestion-title padding">
      请输入您的问题：
    </div>
    <van-field class="title-requestion" v-model="title" clearable placeholder="问题标题" ref="title"/>
    <div class="requestion-title">
      请输入您的内容：
    </div>
    <van-field
            class="content-requestion"
            v-model="text"
            rows="8"
            autosize
            type="textarea"
            placeholder="请输入内容"
    />

    <div class="requestion-title">
      选择你要添加的图片：
    </div>
    <van-uploader
            class="fileList"
            v-model="fileList"
            :max-count="3"
            :before-read="beforeRead"
    />

    <a class="submitPost" @click="postRequestion">
      确认提交
    </a>

    <!--    //加载遮罩-->
    <div class="bg-zhezhao" v-show="isShowZZ">
      <img src="~assets/loading-icon.svg" alt="">
    </div>

  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'

import { mapMutations } from 'vuex'

import { postQuestion } from 'network/find'

export default {
  name: 'PostRequestion',
  components: {
    NavBar
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    goBack () {
      this.$router.go(-1)
    },
    beforeRead (file) {
      if (!/\/(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/.test(file.type)) {
        this.$toast({
          type: 'fail',
          message: '您上传的不是图片格式哦~',
          icon: 'cross',
          duration: 1500
        })
        return false
      } else {
        return true
      }
    },

    // 提交问题
    async postRequestion () {
      const userId = JSON.parse(localStorage.getItem('userInfo')).user_id
      const isGuide = JSON.parse(localStorage.getItem('userInfo')).is_guide
      if (isGuide) {
        return this.$toast({
          type: 'fail',
          message: '导游论坛暂时未开放！',
          icon: 'cross',
          duration: 1500
        })
      }
      if (!this.title || !this.text) {
        return this.$toast({
          type: 'fail',
          message: '请输入问题和内容哦~',
          icon: 'cross',
          duration: 1500
        })
      }
      if (userId) {
        // 先判是否有上传图片  没上传图片直接post
        if (this.fileList.length === 0) {
          this.isShowZZ = true
          const f = new FormData()
          f.append('userId', userId)
          f.append('title', this.title)
          f.append('text', this.text)
          f.append('file', '')
          const d = await postQuestion(f)
          if (d.status.code === '200') {
            this.isShowZZ = false
            this.$toast({
              type: 'success',
              message: '发表成功！'
            })
            this.$router.go(-1)
          }
          // 有上传图片  先提交图片到服务器
        } else {
          this.isShowZZ = true
          const f = new FormData()
          f.append('userId', userId)
          f.append('title', this.title)
          f.append('text', this.text)
          this.fileList.forEach(item => {
            f.append('file', item.file)
          })
          const d = await postQuestion(f)
          if (d.status.code === '200') {
            this.isShowZZ = false
            this.$toast({
              type: 'success',
              message: '发表成功！'
            })
            this.$router.go(-1)
          }
        }
      } else {
        this.$toast({
          message: '请先登录！'
        })
        this.$router.push('/login')
      }
    }
  },
  data () {
    return {
      title: '',
      text: '',
      fileList: [],
      isShowZZ: false
    }
  },
  mounted () {
    this.$refs.title.focus()
  },
  created () {
    this.changeTabBarShow(false)
  },
  destroyed () {
    this.changeTabBarShow(true)
  }
}
</script>

<style scoped lang="less">
  @keyframes rotateImag {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(120deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  #post-requestion {
    height: 100vh;
    background-color: #F7F8FA;
    position: relative;

    .padding {
      margin-top: 1rem;
    }

    .bg-zhezhao {
      position: fixed;
      z-index: 999999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .7);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 1rem;
        height: 1rem;
        animation: rotateImag 1s linear infinite;
      }
    }

    .submitPost {
      display: block;
      width: 80%;
      height: 0.7rem;
      background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);;
      border-radius: 0.3rem;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
      line-height: 0.7rem;
      margin: 0.2rem auto;
    }

    .head {
      border-bottom: 0.01rem solid #eee;

      .left {
        color: #1c45f5;
        font-size: 0.34rem;
        display: flex;
        align-items: center;
      }
    }

    .requestion-title {
      padding: 0.2rem;
      font-size: 0.3rem;
      color: rgba(69, 90, 100, 0.6);
    }

    .title-requestion {
      padding: 0.2rem;
      font-size: 0.28rem;
      line-height: 0.3rem;
    }

    .content-requestion {
      padding: 0.2rem;
      font-size: 0.28rem;
      line-height: 0.4rem;
    }

    .fileList {
      margin-left: 0.2rem;
    }

  }

  /deep/ .van-uploader__upload {
    width: 2rem;
    height: 2rem;
    margin: 0 0.2rem 0.2rem 0;
  }

  /deep/ .van-uploader__upload-icon {
    font-size: 0.5rem;
  }

  /deep/ .van-uploader__preview-image {
    width: 2rem;
    height: 2rem;
  }

  /deep/ .van-uploader__preview-delete {
    font-size: 0.3rem;
    top: -0.1rem;
    right: -0.1rem;
  }
</style>
