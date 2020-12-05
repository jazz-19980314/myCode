<template>
  <div>
    <el-row>
      <el-col :span="24">
        <third-register></third-register>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
          <el-card class="box-card num-card">
            <div slot="header" class="clearfix">
              <span>网站数据统计</span>
            </div>
            <div class="bigBox">
              <div class="box" v-for="item in option.data" :key="item">
                <div class="img_box" :style="{backgroundImage: item.color}">
                  <img :src="item.icon" />
                </div>
                <div class="data_box">
                  <!-- <animate-number
                        from="1"
                        to="1000"
                        duration="100"
                        easing="easeOutQuad"
                      ></animate-number> -->
                  <p :style="{color: item.font_color}">{{item.count}}</p>
                  <div>{{item.title}}</div>
                </div>
              </div>
            </div>
          </el-card>
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <basic-container>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>新增客户数据统计</span>
            </div>
            <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
          </el-card>
        </basic-container>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-row>
          <basic-container>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>近一个月的客户联系</span>
              </div>
              <div
                id="myChartPie"
                :style="{ width: '100%', height: '200px' }"
              ></div>
            </el-card>
          </basic-container>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <basic-container>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>成功项目</span>
              </div>
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </basic-container>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { communicate,appoinment,SalesManager,userNum } from "@/api/user";

export default {
  name: "wel",
  data() {
    return {
      theme: "",
      comdata:'',
      appdata:'',
      SalesManager:'',
      userNum:[],
      num:0,
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["17"],
      option: {
        span: 6,
        data: [
          {
            title: "客户数量",
            subtitle: "实时",
            count: 0,
            color: "linear-gradient(180deg, #68A6FB 0%, #376DF6 100%)",
            font_color:'#376DF6',
            icon: "https://qtvedio.oss-cn-qingdao.aliyuncs.com/1303209733649600512/material/e09b5762-dbfe-4191-9b60-31b54f9a290c.png",
          },
          {
            title: "团队业绩",
            subtitle: "实时",
            count: 3112,
            color: "linear-gradient(156deg, #8B9EFF 4%, #5968D9 96%)",
            font_color:'#5968D9',
            icon: "https://qtvedio.oss-cn-qingdao.aliyuncs.com/1303209733649600512/material/df1475f8-d847-44a3-8042-49fdd966ef12.png",
          },
          {
            title: "个人业绩",
            subtitle: "实时",
            count: 908,
            color: " linear-gradient(180deg, #FFE05E 0%, #FFBE30 100%)",
            font_color:'#FFBE30',
            icon: "https://qtvedio.oss-cn-qingdao.aliyuncs.com/1303209733649600512/material/95a35d95-7083-44c4-8504-8ed8d0b0a945.png",
          },
          {
            title: "胜任力",
            subtitle: "实时",
            count: 689,
            color: " linear-gradient(180deg, #02FBD9 0%, #01F5B1 100%)",
            font_color:'#01F5B1',
            icon: "https://qtvedio.oss-cn-qingdao.aliyuncs.com/1303209733649600512/material/d4aa6605-06f8-463b-b20b-01dab69efb14.png",
          },
        ],
      },
      reverse: true,
      activities: [
        {
          content: "测试项目1",
          timestamp: "2020-04-15",
        },
        {
          content: "测试项目2",
          timestamp: "2020-04-13",
        },
        {
          content: "测试项目3",
          timestamp: "2020-04-11",
        },
        {
          content: "测试项目4",
          timestamp: "2020-04-13",
        },
      ],
    };
  },
  created(){

  },
  mounted() {
    this.getcommunicate();
    this.getappoinment();
    this.getSalesManager();
    this.getuserNum();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleChange(val) {
      window.console.log(val);
    },
    getcommunicate(){
      communicate().then(res=>{
        this.comdata = res.data.data;
        this.drawLine();
      })
    },
    getappoinment(){
      appoinment().then(res=>{
        this.appdata = res.data.data;
        this.drawLine();
      })
    },
    getSalesManager(){
      SalesManager().then(res=>{
        this.option.data[0].count = res.data.data;
        // setInterval(this.dispalyNum(100,0));
      })
    },
    getuserNum(){
      userNum().then(res=>{
        // console.log(res.data)
        this.useNum = res.data.data;
        this.drawLine();
      })
    },
    // dispalyNum(num,index){
    //   if(this.num<num){
    //     num++;
    //     this.option.data[index].count = num;
    //   }else{
    //     clearInterval();
    //   }
    // },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChartPie = this.$echarts.init(
        document.getElementById("myChartPie")
      );
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "新增用户",
            type: "line",
            data: this.useNum,
            smooth: true,
            areaStyle: {
              color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#8B9EFF' // 0% 处的颜色
                  }, {
                      offset: 1, color: '#5968D9' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              }
            },
            lineStyle:{
              color:'#5968D9'
            }
          },
        ],
      });
      // 绘制图表
      myChartPie.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["约见数", "沟通数"],
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#f5f6f7",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                  backgroundColor: "#f5f6f7",
                },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                  backgroundColor: "#f5f6f7",
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#333",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: [
              {
                value: this.comdata,
                name: "沟通数",
                itemStyle:{
                  color:'#FFBB00'
                }
              },
              { value: this.appdata, name: "约见数" ,
              itemStyle:{
                color:'#47E0BE'
              }},
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
.el-font-size {
  font-size: 14px;
}
.bigBox {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img_box{
   height: 100px;
   // width: 100px;
   flex: 2;
   background-image: linear-gradient(180deg, #68A6FB 0%, #376DF6 100%);
   display: flex;
   justify-content: center;
   align-items: center;
   img{
     width: 40px;
     height: 40px;
   }
  }
  .box {
    width: 22%;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
  }
  .data_box{
    flex: 3;
    height: 100px;
    text-align: center;
    color: #333;
    p{
      font-size: 30px;
      font-weight: bold;
      margin: 15px 0 10px 0;
    }
  }
}
</style>
