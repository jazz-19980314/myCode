<template>
  <div>
    <basic-container>
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="政策名称">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-form-item label="申报时间">
              <el-input v-model="form.acceptedTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="政策优惠">
              <el-textarea v-model="form.preferential" disabled></el-textarea>
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-form-item label="政策要求">
              <el-textarea v-model="form.requested" disabled></el-textarea>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="政策等级">
              <el-input v-model="form.grade" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-form-item label="政策类型">
              <el-input v-model="form.type" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="归档部门">
              <el-input v-model="form.archDept" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-form-item label="归档联系方式">
              <el-input v-model="form.archContact" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="第三方机构">
              <el-input v-model="form.organization" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-form-item label="注册地区">
              <el-input v-model="form.cascader" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="备注">
              <el-textarea v-model="form.remark" disabled></el-textarea>
            </el-form-item>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col :span="10">
            <el-form-item label="所需材料">
              <el-textarea v-model="form.needMaterials" disabled></el-textarea>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="width: 100%; padding: 20px">
        <div style="margin-bottom:20px;">符合该政策的公司</div>
        <el-tag class="" v-for="item in companyList" :key="item.id" @click="toCompany(item.id)">
          {{ item.name }}
        </el-tag>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getDetail, getByPolicyId } from "@/api/policy/excel";
export default {
  data() {
    return {
      companyList: null,
      form: {},
    };
  },
  mounted() {
    this.getPolicy(this.$route.query.policyId);
  },
  methods: {
    getPolicy(id) {
      getDetail(id).then((res) => {
        console.log(res.data.data);
        this.form = res.data.data;
      });
      getByPolicyId(id).then((res) => {
        this.companyList = res.data.data;
      });
    },
    toCompany(id){
      this.$router.push({
        path:"/crm/company",
        query:{
          id:id
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner{
    border: none;
    background: #fff;
    color: #333;
    cursor: pointer;
  }
  .el-tag{
    margin-right: 20px;
  }
}
</style>