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
                      <div class="posts_archive_page">

                        <h2 class="page_title">本月收入汇总</h2>
                        <div class="toogle_wrap_blog radius8">
                          <div>

                            <el-date-picker
                              v-model="month"
                              type="month"
                              @change="changeMonth"
                              value-format="yyyy-MM"
                              style="width: 200px;border: none; background-color: #85af5d;color: #fff;font-size: 25px;line-height: 35px;"
                              placeholder="请选择月份">
                            </el-date-picker>
                          </div>
                        </div>

                        <ul class="posts">

                          <li class="post"  v-if="currentMonthSumMap && currentMonthSumMap.length > 0 ">
                            <a href="javascript:void(0)" class="post_more"></a>
                            <div class="post_right_reveal">
                              <h4>
                                                        <span>收入：
                                                            <span style="color:green" >
                                                                {{currentMonthSumMap.income}}
                                                            </span>
                                                        </span>
                              </h4>
                              <h4>
                                                        <span>支出：
                                                            <span style="color:red" >
                                                                {{currentMonthSumMap.pay}}
                                                            </span>
                                                        </span>
                              </h4>
                              <h4>
                                                        <span>结余：
                                                            <span style="color:black" >
                                                                {{currentMonthSumMap.left}}
                                                            </span>
                                                        </span>
                              </h4>
                            </div>
                            <div class="post_left">
                              <div class="container_white">
                                <span>总计</span>
                              </div>
                            </div>
                          </li>



                          <li class="post"  v-for="mn in mnItemList">
                            <router-link class="post_more" :to="{path:'/mnItem/dayList',query:{day:mn.note_date}}">
                            </router-link>
                            <div class="post_right_reveal">
                              <h4><span style="color:green">总收入 : &yen; {{mn.money}}</span></h4>
                            </div>
                            <div class="post_left">
                              <span class="day">{{mn.day}}</span>
                              <span class="month">{{mn.month}}月</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--End of posts archive page-->
                      <div class="scrolltop radius20"><a href="#"><img src="/static/public/images/icons/top.png"
                                                                       alt="Go on top" title="Go on top"/></a>
                      </div>
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
import {formatDate} from "../../common/date";
import {MN_INCOME_PER_MONTH} from "../../common/request_url";
export default {
  name: 'incomePerMonth',
  data() {
    return {
      note_date: '',
      month:'2019-12',
      currentMonthSumMap:{
        income:126.36,
        pay:32.65,
        left:this.income-this.pay
      },
      mnItemList:[{
        note_date:'2019-12-01',
        money:162.65,
        day:"01",
        month:"12"
      },
        {
          note_date:'2019-12-02',
          money:224.24,
          day:"02",
          month:"12"

        }
      ]
    }
  },
  methods: {
    changeMonth(month) {
      this.$router.push(
        {path: '/mnItem/incomePerMonth', query: {month: month}}
      )
    }
  },
  mounted() {
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }
}
</script>

<style scoped>

</style>
