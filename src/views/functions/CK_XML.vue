<template>
  <div class="frame-container">
    <el-card class="cards-2">
      <el-container style="height:95%; display: flex; flex-direction: column">
        <el-main class="fileList" style="display: flex; flex-direction: column; overflow: auto">
          <div>
            <el-table :data="fileList" stripe>
              <el-table-column prop="name" label="文件名"/>
            </el-table>
          </div>
          <div v-for="i in fileList.length" :key="i" v-show="fileList[i-1].classes !==undefined">
            <h3>
              {{fileList[i-1].name}}
            </h3>
            <div>
              <el-table :data="fileList[i-1].classes" stripe v-if="fileList[i-1].classes !== undefined">
                <el-table-column prop="class" label="Class"/>
                <el-table-column prop="wmc" label="WMC"/>
                <el-table-column prop="rfc" label="RFC"/>
                <el-table-column prop="lcom" label="LCOM"/>
                <el-table-column prop="cbo" label="CBO" />
                <el-table-column prop="dit" label="DIT" />
                <el-table-column prop="noc" label="NOC" />
              </el-table>
            </div>
            <div :id="'chart-'+ i" style="width: 800px; height: 400px; background:#ffffff"></div>
          </div>
        </el-main>
        <el-footer style="height: 100px">
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="IP"
              accept=".xml"
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
    <!-- <el-card class="cards-1">
      <h4>历史记录</h4>
      <el-card v-for="i in current_data " :key="i" class="file-card">
        <div class="file-card-header">
          <span>{{i.name}}</span>
          <div style="width: 100%">
            <el-text class="mx-1" type="info">{{i.timeStamp + ' ' +i.measure_type + '度量'}}</el-text>
          </div>
          <el-button type="info" @click="removeStorage(i.id)">删除</el-button>
        </div>
        <el-collapse>
          <el-collapse-item>
            <el-descriptions v-for="(j, index) in i" :key="j" size="small">
              <el-descriptions-item :label="index + ':'">{{j}}</el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-card> -->
  </div>
</template>

<script>
import {uploadData} from "@/network/methods";
import {measure_type} from "@/config";
import {storageData, getStorage, removeStorage} from "@/tools/Storage";
import * as echarts from "echarts";

export default {
  name: "CK_XML",
  data() {
    return {
      fileList: [],
      IP: measure_type.CK_XML,
      current_data: [],
    }
  },
  methods: {
    //装载函数
    //存储函数
    storageData,
    getStorage,
    removeStorage,
    // 提交请求
    submitUpload(){
      let files = new FormData() // 存储上传的文件
      for(let i in this.fileList){
        files.append('file',this.fileList[i].raw)
      }
      // 填后端地址
      uploadData(this.IP,files).then(
          response =>{
            this.fileList = response // 后端处理文件并返回响应
            this.storageData('XML') // 把数据存到本地
            for(let i = 0; i < this.fileList.length; i ++){
              this.drawLine('图表-', i)
            }
          }
      )
    },
    // 用Echarts绘制图表
    drawLine(id, i) {
      this.charts = echarts.init(document.getElementById(id+ (i + 1).toString()))
      this.charts.setOption({
        // 设置图表标题
        title: {
          left: '3%',
          top: '5%',
          text: "数据比对图",
        },
        // 设置提示框的显示方式
        tooltip: {
          trigger: 'axis'
        },
        // 绘制图例，用于识别不同数据
        legend: {
          align: 'right',//文字在前图标在后
          left: '3%',
          top: '15%',
          data: ['近一周']
        },
        // 设置图标的绘制区域
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        // 提供工具箱
        toolbox: {
          feature: {
            saveAsImage: {} //保存为图片
          }
        },
        // x轴
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true //保证刻度线和标签对齐
          },
          data: ["WMC", "RFC", "LCOM", "CBO", "DIT", "NOC"] //x坐标的名称
        },
        // y轴
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitNumber: 4, //纵坐标数
          interval: 5 //强制设置坐标轴分割间隔
        }
      })
      let list = []
      // 对后端返回数据进行操作，绘制成折线图
      this.fileList[i].classes.forEach(
          item => {
            console.log(item)
            let datas = []
            datas.push(item.wmc)
            datas.push(item.rfc)
            datas.push(item.lcom)
            datas.push(item.cbo)
            datas.push(item.dit)
            datas.push(item.noc)
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
