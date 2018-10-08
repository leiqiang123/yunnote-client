<template>
    <div>
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
            <div class="content-area">
                <div class="content-wrap">
                    <div class="content-article">
                        <div class="content-msg">
                            <div class="msg-img"><img :src="this.$store.state.userInfo.avatar"></div>
                            <div class="msg-desc">
                                <div class="msg-title"><span>{{articleData.title}}</span></div>
                                <div class="msg-span">
                                    <span>{{articleData.createTime}}</span>
                                    <span style="margin-left:10px">分类：{{categoryTitle}}</span>
                                </div>
                            </div>
                        </div>
                        <div id="article"></div>
                        <!-- <div class="spance"></div>
                        <div class="comment">
                            <div style="margin:20px 0; color:skyblue"><span>评论：</span></div>
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="textarea">
                            </el-input>
                            <el-button style="margin:20px 0;" type="primary">提交评论</el-button>
                        </div>
                        <div class="spance"></div>
                        <div style="margin:20px 0; color:skyblue"><span>评论区：</span></div> -->
                    </div>
                </div>
                <div class="content-desc">
                    <div class="desc-title">关于作者</div>
                    <div class="desc-msg">
                        <div class="desc-user">
                            <div class="desc-img"><img :src="this.$store.state.userInfo.avatar"></div>
                            <div class="desc-content">
                                <div class="msg-title">{{this.$store.state.userInfo.username}}</div>
                                <div class="msg-span" style="margin-top:10px">{{this.$store.state.userInfo.email}}</div>
                            </div>
                            <div class="msg-readnum">
                                <span>获得阅读数：{{this.articleData.readnumber}}</span>
                            </div>
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
            return {
                articleData:{
                    category:'',
                    title:'',
                    readnumber:'',
                    createTime:''
                },
                categoryTitle:'',
                textarea:''
            }
        },
        methods:{
            getArticleData () {
                this.$axios.get(`/article/${this.$route.params.id}`).then(res => {
                    console.log(res)
                    this.articleData = res.data
                    const articleContent = document.getElementById('article')
                    articleContent.innerHTML = res.data.content
                    let time = new Date(this.articleData.createTime)
                    let year = time.getFullYear()
                    let mon = time.getMonth()
                    let day = time.getDate()
                    // let hour = time.getHours()
                    // let min = time.getMinutes()
                    // let sec = time.getSeconds()
                    this.articleData.createTime = `${year}年${mon + 1}月${day}日`
                    this.$axios.get(`/category/${this.articleData.category}`).then(res => {
                        // console.log(res)
                        this.categoryTitle = res.data.name
                    })
                })
            },
            handleWriteNote () {
                if(this.$store.state.userInfo.username){
                    this.$router.push('/writenote')
                }else{
                    this.$message.info('登录后才能写笔记哦！')
                }
            },
            handleLogin () {
                this.$router.push('/')
            }
        },
        created () {
            this.getArticleData()
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
        background-color: #f1f1f1;
        padding: 20px 0;
    }
    .content-area{
        width: 960px;
        margin: 0 auto;
        overflow: hidden;
    }
    .content-wrap{
        float: left;
        width: 700px;
        padding: 2rem 0 0;
        background-color: #fff;
        border-radius: 6px;
    }
    .content-desc{
        float: left;
        width: 240px;
        height: 150px;
        background-color: #fff;
        margin-left: 20px;
        border-radius: 6px;
    }
    .content-article{
        width: 652px;
        margin: 0 auto;
    }
    .content-msg{
        height: 41px;
    }
    .msg-img img{
        width: 41px;
        height: 41px;
        float: left;
    }
    .msg-desc{
        float: left;
        margin-left: 15px;
    }
    .msg-title{
        text-align: left;
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }
    .msg-span{
        font-size: 14px;
        color: #909090;
    }
    #article{
        width: 652px;
        margin: 30px 0;
    }
    .desc-title{
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 15px;
        color: #333;
        border-bottom: 1px solid hsla(0,0%,59%,.1);
    }
    .desc-img img{
        width: 50px;
        height: 50px;
        float: left;
    }
    .desc-msg{
        padding: 20px 0;
    }
    .desc-user{
        margin: 0 auto;
        height: 50px;
        width: 210px;
    }
    .desc-content{
        padding-left: 10px;
        overflow: hidden;
    }
    .msg-readnum{
        padding-top: 10px;
        text-align: center;
        color: chartreuse
    }
    .spance{
        width:652px;
        height:10px;
        background-color:#f1f1f1;
        border-radius: 6px;
    }
    .comment{
        width: 652px;
        background-color: #fff;
    }
</style>