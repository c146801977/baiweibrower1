<template>
    <div>
        <el-container>
            <el-header style="background-color: #0febff;display: flex;align-items: center;justify-content: space-between;cursor: pointer" >
                <dic style="font-size: 28px;font-family: 华文行楷;">百威美食尚餐饮管理系统</dic>
                <el-dropdown @command="menuCmd">
                    <span class="el-dropdown-link" style="display: flex;align-items: center">
                        {{user.name}}
                            <i>
                                <img :src="user.userface" alt="" style="width: 48px;height: 48px;border-radius: 24px;margin-left: 10px">
                            </i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="usercenter" >个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting" >设置</el-dropdown-item>
                        <el-dropdown-item command="logout"  divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
        <el-container>
                    <el-aside width="200px">
                        <el-menu router unique-opened>
                            <el-submenu :index="index+''" v-for="(item,index) in menus" :key="index"
                            v-if="!item.hidden">
                            <template slot="title">
                                <i :class="item.iconcls" style="color: #0457ff;margin-right: 4px"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div style="margin-top: 80px;font-size: 30px;font-family: 华文行楷;text-align: center;color: #ff3100" v-if="this.$router.currentRoute.path=='/home'" >
                        欢迎来到百威美食尚餐饮管理系统!<br>
                        <br>
                        <br>
                        带你走进吃货世界！
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed:{
            menus(){
                return this.$store.state.menus;
            }
        },
        methods:{
            menuSelect(index,indexPath){
               this.$router.push(index);

            },
            menuCmd(cmd){
                if (cmd=='logout') {
                    this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        this.$store.commit("initMenus",[]);
                        this.$router.replace("/");

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>