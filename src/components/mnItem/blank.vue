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
                  <div class="pages_container">

                    <div class="toogle_wrap_blog radius8">
                      <div class="trigger_blog" style="height: 30px;">
                        <h2 class="page_title" style="color: white">今日记账</h2>
                      </div>
                    </div>
                    <div class="mnBlank">
                      <el-form :model="mnItem" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="记账日期" required prop="note_date">
                            <el-date-picker type="date" placeholder="选择日期"
                                            v-model="mnItem.note_date"
                                            @change="changeDate"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="名称" required prop="item_name">
                          <el-input v-model="mnItem.item_name"></el-input>
                        </el-form-item>
                        <el-form-item label="金额" required prop="money">
                          <el-input v-model="mnItem.money"></el-input>
                        </el-form-item>
                        <el-form-item label="类别" required prop="cate_id">
                          <el-cascader
                            v-model="mnItem.cate_id"
                            :options="cateOptions"
                            @change="changeCate"></el-cascader>
                        </el-form-item>
                        <el-form-item label="是否必须" prop="needful">
                          <el-switch v-model="mnItem.needful"></el-switch>
                        </el-form-item>
                        <el-form-item label="事件" prop="event_id">
                          <el-select v-model="mnItem.event_id" placeholder="请选择">
                            <el-option
                              v-for="mnEvent in mnEventList"
                              :key="mnEvent.event_id"
                              :label="mnEvent.event_name"
                              :value="mnEvent.event_id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                          <el-input type="textarea" v-model="mnItem.remark"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="saveItem('ruleForm')">保存</el-button>
                          <el-button @click="resetForm('ruleForm')">重置</el-button>
                          <el-button @click="deleteItem('ruleForm')" v-if="mnItem.itemId > 0">删除</el-button>
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
  export default {
    name: 'blank',
    data() {
      // 自定义校验金额
      var validateMoney = (rule, value, callback) => {
        if (!value) {
          callback(new Error('必须输入金额'))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 0 || value > 100000000) {
            callback(new Error('金额范围在 0 至 1亿 之间'))
          } else {
            callback()
          }
        } else {
          callback(new Error('金额必须为数字'))
        }
      };
      return {
        rules: {
          item_name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          money: [
            {validator: validateMoney, trigger: 'blur'}
          ],
          note_date: [
            {required: true, message: '请选择记账日期', trigger: 'change'}
          ]
        },

        isDisabled: false,
        currentUserId: 2,
        cateValue: 11,
        mnItem: {
          item_id: 1,
          note_date: '',
          user_id: 2,
          item_name: '早餐',
          money: 123.65,
          cate_id: 11,
          cate_name: '餐饮饮食',
          parent_cate_id: 2,
          parent_cate_name: '基本生活',
          type: -1,
          needful: true,
          event_id: 2,
          remark: "下次少买点"
        },
        mnEventList: [
          {
            event_id: 1,
            event_name: "基本生活"
          },
          {
            event_id: 2,
            event_name: "小康生活"
          },
          {
            event_id: 3,
            event_name: "小资情调"
          }

        ],
        cateOptions: [
          {
            value: 2,
            label: '基本生活',
            children: [
              {
                value: 10,
                label: '衣帽鞋服'
              },
              {
                value: 11,
                label: '餐饮饮食'
              }
            ],
          },
          {
            value: 3,
            label: '交通通讯',
            children: [
              {
                value: 23,
                label: '固话费'
              },
              {
                value: 22,
                label: '手机话费'
              }
            ]

          }
        ]

      }
    },
    computed: {
      calc_needful() {
        return this.mnItem.needful == 'Y';
      }
    },
    methods: {
      changeDate(date) {
        this.mnItem.note_date = date;
        this.$router.push(
          {path: '/mnItem/blank', query: {day: date}}
        )
      },
      changeCate(value) {
        console.log("选择完类别数据：" + value);
      },
      submitForm(formName) {
        this.isDisabled = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //todo 发送请求，保存数据
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  table tr {
    line-height: 50px;
  }

</style>
