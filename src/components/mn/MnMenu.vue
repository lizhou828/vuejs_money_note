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
                      <li><a @click="to_mnItem_blank"><img src="/static/public/images/icons/pencil.png" alt="" title="" /><span>记账</span></a></li>
                      <li><a @click="to_mnItem_dayList"><img src="/static/public/images/icons/docs.png" alt="" title="" /><span>账本</span></a></li>

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
            <div style="text-align: center;color: white;font-size: larger;margin-bottom: 20px">
              Copyright&nbsp;©&nbsp;2014&nbsp;-&nbsp;2020  &nbsp;&nbsp;lizhou828.com&nbsp;版权所有 <br/>
              <a href="http://www.beian.miit.gov.cn" style="color: white;font-size: larger" >粤ICP备19107759号-1</a>
            </div>

            <div class="swiper-scrollbar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "../../common/date";
let currentDate = formatDate(new Date(),"yyyy-MM-dd");
let currentMonth = formatDate(new Date(),"yyyy-MM");

export default {
  name: 'MnMenu',
  methods: {
    to_mnItem_blank() {
      localStorage.setItem("query_note_date",currentDate );
      this.$router.push({path:"/mnItem/blank"})
    },
    to_mnItem_dayList() {
      localStorage.setItem("query_note_date",currentDate );
      this.$router.push({path:"/mnItem/dayList"})
    }

  },
}
</script>

<style scoped>

</style>
