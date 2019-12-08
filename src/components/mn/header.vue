<template>
  <div id="header">
    <div class="gohome radius20">
      <router-link to="/mn/menu">
        <img src="/static/public/images/icons/home.png" alt="" title=""/>
      </router-link>
    </div>
    <div class="gomenu radius20">
      <router-link :to="{path:'/mnItem/blank',query: {day: date}}">
          <img src="/static/public/images/icons/pencil.png" alt="" title=""/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: ['day'],
  data () {
    return {
      date: this.day
    }
  },
  watch: {
    date(newValue, oldValue) {
      console.info("公共页面头部，监测date属性：oldValue=" + oldValue +",newValue=" + newValue)
    }
  }

}
</script>

<style scoped>

</style>
