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


                      <el-form :model="user" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="userName">
                          <el-input v-model.trim="user.userName" placeholder="用户名为邮箱或手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                          <el-input type="password" v-model.trim="user.password" autocomplete="off"  placeholder="长度为6-20位"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                          <el-input type="password" v-model.trim="user.checkPass" autocomplete="off" placeholder="请再次输入密码" ></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" plain size="small" :disabled="isDisabled" @click="submitForm('ruleForm')">注册</el-button>
                          <el-button type="success" plain size="small" @click="resetForm('ruleForm')">重置</el-button>
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
import {REGISTER} from "../../common/request_url";
import {isEmail,isMobileNumber} from "../../common/str_utils";
export default {
  name: 'register',
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value || value === ''|| value === undefined) {
        return callback(new Error('用户名不能为空'));
      }
      if (value.length > 20) {
        return callback(new Error('用户名最大字符长度为20'));
      }
      if(!isEmail(value) && !isMobileNumber(value)) {
        return callback(new Error('用户名必须是邮箱或手机号'));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value || value === ''|| value === undefined) {
        return callback(new Error('请输入密码'));
      }

      if (value.length < 6 || value.length > 20) {
        return callback(new Error('密码长度为6-20位'));
      }
      return callback();

    };
    var validatePass2 = (rule, value, callback) => {
      if (!value || value === ''|| value === undefined) {
        return callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        return callback(new Error('两次输入密码不一致!'));
      } else {
        return callback();
      }
    };
    return {
      isDisabled: false,
      user: {
        password: '',
        checkPass: '',
        userName: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.isDisabled = true;
          this.doRegister()
        } else {
          return false;
        }
      });
    },
    async doRegister(){
        let _this = this;
        let responseData = await REGISTER({"userName":this.user.userName,"password":this.user.password});
        if (responseData && responseData.statusCode === 200){
          if(responseData.data){
            localStorage.setItem('token', responseData.data.token);
            localStorage.setItem('userId', responseData.data.userId);
            localStorage.setItem('userName', responseData.data.userName);
          }
          this.$message({
            message: responseData.message,
            type: 'success',
            offset:60
          });
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
    }
  },
  mounted() {
    // if(this.mnItem.note_date =='' && this.$router.query.day != ''){
    //   this.mnItem.note_date = this.$router.query.day
    // }
    setTimeout(function () {
      document.getElementById("header").style.top = "0px";
    }, 100)
  }

}
</script>

<style scoped>

</style>
