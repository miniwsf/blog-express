<template>
    <transition name="fade">
        <div class="tips-component" v-show="showTips">{{ tipsMsg }}</div>
    </transition>
</template>
<script>
    export default{
        props:["msg"],
        data(){
            return {
                tipsMsg:"",
                showTips:false
            }
        },
        methods:{
            show(msg){
                let that=this;
                that.tipsMsg=msg;
                that.showTips=true;
                setTimeout(function () {
                    that.showTips=false;
                },2000)
            }
        }
    }
</script>
<style scoped>
    .tips-component{
        width: 18%;
        max-width: 300px;
        position: absolute;
        background: #333;
        opacity: 0.8;
        color: #ffffff;
        text-align: center;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 15%;
        z-index: 2000;
        padding: 1rem 2rem;
        border-radius: 5rem;
    }
</style>