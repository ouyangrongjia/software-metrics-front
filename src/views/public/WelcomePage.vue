<template>
  <div class="welcome-page">
    <div class="welcome-button">
      <div class="welcome-title">
        Software-metrics
      </div>
      <el-button @click="$router.push('home')" type="primary">Enter</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage"
}
</script>

<style scoped>
.divs{
  top:250px;
  width:100px;
  height:100px;
  position:relative;
  /* animation:dragDown 0.2s; */
}
@keyframes dragDown {
  0% {top : -200px;}
  100% {top : 250px;}
}
.welcome-page{
  text-align: center;
  width:100%;
  height:100%;
  background-image: url(../../assets/background1.jpg);
  background-size: 100% 100%;
}
.welcome-title{
  position: relative;
  /* left: -25vw; */
  margin-bottom: 40px;
  /*top:250px;*/
  color: white;
  font-size: 80px;
  text-shadow: 2px 2px 2px #000000,-2px 2px 2px #000000, 2px 2px 2px #000,2px -2px 2px #000;
}
.welcome-button{
  position:relative;
  top:250px;
  /* left: -25vw; */
  /* animation: dragDown 2s;
  animation-fill-mode: forwards; */
}
.el-button--primary{
  font-size: 30px;
  height: 60px;
  width: 200px;
  border-radius: 20px;
}
</style>
