/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/1
 * Desc:  前端按iphone5的标准尺寸（320*568），进行页面布局；
 *        要求美工切图按iphone5尺寸的2倍即（640*1136）尺寸进行切图，
 *        设置根的字体大小为100px，这样直接拿到美工标注的尺寸大小除以100转为rem（例如：140px=1.40rem），进行布局。
 */
$(function(){
    var oHtml = document.documentElement;
    getFont();
    window.onresize = function(){
        getFont();
    }
    function getFont(){
        var screenWidth = oHtml.clientWidth;
        if(screenWidth <= 500){
            oHtml.style.fontSize = 50 * (screenWidth / 320) + 'px';
        }else if(screenWidth > 500){
            oHtml.style.fontSize = '78.125px';
            oHtml.style.width='500px';
            oHtml.style.margin='0 auto';
            oHtml.style.backgroundColor="grey";
        }
    }
})

