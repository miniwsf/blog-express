import bottom from "../../common/component/bottom.vue";

/*赞赏*/
function praiseData(id){
    $.ajax({
        type:"PUT",
        url:"/blog/"+id,
        data:{

        },
        success:function(res){
            window.location.reload();
        },
        error:function(err) {

        }
    });
}

(function (){
    var vm=new Vue({
        el:"#detail",
        data:{
        },
        methods:{

        },
        components:{
            bottom
        }
    });
})();