<template>
    <div style="background: #f1f1f1;">
        <div class="header">
            <div class="header-middle">
                <div @click="handleLogin" class="header-l">
                    <h1>云笔记</h1>
                </div>
                <div class="header-r">
                    <el-button @click="handleWriteNote">写笔记</el-button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="register">
                <h2 class="title">新用户注册</h2>
                <div class="item"><el-input v-model="user.username" style="height:45px" type="text" placeholder="用户名"></el-input></div>
                <div class="item"><el-input v-model="user.email" style="height:45px" type="text" placeholder="邮箱"></el-input></div>
                <div class="item"><el-input v-model="user.password" style="height:45px" type="password" placeholder="密码" @keyup.enter.native="handleRegister"></el-input></div>
                <div class="item"><el-button @click="handleRegister" style="width:390px;height:40px;" type="primary">注册</el-button></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                user:{
                    username:'',
                    email:'',
                    password:''
                }
            }
        },
        methods:{
            handleLogin () {
                this.$router.push('/')
            },
            handleWriteNote () {
                this.$router.push('/writenote')
            },
            handleRegister () {
                this.$axios.post('/user',this.user).then(res => {
                    if(res.code == 200){
                        this.$message.success('注册成功')
                        setTimeout(() => {this.$router.push('/')},500)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .header{
        width: 100%;
        height: 50px;
        background-color: #409eff;
    }
    .header-middle{
        margin: 0 auto;
        width: 1170px;
        display: flex;
        justify-content: space-between;
    }
    .header-l{
        width: 90px;
        height: 50px;
    }
    .header-l h1{
        color: #fff;
        font-weight: 400;
        font-size: 30px;
        margin-top: 5px;
    }
    .header-r{
        width: 84px;
        height: 50px;
        margin-top: 5px;
    }
    .content{
        width: 1170px;
        margin: 0 auto;
    }
    .register{
        color: #333;
        padding-top: 30px;
        padding-bottom: 50px;
        width: 714px;
        margin: 100px auto 0;
        border-radius: 6px;
        background: #fff;
    }
    .title{
        text-align: center;
        color: #333;
        font-weight: 400;
    }
    .item{
        box-sizing: border-box;
        width: 390px;
        margin: 30px auto 0;
    }
</style>