/**
 * Created by zhouyong on 14-8-28.
 */
var mongodb = require('./db');

function Shop(shop){
    this.category = shop.category;
    this.name = shop.name;
    this.unitPrice = shop.unitPrice;
    this.unit = shop.unit;
    this.promotion = shop.promotion;
}

module.exports = Shop;

//存入商品信息
Shop.prototype.save = function(callback){
    //要存入数据库的商品
    var shop = {
        category:this.category,
        name:this.name,
        unitPrice:this.unitPrice,
        unit:this.unit,
        promotion:this.promotion
    };
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取shops集合
        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //将商品信息插入shops集合
            collection.insert(shop,{
                safe:true
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Shop.get = function(callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取shops集合
        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find({}).sort({
                time:-1
            }).toArray(function(err,shops){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,shops);
            });
        });
    });
};

Shop.getTen = function(page,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取shops集合
        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //使用count返回特定查询的文档数total
            collection.count(function(err,total){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                //根据对象查询,并跳过(page-1)*10个结果,返回之后的10个结果
                collection.find({},{
                    skip: (page - 1)*10,
                    limit: 10
                }).sort({
                    time: -1
                }).toArray(function(err,shops){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null,shops,total);
                })
            });
        });
    });
};