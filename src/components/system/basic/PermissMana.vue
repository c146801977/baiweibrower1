<template>
    <div>
        <div>
            <el-input style="width: 300px" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">Role_</template>
            </el-input>
            <el-input style="width: 300px" placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
            <el-button icon="el-icon-plus" type="primary">添加角色</el-button>
        </div>
        <div style="width: 60%;margin-top: 20px">
            <el-collapse  accordion @change="change">
            <el-collapse-item :title="r.namezh" :name="r.id" v-for="(r,index) in roles" :key="index">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>可访问的资源</span>
                        <el-button
                                style="float: right; padding: 3px 0;color: #ff0205"
                                type="text"
                                icon="el-icon-delete">
                        </el-button>
                    </div>
                    <div>
                        <el-tree node-key="id"
                                 :default-checked-keys="selectMenus"
                                 :data="allmenus"
                                 :props="defaultProps"
                                 show-checkbox
                                 ref="tree" >
                        </el-tree>
                        <div style="display: flex;justify-content: flex-end" >
                            <el-button size="mini">取消修改</el-button>
                            <el-button size="mini" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                        </div>
                    </div>
                </el-card>
            </el-collapse-item>
        </el-collapse></div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        //定义data方法存input标签的内容（名字）
        data(){
            return{
                role:{
                    name:'',
                    nameZh:''
                },
                roles:[],
                selectMenus:[],
                allmenus:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted(){
            this.initRoles();
        },
        methods:{
            doUpdate(rid,index){
                console.log(rid)
                let selectedMenus = this.$refs.tree[index].getCheckedKeys(true);
                console.log(selectedMenus);
            },
            initSelectMenus(rid){
                this.getRequest("/system/basic/permiss/mid/"+rid).then(resp=>{
                    if (resp){
                        this.selectMenus=resp;
                    }
                })
            },
            change(val){
                if (val){
                    this.initAllMenus();
                    this.initSelectMenus(val);
                }
            },
            initAllMenus(){
                this.getRequest("/system/basic/permiss/menus").then(resp=>{
                    if (resp){
                        this.allmenus=resp;
                    }
                })
            },
            initRoles(){
                this.getRequest("/system/basic/permiss/roles").then(resp=>{
                    if (resp){
                        this.roles=resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>