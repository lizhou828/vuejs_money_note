<template>
  <div id="header">
    <div class="gohome radius20">
      <router-link to="/mn/menu">
        <img src="/static/public/images/icons/home.png" alt="" title=""/>
      </router-link>
    </div>
    <div class="gomenu radius20">
      <router-link to="/mnItem/blank">
          <img src="/static/public/images/icons/pencil.png" alt="" title=""/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style scoped>

</style>
