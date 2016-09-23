var express = require("express")
var app = express()
var session = require("express-session")
app.use(session({"secret":"hello","cookie":{maxAge:500*1000}}))
var datahandle =require("./my_modules/datahandle")
var bodyParser = require("body-parser")
app.set("view engine","jade")
app.use(bodyParser.urlencoded({extended:false}))
var path = require("path")
app.use(express.static(path.join(__dirname,"public")))
app.listen(3000,function () {
    console.log("ok")
})

app.get("/",function (req,res) {
    var hinfo=req.query.sinfo
    res.render("layout",{hinfo:hinfo})
})

app.post("/layout",function (req,res) {
    var data = req.body
    datahandle.find(data,function (result,name) {
        if(result==0){
            res.redirect("/?sinfo=用户不存在")
        }else if(result==1){
            res.redirect("/?sinfo=密码错误")
        }else{
            req.session.name=name
            res.redirect("/students")
        }
    })
})
app.get("/students",function(req,res){
    if(req.session.name){
        res.render("students",{username:req.session.name})
    }else{
        res.redirect("/layout")
    }
})
app.get("/student",function(req,res){
    datahandle.find1(function (data) {
        res.send(data)
    })
})
app.post("/insert",function (req,res) {
    // console.log(req.body)
    datahandle.testnum(req.body.number ,function (data){
        if(data==0){
            datahandle.insert1(req.body,function (data){
                res.send(data)  //发送的是所有数据库里的数据，包含刚加进去的，发给前台
            })
        }else if(data==1){
            var condition={"number":req.body.number}
                datahandle.updata(condition,req.body,function(data){
                    res.send(data)
                })
        }
    })
})
app.post("/remove",function(req,res){
    console.log(req.body)
    datahandle.remove1(req.body,function (data){
        res.send(data)
    })
})
app.get("/users",function (req,res) {
    if(req.session.name){
        res.render("users",{username:req.session.name})
    }else{
        res.redirect("/layout")
    }
    // res.render("users")
})
app.get("/finds",function(req,res){
    datahandle.find2(function (data) {
        res.send(data)
    })
})

app.post("/removes",function(req,res){
    datahandle.remove(req.body,function (data){
        res.send(data)
    })
})
app.post("/screen",function (req,res) {
    datahandle.screen(req.body,function (data){
        res.send(data)
    })
})
app.post("/screen1",function (req,res) {
    datahandle.screen1(req.body,function (data){
        res.send(data)
    })
})
app.post("/sort",function (req,res) {
    datahandle.sort(function (data) {
        res.send(data)
    })
})
    app.post("/inserts",function (req,res) {
        datahandle.insert(req.body,function (data){
        res.send(data)
        })
    })

app.post("/s",function (req,res) {
    // console.log(req.body)
    datahandle.testinsert(req.body,function (data){
        console.log(data);
        res.send(data);
    })
})
