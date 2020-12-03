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
                        <h3>系统设置</h3>
                        <h5>正在建设中，敬请期待......</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <searchIconFloat></searchIconFloat>
    </div>
</template>

<script>
import SearchIconFloat from "./searchIconFloat";
export default {
  name: 'setting',
  components: {SearchIconFloat},
  mounted(){
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }
}
</script>

<style scoped>

</style>
