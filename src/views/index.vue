<template>
    <div style="background: #f1f1f1;height:100vh;">
        <div class="header">
            <div class="header-middle">
                <div class="header-l">
                    <h1>云笔记</h1>
                </div>
                <div class="header-r">
                    <el-button @click="handleWriteNote">写笔记</el-button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-middle">
                <div class="content-l">
                    <div class="content-img">
                        <img src="../static/img/banner.jpg" alt="">
                        <div class="content-title">十三亿人都会用的云笔记</div>
                    </div>
                    <div class="img-foot"></div>
                </div>
                <div class="content-r" v-if="isShowLogin">
                    <div class="login-box">
                        <div class="item">
                            <el-input v-model="username" style="height:45px" type="text" placeholder="请输入用户名"></el-input>
                        </div>
                        <div class="item">
                            <el-input v-model="password" style="height:45px" type="password" placeholder="请输入密码"></el-input>
                        </div>
                        <div class="item">
                            <el-button style="width:300px;height:40px;" @click="handleLogin" type="primary">登录</el-button>
                        </div>
                        <div class="item">
                            <el-button style="width:300px;height:40px;" @click="handleRegister">注册</el-button>
                        </div>
                    </div>
                </div>
                <div class="content-r" v-else>
                    <div style="padding-top:30px;">
                        <div style="text-align: center">
                            <img class="avatar-img" src="../static/img/avatar1.jpg" alt="">
                        </div>
                        <div class="login-item">萌新： wangcai</div>
                        <div class="login-item">email: 121381@qq.com</div>
                        <div style="margin-top:10px">
                            <el-button style="width:300px;height:40px;" @click="handleLogin" type="warning">退出登录</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                isShowLogin:true,
                username:'',
                password:''
            }
        },
        methods:{
            handleRegister () {
                this.$router.push('/register')
            },
            handleWriteNote () {
                this.$router.push('/writenote')
            },
            handleLogin () {
                if(this.username == 'xiaozhu' && this.password == 'xiaozhu'){
                    this.isShowLogin = false
                }
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
        width: 100%;
    }
    .content-middle{
        width: 1170px;
        margin: 0 auto;
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
    }
    .content-l{
        width: 750px;
    }
    .content-img{
        height: 340.91px;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .content-img img{
        width: 750px;
    }
    .content-title{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 20px;
        font-weight: 400;
        line-height: 50px;
        color: rgba(255, 255, 255, 0.8);
        background: rgba(0, 0, 0, 0.5);
    }
    .img-foot{
        width: 750px;
        height: 4px;
        box-sizing: border-box;
        margin-top: 30px;
        border-radius: 4px;
        padding: 2px 20px;
        background: #fff;
    }
    .content-r{
        width: 360px;
        height: 332px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 4px;
        padding: 21px 30px;
    }
    .login-box{
        /* margin-left: 30px; */
        width: 300px;
        height: 260px;
    }
    .item{
        margin-top: 30px;
    }
    .avatar-img{
        width: 100px;
        height: 100px;
    }
    .login-item{
        text-align: center;
        margin-top: 20px;
        font-size: 16px;
        color: #333;
        font-weight: 400;
        line-height: 36px;
    }
</style>