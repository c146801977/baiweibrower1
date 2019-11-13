<template>
    <div>
        <div>
            <el-input
                placeholder="请输入需要添加的职位名称..."
                prefix-icon="el-icon-plus"
                size="small"
                style="width: 300px"
                v-model="pos.name">
            </el-input>
            <el-button type="primary" size="small" icon="el-icon-plus">添加职位</el-button>
        </div>
       <div style="margin-top: 15px">
           <el-table
                   :data="positions"
                   stripe
                   border
                   size="small"
                   style="width: 70%">
               <el-table-column
                       prop="id"
                       label="编号"
                       width="55">
               </el-table-column>
               <el-table-column
                       prop="name"
                       label="职位名称">
               </el-table-column>
               <el-table-column
                       prop="createdate"
                       label="创建日期">
               </el-table-column>
               <el-table-column
                       prop="enabled"
                       label="是否启用">
               </el-table-column>
           </el-table>
       </div>
    </div>
</template>

<script>
    export default {
        name: "PosiMana",
        data(){
            return{
                positions:[],
                pos:{
                    name:''
                }
            }
        },
        mounted(){
            this.initPos();
        },
        methods:{
            initPos(){
                this.getRequest("/system/basic/position/").then(resp=>{
                    if (resp){
                        this.positions=resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>