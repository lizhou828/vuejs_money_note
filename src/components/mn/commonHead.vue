<template>
  <div id="header">
    <div class="gohome radius20">
      <router-link to="/mn/menu">
        <img src="/static/public/images/icons/home.png" alt="" title=""/>
      </router-link>
    </div>
    <div class="gomenu radius20">
      <a @click="go_to_blank" >
            <img src="/static/public/images/icons/pencil.png" alt="" title=""/>
      </a>
    </div>

  </div>
</template>

<script>

import {formatDate} from '../../common/date.js';

export default {
  name: 'commonHead',
  inject:['reload'],
  methods: {
    go_to_blank() {
      let query_note_date = localStorage.getItem("query_note_date");
      // console.info("公共头部页面，localStorage中存储的 query_note_date=" + query_note_date)
      if(!query_note_date || query_note_date === "" || typeof query_note_date === undefined){
        let currentDay = formatDate(new Date(),'yyyy-MM-dd');
        localStorage.setItem("query_note_date",currentDay);
        // console.info("公共头部页面，监测没有存query_note_date，更新为当前日期=" + query_note_date)
      }
      this.$router.push({path:"/mnItem/blank"})
      this.reload();
    }

  }
}
</script>

<style scoped>

</style>
