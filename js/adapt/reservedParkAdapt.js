/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/1
 */
$(function(){
    var oHtml = document.documentElement;
    getFont();
    window.onresize = function(){
        getFont();
    }
    function getFont(){
        var screenWidth = oHtml.clientWidth;
        if(screenWidth <= 320){
            oHtml.style.fontSize = '62.5%';
        }else if(screenWidth >= 500){
            oHtml.style.fontSize = '18.5185px';
            oHtml.style.width='500px';
            oHtml.style.margin='0 auto';
            oHtml.style.backgroundColor="grey";
        }else{
            oHtml.style.fontSize = screenWidth/(1080/40)+'px';
        }
    }
})

