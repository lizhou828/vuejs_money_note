<template>
    <div>
      <h1>我是测试页面</h1>
      <ul>
        <li v-for="user in users">
          {{user.id}}-{{user.userName}}
        </li>
      </ul>
      <a @click="test_reload">测试重新刷新页面</a>
    </div>
</template>

<script>
export default {
  name: 'test',
  inject:['reload'],
  data() {
    return {
      users: []
    }
  },
  methods: {
    test_reload() {
      this.reload();
    }
  },
  mounted(){
    // console.info("加载了mounted()方法....");
    this.users=  [
      {
        "id": 1,
        "userName": "liz",
      },
      {
        "id": 2,
        "userName": "tan",
      },
    ]
  }
}
</script>

<style scoped>

</style>
