/**
 * Created with JetBrains WebStorm
 * User: antBrother
 * Date:2016/8/26
 */

$(function(){
	var oHtml = document.documentElement;
 	getFont();
	window.onresize = function(){
        getFont();
    }
	function getFont(){
	 	var screenWidth = oHtml.clientWidth;
		if(screenWidth < 500){
	    	 oHtml.style.fontSize = 20 * (screenWidth / 320) + 'px';
	    }else if(screenWidth >= 500){
	        oHtml.style.fontSize = '31.25px';
	        oHtml.style.width='500px';
	        oHtml.style.margin='0 auto';
	        oHtml.style.backgroundColor="grey";
	    }
 	}
	
});