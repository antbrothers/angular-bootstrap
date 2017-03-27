/**
 * Created by csp on 2016/4/25.
 */
$('.rechargemoney ul.amount li').click(function () {
    var n=$(this).index();
    $('.rechargemoney ul.amount li').eq(n).addClass('current').siblings().removeClass('current');
})