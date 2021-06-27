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

                      <h2 class="page_title">搜索</h2>
                      <div class="toogle_wrap_blog radius8" style="text-align: center;height: 50px" >
                        <el-input style="width: 60%;float: left;font-size: 18px" placeholder="请输入关键字" v-model="keyword" class="input-with-select">
                        </el-input>
                        <el-button  style="width: 15%;float: right;margin-left: 2%" slot="append" icon="el-icon-delete" @click="clearKeywords()"></el-button>
                        <el-button  style="width: 15%;float: right" slot="append" icon="el-icon-search" @click="searchAndOrderBy()"></el-button>
                      </div>

                      <!--<el-row>-->
                      <!--<el-button type="success" plain @click="orderByColumn(month,'note_date','asc')">按日期排序</el-button>-->
                      <!--<el-button type="primary" plain @click="orderByColumn(month,'money','desc')">按金额排序</el-button>-->
                      <!--</el-row>-->



                      <ul class="posts" style="padding:10px 0 0 0; overflow:auto">
                        <li class="post" v-for="mnItem in  allMnItemList " @click="editItemDetail(mnItem.itemId)">
                          <a href="javascript:void(0)" class="post_more"></a>
                          <div class="post_right_reveal">
                            <h4><span style="overflow: hidden; white-space: nowrap;	text-overflow: ellipsis;">名称：{{mnItem.itemName}}</span>
                            </h4>
                            <h4>
                              <span style="overflow: hidden; white-space: nowrap;	text-overflow: ellipsis;">
                                金额：
                                  <span
                                    v-bind:class="{'money_red_color':mnItem.type ==-1 ,'money_green_color':mnItem.type == 1 ,}">
                                      {{mnItem.money|currency}}
                                  </span>
                              </span>
                            </h4>
                            <h4>
                              <span style="overflow: hidden; white-space: nowrap;	text-overflow: ellipsis;">
                                备注：{{mnItem.remark}}
                              </span>
                            </h4>
                          </div>
                          <div class="post_left">
                            <span class="month" style="font-size:16px; padding:10px 0 0 0;">{{mnItem.noteDate != null ? mnItem.noteDate.substr(5,2): ""}}月{{mnItem.noteDate != null ? mnItem.noteDate.substr(8,2): ""}}号</span>
                            <span class="month" style="font-size:13px; padding:10px 0 0 0;">{{mnItem.noteDate != null ? mnItem.noteDate.substr(0,4):""}}年</span>
                          </div>
                        </li>
                      </ul>
                      <!--<p v-if="loading">加载中...</p>-->
                      <!--<p v-if="noMore">没有更多了</p>-->

                    </div>
                    <!--End of posts archive page-->




                    <div class="scrolltop radius20">
                      <!--<el-button  style="max-width :30%;border-radius: 24px 0 0 24px;float: left" type="success"  plain icon="el-icon-arrow-left" @click=goLastPage()></el-button>-->
                      <a href="#"><img src="/static/public/images/icons/top.png" alt="回到顶部" title="回到顶部"/></a>
                      <!--<el-button style="max-width:30%;border-radius: 0 24px 24px 0;float: right;" type="success" plain icon="el-icon-arrow-right" @click=goNextPage()></el-button>-->
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
  import {SEARCH_ITEM_NAME_BY_LIKE} from "../../common/request_url";
  import moment from 'moment'
  import { Message} from 'element-ui';

  export default {
    name: 'mnItemSearch',

    data() {
      return {
        keyword: '',
        mnItemList: [],
        orderBy: '',
        ascDesc: '',
        pageNum: 1,
        pageSize: 10,
        total:0,
        totalPage:0,
        allMnItemList:[],
        loadSign: false,

      }
    },
    methods: {
      editItemDetail(item_id) {
        this.$router.push(
          {path: '/mnItem/blank', query: {itemId: item_id}}
        )
      },
      clearKeywords(){
        this.keyword = "";
        localStorage.setItem("mnItem_search_keyword","");
      },

      async initData() {
        await this.searchAndOrderBy()
      },
      async searchAndOrderBy() {
        let _this = this;
        // console.info("_this.keyword=" + _this.keyword);
        if (_this.keyword == null || _this.keyword == "" || typeof _this.keyword == "undefined") {
          _this.keyword = localStorage.getItem("mnItem_search_keyword");
        }
        _this.keyword = _this.keyword == null && typeof _this.keyword == "undefined" ? "" : _this.keyword;

        if(_this.keyword == "" || _this.keyword == null || typeof  _this.keyword == "undefined"){
          return
        }
        let responseData = await SEARCH_ITEM_NAME_BY_LIKE({
          "keyword": _this.keyword,
          "orderBy": _this.orderBy,
          "ascDesc": _this.ascDesc,
          "pageNum": _this.pageNum,
          "pageSize":_this.pageSize
        });
        if (responseData && responseData.statusCode === 200) {
          _this.mnItemList = responseData.data.resultList;
          _this.allMnItemList.push.apply(_this.allMnItemList, this.mnItemList); // //将分页查询的数据拼接到一起，此种方式不会产生一个新的数组
          _this.allMnItemList = Array.from(new Set(_this.allMnItemList)); //利用ES6的set数据结构，进行去重

          _this.pageNum = responseData.data.pageNo;
          _this.pageSize = responseData.data.pageSize;
          _this.total = responseData.data.total;
          _this.totalPage = responseData.data.totalPage;
          if(_this.mnItemList != null && _this.mnItemList.length > 0){
            localStorage.setItem("mnItem_search_keyword",_this.keyword);
          }else if( (_this.allMnItemList == null || _this.allMnItemList.length == 0) && (_this.mnItemList = null ||  _this.mnItemList.length == 0)){
            localStorage.setItem("mnItem_search_keyword","");
            Message({
              message: '没有相关记账数据...',
              type: 'warning',
              offset:60
            });
          }
        }
      },
      orderByColumn(orderBy, ascDesc) {
        this.orderBy = orderBy;
        this.ascDesc = ascDesc;
        this.searchAndOrderBy()
      },
      // goNextPage() {
      //   if(this.pageNum >= this.totalPage){
      //     this.pageNum = this.totalPage
      //   }else{
      //     this.pageNum += 1;
      //   }
      //   if(this.allMnItemList.length < this.total){
      //     this.searchAndOrderBy();
      //   }
      //
      // },
      // goLastPage() {
      //   if(this.pageNum <= 0){
      //     this.pageNum = 1;
      //   }else{
      //     this.pageNum -= 1;
      //   }
      //   if(this.allMnItemList.length < this.total){
      //     this.searchAndOrderBy();
      //   }
      // },
      loadMoreData() {
        console.info("loadMoreData...");

        if (this.loadSign) { //当其为true 的时候进入方法
          //判断数据是否加载完毕，完毕就返回不在继续请求后台加载数据
          if (this.pageNum > this.totalPage) {
            console.info("已到最后一页了");
            return;
          }
          //进入加载数据时，将控制字段更新，避免多次触发调用
          this.loadSign = false;
          console.info("this.pageNum =" + this.pageNum);
          this.pageNum += 1;
          console.info("this.pageNum =" + this.pageNum);
          this.searchAndOrderBy();
        }
      },

      // 判断浏览器函数
      isMobile(){
        if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
          return true; // 移动端
        }else{
          return false; // PC端
        }
      }


    },
    created: function () {
      this.initData();
    },
    computed: {
      // noMore () {
      //   return this.allMnItemList.length >= this.total
      // },
      // disabled () {
      //   return this.loading || this.noMore
      // }
    },
    watch: {
      // 监听数据变化
      keyword: {
        handler: function(o,u) {

          //这时候 o = 岑先生、u = 不认识
          // console.log('数据更新', o, u);
          this.pageNum =1
          this.allMnItemList =[]
          this.mnItemList = []
        },
        deep: true
      }
    },

    mounted() {
      setTimeout(function () {
        document.getElementById("header").style.top = "0px";
      }, 100);

      // 监听滚动条是否滚到最底部
      let _this = this;
      window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        console.log("scrollTop + windowHeight =" + (scrollTop + windowHeight) );
        console.log("scrollHeight =" + (scrollHeight) );

        //因移动端和PC端浏览器的尺寸不一，滚动条到底部的条件也不一样
        var arriveBottom = scrollTop + windowHeight == scrollHeight;
        if(_this.isMobile()){
          // 快到底部时触发，兼容移动设备
          arriveBottom = scrollTop + windowHeight >= scrollHeight - 55 && scrollTop + windowHeight < scrollHeight - 50
        }

        //滚动条到底部的条件
        if( arriveBottom ){
          //到了这个就可以进行业务逻辑加载后台数据了
          console.log("到了底部");
          _this.loadSign = true; // 滚到底部后， 允许加载下一页数据
          _this.loadMoreData();

          if (_this.allMnItemList != null && _this.allMnItemList.length != 0 && _this.pageNum > _this.totalPage) {
            console.log("我是有底线的....");

          }

        }
      }
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
