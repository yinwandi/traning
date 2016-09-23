var MongoClient = require("mongodb").MongoClient;
var url="mongodb://127.0.0.1:27017/management";
function find(opition,next){
    MongoClient.connect(url,function (err,db) {
        var condition={"email":opition.email}
        db.collection("user").find(condition).toArray(function (err,docs) {
            db.close()
            if(docs.length==0){
                next(0)
            }else if(docs[0].password==opition.password){
                next(2,docs[0].username)

            }else{
                next(1)
            }
        })
    })
}
function find1(next){
    MongoClient.connect(url,function (err,db) {
        db.collection("students").find().toArray(function (err,docs) {
            db.close()
            next(docs)
        })
    })
}
function screen(opition,next){
    var sex=opition.sex
    var conditon={sex:"男"}
    MongoClient.connect(url,function (err,db) {
        db.collection("students").find(conditon).toArray(function (err,docs) {
            db.close()
            next(docs)
        })
    })
}
function screen1(opition,next){
    var sex=opition.sex
    var conditon={sex:"女"}
    MongoClient.connect(url,function (err,db) {
        db.collection("students").find(conditon).toArray(function (err,docs) {
            db.close()
            next(docs)
        })
    })
}
function find2(next){
    MongoClient.connect(url,function (err,db) {
        db.collection("user").find().toArray(function (err,docs) {
            db.close()
            next(docs)
        })
    })
}
function insert(opition,next){
    MongoClient.connect(url,function (err,db) {
        db.collection("user").insertOne(opition,function(err,docs){
            console.log(docs)
            find2(function(data){
                next(data);
            })
            db.close();
        })
    })
}
function insert1(opition,next){
    MongoClient.connect(url,function (err,db) {
        db.collection("students").insertOne(opition,function(){
            find1(function(data){  //插入时在调用一次find，时insert返回的数据是所有的数据加上后添加的数据
                next(data);
            })
            db.close();
        })
    })
}
function remove(opition,next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("user").removeOne(opition,function(){
            find2(function(data){
                next(data)
            })
            db.close();
        })
    })
}
function remove1(opition,next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("students").removeOne(opition,function(){
            find1(function(data){
                next(data)
            })
            db.close();
        })
    })
}
function  sort(next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("students").find().toArray(function (err,docs) {
            for(var i=docs.length;i>=2;i--){
                for(var j=0;j<i-1;j++){
                    if(docs[j].score>docs[j+1].score){
                        var k=docs[j];
                        docs[j]=docs[j+1];
                        docs[j+1]=k;
                    }
                }
            }
            db.close()
            next(docs)
        })
    })
}
function updataa(condition,opition,next) {
    MongoClient.connect(url,function (err,db) {
        // console.log(condition)
        // console.log(opition)
        db.collection("students").updateOne(condition,opition,function(){
            find1(function(data){
                next(data)
            })
            db.close();
        })
    })
}
function testnum(test,callback){
    //0插入
    //1修改
    MongoClient.connect(url,function (err,db) {
        var cond = {"number":test};
        db.collection("students").find(cond).toArray(function (err,docs) {
            db.close()
            if(docs.length==0){
                callback(0)
            }else if(docs[0].number==test){
                callback(1)
            }
        })
    })
}
function testinsert(test,callback){
    //1不能添加
    //0可以添加
    var cond = {"email":test.email};
    MongoClient.connect(url,function (err,db) {
        db.collection("user").find(cond).toArray(function (err,docs) {
            db.close()
            callback(docs)
        })
    })
}
module.exports={
    find:find,
    find1:find1,
    find2:find2,
    insert:insert,
    insert1:insert1,
    remove:remove,
    remove1:remove1,
    updata:updataa,
    screen:screen,
    screen1:screen1,
    // updata1:updata1,
    sort:sort,
    testnum:testnum,
    testinsert:testinsert
}

