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
                      <h2 class="page_title">记账事件列表</h2>
                      <blockquote>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您可以新建事件，在记账时可以选择事件进行关联(默认不关联事件)，这样你就可以查看该事件下的记账信息!
                      </blockquote>
                      <h4>记账事件统计</h4>
                      <ul class="responsive_table" style="font-size: 18px;">
                        <li class="table_row">
                          <div class="table_section_small">序号</div>
                          <div class="table_section">事件名称</div>
                          <div class="table_section_last">总支出</div>
                        </li>
                        <li class="table_row" style="cursor: pointer" v-for="(mnEvent,index) in mnEventList" @click="detailPage(mnEvent.eventId)">
                          <div class="table_section_small"> {{index+1 }}</div>
                          <div class="table_section">{{mnEvent.eventName}}</div>
                          <div class="table_section_last">
                            {{mnEvent.moneyCount|currency('￥')}}
                          </div>
                        </li>
                      </ul>
                      <a @click="newEvent" class="form_submit button_12 blue blue_borderbottom radius4" style="width:100%">新建事件</a>
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
  import {EVENT_LIST} from "../../common/request_url";
export default {
  name: 'list',
  data() {
    return {
      mnEventList: []
    }
  },
  methods: {
    detailPage(event_id) {
      this.$router.push({path:'/mnEvent/blank',query:{id:event_id}});
      localStorage.setItem("query_event_id",event_id);
    },
    newEvent(){
      this.$router.push({path:'/mnEvent/blank'});
      localStorage.setItem("query_event_id","");
    },
    async initData(){
      let _this = this;
      let responseData = await EVENT_LIST();
      if (responseData && responseData.status === 200){
        _this.mnEventList = responseData.data;
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

</style>
