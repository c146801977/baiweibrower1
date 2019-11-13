<template>
  <div style="margin-top: 10px">
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="部门管理" name="DeptMana"><DeptMana></DeptMana></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosiMana"><PosiMana></PosiMana></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><JobLevelMana></JobLevelMana></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana"><EcMana></EcMana></el-tab-pane>
      <el-tab-pane label="权限组" name="PermissMana"><PermissMana></PermissMana></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

  import DeptMana from '../../components/system/basic/DeptMana'
  import EcMana from '../../components/system/basic/EcMana'
  import JobLevelMana from '../../components/system/basic/JobLevelMana'
  import PermissMana from '../../components/system/basic/PermissMana'
  import PosiMana from '../../components/system/basic/PosiMana'
  export default {
      data(){
          return{
              activeName:'PosiMana'
          }
      },
      components:{
          DeptMana,
          EcMana,
          JobLevelMana,
          PermissMana,
          PosiMana
      }
  };
</script>
