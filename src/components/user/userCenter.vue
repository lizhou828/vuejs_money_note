<template>
    <div>
      <commonHead ></commonHead>
      <div class="swiper-container swiper-parent">
        <div class="swiper-wrapper">
          <div class="swiper-slide sliderbg">
            <div class="swiper-container swiper-nested">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="slide-inner">
                    <div class="pages_container">
                      <h3>个人中心</h3>
                      <h5>正在建设中，敬请期待......</h5>
                      <p>
                      昵称: {{ userCenterUserDto.nickName }} <br/>
                      这是您第{{ loginCount }}次数登陆系统、上次登陆时间是:{{ lastLogin.loginTime | formatDate}}<br/>
                      在该系统中，您记账{{ moneyNoteCount }}次<br/>

                      我的反馈<br/>

                      搜索<br/>

                      退出<br/>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {USER_CENTER} from "../../common/request_url";

export default {
  name: 'userCenter',
  data() {
    return {
      userCenterUserDto: {},
      moneyNoteCount:0,
      loginCount:0,
      lastLogin:{}
    }
  },
  methods: {
    async initData(){
      let _this = this;
      let responseData = await USER_CENTER();
      if (responseData && responseData.statusCode === 200){
        _this.userCenterUserDto = responseData.data.userCenterUserDto;
        _this.moneyNoteCount = responseData.data.moneyNoteCount;
        _this.loginCount = responseData.data.loginCount;
        _this.lastLogin = responseData.data.lastLogin;
      }
    }
  },
  created:function(){
    this.initData();
  },
  mounted(){
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }
}
</script>

<style scoped>

</style>
