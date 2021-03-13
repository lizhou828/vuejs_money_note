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
                      <div class="toogle_wrap_blog radius8" style="text-align: center">
                        <el-button-group style="width: 100%">
                          <!--<el-button  style="border-radius: 24px 0 0 24px;" type="success"  plain icon="el-icon-arrow-left" @click=goNextPage()></el-button>-->
                          <el-input placeholder="请输入要搜索的内容" v-model="keyword" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" @click="searchAndOrderBy()"></el-button>
                          </el-input>
                          <!--<el-button style="border-radius: 0 24px 24px 0;float: right;" type="success" plain icon="el-icon-arrow-right" @click=goLastPage()></el-button>-->
                        </el-button-group>
                      </div>

                      <el-row>
                      <el-button type="success" plain @click="orderByColumn(month,'note_date','asc')">按日期排序</el-button>
                      <el-button type="primary" plain @click="orderByColumn(month,'money','desc')">按金额排序</el-button>
                      </el-row>


                      <!--<ul class="infinite-list" v-infinite-scroll="loadMoreData" infinite-scroll-disabled="disabled" infinite-scroll-distance="100"  style="overflow:auto">-->
                        <!--<li v-for="i in infiniteCount" class="infinite-list-item" style="line-height: 150px">{{ i }}</li>-->
                      <!--</ul>-->

                      <ul class="posts" v-infinite-scroll="loadMoreData"  style="padding:10px 0 0 0; overflow:auto">
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
                      <p v-if="loading">加载中...</p>
                      <p v-if="noMore">没有更多了</p>

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

  export default {
    name: 'mnItemSearch',

    data() {
      return {
        keyword: '',
        mnItemList: [],
        orderBy: '',
        ascDesc: '',
        pageNum: 1,
        pageSize: 5,
        total:0,
        totalPage:0,
        allMnItemList:[],
        loading: false
      }
    },
    methods: {
      editItemDetail(item_id) {
        this.$router.push(
          {path: '/mnItem/blank', query: {itemId: item_id}}
        )
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

        let responseData = await SEARCH_ITEM_NAME_BY_LIKE({
          "keyword": _this.keyword,
          "orderBy": _this.orderBy,
          "ascDesc": _this.ascDesc,
          "pageNum": _this.pageNum,
          "pageSize":_this.pageSize
        });
        if (responseData && responseData.statusCode === 200) {
          _this.mnItemList = responseData.data.resultList;
          _this.allMnItemList.push.apply(_this.allMnItemList, this.mnItemList);
          _this.pageNum = responseData.data.pageNo;
          _this.pageSize = responseData.data.pageSize;
          _this.total = responseData.data.total;
          _this.totalPage = responseData.data.totalPage;
          if(_this.mnItemList != null && _this.mnItemList.length > 0){
            localStorage.setItem("mnItem_search_keyword",_this.keyword);
          }else{
            localStorage.setItem("mnItem_search_keyword","");
          }
        }
      },
      orderByColumn(orderBy, ascDesc) {
        this.orderBy = orderBy;
        this.ascDesc = ascDesc;
        this.searchAndOrderBy()
      },
      goNextPage() {
        if(this.pageNum >= this.totalPage){
          this.pageNum = this.totalPage
        }else{
          this.pageNum += 1;
        }
        if(this.allMnItemList.length < this.total){
          this.searchAndOrderBy();
        }

      },
      goLastPage() {
        if(this.pageNum <= 0){
          this.pageNum = 1;
        }else{
          this.pageNum -= 1;
        }
        if(this.allMnItemList.length < this.total){
          this.searchAndOrderBy();
        }
      },
      loadMoreData(){
        console.info("loadMoreData...");
        this.loading = true;
        setTimeout(() => {
          this.goNextPage();
          this.loading = false
        }, 2000)

      }
    },
    created: function () {
      this.initData();
    },
    computed: {
      noMore () {
        return this.allMnItemList.length >= this.total
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    watch: {
      // 监听数据变化
      keyword: {
        handler: function(o,u) {

          //这时候 o = 岑先生、u = 不认识
          console.log('数据更新', o, u);
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
      }, 100)
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
