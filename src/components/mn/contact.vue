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
                      <h3>联系我们</h3>
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
                        <el-form-item label="标题" prop="title">
                          <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="类型" prop="type">
                          <el-select v-model="ruleForm.type" placeholder="请选择类型">
                            <el-option label="功能" value="1"></el-option>
                            <el-option label="兼容性" value="2"></el-option>
                            <el-option label="UI设计" value="3"></el-option>
                            <el-option label="操作体验" value="4"></el-option>
                            <el-option label="其他" value="5"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="详细内容" prop="content">
                          <el-input type="textarea" v-model="ruleForm.content"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="联系人" prop="contactName" required="false">-->
                          <!--<el-input v-model="ruleForm.contactName"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="联系方式" prop="contactWay" required="false">-->
                          <!--<el-input v-model="ruleForm.contactWay"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item>
                          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
</template>

<script>
import {ADD_FEEDBACK} from "../../common/request_url";
export default {
  name: 'contact',
  data() {
    return {
      ruleForm: {
        title: '',
        type: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '详细内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFeedBack();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async addFeedBack(){
      let responseData = await ADD_FEEDBACK(this.ruleForm);
      if (responseData && responseData.statusCode == 200) {
        this.$message({
          message: "提交成功!",
          type: 'success',
          offset:60
        });
        this.$router.push("/");
      }else{
        this.$message({
          message: responseData.message,
          type: 'error',
          offset:60
        });
      }
    }
  },
  mounted(){
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }
}
</script>

<style scoped>

</style>
