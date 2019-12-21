<template>
  <div>
    <commonHead ></commonHead>
    <div class="swiper-container swiper-parent">
      <div class="swiper-wrapper">
        <div class="swiper-slide sliderbg">
          <div class="swiper-container swiper-nested">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="slide-inner">
                  <div class="pages_container">

                    <div class="toogle_wrap_blog radius8">
                      <div class="trigger_blog" style="height: 30px;">
                        <h2 class="page_title" style="color: white">今日记账</h2>
                      </div>
                    </div>
                    <div class="mnBlank">
                      <el-form :model="mnItem" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="记账日期"  prop="noteDate">
                            <el-date-picker type="date" placeholder="选择日期"
                                            v-model="mnItem.noteDate"
                                            @change="changeDate"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="名称"  prop="itemName">
                          <el-input v-model.trim="mnItem.itemName"></el-input>
                        </el-form-item>
                        <el-form-item label="金额"  prop="money">
                          <el-input v-model.trim="mnItem.money"></el-input>
                        </el-form-item>
                        <el-form-item label="类别"  prop="cateId" >
                          <el-cascader :show-all-levels="false"
                           children="children"
                            v-model="mnItem.cateId"
                            :options="cateOptions"
                            @change="changeCate"></el-cascader>
                        </el-form-item>
                        <el-form-item label="是否必须" prop="needful">
                          <el-switch v-model="isNeedful"></el-switch>
                        </el-form-item>
                        <el-form-item label="事件" prop="eventId" v-if="mnEventList && mnEventList.length > 0 ">
                          <el-select v-model="mnItem.eventId" placeholder="请选择">
                            <el-option
                              v-for="mnEvent in mnEventList"
                              :key="mnEvent.eventId"
                              :label="mnEvent.eventName"
                              :value="mnEvent.eventId">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                          <el-input type="textarea" v-model.trim="mnItem.remark"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" plain size="small" :disabled="isDisabled" @click="submitForm('ruleForm')">保存</el-button>
                          <el-button type="success" plain size="small" @click="resetForm('ruleForm')">重置</el-button>
                          <el-button type="danger" plain size="small" @click="deleteItem('ruleForm')" v-show="mnItem.itemId > 0">删除</el-button>
                        </el-form-item>
                      </el-form>
                    </div>

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
  import {ITEM_DETAIL,ITEM_DELETE,ITEM_SAVE_OR_UPDATE } from "../../common/request_url";
  export default {
    name: 'blank',
    data() {
      // 自定义校验金额
      var validateMoney = (rule, value, callback) => {
        if (!value) {
          return  callback(new Error('必须输入金额'))
        }
        var doubleReg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
        if (!doubleReg.test(value)) {
          return callback(new Error("请输入合法金额(最多保留2位小数)!"));
        }

        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 0 || value > 100000000) {
            return  callback(new Error('金额范围在 0 至 1亿 之间'))
          } else {
            return callback()
          }
        } else {
          return callback(new Error('金额必须为数字'))
        }
      };
      var validateNoteDate=(rule, value, callback) => {
        if (!value || value === "" || typeof value === "undefined") {
          console.info("validateNoteDate......value="+ value)
          return  callback(new Error('请选择记账日期1111'))
        }else{
          return callback()
        }
      }
      return {
        rules: {
          itemName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          money: [
            {required: true,validator: validateMoney, trigger: 'blur'}
          ],
          noteDate: [
            {required: true, validator: validateNoteDate, trigger: 'blur'}
          ]
        },

        isNeedful:false,
        isDisabled: false,
        currentUserId: "",
        cateValue: 11,
        mnItem: {},
        mnEventList: [],
        cateOptions: []
      }
    },
    watch: {
      // $route(){ // 监听路由参数的变化
      //   this.mnItem.noteDate = this.$route.query.day;
      // },
      'mnItem.cateId':{ //监听对象的属性
        handler:function(value){
          if(value && value != "" && value != undefined){
            if(value instanceof Array || value.length === 2){
              this.mnItem.cateId = value[1];
            }
          }
        }
      },
      isNeedful: {
        handler:function(value){
          if(value === true){
            this.mnItem.needful = 'Y';
          }else{
            this.mnItem.needful = 'N';
          }
        }
      },
      'mnItem.needful':{
        handler:function(value){
          this.isNeedful = value === "Y";
        }
      }
    },
    computed: {
      calc_needful() {
        return this.mnItem.needful == 'Y';
      }
    },
    methods: {
      changeDate(date) {
        this.mnItem.noteDate = date;
        console.info("记账页面，日期选择框有变动的日期=" + date);
        localStorage.setItem("query_note_date",date);
        console.info("记账页面，日期选择框有变动的日期，存入localStorage=" + localStorage.getItem("query_note_date") );
        this.$router.push( {path: '/mnItem/blank'} )
      },
      changeCate(value) {
        // console.log("选择完类别数据：" + value);
      },
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.isDisabled = true;
            this.save_or_update()
          } else {
            console.log('保存失败！');
            return false;
          }
        });
      },
      async save_or_update(){
        let _this = this;
        let responseData = await ITEM_SAVE_OR_UPDATE(this.mnItem);
        console.info("返回数据：" + responseData + ",data="+ responseData.data);
        if (responseData && responseData.status === 200){
          this.$message({
            message: responseData.message,
            type: 'success',
            offset:60
          });
          console.info("记账页面，提交表单后，query_note_date日期=" + this.mnItem.noteDate );
          localStorage.setItem("query_note_date",this.mnItem.noteDate);
          console.info("记账页面，提交表单后，日期存入localStorage=" + localStorage.getItem("query_note_date") );
          this.$router.push({path:"/mnItem/dayList"})
        }else{
          _this.isDisabled = false;
          this.$message({
            message: responseData.message,
            type: 'error',
            offset:60
          });
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async initData(){
        let itemId = this.$route.query.itemId;
        let responseData = await ITEM_DETAIL({"itemId":itemId});
        if (responseData && responseData.status === 200){
          this.currentUserId =   responseData.data.currentUserId;
          if(responseData.data.mnItem &&  responseData.data.mnItem.noteDate){
            this.mnItem =   responseData.data.mnItem;
          }else{
            // 受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
            // 要处理这种情况，我们可以使用$set()方法，既可以新增属性,又可以触发视图更新。链接：https://www.jianshu.com/p/96c822d14d30
            this.$set(this.mnItem, "noteDate", localStorage.getItem("query_note_date"));
            // this.mnItem.noteDate =  localStorage.getItem("query_note_date");
            console.info("初始化数据 this.mnItem.noteDate= " + this.mnItem.noteDate)
          }

          this.cateOptions =   responseData.data.cateOptions;
          this.mnEventList =   responseData.data.mnEventList;
          if(itemId && itemId != "" && itemId  > 0 && this.mnItem && this.mnItem.noteDate){
            localStorage.setItem("query_note_date",this.mnItem.noteDate);
          }
        }
      },
      async deleteItem(){
        let responseData = await ITEM_DELETE({"itemId":this.mnItem.itemId});
        if (responseData && responseData.status === 200){
          this.$message({
            message: responseData.message,
            type: 'success',
            offset:60
          });
          this.$router.push({path:"/mnItem/dayList",query:{"day":this.mnItem.noteDate}})
        }else{
          this.$message({
            message: responseData.message,
            type: 'error',
            offset:60
          });
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
  table tr {
    line-height: 50px;
  }

</style>
