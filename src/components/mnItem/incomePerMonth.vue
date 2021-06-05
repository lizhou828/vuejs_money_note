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
                        <div class="toogle_wrap_blog radius8" style="text-align: center">
                          <el-button-group style="width: 100%">
                            <el-button  style="border-radius: 24px 0 0 24px;" type="success"  plain icon="el-icon-arrow-left" @click=goNextMonth()></el-button>
                            <el-date-picker
                              v-model="month"
                              type="month"
                              @change="changeMonth"
                              value-format="yyyy-MM"
                              style="width: 50%;border: none; background-color: #85af5d;color: #fff;font-size: 18px;line-height: 35px;"
                              placeholder="请选择月份">
                            </el-date-picker>
                            <el-button style="border-radius: 0 24px 24px 0;float: right;" type="success" plain icon="el-icon-arrow-right" @click=goLastMonth()></el-button>
                          </el-button-group>
                        </div>

                        <ul class="posts">

                          <li class="post"  v-if="currentMonthSumMap">
                            <a href="javascript:void(0)" class="post_more"></a>
                            <div class="post_right_reveal">
                              <h4>
                                                        <span>收入：
                                                            <span style="color:green" >
                                                                {{currentMonthSumMap.income|currency}}
                                                            </span>
                                                        </span>
                              </h4>
                              <h4>
                                                        <span>支出：
                                                            <span style="color:red" >
                                                                {{currentMonthSumMap.pay|currency}}
                                                            </span>
                                                        </span>
                              </h4>
                              <h4>
                                                        <span>结余：
                                                            <span style="color:black" >
                                                                {{currentMonthSumMap.left|currency}}
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
                            <a class="post_more" @click="to_day_list(mn.noteDate)">
                            </a>
                            <div class="post_right_reveal">
                              <h4><span style="color:green">总收入 : {{mn.money|currency}}</span></h4>
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
      <searchIconFloat></searchIconFloat>
    </div>
</template>

<script>
import {formatDate} from "../../common/date";
import {MN_INCOME_PER_MONTH} from "../../common/request_url";
import moment from 'moment'
import SearchIconFloat from "../mn/searchIconFloat";
export default {
  name: 'incomePerMonth',
  components: {SearchIconFloat},
  data() {
    return {
      month:'',
      currentMonthSumMap:{},
      mnItemList:[]
    }
  },
  methods: {
    changeMonth(month) {
      this.$router.push(
        {path: '/mnItem/incomePerMonth', query: {month: month}}
      );
      this.getDataByMonth(month)
    },
    goLastMonth(){
      let lastMonth = moment(this.month).add(1,"months").format('YYYY-MM');
      this.month = lastMonth;
      this.changeMonth(lastMonth)
    },
    goNextMonth(){
      let nextMonth = moment(this.month).subtract(1,"months").format('YYYY-MM');
      this.month = nextMonth;
      this.changeMonth(nextMonth)
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
      let responseData = await MN_INCOME_PER_MONTH({"month":month});
      if (responseData && responseData.statusCode === 200){
        _this.month = responseData.data.month;
        _this.currentMonthSumMap = responseData.data.currentMonthSumMap;
        _this.mnItemList = responseData.data.mnItemList;
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
