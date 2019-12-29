<template>
  <div class="change-password">
    <nav-bar class="nav-bar">
      <div class="left" slot="left" @click="goBack">
        <img src="~assets/arrow-left.svg" alt />
      </div>
      <div class="center" slot="center">修改密码</div>
    </nav-bar>
    <div class="form-changePsd_form">
      <div>
        <input :type="textTypeStatus.userPasswordStatus ? 'text' : 'password'" placeholder="请输入原密码" v-model="userPassword" />
        <img :src="textTypeStatus.userPasswordStatus ? iconImgs.openEyes : iconImgs.closeEyes" alt @click="userPasswordClick"/>
      </div>
      <div>
        <input :type="textTypeStatus.userPasswordNowStatus ? 'text':'password'" placeholder="请输入新密码" v-model="userPasswordNow" />
        <img :src="textTypeStatus.userPasswordNowStatus ? iconImgs.openEyes : iconImgs.closeEyes" alt  @click="userPasswordNowClick"/>
      </div>
      <div>
        <input :type="textTypeStatus.userPassWordAgainStatus ? 'text' :'password'" placeholder="请输入新密码" v-model="userPassWordAgain" />
        <img :src="textTypeStatus.userPassWordAgainStatus ? iconImgs.openEyes : iconImgs.closeEyes" alt  @click="userPassWordAgainClick"/>
      </div>
      <div class="form-changePsd_form_submit" @click="submitForm">确认提交</div>
    </div>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

//导入network
import { changeUserPassWord } from "network/profile";

import { mapMutations } from "vuex";

export default {
  name: "ChangePassword",
  components: {
    NavBar
  },
  data() {
    return {
      userPassword: "",
      userPasswordNow: "",
      userPassWordAgain: "",
      iconImgs:{
         closeEyes:require('assets/eyes_close.svg'),
         openEyes:require('assets/eyes_open.svg')
      },
      textTypeStatus:{
          userPasswordStatus:false,
          userPasswordNowStatus:false,
          userPassWordAgainStatus:false
      },
      typeText: "text"
    };
  },
  methods: {
    submitForm() {
      if (this.userPasswordNow !== this.userPassWordAgain) {
        return this.$toast({
          type: "fail",
          message: "两次输入密码不一样！",
          icon: "cross",
          duration: 1500
        });
      }
      let userId = JSON.parse(localStorage.getItem("userInfo")).user_id;
      changeUserPassWord({
        userId,
        newPassWord: this.userPasswordNow,
        oldPassWord: this.userPassword
      }).then(r => {
        if (r.status.code === "502") {
          this.$toast({
            type: "fail",
            message: "密码需要包括字母和数字且不低于6位！",
            icon: "cross",
            duration: 1500
          });
        } else if (r.status.code === "506") {
          this.$toast({
            type: "fail",
            message: "密码修改失败！原密码错误",
            icon: "cross",
            duration: 1500
          });
        } else {
          this.$toast({
            type: "success",
            message: "密码修改成功！请重新登录！",
            duration: 1500
          });
          localStorage.removeItem("userInfo");
          localStorage.setItem("userInfo", "{}");
          this.$router.push("/login");
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    ...mapMutations(["changeTabBarShow"]),
    userPasswordClick(){
        this.textTypeStatus.userPasswordStatus = !this.textTypeStatus.userPasswordStatus
    },
    userPasswordNowClick(){
      this.textTypeStatus.userPasswordNowStatus = !this.textTypeStatus.userPasswordNowStatus
    },
    userPassWordAgainClick(){
       this.textTypeStatus.userPassWordAgainStatus = !this.textTypeStatus.userPassWordAgainStatus
    }
  },
  activated() {
    this.changeTabBarShow(false);
  },
  deactivated() {
    this.changeTabBarShow(true);
  }
};
</script>
<style lang='less' scoped>
.left {
  height: 100%;
  display: flex;
  align-items: center;
  img {
    width: 0.5rem;
    height: 0.5rem;
  }
}
.nav-bar {
  border-bottom: 0.01rem solid #eee;
}
.form-changePsd_form {
  margin-top: 1rem;
  width: 100%;
  padding: 0.3rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    height: 0.8rem;
    margin-bottom: 0.5rem;
    display: flex;
    position: relative;
    > img {
      position: absolute;
      right: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.5rem;
      height: 0.5rem;
    }
    input {
      width: 100%;
      height: 100%;
      border: 0.01rem solid #ccc;
      font-size: 0.28rem;
      padding: 0 0.3rem;
      padding-right: 0.9rem;
      border-radius: 0.1rem;
    }
    input:focus {
      border: 0.01rem solid var(--main-color);
    }
  }
  .form-changePsd_form_submit {
    width: 100%;
    height: 0.8rem;
    font-size: 0.3rem;
    line-height: 0.8rem;
    border-radius: 0.1rem;
    justify-content: center;
    color: #fff;
    background-color: var(--main-color);
  }
}
</style>