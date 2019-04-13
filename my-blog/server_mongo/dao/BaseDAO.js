const db = require("ykt-mongo");
module.exports.reduce = function(method,collection,id,param,func){
    if(method == "get"){
        find(collection,id,param,func);
    }else if(method == "post"){
        insert(collection,param,func);
    }else if(method == "put"){
        update(collection,id,param,func);
    }else if(method == "delete"){
        del(collection,id,param,func);
    }else{
        console.error("请求方法错误："+method);
        func("请求方法错误："+method);
    }
}

var find = function(collection,id,param,func){

    var page = param.page;
    var rows = param.rows;
    delete param.page;
    delete param.rows;
    if(param.submitType){
        var submitType = param.submitType;
        delete param.submitType;
    }
    if(param.findType){
        var findType = param.findType;
        delete param.findType;
    }
    
    if(param.ref){
        var ref = param.ref;
        delete param.ref;
    }
   
    for(var key in param){
        if(/.+\$id$/.test(key)){
            param[key] = db.ObjectID(param[key]);
        }else{
            if(findType && findType == "exact"){
                param[key] = param[key];
            }else{
                param[key] = {$regex:param[key]};
            }

        }
    }
    if(id){
        param._id = db.ObjectID(id);
    }

    if(!page && !rows){
        db.collection(collection).find(param,async function(data){

            if(submitType == "findJoin"){
                if(ref){
                    
                    if(typeof ref == "string"){
                        let joinData = await db.findJoin(data,ref);
                        if(param._id){
                            func(joinData[0]);
                        }else{
                            func(joinData);
                        }
                    }else{
                        
                        for(let r of ref){
                            data = await db.findJoin(data,r);                         
                        }
                        if(param._id){
                            func(data[0]);
                        }else{
                            func(data);
                        }
                    }
                    
                }else{
                    console.error("请求参数错误：没有指定关联的集合。");
                    func("请求参数错误：没有指定关联的集合。");
                }

            }else{
                if(param._id){
                    func(data[0]);
                }else{
                    func(data);
                }
            }

        });
    }else{
        page = parseInt(page);
        rows = parseInt(rows);
        db.collection(collection).findByPage(page,rows,param,async function(data){
            if(submitType == "findJoin"){
                if(ref){

                    // db.findJoin(data.rows,ref,function(joinData){
                    //     data.rows = joinData;
                    //     func(data);
                    // });
                    let joinData;
                    if(typeof ref == "string"){
                        joinData = await db.findJoin(data.rows,ref);
                        data.rows = joinData;
                        func(data);
                    }else{
                        
                        let joinData = data.rows;
                        for(let r of ref){
                            joinData = await db.findJoin(joinData,r);                         
                        }
                        data.rows = joinData;
                        func(data);
                       
                    }
                }else{
                    console.error("请求参数错误：没有指定关联的集合。");
                    func("请求参数错误：没有指定关联的集合。");
                }

            }else{
                func(data)
            }
        });

    }

}

var insert = async function(collection,param,func){

    if(param.submitType == "addMore"){
        let dataAry = [];
        if(!param.data){
            console.error("增加多条数据时参数错误");
            func("增加多条数据时参数错误");
        }else{
            for(var i = 0;i < param.data.length;i++){
                delete param.data[i]._id;
                for(var k in param.data[i]){
                    if(typeof(param.data[i][k]) == "object" && param.data[i][k].$id){
                        param.data[i][k].$id = db.ObjectID(param.data[i][k].$id);
                    }
                }
                let data = await db.collection(collection).insert(param.data[i]);
                dataAry.push(data.ops[0]);
            }
            func(dataAry);
        }
    }else{
        delete param._id;
        for(var k in param){
            if(param[k].$id){
                param[k].$id = db.ObjectID(param[k].$id);
            }
        }
        
        let data = await db.collection(collection).insert(param);
        func(data.ops[0] || data);
    }

}

var update = function(collection,id,param,func){
    let _id;
    if(!id){
        _id = param._id;
        delete param._id;
    }else{
        _id = id;
    }
    for(var k in param){
        if(param[k].$id){
            param[k].$id = db.ObjectID(param[k].$id);
        }
    }
    db.collection(collection).update({_id:db.ObjectID(_id)},{$set:param},function(){
        func("suc");
    });
}

var del = function(collection,id,param,func){

    if(id || param._id){
        param._id = db.ObjectID(id || param._id);
        db.collection(collection).remove({_id:param._id},function(){
            func("suc");
        });
    }else if(param.ids){
        var removeIds = param.ids.map(function(id){
            return db.ObjectID(id);
        });
        db.collection(collection).remove({_id:{$in:removeIds}},function(){
            func("suc");
        });
    }else{
        for(var key in param){
            if(/.+\$id$/.test(key)){
                param[key] = db.ObjectID(param[key]);
            }
        }
        db.collection(collection).remove(param,function(){
            func("suc");
        });
    }

}
