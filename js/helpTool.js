;(function ($, window, document, undefined) {
    $.extend({
        helpTool: function () {
            return {
                //MD5加密
                encryptCode: function (param) {
                    var param_str = param + "Boxiang2016";
                    var MD5 = new Hashes.MD5;
                    return MD5.hex(param_str);
                },
                /*
                * 只检查手机号码
                * */
                checkOnlyMobile: function(mobile) {
                    if (mobile == "" || mobile == undefined) {
                        //this.errorWarning("", {"desc": '请输入手机号'});
                        return false;
                    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))) {
                        //this.errorWarning('', {"desc": '请输入正确的手机号'});
                        return false;
                    }else{
                        return true;
                    }
                },
                //验证手机号码
                checkMobile: function (mobile, password) {
                    if (mobile == "" || mobile == undefined) {
                        this.errorWarning("", {"desc": '请输入手机号'});
                        return false;
                    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))) {
                        this.errorWarning('', {"desc": '请输入正确的手机号'});
                        return false;
                    } else if (password == "" || password == undefined) {
                        this.errorWarning("", {"desc": "请输入密码"});
                        return false;
                    } else if (password.length < 6 || password.length > 20) {
                        this.errorWarning("", {"desc": "请输入6-20位密码"});
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                //错误提示
                errorWarning: function (ele, options) {
                    this.$element = ele;
                    var defaults = {
                        'desc': '数据不存在',
                        'ver':1
                    };
                    var settings = $.extend({}, defaults, options);
                    if(settings.ver==1){
                        $('body').append(ms.warning(settings));
                    }
                    return {
                        open:function(){
                            $('body').append(ms.warning(settings));
                        },
                        remove:function(){
                            var wait = 2;
                            clearInterval(window.timeId);
                            window.timeId = setInterval(function () {
                                if (wait == 0) {
                                    $(".error_main").closest("#error_waring").remove();
                                    clearInterval(window.timeId);
                                    wait =2;
                                } else {
                                    wait--;
                                }
                            },1000);
                        }
                    }

                },

                //加载进度
                loading: function () {
                    return {
                        open:function(){
                            $('body').append(ms.load());
                        },
                        close:function(){
                            $(".pop_load").remove();
                          /*  $(".load_js").css("display","none");*/
                        }
                    }

                },
                //简介弹出
                instructe: function (options) {
                    $('#poppack').remove();
                    $('body').append(ms.instructPop(options));
                },
                //弹出对话框
                /*showDialog:function(){
                    return {
                        open:function(optioins){
                            var defaults={
                                'dialogHead':'恭喜您',
                            }
                            var settings= $.extend({},defaults,optioins);
                            $(".dialog_box_content").remove();
                            $('body').append(ms.dialogBox(settings));
                        },
                        close:function(){
                            $(".dialog_box_content").remove();
                        }
                    }

                }*/
            }
        }
    });
    $.fn.showDialog=function(){
        var $this=$(this);
        return {
            open:function(optioins){
                var defaults={
                    'dialogHead':'',
                    'dialogDesc':'',
                    'dialogHeadCorlor':'',
                    'dialogEndTimeTxt':'',     //取车时间描述
                    'dialogEndTimeValue':'',   //取车时间
                    'preTxt':'',               //预计费用描述
                    'PrePrice':'',             //预计费用
                    'relate':'',               //联系方式
                    'relateTel':'',            //联系电话
                    'status':"",               //状态
                    'btn':['',''],
                     'cancelCallBack':function(){},  //取消
                     'checkOrder':function(){}       //查看订单
                }
                var settings= $.extend({},defaults,optioins);
                ms.initDialog($this,settings);
            }
        }
    }
    var ms = {
        //错误提示
        warning: function (opt) {
            var html = "";
            html += '<div id="error_waring">',
                html += '<div class="error_main">',
                html += '<div class="warning_text">' + opt.desc + '</div>',
                html += '</div>',
                html += '</div>';
            return html;
        },
        //加载进度条
        load: function () {
            var html = "";
            html += '<div class="load_js pop_load">',
            html += '<div id="Ant_load"></div>',
                html += '<div class="load_main">',
                html += '<div class="load_img">',
                html += '<img src="../images/loading.png">',
                html += '</div>',
                html += ' <div>',
                html += '<img src="../images/active/logo.png" class="load_log">',
                html += '</div>',
                html += '</div>',
            html += '</div>';
            return html;
        },
        //服务简介弹出
        instructPop: function (opt) {
            var html = "";
            html += '<div id="poppack">',
                html += '<div class="shown"></div>',
                html += '<div class="pop_main">',
                html += '<div class="pop_cont">',
                html += '<img src="../images/ic_close.png" class="ion_close" onclick="$.helpTool().showDialog().close()">',
                html += ' <h4 class="pop_head">',
                html += ' 服务简介',
                html += ' </h4>',
                html += ' <div class="container middle_cont">',
                html += '<div class="row desc_mioas">',
                html += '<div class="col-xs-12">',
                html += opt.intro,
                html += '</div>',
                html += '</div>',
                html += '<div class="row desc_mioas">',
                html += '<div class="col-xs-12">',
                html += ' 收费标准：',
                html += '<div class="row">',
                html += ' <div class="col-xs-12">',
                html += opt.srvBilling[0],
                html += '</div>',
                html += '</div>',
                html += '</div>',
                html += '</div>',
                html += ' </div>',
                html += ' <div class="container-fluid">',
                html += ' <div class="row">',
                html += ' <div class="col-xs-4">',
                html += ' <img src="../images/zeng.png" class="img-circle">',
                html += ' <div>曾管家</div>',
                html += ' </div>',
                html += ' <div class="col-xs-4">',
                html += ' <img src="../images/zhang.png" class="img-circle">',
                html += ' <div>张管家</div>',
                html += ' </div>',
                html += ' <div class="col-xs-4">',
                html += '<img src="../images/zhang2.png" class="img-circle">',
                html += ' <div>张管家</div>',
                html += '</div>',
                html += ' </div>',
                html += ' <div class="row">',
                html += ' <div class="col-xs-12">',
                html += ' <a href="tel:4000062637"><span class="code-btn js-get-code">一键呼叫</span></a>',
                html += ' <div class="row">',
                html += ' <div class="col-xs-12 jianjie">',
                html += ' 如果您有指定的车管家，请通过电话告诉我们的工作人员，每间店家提供的服务内容有细微的差异，时间的服务内容请参照该保养门店的服务内容而定',
                html += '</div>',
                html += ' </div>',
                html += ' </div>',
                html += '</div>',
                html += ' </div>',
                html += '</div>',
                html += '</div>',
                html += '</div>'
            return html;
        },

        initDialog:function(obj,args){
            return (function(){
                $(".dialog_box_content").remove();
                $('body').append(ms.dialogBox(args));
                ms.dialogEvent(obj,args);
            })()
        },
        //对话框提示
        dialogBox:function(opt){
            var html="";
            html +='<div class="dialog_box_content">'
            html +='<div class="dialog_main">'
            html +='<div class="row">'
            html +='<div class="row">'
            html +='<div class="col-xs-12 dialog_close dialog_cancel">'
            html +='<div>&#10005</div>'
            html +='</div>'
            html +='</div>'
            html +='<div class="col-xs-12 dialog_head_desc" style="color:'+opt.dialogHeadCorlor+'">'+opt.dialogHead+'</div>'
            html +='<div class="row">'
            html +=' <div class="col-xs-12 dialog_head_desc" style="color:'+opt.dialogHeadCorlor+'">'
            html +=opt.dialogDesc
            html +='</div>'
            html +='</div>'
            html +='<div class="row dialog_status" style="width: 164px;margin: 0 auto;">'
            html +=' <div class="col-xs-12 ">'
            html +=' <span class="dialog_status_infor">'+opt.dialogEndTimeTxt+'</span><br><span>'+opt.dialogEndTimeValue+'</span>'
            html +='</div>'
            html +=' <div class="row">'
            html +=' <div class="col-xs-12">'
            html +=' <span class="dialog_status_infor">'+opt.preTxt+'</span><span>'+opt.PrePrice+'</span>'
            html +='</div>'
            html +=' </div>'
            html +='</div>'
            html +='<div class="row dialog_tel">'
            html +='<div class="col-xs-12">'
            html +=opt.relate
            html +='</div>'
            html +='<div class="row">'
            html +='<div class="col-xs-12">'
            html +=opt.relateTel
            html +=' </div>'
            html +='</div>'
            html +=' </div>'
            html +=' <div class="row dialog_btn">'
            html +=' <div class="col-xs-6 dialog_btn_comm  dialog_btn_right dialog_cancel">'
            html +=' <div class="dialog_cance dialog_active" type="1">'+opt.btn[0]+'</div>'
            html +=' </div>'
            html +=' <div class="col-xs-6 dialog_btn_comm">'
            html +=' <div class="dialog_check_order dialog_active">'+opt.btn[1]+'</div>'
            html +='</div>'
            html +=' </div>'
            html +='</div>'
            html +=' </div>'
            html +=' </div>';
            return html
        },
        //对话框绑定事件
        dialogEvent:function(obj,args){
            return (function(){
                $(".dialog_cancel").click(function(){
                    args.cancelCallBack();
                });
                $(".dialog_check_order").click(function(){
                    args.checkOrder(args.status);
                })
            })()
        }

    }
})(jQuery, window, document);
