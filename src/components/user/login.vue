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
                      <el-form-item label="用户名" prop="userName" placeholder="请输入用户名(邮箱或手机号)">
                        <el-input v-model="user.userName"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item style="margin-left: -60px">
                        <el-button type="primary" plain size="small"  @click="submitForm('ruleForm')">登陆</el-button>

                        <router-link to="/user/register">
                          <el-button type="success" plain size="small">注册</el-button>
                        </router-link>

                        <!--<el-button type="danger" plain size="small">找回密码</el-button>-->
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
import {LOGIN} from "../../common/request_url";

export default {
  name: 'login',
  data() {
    var checkUsername = (rule, value, callback) => {
      // console.info("rule="+rule+",输入的用户名是：value=" +value + ',callback=' + callback);
      // console.info("输入的用户名是：value=" +value );
      if (!value || value ==='' || value === undefined ) {
        return callback(new Error('用户名不能为空'));
      }else if(value.length <2 || value.length > 20){
        return callback(new Error('用户名字符长度范围为2-20'));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      // console.info("输入的密码是：value=" +value);
      if (!value || value ==='' || value === undefined ) {
        return callback(new Error('请输入密码'));
      }else if(value.length <2 || value.length > 20){
          return callback(new Error('密码长度范围为2-20'));
      }else {
        return callback();
      }
    };

    return {
      user: {
        password: '',
        userName: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userName: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('登录失败！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 2. 定义登录的逻辑
    async login() {
      // 2.1 awiat Request_url(this.user)
      // 等待LOGIN(this.user)执行完,
      // 把返回值给userInfo
      let responseData = await LOGIN(this.user);
      // 2.2假设登录成功,返回的数据应该是
      // userInfo = {code:200, msg: 'success', data: {token:'xxxxx'}}
      // 然后根据返回的数据做相应的处理，比如储存token
      // console.log("请求登录接口：返回的数据是：" + JSON.stringify(userInfo));

      if (responseData.statusCode != 200) {
        this.$message({
          message: responseData.message,
          type: 'error',
          offset:60
        });
        //登录成功
      } else if (responseData.data != null) {
        localStorage.setItem('token', responseData.data.token);
        localStorage.setItem('userId', responseData.data.userId);
        localStorage.setItem('userName', responseData.data.userName);
        //  console.log("222" + JSON.stringify(userInfo.data.token));
        this.$message({
          message: "登录成功!",
          type: 'success',
          offset:60
        });
        let redirect = this.$route.query.redirect;
        if(!redirect || redirect === "" || redirect === undefined){
          this.$router.push("/");
        }else{
          this.$router.push(redirect);
        }
      } else {
        this.$message.error(responseData.message);
      }
    },
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
