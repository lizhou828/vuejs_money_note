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

                        <el-row>
                          <el-button type="success" plain @click="orderByColumn(month,'note_date','asc')">按日期显示</el-button>
                          <el-button type="primary" plain @click="orderByColumn(month,'money','desc')">按金额显示</el-button>
                        </el-row>

                        <ul class="posts" style="margin-top: 10px;">
                          <li class="post"  >
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
                                          {{currentMonthSumMap.income - currentMonthSumMap.pay |currency}}
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
                                          {{payedAverageEveryDay|currency}}
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
                              <h4><span style="color:red">总支出 : {{ mn.money|currency }}</span></h4>
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
import moment from 'moment'
export default {
  name: 'payedPerMonth',
  data() {
    return {
      month:'',
      orderBy:'note_date',
      ascDesc:'asc',
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
      this.month = month;
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
      let month = "";
      if(this.$route.query && this.$route.query.month){
        month  = this.$route.query.month;
        // console.info("当前url中月份参数，month=" +month)
      }
      if(month == null || month == '' || typeof month  == "undefined"){
        month = formatDate(new Date(), "yyyy-MM");
        // console.info("当前url中没有月份参数，采用默认的当前月份，month=" +month)
      }
      this.month = month;
      this.orderBy =  this.$route.query && this.$route.query.orderBy ? this.$route.query.orderBy : "note_date";
      this.ascDesc =  this.$route.query && this.$route.query.ascDesc ? this.$route.query.ascDesc : "asc";
      await this.getDataByMonth()
    },
    async  getDataByMonth(){
      let _this = this;
      let responseData = await MN_PAYED_PER_MONTH({"month":_this.month,"orderBy":_this.orderBy,"ascDesc":_this.ascDesc});
      if (responseData && responseData.statusCode === 200){
        _this.month = responseData.data.month;
        _this.currentMonthSumMap = responseData.data.currentMonthSumMap;
        _this.mnItemList = responseData.data.mnItemList;
        _this.payedAverageEveryDay = responseData.data.payedAverageEveryDay;
      }
    },
    orderByColumn(month,orderBy,ascDesc){
      this.$router.push(
        {path: '/mnItem/payedPerMonth', query: {month: month,orderBy:orderBy,ascDesc:ascDesc}}
      );
      this.month = month;
      this.orderBy =  orderBy;
      this.ascDesc =  ascDesc ;
      this.getDataByMonth()
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
