<template>
  <div id="header">
    <div class="gohome radius20">
      <router-link to="/mn/menu">
        <img src="/static/public/images/icons/home.png" alt="" title=""/>
      </router-link>
    </div>
    <div class="gomenu radius20">
      <router-link :to="{path:'/mnItem/blank',query: {day: getNowDate}}" >
            <img src="/static/public/images/icons/pencil.png" alt="" title=""/>
      </router-link>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../common/date.js';
export default {
  name: 'commonHead',
  computed: {
    getNowDate() {
        return formatDate(new Date(),'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>

</style>
