<template>
  <div id="searchIconFloat" class="searchIconFloat">
    <img class="searchIconFloatImg" @click="toSearchPage()" src="/static/public/images/search-icon.svg"/>
    <!--<img class="searchIconFloatVoice" @click="toVoicePage()" src="/static/public/images/search-icon.svg"/>-->
    <!--<img class="searchIconFloatUC" @click="toUserCenterPage()" src="/static/public/images/search-icon.svg"/>-->
  </div>
</template>

<style>
  .searchIconFloat {
    width: 200px;
    height: 200px;
  }

  .searchIconFloatImg {
    z-index: 9999;
    position: fixed ! important;
    left: 2%;
    top: 80%;
    display: inline-block;
    max-height: 25px;
    max-width: 25px;
    margin: 5px 0 0 0;
  }

  .searchIconFloatVoice {
    z-index: 9999;
    position: fixed ! important;
    left: 14%;
    top: 86%;
    display: inline-block;
    max-height: 25px;
    max-width: 25px;
    margin: 5px 0 0 0;
  }

  .searchIconFloatUC {
    z-index: 9999;
    position: fixed ! important;
    left: 26%;
    top: 92%;
    display: inline-block;
    max-height: 25px;
    max-width: 25px;
    margin: 5px 0 0 0;
  }

</style>
<script>
  export default {
    name: 'searchIconFloat',
    methods: {
      toSearchPage() {
        this.$router.push(
          {path: '/mnItem/search'}
        )
      },
      toVoicePage(){
        alert("toVoicePage")
      },
      toUserCenterPage(){
        alert("toUserCenterPage")
      }

    }
  }
</script>

