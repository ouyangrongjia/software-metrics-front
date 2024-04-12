<template>
  <div class="frame-container">
    <el-card class="cards-2">
      <el-container style="height:95%; display: flex; flex-direction: column">
        <el-main class="fileList" style="display: flex; flex-direction: column">
          <el-table :data="fileList" stripe>
            <el-table-column prop="name" label="文件名"/>
            <el-table-column prop="class" label="Class"/>
            <el-table-column prop="type" label="Type"/>
            <el-table-column prop="cs" label="CS（类模板）"/>
            <el-table-column prop="noo" label="NOO（方法重写数量）"/>
            <el-table-column prop="noa" label="NOA（增加方法数量）"/>
            <el-table-column prop="si" label="SI（特征化指数）" />
          </el-table>
          <div id="chart" style="width: 100%;height: 400px;background:#ffffff" v-if="fileList.length > 1"></div>
        </el-main>
        <el-footer style="height: 100px">
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="IP"
              accept=".java"
              :auto-upload="false"
              :show-file-list="false"
          >
            <template #trigger>
              <el-button type="primary">上传文件</el-button>
            </template>
            <div style="width: 40px"></div>
            <el-button type="primary" @click="submitUpload">开始度量</el-button>
          </el-upload>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import {measure_type} from "@/config";
import {uploadData} from "@/network/methods";
import {getStorage, removeStorage, storageData} from "@/tools/Storage";
import * as echarts from "echarts";

export default {
  name: "LK",
  data() {
    return {
      fileList: [],
      IP: measure_type.LK,
      current_data: [],
    }
  },
  methods: {
    //装载函数
    storageData,
    getStorage,
    removeStorage,
    // 提交请求
    submitUpload(){
      let files = new FormData()
      for(let i in this.fileList){
        files.append('file',this.fileList[i].raw)
      }
      uploadData(this.IP,files).then(
          response =>{
            this.fileList = response
            this.storageData('LK')
            this.drawLine('chart')
          }
      )
    },
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          left: '3%',
          top: '5%',
          text: "数据比对图",
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          align: 'right',//文字在前图标在后
          left: '3%',
          top: '15%',
          data: ['近一周']
        },
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {} //保存为图片
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true //保证刻度线和标签对齐
          },
          data: ["CS", "NOO", "NOA", "SI"] //x坐标的名称
        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitNumber: 4, //纵坐标数
          interval: 5 //强制设置坐标轴分割间隔
        }
      })
      let list = []
      this.fileList.forEach(
          item => {
            let datas = []
            datas.push(item.cs)
            datas.push(item.noo)
            datas.push(item.noa)
            datas.push(item.si)
            let dataLists = {
              name : item.name,
              type : 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 3,
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(94,10,171,0.3)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(94,10,171,0.01)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
              data : datas
            }
            list.push(dataLists)
          }
      )
      this.charts.setOption({
        series: list
      })
    }
  },
  mounted() {
    this.getStorage()
  }
}
</script>

<style scoped>

</style>
