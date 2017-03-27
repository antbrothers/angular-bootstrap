(function($,doc,win){
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            var clientHeight=docEl.clientHeight;
            var W=clientWidth/320;
            var H=clientHeight/568;
            if (!clientWidth) return;
            /*   docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';*/
            $('#red_header').css({'height':50*W+'px','font-size': 18*W+'px'});
            $('#red_header .head_title').css({'width':200*W+'px'});
            /* $('.container-fluid').css({'height':518*H+'px','background-size':320*W+'px'});*/
            $('.container-fluid .red_m_back').css({'height':251*W+'px'});
            $('.container-fluid .red_init_main').css({'height':317*W+'px'});
            $('.container-fluid .red_m_back .red_log img').css({'width': 70*W+'px','margin-top': 16*W+'px'});
            $('.container-fluid .red_m_back .red_duihm .red_type').css({'font-size': 19*W+'px','margin-top':45*W+'px'});
            $('.container-fluid .red_m_back .red_duihm .red_ma').css({'font-size':19*W+'px','margin-top': -9*W+'px','letter-spacing': 2*W+'px'});
            $('.container-fluid .red_m_back .red_duihm .red_caoz').css({'margin-top': -10*W+'px','font-size':13*W+'px'});

            $('.red_init_main .main_jiazhi').css({'font-size': 15*W+'px'});
            $('.red_init_main .price').css({'font-size': 28*W+'px'});
            $('.red_init_main .desc').css({'margin-top': -7*W+'px','font-size': 15*W+'px'});
            $('.red_init_main .jianli_desc').css({'word-spacing': 15*W+'px','margin-top': 17*W+'px','font-size': 12*W+'px'});
            $('.red_init_main .use_fa').css({'margin-top': -8*W+'px','font-size': 13*W+'px','letter-spacing': 1*W+'px'});
            $('.red_init_main .btn_down img').css({'width': 268*W+'px'});
            $('.red_init_main .btn_down p.down_desc').css({'margin-top': -26*W+'px','letter-spacing': 2*W+'px','font-size': 15*W+'px'});

            $('.red_init_main .btn_down').css({'margin-top': 15*W+'px'});
            $('.red_init_main .btn_kehuxiaz').css({'margin-top': 46*W+'px'});

        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(jQuery,document,window)