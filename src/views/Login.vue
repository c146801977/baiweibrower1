<template>
    <div style="display: flex;justify-content: center" >
        <el-card class="box-card" style="width:400px;margin-top: 100px;">
            <div slot="header" class="clearfix">
                <span >登录</span>
                <el-button style="float: right; padding: 3px 0" type="text">忘记密码？</el-button>
            </div>
            <div>
                <table >
                    <tr >
                        <td ><el-tag style="margin-left: 50px">用户名</el-tag ></td>
                        <td><el-input v-model="user.username" placeholder="请输入用户名" ></el-input></td>
                    </tr>
                    <tr>
                        <td><el-tag style="margin-left: 50px">密码 </el-tag></td>
                        <td><el-input v-model="user.password" type="password" placeholder="请输入密码" @keydown.enter.native="dologin"></el-input></td>
                    </tr>
                    <tr >
                        <td colspan="2" style="margin-left: auto" >
                            <el-button type="primary" plain @click="dologin" style="width: 200px" >登录</el-button>
                        </td>
                    </tr>
                </table>
            </div>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return{
                user:{
                    username:'zenggong',
                    password:'123'
                }
            }
        },
        methods:{
            dologin(){
               this.postKeyValueRequest("/doLogin",this.user).then(resp=>{
                    if (resp){
                        window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                        this.$router.replace("/home")

                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>