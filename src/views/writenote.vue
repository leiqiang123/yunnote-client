<template>
    <div style="background: #f1f1f1">
        <div class="header">
            <div class="header-middle">
                <div @click="handleLogin" class="header-l">
                    <h1>云笔记</h1>
                </div>
                <div class="header-r">
                    <el-button>写笔记</el-button>
                </div>
            </div>
        </div>
        <div style="width:1170px;margin: 0 auto;">
            <div class="write-container">
                <div>
                    <div class="title">
                        <span>标题</span>
                    </div>
                    <el-input class="write-input" type="text" placeholder="请输入笔记标题"></el-input>
                </div>
                <div>
                    <div class="title">内容</div>
                    <div class="rich-text mt10">
                        <quill-editor v-model="ruleForm.words" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
                        </quill-editor>
                    </div>
                    <div class="mt10 label">
                        <span class="label-title">标签：</span>
                    </div>
                    <div style="text-align: left;">
                        <el-button style="width:98px;height:40px;margin-top: 20px;" type="primary">发布笔记</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'; //调用编辑器
    import 'quill/dist/quill.core.css' 
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        components:{
            quillEditor
        },
        data () {
            return {
                ruleForm:{},
                editorOption: {}
            }
        },
        methods:{
            handleLogin () {
                this.$router.push('/')
            },
            onEditorReady(editor) {
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
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
    .write-container{
        width: 1170px;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 30px;
        padding: 8px 24px;
        background: #fff;
        border-radius: 4px;
    }
    .write-input{
        width: 1122px;
        height: 42px;
        margin-top: 10px;
    }
    .title{
        margin-top: 6px;
        color: #333;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.5;
        text-align: left
    }
    .mt10{
        margin-top: 10px;
    }
    .editer{
        height: 275px;
    }
    .rich-text{
        height: 340px;
    }
    .label{
        text-align: left;
    }
    .label-title{
        font-size: 14px;
        font-weight: 700;
        color: #409eff;
    }
</style>