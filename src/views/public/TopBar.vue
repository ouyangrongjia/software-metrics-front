<template>
  <div class="top-bar">
    <el-button @click="$router.push('CK_XML')" type="success">CK-XML度量</el-button>
    <el-button @click="$router.push('CK_Java')" type="success">CK-Java度量</el-button>
    <el-button @click="$router.push('Traditional')" type="success">传统度量</el-button>
    <el-button @click="$router.push('LK')" type="success">LK度量</el-button>
    <el-button @click="$router.push('Expand')" type="success">拓展度量</el-button>
  </div>
</template>

<script>

export default {
  name: "TopBar"
}
</script>

<style scoped>

</style>
