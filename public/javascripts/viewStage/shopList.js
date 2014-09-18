/**
 * Created by zhouyong on 14-9-18.
 */
$(function(){
    $('#shopList').addClass('active');

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

});