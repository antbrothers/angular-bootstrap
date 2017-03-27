/*(function($,doc,win){

    var clientWidth =screen.width;
    var clientHeight=$(window).height();
    var W=clientWidth/320;
    var H=clientHeight/568;
    $("#actOne").css({'height':568*H+'px'});
    $("#actOne.act .head_desc").css({'margin-top': 50*H+'px'});



    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth =screen.width;
            var clientHeight=$(window).height();
            var W=clientWidth/320;
            var H=clientHeight/568;
            if (!clientWidth) return;

            $("#actOne").css({'height':568*H+'px'});
            $("#actOne.act .head_desc").css({'margin-top': 50*H+'px'});

        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(jQuery,document,window)*/


(function(doc,win){
    var docE1=doc.documentElement,
        resizeEvt= 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc=function(){
            var clientWidth=docE1.clientWidth;
            var clientHeight=docE1.clientHeight;
            /* var clientHeight=weight;*/
            var BARWIDTH=clientWidth/320;
            var BARHEIGHT=clientHeight/568;
            if(!clientWidth) return;
            $("#actOne").css({'height':568*BARHEIGHT+'px'});
            $("#actOne.act .head_desc").css({'margin-top': 50*BARHEIGHT+'px'});
        };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window);
