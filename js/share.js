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
            $('.container-fluid .red_m_back').css({'height':200*W+'px'});
            $('.container-fluid .red_init_main').css({'height':267*W+'px'});
            $('.container-fluid .red_m_back .red_log img').css({'width': 70*W+'px','margin-top': 16*W+'px'});
            $('.container-fluid .red_m_back .red_duihm .red_type').css({'font-size': 19*W+'px','margin-top':30*W+'px'});
            $('.container-fluid .red_m_back .red_duihm .red_ma').css({'font-size':19*W+'px','margin-top': -5*W+'px','letter-spacing': 2*W+'px'});
            $('.container-fluid .red_m_back .red_duihm .red_caoz').css({'margin-top': -1*W+'px','font-size':13*W+'px'});
            $('.btn_share').css({'margin-top':15*W+'px','margin-bottom':15*W+'px'});
            $('.btn_share .share_friend,.btn_share .copy_passworld').css({'height':36*W+'px','margin-bottom':9*W+'px','font-size':14*W+'px','border-radius':5*W+'px'});
            $('.rewad_list').css({'height':20*W+'px','font-size':14*W+'px'});
            $('.rewad_list .rewad').css({'width':84*W+'px','height':35*W+'px','line-height':35*W+'px','margin-left':-42*W+'px','margin-top':-20*W+'px'});
            $('.rewad_detailed ul li').css({'margin-bottom':5*W+'px'});
            $('.rewad_detailed .rewad_head').css({'height':25*W+'px','font-size':10*W+'px','line-height':25*W+'px','height':20*W+'px','line-height':20*W+'px'});
            $('.rewad_head span').css({'font-size':14*W+'px'});
//          $('.rewad_detailed .rewad_world').css({'height':35.5*W+'px'});
            $('.rewad_detailed .rewad_world p').css({'font-size':10*W+'px','padding-top':5*W+'px','padding-bottom':5*W+'px'});
            $('.rewad_detailed .rewad_draw').css({'margin-top':10*W+'px','margin-right':10*W+'px','margin-bottom':10*W+'px','width':77*W+'px','height':26*W+'px'});
            $('.rewad_draw img').css({'width':77*W+'px','height':26*W+'px'});
            $('.rewad_draw .draw').css({'font-size':12*W+'px','top':5*W+'px','left':20*W+'px'});
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(jQuery,document,window)