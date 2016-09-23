$("table tbody").delegate(".del","click",function(){
    var number = $(this).attr("data_num");
    var cont={"number":number}
    $.ajax({       //删除
        method:"post",
        url:"/remove",
        data:cont
    }).done(function(data){
        show(data)
    })
});
    $("table tbody").delegate(".alter","click",function(){
        $("#myModal").modal();
        var number = $(this).attr("data_n");
        // console.log(number)
        $("#fixnum").val(number).attr("readOnly","readOnly")
    });
$("#bt").click(function () {
    $("#myModal").modal("show");
    $("#fixnum").val("").removeAttr("readonly");
})
$(".myform").submit(function(){  //form的class属性
    var data = $(this).serialize();
    $.ajax({
        method:"post",
        url:"/insert",   //插入数据
        data:data
    }).done(function(data){
        show(data);
    });
    return false;
});
ajax();
function ajax(){
    $.ajax({
        method:"get",
        url:"/student"
    }).done(function(data){
        console.log(data);
        show(data);
    })
}
function  show(elem){
    $("table tbody tr").empty();
    for( var i in elem){
        var $tr=$("<tr>");
        for(var j in elem[i]){
            if(j!="_id"){
                var text=elem[i][j];
                var $td=$("<td>");
                $td.text(text);
                $tr.append($td)
            }
        }
        $tr.append("<td><button class='del' data_num='"+ elem[i].number +"'>删除</button></td>")
        $tr.append("<td><button class='alter' data_n='"+ elem[i].number +"'>修改</button></td>")
        $("table tbody").append($tr)
    }
}
$(".btn2").click(function () {
    $.ajax({
        method:"post",
        url:"/screen"  //排序
    }).done(function(data){
        show(data)
    })
});
$(".btn3").click(function () {
    $.ajax({
        method:"post",
        url:"/screen1"  //排序
    }).done(function(data){
        show(data)
    })
});
$(".btn4").click(function () {
    $.ajax({
        method:"post",    //分数
        url:"/sort"
    }).done(function(data){
        show(data)
    })
});
