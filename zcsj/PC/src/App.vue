<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {

  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
// .el-table__body-wrapper::-webkit-scrollbar{
//     /*width: 0;宽度为0隐藏*/
//     width: 150px;
//     height: 15px;
//     background-color: transparent;
//   }
//   .el-table__body-wrapper::-webkit-scrollbar-thumb{
//     border-radius: 10px;
//     height: 14px;
//     background: rgba(144, 146, 152, 0.3);
//   }

//   .el-table__body-wrapper::-webkit-scrollbar-track {
//     border-radius: 10px;
//     background: #fff;
//   }
</style>
