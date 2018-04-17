<!--弹框：用于新增，编辑等弹框-->
<template>
    <transition name="fade">
        <div class="dialog-component" v-show="showDialog">
            <div class="dialog-content">
                <div class="dialog-title" v-if="dialogTitle">
                    {{dialogTitle}}
                </div>
                <div class="dialog-info" v-for="(item,index) in dialogForm">
                    <span class="info-title">{{item.title}}</span><span class="require-info" v-if="item.required">*</span>
                    <input :placeholder="item.holder" class="info-input" v-if="!item.cols||item.cols==1" v-model="item.val"></input>
                    <textarea :placeholder="item.holder" :cols="item.cols" class="info-area" v-if="item.cols&&item.cols>1" v-model="item.val"></textarea>
                </div>
                <div class="dialog-btn-group">
                    <div class="dialog-btn btn-cancel" @click="close()">取消</div>
                    <div class="dialog-btn btn-ok" @click="callbackEvent()">确定</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import tips from "./tips.vue";
    export default{
        props:["dialogForm","dialogTitle"],
        data(){
            let that=this;
            return {
                dialogTitle:that.dialogTitle||"",
                dialogForm:that.dialogForm||[],
                showDialog:false,
                callEvent:null,
                params:null
            }
        },
        methods:{
            show(config){
                let that=this;
                if(!(config===undefined)){
                    that.dialogForm=config.dialogForm||that.dialogForm;
                    that.dialogTitle=config.dialogTitle||that.dialogTitle;
                    that.callEvent=config.callEvent||that.callEvent;
                    that.params=config.params||that.params;
                }
                that.showDialog=true;
            },
            close(){
                let that=this;
                that.showDialog=false;
            },
            callbackEvent(){
                let that=this;
                let data={};
                for(let item of that.dialogForm){
                    let value=item.val;
                    let required=item.required;
                    let field=item.field;
                    let holder=item.holder;
                    if(required&&(value==="")){
                        that.$parent.$refs.tips.show(holder);
                        return;
                    }
                    else{
                        data[field]=value;
                    }
                }
                if(that.callEvent&&typeof this.callback === 'function'){
                    that.callEvent.call(this,data,that.params);
                }
                else{
                    throw Error("callback is not a function");
                }
            }
        },
        components:{
            tips
        }
    }
</script>
<style scoped>
    .dialog-component{
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
    .dialog-content{
        width: 50%;
        max-width: 520px;
        margin: 0 auto;
        position: relative;
        outline: 0;
        top: 10%;
        background: #ffffff;
        padding: 1rem 2rem;
        border-radius: 0.6rem;
        max-height: 800px;
        overflow-y: auto;
    }
    .dialog-title{
        color: #333;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: left;
        position: relative;
    }
    .dialog-info{
        color: #333;
        font-size: 1rem;
        text-align: left;
        position: relative;
        padding: 0.5rem 0;
        text-indent: 0.5rem;
        margin-bottom:0.5rem;
    }
    .dialog-title:after{
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
    .require-info{
        color: #880000;
    }
    .dialog-info:after{
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
    .info-title{
        color: #333;
        font-size: 0.8rem;
    }
    .info-input{
        width:60%;
        color: #495060;
        line-height: 1.5;
        font-size: 0.5rem;
        resize: none;
    }
    .info-area{
        width:100%;
        color: #495060;
        line-height: 1.5;
        font-size: 0.5rem;
        resize: none;
    }
    .dialog-btn-group{
        width:100%;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end
    }
    .dialog-btn{
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