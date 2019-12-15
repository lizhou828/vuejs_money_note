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

                        <h2 class="page_title">本月支出汇总</h2>
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
                          <li class="post" v-if="currentMonthSumMap && currentMonthSumMap.length > 0" >
                            <a href="javascript:void(0)" class="post_more"></a>
                            <div class="post_right_reveal">
                              <h4>
                                                            <span>收入：
                                                                <span style="color:green" >
                                                                    {{currentMonthSumMap.income|currency('￥')}}
                                                                </span>
                                                            </span>
                              </h4>
                              <h4>
                                                            <span>支出：
                                                                <span style="color:red" >
                                                                    {{currentMonthSumMap.pay|currency('￥')}}
                                                                </span>
                                                            </span>
                              </h4>
                              <h4>
                                                            <span>结余：
                                                                <span style="color:black" >
                                                                    {{currentMonthSumMap.income - currentMonthSumMap.pay |currency('￥')}}
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


                          <li class="post" v-if="payedAverageEveryDay" >
                            <a href="javascript:void(0)" class="post_more"></a>
                            <div class="post_right_reveal">
                              <h4>
                                  <span>日均支出：
                                      <span style="color:red" >
                                          {{payedAverageEveryDay|currency('￥')}}
                                      </span>
                                  </span>
                              </h4>
                            </div>
                            <div class="post_left">
                              <div class="container_white">
                                <span>日均</span>
                              </div>
                            </div>
                          </li>

                          <li class="post" id="postid1" v-for="mn in mnItemList">
                            <a class="post_more" @click="to_day_list(mn.noteDate)">
                            </a>
                            <div class="post_right_reveal">
                              <h4><span style="color:red">总支出 : {{ mn.money|currency('￥') }}</span></h4>
                            </div>
                            <div class="post_left">
                              <span class="day">{{ mn.day }}</span>
                              <span class="month">{{ mn.month }}月</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--End of posts archive page-->

                      <div class="scrolltop radius20"><a href="#"><img src="/static/public/images/icons/top.png" alt="Go on top" title="Go on top"/></a>
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
import {MN_PAYED_PER_MONTH} from "../../common/request_url";

export default {
  name: 'payedPerMonth',
  data() {
    return {
      month:'',
      currentMonthSumMap:{},
      payedAverageEveryDay:0,
      mnItemList:[]
    }
  },
  methods: {
    changeMonth(month) {
      this.$router.push(
        {path: '/mnItem/payedPerMonth', query: {month: month}}
      );
      this.getDataByMonth(month)
    },
    to_day_list(noteDate){
      localStorage.setItem("query_note_date",noteDate);
      this.$router.push({path:'/mnItem/dayList',query:{day:noteDate}});
    },
    async initData(){
      let month = formatDate(new Date(), "yyyy-MM");
      await this.getDataByMonth(month)
    },
    async  getDataByMonth(month){
      let _this = this;
      let responseData = await MN_PAYED_PER_MONTH({"month":month});
      if (responseData && responseData.status === 200){
        _this.month = responseData.data.month;
        _this.currentMonthSumMap = responseData.data.currentMonthSumMap;
        _this.mnItemList = responseData.data.mnItemList;
        _this.payedAverageEveryDay = responseData.data.payedAverageEveryDay;
      }
    }
  },
  created:function(){
    this.initData();
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
