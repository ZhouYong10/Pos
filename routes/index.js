
/*
 * GET home page.
 */

var Shop = require('../models/shop.js');
var _ = require('underscore');

module.exports = function(app){

    app.get('/',function(req,res){
        if(!req.session.cart){
            req.session.cart = [];
        }
        if(!req.session.total){
            req.session.total = 0;
        }
        res.render('index',{title:"主页",total:req.session.total});
    });

    app.get('/shops',function(req,res){
        if(req.query.pay == "pay"){
            req.session.total = 0;
            req.session.cart = [];
        }
        Shop.get(function(err,shoppings){
            var shops = shoppings;
            if(err){
                shops = [];
            }
            res.render('shops',{
                title:"商品列表",
                total:req.session.total,
                shops:shops
            });
        });
    });

    app.get('/cart',function(req,res){
        res.render('cart',{
            title:"购物车",
            total:req.session.total,
            shops:req.session.cart
        });
    });

    app.get('/shoppingList',function(req,res){
        var shops = req.session.cart;
        var gives = [];
        _.each(shops,function(shop){
            if(shop.num >= 3){
                var give = _.clone(shop);
                give.num = parseInt(give.num/3);
                gives.push(give);
            }
        });
        res.render('shoppingList',{
            title:"购物清单",
            total:req.session.total,
            shops:shops,
            gives:gives
        });
//        gives = _.filter(gives,function(give){
//            return give.num >= 3;
//        });
//
//        gives = _.each(gives,function(give){
//            give.num = parseInt(give.num/3);
//        });

//        var gives = _.filter(shops,function(shop){
//            return shop.num >= 3;
//        });
//
//        var newGives = _.each(gives,function(give){
//            give.num = parseInt(give.num/3);
//        });
//        console.log('===================shops'+JSON.stringify(shops));
//        console.log('==================================shops'+JSON.stringify(req.session.cart));
//        console.log('====================================gieves'+JSON.stringify(gives));
    });

    app.post('/addCart',function(req,res){
        var shop = req.body.shop;
        var cart = req.session.cart;
        var hadShop = _.findWhere(cart,{name:shop.name});
        if(hadShop){
            shop.num = hadShop.num + 1;
            var index = _.indexOf(cart,hadShop);
            cart[index] = shop;
        }else{
            shop.num = 1;
            cart.push(shop);
        }
        req.session.cart = cart;
        var total = req.session.total + 1;
        req.session.total = total;
//        var total = _.reduce(cart,function(memo,shop){
//            return memo + shop.num;
//        },0);
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write(total + "");
        res.end();
    });

    app.get('/lessOrMore',function(req,res){
        var shops = req.session.cart;
        var shop = _.findWhere(shops,{name:req.query.shopName});
        var index = _.indexOf(shops,shop);

        if(req.query.flag == "less"){
            shop.num = shop.num - 1;
            if(shop.num == 0){
                shops.splice(index,1);
            }else{
                shops[index] = shop;
            }
            req.session.total = req.session.total - 1;
        }else if(req.query.flag == "more"){
            shop.num = shop.num + 1;
            shops[index] = shop;
            req.session.total = req.session.total + 1;
        }
        req.session.cart = shops;

        if(req.session.total == 0){
            res.redirect('/shops');
        }else{
            res.redirect('/cart');
        }
    });





    app.get('/input',function(req,res){
        res.render('input',{
            title:"商品录入",
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        });
    });

    app.post('/input',function(req,res){
        var category = req.body.category,
            name = req.body.name,
            unitPrice = req.body.unitPrice,
            unit = req.body.unit;
        console.log(category+name+unitPrice+unit);
        var shop = new Shop({
            category:category,
            name:name,
            unitPrice:unitPrice,
            unit:unit
        });
        shop.save(function(err){
            if(err){
                req.flash('error',err);
                return res.redirect('/input');
            }
            req.flash('success',"商品录入成功");
            res.redirect('/input');
        });
    });
};