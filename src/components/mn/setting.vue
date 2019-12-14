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
export default {
  name: 'setting',
  mounted(){
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }
}
</script>

<style scoped>

</style>
