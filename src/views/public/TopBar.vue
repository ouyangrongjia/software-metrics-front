<template>
  <div class="top-bar">
    <!-- <el-button @click="$router.push('CK_XML')" type="success">CK-XML度量</el-button> -->
    <el-button @click="$router.push('CK_Java')" type="success">CK-Java</el-button>
    <el-button @click="$router.push('Traditional')" type="success">Traditional_measure</el-button>
    <el-button @click="$router.push('LK')" type="success">LK-measure</el-button>
    <el-button @click="$router.push('Expand')" type="success">Expand_measure</el-button>
  </div>
</template>

<script>

export default {
  name: "TopBar"
}
</script>

<style scoped>

</style>
