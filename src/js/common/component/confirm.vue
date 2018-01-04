<template>
    <transition name="fade">
        <!--<div v-show="showConfirm">
            <div class="mask-confirm"></div>
            <div class="confirm-content">
                <div class="confirm-title" v-if="confirmTitle">{{confirmMsg}}</div>
                <div class="confirm-msg" v-html="confirmMsg"></div>
            </div>
        </div>-->
        <!-- 模态框（Modal）新增 -->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            新增演示
                        </h4>
                    </div>
                    <form>
                        <div class="modal-body">
                            <label for="title" class="control-label">演示标题</label>
                            <input type="text" class="form-control input-width" placeholder="请输入演示标题" v-model="demoData.titleAdd">
                        </div>
                        <div class="modal-body">
                            <label for="title" class="control-label">演示地址</label>
                            <input type="text" class="form-control input-width" placeholder="请输入演示地址" v-model="demoData.demoLinkAdd">
                        </div>
                        <div class="modal-body">
                            <label for="title" class="control-label">源码地址</label>
                            <input type="text" class="form-control input-width" placeholder="请输入源码地址" v-model="demoData.codeUrlAdd">
                        </div>
                        <div class="modal-body">
                            <label for="title" class="control-label">描述</label>
                            <textarea type="text" class="form-control input-width" placeholder="请输入演示相关描述内容" v-model="demoData.descriptionAdd"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id="saveArticleType">确定</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default{
        props:["msg"],
        data(){
            return {
                confirmMsg:"",
                confirmTitle:"",
                showConfirm:false,
                callback:null
            }
        },
        methods:{
            show(config){
                let that=this;
                that.confirmMsg=config.msg||"";
                that.confirmTitle=config.title||"";
                that.callback=config.callback||"";
                that.showConfirm=true;
            },
            close(){
                let that=this;
                that.showConfirm=false;
            },
            callbackEvent(){

            }
        }
    }
</script>
<style scoped>
    .confirm-component{
        width: 25%;
        max-width: 520px;
        position: fixed;
        background: #333;
        opacity: 0.8;
        color: #ffffff;
        text-align: center;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 15%;
        z-index: 1888;
        padding: 1rem 2rem;
        border-radius: 5rem;
    }
    .mask-confirm{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55,55,55,.6);
        height: 100%;
        z-index: 1000;
    }
    .confirm-content{
        width: auto;
        margin: 0 auto;
        position: relative;
        outline: 0;
        top: 10%;
        background: #ffffff;
    }
</style>