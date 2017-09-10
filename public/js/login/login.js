(function(){
	$("#form").bind("submit",login);
	var $form=$("#form");

	function login(){
       var form=$form[0];
       var username=form.username.value;
       var password=form.password.value;
        $.ajax({
          type:"POST",
          url:"/login/logincheck",
          data:{
            "username":username,
            "password":password
          },
          success:function(res){
          	if(res.code==0){
          		window.location.href="/article";
          	}
          	else{
          		alert(res.msg);
          	}
          },
          error:function(err) {
              //console.log(err)
              alert(res.msg);
          }
        })
	}
})()