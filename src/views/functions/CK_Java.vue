<template>
  <div class="frame-container">
    <el-card class="cards-2">
      <el-container style="height:95%; display: flex; flex-direction: column">
        <el-main class="fileList" style="display: flex; flex-direction: column">
          <el-table :data="fileList" stripe>
            <el-table-column prop="name" label="FileName"/>
            <el-table-column prop="class" label="Class"/>
            <el-table-column prop="type" label="Type"/>
            <el-table-column prop="wmc" label="WMC"/>
            <el-table-column prop="rfc" label="RFC"/>
            <el-table-column prop="lcom" label="LCOM"/>
            <el-table-column prop="cbo" label="CBO" />
            <el-table-column prop="dit" label="DIT" />
            <el-table-column prop="noc" label="NOC" />
          </el-table>
          <div id="chart" style="width: 100%;height: 400px;background:#ffffff"></div>
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
                <el-button type="primary">Upload</el-button>
            </template>
            <div style="width: 40px"></div>
            <el-button type="primary" @click="submitUpload">Metric</el-button>
          </el-upload>
        </el-footer>
      </el-container>
    </el-card>
    <el-card class="cards-1">
      <h4>Histroy</h4>
      <el-card v-for="i in current_data " :key="i" class="file-card">
        <div class="file-card-header">
          <span>{{i.name}}</span>
          <div style="width: 100%">
            <el-text class="mx-1" type="info">{{i.timeStamp + ' ' +i.measure_type + '度量'}}</el-text>
          </div>
          <el-button type="info" @click="removeStorage(i.id)">Delete</el-button>
        </div>
        <el-collapse>
          <el-collapse-item>
            <el-descriptions v-for="(j, index) in i" :key="j" size="small">
              <el-descriptions-item :label="index + ':'">{{j}}</el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import {uploadData} from "@/network/methods";
import {measure_type} from "@/config";
import {storageData, getStorage, removeStorage} from "@/tools/Storage";
import * as echarts from "echarts";

export default {
  name: "CK_Java",
  data() {
    return {
      fileList: [],
      IP: measure_type.CK_Java,
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
      uploadData('/ck/java',files).then(
          response =>{
            this.fileList = response
            console.log(this.fileList)
            this.storageData('Java')
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
          text: "Figure",
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          align: 'right',//文字在前图标在后
          left: '3%',
          top: '15%',
          data: ['last week']
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
          data: ["noc", "rfc", "dit", "wmc", "lcom", "cbo"] //x坐标的名称
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
            datas.push(item.noc)
            datas.push(item.rfc)
            datas.push(item.dit)
            datas.push(item.wmc)
            datas.push(item.lcom)
            datas.push(item.cbo)
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
