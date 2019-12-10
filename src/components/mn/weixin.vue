<template>
    <div>
      <commonHead></commonHead>
      <div class="swiper-container swiper-parent">
        <div class="swiper-wrapper">

          <div class="swiper-slide sliderbg">
            <div class="swiper-container swiper-nested">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="slide-inner">
                    <div class="pages_container">
                      <h3 class="page_title">关注我们的微信公众号:</h3>
                      <div class="tweet" style="text-align: center">
                        <img src="/static/public/images/focusOnWechat.png" alt=""/>
                      </div>
                      <a href="javascript:void(0)" class="button_11 blue">扫描或者长按上方的二维码,关注微信公众号</a>
                      <div class="clearfix"></div>
                      <div class="scrolltop radius20"><a href="#"><img src="/static/public/images/icons/top.png" alt="Go on top" title="Go on top" /></a></div>
                    </div>
                    <!--End of page container-->
                  </div>
                </div>
              </div>
              <div class="swiper-scrollbar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'weixin',
  mounted() {
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }
}
</script>

<style scoped>

</style>
