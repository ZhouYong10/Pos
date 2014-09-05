/**
 * Created by zhouyong on 14-8-28.
 */
$(function(){
    /*
   shops页面
     */
    $('.addCart').click(function(){
        var temp = [];
       $($(this).parent().siblings()).each(function(){
           temp.push($(this).text());
       });
        var shop = {
            category:temp[0],
            name:temp[1],
            unitPrice:temp[2],
            unit:temp[3],
            promotion:temp[4]
        };
        $.post('/addCart',{shop:shop},function(data){
            $('#cart span').text(data);
        });
    });


    /*
    cart页面
     *//*
    $('#shops td .less').click(function(){
        var total = $('header p span').text();
        var span = $(this).next();
        var shopName = $($(this).parent().parent().siblings()[0]).text();
        $.post('/lessOrMore',{shopName:shopName,flag:"less"},function(data){

//            $('header p span').text(total - 1);
//            $(span).text(data);
        });
    });

    $('#shops td .more').click(function(){
        var total = $('header p span').text();
        var span = $(this).prev();
        var shopName = $($(this).parent().parent().siblings()[0]).text();
        $.post('/lessOrMore',{shopName:shopName,flag:"more"},function(data){

//            $('header p span').text(total + 1);
//            $(span).text(data);
        });
    });*/

});