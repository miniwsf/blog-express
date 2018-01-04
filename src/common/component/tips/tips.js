
var vm={
    template:'<div>{{msg}}dededede</div>',
    props:["msg"],
    data(){
        let that=this;
        return {
            msg:that.msg,
            msgShow:true
        };
    },
    methods:{
        show(msg){
            let that=this;
            that.msg=msg;
            that.msgShow=true;
        },
        close(){
            let that=this;
            that.msg="";
            that.msgShow=false;
        }
    }
};

export default vm;
