<template>
  <div id="header">
    <div class="gohome radius20">
      <router-link to="/mn/menu">
        <img src="/static/public/images/icons/home.png" alt="" title=""/>
      </router-link>
    </div>
    <div class="gomenu radius20">
      <router-link :to="{path:'/mnItem/blank',query: {day: day}}">
          <img src="/static/public/images/icons/pencil.png" alt="" title=""/>
      </router-link>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../common/date.js';
export default {
  name: 'header',
  props: ['day'],
  mounted(){
    var nowDate = new Date();
    nowDate = formatDate(nowDate,'yyyy-MM-dd');
    var query_day = this.$route.query.day;
    if(query_day && query_day !='' && query_day != undefined){
      this.day = query_day;
    }else{
      this.day = nowDate;
    }

  }

}
</script>

<style scoped>

</style>
