$(".txt2").click(function(){
    var txt1 = $(".txt1").val()
    var re = /[0-9a-zA-Z]\@qq\.com+/g
    var result=re.exec(txt1);
    if(result==null){
        $("h6").text("请输入正确的邮箱")
    }else{
        $("h6").text("格式正确").css("color","green")
    }
})

