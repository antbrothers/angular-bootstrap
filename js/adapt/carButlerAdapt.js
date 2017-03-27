(function($,doc,win){
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth =screen.width;
            var clientHeight=screen.height;
            var W=clientWidth/320;
            var H=clientHeight/568;
            if (!clientWidth) return;
            $("#red_header").css({'height':44*H+'px'});
            $("#red_header .head_title").css({"font-size":18*H+'px'});
            $('#red_header .ret_cont').css({'height': 44*H+'px','width': 40*H+'px'});
            $('#red_header .ret_left img').css({'width': 12*H+'px'});
            $('.swiper-container').css({'height':111*H+'px'});
            $('.swiper-slide').css({'font-size':18*H+'px'});
            $('.container-fluid .icon-img .menu_title').css({'font-size': 8*H+'px','letter-spacing':1*H+'px'});
            $('.container-fluid .icon-img').css({'height':132*H+'px'});
            $('.container-fluid .icon-img .menu_desc').css({'font-size': 12*H+'px'});
            $('.container-fluid .icon-img img').css({'margin-bottom': 7*H+'px','width': 54*H+'px'});
            $('.container-fluid .icon-img.middle').css({'background-size':131*H+'px'});
            $('.container-fluid .hot_main img').css({'width':29*H+'px'});

        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(jQuery,document,window)