$("table tbody").delegate(".del1","click",function(){
    var number = $(this).attr("data_num");
    var cont={"email":number};
    $.ajax({
        method:"post",
        url:"/removes",
        data:cont
    }).done(function(data){
        show(data)
    })

});
$(".texts").blur(function () {
    console.log("hhhh")
    var texts=$(".texts").val();
    if(texts==""){
        $(".sp").html("不能为空")
    }else{
        var cont={email:texts}
        $.ajax({
            method:"post",
            url:"/s",
            data:cont
        }).done(function(da){
            console.log(da);
            if(da.length == 1){
                $(".sp").html("邮箱已注册")
            }else{
                $(".sp").html("")
            }
        })
    }
})


$(".myform").submit(function(){
    var data = $(this).serialize();
    if($(".sp").html()==""){
        $.ajax({
            method:"post",
            url:"/inserts",
            data:data
        }).done(function(data){
            show(data)
        })
    }
    return false;
})
ajax()
function ajax(){
    $.ajax({
        method:"get",
        url:"/finds",
    }).done(function(data){
        show(data);
    })
}
function  show(elem){
    $("table tbody tr").empty()
    for( var i in elem){
        var $tr=$("<tr>")
        for(var j in elem[i]){
            if(j!="_id"){
                var text=elem[i][j]
                var $td=$("<td>")
                $td.text(text)
                $tr.append($td)
            }

        }
        $tr.append("<td><button class='del1' data_num='"+ elem[i].email +"'>删除</button></td>")
        $("table tbody").append($tr)
    }
}