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
                      <el-form-item label="用户名" prop="username" placeholder="请输入用户名(邮箱或手机号)">
                        <el-input v-model="user.username"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="user.pass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" plain @click="submitForm('ruleForm')">登陆</el-button>
                        <el-button type="success" plain >注册</el-button>
                        <el-button type="danger" plain >找回密码</el-button>
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
import {LOGIN} from "../../common/login";

export default {
  name: 'login',
  data() {
    var checkUsername = (rule, value, callback) => {
      // console.info("rule="+rule+",输入的用户名是：value=" +value + ',callback=' + callback);
      console.info("输入的用户名是：value=" +value );
      if (!value || value ==='' || value === undefined ) {
        return callback(new Error('用户名不能为空'));
      }else if(value.length <2 || value.length > 20){
        return callback(new Error('用户名字符长度范围为2-20'));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      console.info("输入的密码是：value=" +value);
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
        pass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
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
      // 2.1 awiat LOGIN(this.user)
      // 等待LOGIN(this.user)执行完,
      // 把返回值给userInfo
      let userInfo = await LOGIN(this.user);
      // 2.2假设登录成功,返回的数据应该是
      // userInfo = {code:200, msg: 'success', data: {token:'xxxxx'}}
      // 然后根据返回的数据做相应的处理，比如储存token
      // console.log("" + JSON.stringify(userInfo));

      if (userInfo.statusCode != 200) {
        //iViewUi的友好提示
        this.$message({
          message: userInfo.message,
          type: 'error',
          offset:60
        });
        //登录成功
      } else if (userInfo.data != null) {
        localStorage.setItem('token', userInfo.data.token);
        //  console.log("222" + JSON.stringify(userInfo.data.token));
        this.$router.push("/");
      } else {
        this.$message.error(userInfo.message);
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
