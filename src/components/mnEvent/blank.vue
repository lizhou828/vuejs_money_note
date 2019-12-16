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
                    <div class="pages_container" style="min-height: 1000px;">
                      <form id="addEvent" action="/mnEvent/saverOrUpdate" method="post">

                        <input id="eventId" name="event_id" type="hidden" v-model="mnEvent.eventId"/>
                        <input  name="user_id" type="hidden" v-model="mnEvent.userId "/>
                        <h2 class="page_title">{{  mnEvent && mnEvent.eventId > 0  ? "查看" : "新增"}}事件</h2>
                        <div class="toogle_wrap_blog radius8" >
                          <div style="color: white;font-size: 16px;line-height: 20px;">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您新建事件后，在记账时可以选择事件进行关联(默认不关联事件)，这样你就可以查看该事件下的记账信息!
                          </div>
                        </div>

                        <el-form :model="mnEvent" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                          <el-form-item label="名称" required prop="eventName">
                            <el-input v-model="mnEvent.eventName"></el-input>
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input type="textarea" v-model="mnEvent.eventDesc"></el-input>
                          </el-form-item>
                          <el-form-item label="总支出"   v-if="mnEvent && mnEvent.eventId  > 0" >
                            <el-input  v-model="mnEvent.moneyCount"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" plain size="small"  :disabled="isDisabled" @click="submitForm('ruleForm')">保存</el-button>
                            <el-button type="success" plain size="small" @click="resetForm('ruleForm')">重置</el-button>
                            <el-button type="danger" plain size="small" @click="deleteEvent('ruleForm')" v-if="mnEvent && mnEvent.eventId  > 0">删除</el-button>
                          </el-form-item>
                        </el-form>

                        <div v-if="mnItemList && mnItemList.length > 0 ">
                            <h4 style="padding: 70px 0 20px 0;">事件记账明细</h4>
                            <ul class="responsive_table" style="font-size: 14px;">
                              <li class="table_row" style="font-size: 18px;">
                                <div class="table_section" style="width:38%">支出名称</div>
                                <div class="table_section_last" style="width:32%">金额</div>
                                <div class="table_section_small" style="width:25%">日期</div>
                              </li>

                              <li class="table_row" style="cursor: pointer" v-for="mnItem in mnItemList" @click="detailPage(mnItem.itemId) ">
                                <div class="table_section" style="width:38%">{{mnItem.itemName}}</div>
                                <div class="table_section_last" style="width:32%">
                                  {{mnItem.money|currency('￥') }}
                                </div>
                                <div class="table_section_small" style="width:25%">{{mnItem.noteDate}}</div>
                              </li>
                            </ul>
                        </div>
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
import {EVENT_DETAIL,EVENT_DELETE,EVENT_SAVE_OR_UPDATE} from "../../common/request_url";
export default {
  name: 'blank',
  data() {
    return {
      isDisabled: false,
      currentUserId: "",
      mnEvent:{},
      mnItemList: [],
      rules:{
        eventName:[
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    detailPage(item_id) {
      this.$router.push({path:'/mnItem/blank',query:{itemId:item_id}})
    },
    async initData(){
      let event_id = localStorage.getItem("query_event_id");
      await this.getDataById(event_id);
    },
    async getDataById(eventId){
      let _this = this;
      let responseData = await EVENT_DETAIL({"id":eventId});
      if (responseData && responseData.status === 200){
        _this.currentUserId = responseData.data.currentUserId;
        _this.mnEvent = responseData.data.mnEvent;
        _this.mnItemList = responseData.data.mnItemList;
      }
    },
    async save_or_update(){
      let responseData = await EVENT_SAVE_OR_UPDATE(this.mnEvent);
      console.info("返回数据：" + responseData + ",data="+ responseData.data);
      if (responseData && responseData.status === 200){
        this.$message({
          message: responseData.message,
          type: 'success',
          offset:60
        });
        this.$router.push({path:"/mnEvent/list"})
      }else{
        this.$message({
          message: responseData.message,
          type: 'success',
          offset:60
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async deleteEvent() {
      let responseData = await EVENT_DELETE({"id":this.mnEvent.eventId});
      if (responseData && responseData.status === 200){
        this.$message({
          message: responseData.message,
          type: 'success',
          offset:60
        });
        this.$router.push({path:"/mnEvent/list"})
      }else{
        this.$message({
          message: responseData.message,
          type: 'success',
          offset:60
        });
      }
    },
    submitForm(formName) {
      this.isDisabled = true;
      let valid = this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save_or_update()
        } else {
          console.log('保存失败！');
          return false;
        }
      });
      setTimeout(() => {
        this.isDisabled= false
      }, 3000)

    },
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
