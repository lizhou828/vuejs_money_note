<template>
  <div>
    <div class="swiper-container swiper-parent">
      <div class="swiper-wrapper">

        <div class="swiper-slide sliderbg_menu">
          <div class="swiper-container swiper-nested">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="slide-inner">
                  <div class="logo"><a href="#">记账本</a></div>
                  <div class="menu">
                    <ul>
                      <li><router-link to="/user/userCenter"><img src="/static/public/images/icons/about.png" alt="" title="" /><span>个人中心</span></router-link></li>
                      <li><router-link to="/mnItem/blank"><img src="/static/public/images/icons/pencil.png" alt="" title="" /><span>记账</span></router-link></li>
                      <li><router-link to="/mnItem/dayList"><img src="/static/public/images/icons/docs.png" alt="" title="" /><span>账本</span></router-link></li>

                      <li><router-link to="/mnItem/incomePerMonth"><img src="/static/public/images/icons/statistics.png" alt="" title="" /><span>收入汇总</span></router-link></li>
                      <li><router-link to="/mnItem/payedPerMonth"><img src="/static/public/images/icons/statistics.png" alt="" title="" /><span>支出汇总</span></router-link></li>
                      <li><router-link to="/mnEvent/list"><img src="/static/public/images/icons/layout.png" alt="" title="" /><span>事件记账</span></router-link></li>

                      <li><router-link to="/mn/weixin"><img src="/static/public/images/icons/weixin.png" alt="" title="" /><span>关注我们</span></router-link></li>
                      <li><router-link to="/mn/contact"><img src="/static/public/images/icons/contact.png" alt="" title="" /><span>联系我们</span></router-link></li>
                      <li><router-link to="/mn/setting"><img src="/static/public/images/icons/tools.png" alt="" title="" /><span>设置</span></router-link></li>

                      <!--                                    <li><a href="/mn/blog"><img src="/static/public/images/icons/blog.png" alt="" title="" /><span>Blog</span></a></li>-->
                      <!--                                    <li><a href="/mn/gallery"><img src="/static/public/images/icons/photos.png" alt="" title="" /><span>相册</span></a></li>-->
                      <!--                                    <li><a href="/mn/client"><img src="/static/public/images/icons/clients.png" alt="" title="" /><span>Clients</span></a></li>-->
                    </ul>
                    <div class="clearfix"></div>
                  </div>
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
  name: 'MnMenu'
}
</script>

<style scoped>

</style>
