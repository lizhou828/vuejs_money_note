<template>
  <div id="searchIconFloat" class="searchIconFloat" >
    <img class="searchIconFloatImg" src="/static/public/images/search-icon.svg"/>
  </div>
</template>

<style>

  .searchIconFloat{
    width: 40px;
    height: 40px;
  }
  .searchIconFloatImg{
    z-index: 9999;
    position: fixed ! important;
    left: 2%;
    top: 80%;
    display: inline-block;
    max-height: 25px;
    max-width: 25px;
    margin: 5px 0 0 0;
  }

</style>
<script>
export default {
    name: 'searchIconFloat',
}
</script>

