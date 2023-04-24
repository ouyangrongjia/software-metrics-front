<template>
  <div class="frame-container">
    <el-card class="cards-1">
      <h4>历史记录</h4>
      <el-card v-for="i in current_data " :key="i" class="file-card">
        <div class="file-card-header">
          <span>{{i.name}}</span>
          <div style="width: 100%">
            <el-text class="mx-1" type="info">{{i.timeStamp + ' ' +i.measure_type + '度量'}}</el-text>
          </div>
          <el-button type="info" @click="removeStorage(i.name + i.timeStamp)">删除</el-button>
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
    <el-card class="cards-2">
      <el-container style="height:95%; display: flex; flex-direction: column">
        <el-main class="fileList" style="display: flex; flex-direction: column; overflow: auto">
          <div style="height: 500px; width: 100%">
            <el-table :data="fileList" stripe style="height: 500px">
              <el-table-column prop="name" label="文件名" width="180px"/>
              <el-table-column prop="loc" label="LOC（代码行）"/>
              <el-table-column prop="cc" label="CC（圈复杂度）"/>
              <el-table-column prop="cp" label="CP（注释占比）" />
            </el-table>
          </div>
          <div id="chart" style="width: 100%; height: 300px; background:#ffffff" v-if="fileList.length > 1"></div>
          <div style="width: 100%">
            <div v-for="i in fileList.length" :key="i" :id="'chart' + i" style="width: 50%;height: 300px;background:#ffffff; display: inline-block"></div>
          </div>
        </el-main>
        <el-footer style="height: 100px">
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="IP"
              accept=".java,.cpp,.py,.txt"
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
  name: "Traditional_measure",
  data() {
    return {
      fileList: [],
      IP: measure_type.Traditional,
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
            this.storageData('传统')
            if(this.fileList.length > 1)
              this.drawLine('chart')
            for(let i = 0; i <= this.fileList.length; i++){
              console.log('chart'+i.toString())
              this.drawLine1(i)
            }
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
        yAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true //保证刻度线和标签对齐
          },
          data: ["LOC", "CC"] //x坐标的名称
        },
        xAxis: {
          type: 'value',
          splitNumber: 4, //纵坐标数
          interval: 5 //强制设置坐标轴分割间隔
        }
      })
      let list = []
      this.fileList.forEach(
          item => {
            let dataLists = {
              name : item.name,
              data : [item.loc, item.cc],
              type : 'bar'
            }
            list.push(dataLists)
          }
      )
      this.charts.setOption({
        series: list
      })
    },
    drawLine1(i) {
      this.charts = echarts.init(document.getElementById('chart' + (i + 1).toString()))
      let datas = this.fileList[i]
      this.charts.setOption({
        title: {
          left: '3%',
          top: '5%',
          text: datas.name,
        },
        series: [
          {
            color: ['#ffd700', '#ab72e3'],
            type: 'pie',
            radius: ['40%', '60%'],
            data: [
              {
                value: datas.cp,
                name: '注释占比:' + (datas.cp * 100).toFixed(2).toString() + '%'
              },
              {
                value: 1- datas.cp,
                name: '代码占比:' + ((1 - datas.cp) * 100).toFixed(2).toString() + '%'
              }
            ]
          }
        ]
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
