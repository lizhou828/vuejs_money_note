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

                      <h2 class="page_title">今天账本</h2>
                      <div class="toogle_wrap_blog radius8">
                        <div>
                          <el-date-picker
                              v-model="currentDate"
                              type="date"
                              @change="changeDate"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期"  style="width: 200px;border: none; background-color: #85af5d;color: #fff;font-size: 25px;line-height: 35px;" >
                          </el-date-picker>
                        </div>
                      </div>
                      <ul class="posts">
                        <li class="post"
                            v-if="currentDayCountMap  && currentDayCountMap!= null && currentDayCountMap != undefined">
                          <a href="javascript:void(0)" class="post_more"></a>
                          <div class="post_right_reveal">
                            <h4>
                                  <span>收入：
                                      <span
                                        class="money_green_color">{{currentDayCountMap.income|currency}}</span>
                                  </span>
                            </h4>
                            <h4>
                                  <span>支出：
                                      <span class="money_red_color">{{currentDayCountMap.pay|currency}}</span>
                                  </span>
                            </h4>
                          </div>
                          <div class="post_left">
                            <div class="container_white">
                              <span>总计</span>
                            </div>
                          </div>
                        </li>

                        <li class="post" v-for="mnItem in  mnItemList " @click="editItemDetail(mnItem.itemId)">
                          <a href="javascript:void(0)" class="post_more"></a>
                          <div class="post_right_reveal">
                            <h4><span>名称：{{mnItem.itemName}}</span></h4>
                            <h4>
                              <span>金额：
                                  <span
                                    v-bind:class="{'money_red_color':mnItem.type ==-1 ,'money_green_color':mnItem.type == 1 ,}">
                                      {{mnItem.money|currency}}
                                  </span>
                              </span>
                            </h4>
                            <h4><span>时间：{{mnItem.updateTime && mnItem.updateTime != undefined && mnItem.updateTime != "" ? mnItem.updateTime : mnItem.createTime}}</span></h4>
                          </div>
                          <div class="post_left">
                            <div :class="{'container_green':mnItem.type == 1 , 'container_red':mnItem.type == -1}">
                              <span>{{ mnItem.type == 1 ? "收入" : "支出"}}</span>
                            </div>
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
  import {MN_DAY_LIST} from "../../common/request_url";
  export default {
    name: 'dayList',
    data() {
      return {
        currentDate: '',
        currentDayCountMap: {},
        mnItemList: []
      }
    },
    watch: {
      $route(){ // 监听路由参数的变化
        this.currentDate = this.$route.query.day;
        let responseData = MN_DAY_LIST({"day":this.currentDate});
        if (responseData && responseData.status === 200){
          this.currentDate =   responseData.data.currentDate;
          this.mnItemList =   responseData.data.mnItemList;
          this.currentDayCountMap =   responseData.data.currentDayCountMap;
        }
        localStorage.setItem("query_note_date",this.currentDate);
        // console.info("监听路由参数的变化this.currentDate=" + this.currentDate)
      },
    },
    methods: {
      editItemDetail(item_id) {
        this.$router.push(
          {path: '/mnItem/blank', query: {itemId: item_id}}
        )
      },
      changeDate(date){
        console.info("改变后的日期：" + date);
        localStorage.setItem("query_note_date",date);
        this.$router.push({path: '/mnItem/dayList', query: {"day":date}});
        this.getDataByDate(date)
      },
      async initData(){
        let date = this.currentDate;
        if(!date || date === '' || date === undefined){
          date = localStorage.getItem("query_note_date")
        }
        await this.getDataByDate(date)
      },
      async getDataByDate(date){
        let _this = this;
        let responseData = await MN_DAY_LIST({"day":date});
        if (responseData && responseData.status === 200){
          _this.currentDate =   responseData.data.currentDate;
          _this.mnItemList =   responseData.data.mnItemList;
          _this.currentDayCountMap =   responseData.data.currentDayCountMap;
        }
      }
    },
    created:function(){
      this.initData();
    },
    mounted(){
      setTimeout(function () {
        document.getElementById("header").style.top = "0px";
      },100)
    }
  }
</script>

<style scoped>
  .money_red_color {
    color: red;
  }

  .money_green_color {
    color: green;
  }

</style>
