<!--消息确认弹框-->
<template>
    <transition name="fade">
        <div class="confirm-component" v-show="showConfirm">
            <div class="confirm-content">
                <div class="confirm-title" v-if="confirmTitle">
                    {{confirmTitle}}
                </div>
                <div class="confirm-msg" v-html="confirmMsg"></div>
                <div class="confirm-btn-group">
                    <div class="confirm-btn btn-cancel" @click="close()">取消</div>
                    <div class="confirm-btn btn-ok" @click="callbackEvent()">确定</div>
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
                that.params=config.params;
            },
            close(){
                let that=this;
                that.showConfirm=false;
            },
            callbackEvent(){
                if(this.callback&&typeof this.callback === 'function'){
                    this.callback.call(this,this.params);
                }
                else{
                    throw Error("callback is not a function");
                }
                this.close();
            }
        }
    }
</script>
<style scoped>
    .confirm-component{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.8);
        color: #ffffff;
        text-align: center;
        z-index: 1888;
        top:0;
        left:0;
    }
    .confirm-content{
        width: 50%;
        max-width: 520px;
        margin: 0 auto;
        position: relative;
        outline: 0;
        top: 10%;
        background: #ffffff;
        padding: 1rem 2rem;
        border-radius: 0.6rem;
    }
    .confirm-title{
        color: #333;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: left;
        position: relative;
    }
    .confirm-msg{
        color: #333;
        font-size: 1rem;
        text-align: left;
        position: relative;
        padding: 0.5rem 0;
        text-indent: 0.5rem;
        margin-bottom:0.5rem;
    }
    .confirm-title:after{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-bottom:1px solid #e9eaec;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
    .confirm-msg:after{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-bottom:1px solid #e9eaec;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
    .confirm-btn-group{
        width:100%;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
    }
    .confirm-btn{
        width:16%;
        padding: 0.5rem;
        border-radius: 0.3rem;
        cursor: pointer;
        display: inline-block;
        text-align: center;
    }
    .btn-cancel{
        color: #333;
    }
    .btn-cancel:active{
        opacity: 0.5;
    }
    .btn-ok{
        color: #ffffff;
        background-color: #2d8cf0;
        border-color: #2d8cf0;
    }
    .btn-ok:active{
        opacity: 0.5;
    }
</style>