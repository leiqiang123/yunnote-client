<template>
    <div style="background: #f1f1f1">
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


                    <div class="img-foot" v-if="!this.$store.state.userInfo.username"></div>
                 
                    <div class="article" v-else>
                        <div class="article-item" @click="jumpDetail(item._id)" v-for="(item,index) in article" :key="index">
                            <div class="article-top">
                                <div class="article-avatar">
                                    <img :src="item.author.avatar" alt="">
                                </div>
                                <div class="article-msg">
                                    <div class="row-one">
                                        <span class="author-name">{{item.author.username}}</span>
                                        <!-- <span>|</span> -->
                                        <h2>{{item.title}}</h2>
                                    </div>
                                    <div class="row-two">
                                        <span class="row-item">浏览：{{item.readnumber}}</span>
                                        <span class="row-item">回复：{{item.commonnum}}</span>
                                        <span class="row-item">分类：{{item.category.name}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="article-content">
                                <div>
                                    {{item.contentText}}
                                </div>
                            </div>
                            <div class="article-footer"></div>
                        </div>
                    </div>
        


                </div>
                <div class="content-r" v-if="!this.$store.state.userInfo.username">
                    <div class="login-box">
                        <div class="item">
                            <el-input v-model="formData.email" style="height:45px" type="text" placeholder="请输入邮箱"></el-input>
                        </div>
                        <div class="item">
                            <el-input v-model="formData.password" style="height:45px" type="password" @keyup.enter.native="handleLogin" placeholder="请输入密码"></el-input>
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
                            <img class="avatar-img" :src="userInfo.avatar">
                        </div>
                        <div class="login-item">萌新： {{userInfo.username}}</div>
                        <div class="login-item">email: {{userInfo.email}}</div>
                        <div style="margin-top:10px">
                            <el-button style="width:300px;height:40px;" @click="handleLogout" type="warning">退出登录</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data () {
            return{
                formData:{
                    email:'',
                    password:''
                },
                userData:{
                    avatar:'',
                    username:'',
                    email:''
                },
                article:[]
            }
        },
        methods:{
            handleRegister () {
                this.$router.push('/register')
            },
            handleWriteNote () {
                if(this.$store.state.userInfo.username){
                    this.$router.push('/writenote')
                }else{
                    this.$message.info('登录后才能写笔记哦！')
                }
            },
            handleLogin () {
                this.$axios.post('/login',this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.$store.commit('CHANGE_userInfo', res.userData)
                        this.getArticleData()
                    }
                })
            },
            handleLogout () {
                this.$axios.get('/logout').then(res => {
                    let userInfo = {
                        avatar:'',
                        email:'',
                        username:''
                    }
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.$store.commit('CHANGE_userInfo', userInfo) //清空vuex当中的状态
                        this.$router.push('/')
                    }else{ //未登录状态
                        this.$store.commit('CHANGE_userInfo', userInfo) //清空vuex当中的状态
                        this.$message.info('登录过期,自动退出')
                    }
                })
            },
            getArticleData () {
                this.$axios.get('/article').then(res => {
                    console.log(res)
                    this.article = res.data
                })
            },
            jumpDetail (id) {
                this.$router.push({
                    name : 'articledetail',
                    params: {id}
                })
            }
        },
        computed:{
            ...mapState(['userInfo'])
        },
        created () {
            if(this.$store.state.userInfo.username){
                this.getArticleData()
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

    /* 文章显示部分 */
    .article{
        box-sizing: border-box;
        margin: 30px 0;
        border-radius: 6px;
        padding: 2px 20px;
        background: #fff;
    }
    .article-item{
        text-decoration: none;
        color: #333;
        display: block;
        padding-bottom: 20px;
        margin-top: 20px;
        cursor: pointer;
    }
    .article-top{
        display: flex;
    }
    .article-avatar{
        margin-right: 15px;
        width: 80px;
        height: 80px;
    }
    .article-avatar img{
        display: block;
        width: 100%;
    }
    .article-msg{
        width: 100%;
    }
    .row-one{
        display: flex;
    }
    .row-one h2{
        font-size: 18px;
        font-weight: 700;
        margin-left: 15px;
        height: 28px;
        line-height: 28px;
    }
    .row-two{
        box-sizing: border-box;
        padding: 4px 8px;
        margin-top: 15px;
        border-radius: 4px;
        width: 100%;
        background: #bbb;
        display: flex;
    }
    .author-name{
        color: #409eff;
        font-weight: 700;
        padding-right: 8px;
        border-right: 1px solid #000;
        height: 28px;
        line-height: 28px;
    }
    .row-item{
        font-size: 14px;
        color: #333;
        font-weight: 700;
        margin-right: 30px;
    }
    .article-content{
        display: flex;
    }
    .article-footer{
        width: 100%;
        height: 5px;
        margin-top: 20px;
        background-color: #f1f1f1;
    }
</style>