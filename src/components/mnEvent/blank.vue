<template>
    <div>
      <Header></Header>
      <div class="swiper-container swiper-parent">
        <div class="swiper-wrapper">

          <div class="swiper-slide sliderbg">
            <div class="swiper-container swiper-nested">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="slide-inner">
                    <div class="pages_container" style="min-height: 1000px;">
                      <form id="addEvent" action="/mnEvent/saverOrUpdate" method="post">

                        <input id="eventId" name="event_id" type="hidden" v-model="mnEvent.event_id"/>
                        <input  name="user_id" type="hidden" v-model="mnEvent.user_id "/>
                        <h2 class="page_title">{{  mnEvent && mnEvent.event_id > 0  ? "查看" : "新增"}}事件</h2>
                        <div class="toogle_wrap_blog radius8" >
                          <div style="color: white;font-size: 16px;line-height: 20px;">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您新建事件后，在记账时可以选择事件进行关联(默认不关联事件)，这样你就可以查看该事件下的记账信息!
                          </div>
                        </div>

                        <el-form :model="mnEvent" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                          <el-form-item label="名称" required prop="item_name">
                            <el-input v-model="mnEvent.event_name"></el-input>
                          </el-form-item>
                          <el-form-item label="描述" prop="remark">
                            <el-input type="textarea" v-model="mnEvent.event_desc"></el-input>
                          </el-form-item>
                          <el-form-item label="总支出" required prop="money">
                            <el-input v-model="mnEvent.moneyCount"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="saveEvent('ruleForm')">保存</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                            <el-button @click="deleteEvent('ruleForm')" v-if="mnEvent.event_id  > 0">删除</el-button>
                          </el-form-item>
                        </el-form>


                        <h4 style="padding: 70px 0 20px 0;">事件记账明细</h4>
                        <ul class="responsive_table" style="font-size: 14px;">
                          <li class="table_row" style="font-size: 18px;">
                            <div class="table_section" style="width:38%">支出名称</div>
                            <div class="table_section_last" style="width:32%">金额</div>
                            <div class="table_section_small" style="width:25%">日期</div>

                          </li>

                          <li class="table_row" style="cursor: pointer" v-for="mnItem in mnItemList" @click="detailPage(mnItem.item_id) ">
                            <div class="table_section" style="width:38%">{{mnItem.item_name}}</div>
                            <div class="table_section_last" style="width:32%">
                              &yen;{{mnItem.money > 0 ? mnItem.money : 0 }}
                            </div>
                            <div class="table_section_small" style="width:25%">{{mnItem.note_date}}</div>
                          </li>
                        </ul>
                      </form>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'blank',
  data() {
    return {
      currentUserId: 2,
      mnEvent:{
        event_id:1,
        user_id:2,
        event_name:'结婚',
        event_desc:'结婚以来的所有费用',
        moneyCount:36513.26

      },
      mnItemList: [
        {
          item_id: 1,
          item_name: '早餐',
          money: '6',
          note_date: '2019-12-06',
          type: -1
        },
        {
          item_id: 2,
          item_name: '中餐',
          money: '18',
          note_date: '2019-12-06',
          type: -1
        },
        {
          item_id: 3,
          item_name: '晚餐',
          money: '31',
          note_date: '2019-12-06',
          type: -1
        }
      ]
    }
  },
  methods: {
    detailPage(item_id) {
      this.$router.push({path:'/mnItem/blank',query:{item_id:item_id}})
    }
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
