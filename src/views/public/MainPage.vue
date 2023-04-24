<template>
  <el-container class="hole-container">
    <el-header>
      <TopBar/>
    </el-header>
    <el-main class="main-container">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import TopBar from "@/views/public/TopBar.vue";

export default {
  name: "MainPage",
  components:{
    TopBar
  }
}
</script>

<style scoped>
</style>
