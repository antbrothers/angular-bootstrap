/**
 * User: 郏高阳
 * Date: 14-2-25
 * 信息提示框插件，依赖Sea.JS、Jquery
 */
(function(window,$){

	var fakemr = {};
   
    /*显示主的DIV*/
    function _showMainDiv() {
        if ($("#_fakeMr_load_mask_div").length == 0) {
            $('body').append(getMaskDiv(), getMessageMainDiv());
        } else {
            $('#_fakeMr_Message_Text,#_fakeMr_load_mask_div').show();
        }
    }

    /*关闭所有的*/
    function _closeWinDiv() {
        $('#_fakeMr_Message_Text,#_fakeMr_load_mask_div').each(function (index, item) {
            $(item).empty().hide();
        });
    }

    /**
     * 提示框
     * @param text 需要显示的文本
     * User 郏高阳
     */
    fakemr.showMessage = function (text) {
        _showMainDiv();
        $('#_fakeMr_Message_Text').append(getMessage_TextDiv(text), getMessage_closeButton());
        BindCloseMessageEven();
    };
    /**
     * 通知
     * @param text
     * @param closeTime
     * User 郏高阳
     */
    fakemr.showNotify = function (text, closeTime) {
        _showMainDiv();
        $('#_fakeMr_Message_Text').empty().append(getMessage_TextDiv(text, closeTime));
        var hrefThis = this;
        setTimeout(function () {
            _closeWinDiv();
        }, closeTime);
    };
    /**
     * 确认框
     * @param text  文本
     * @param leftButton 第一个按钮
     * @param rightButton  第二个按钮
     * @param leftCallback 第一个按钮回调
     * @param rightCallback 第二个按钮回调
     * User 郏高阳
     */
    fakemr.showConfirm = function (text, leftButton, rightButton, leftCallback, rightCallback) {
        _showMainDiv();
        $('#_fakeMr_Message_Text').empty().append(getMessage_TextDiv(text), getConfirm_leftButton(leftButton), getConfirm_rightButton(rightButton));
        BindCloseConfirmEven(leftCallback, rightCallback);
    };

    /*内容展示层*/
    function getMessage_TextDiv(_str) {
        var _fakeMr_Text = $('<div id="_fakeMr_Text">' + _str + '</div>');
        var cssStr = { 'font-size': '13px', 'padding': '15px 0' };
        return _fakeMr_Text.css(cssStr);
    }

    /*关闭Alert窗口事件*/
    function BindCloseMessageEven() {
        $("#_fakeMr_close").click(function () {
            _closeWinDiv();
        });
    }

    /*关闭确认提示框事件【存在callback】*/
    function BindCloseConfirmEven(leftCallback, rightCallback) {
        $("#_fakeMr_Confirm_leftButton").click(function () {
            _closeWinDiv();
            (leftCallback && typeof(leftCallback) === "function") && leftCallback();
        });
        $("#_fakeMr_Confirm_rightButton").click(function () {
            _closeWinDiv();
            (rightCallback && typeof(rightCallback) === "function") && rightCallback();
        });
    }

    /*关闭按钮*/
    function getMessage_closeButton() {
        var _fakeMr_closeButton = $('<a id="_fakeMr_close"></a>');
        var cssStr = {
            'font-size': '13px'
        };
        var pDom = $('<p>').css({
            'border-top': '1px solid #CCCCCC',
            'line-height': '40px'
        }).text("关闭");
        return _fakeMr_closeButton.css(cssStr).append(pDom);
    }

    /*确认框左边按钮*/
    function getConfirm_leftButton(_str) {
        var _fakeMr_Confirm_leftButton = $('<a id="_fakeMr_Confirm_leftButton">' + '</a>');
        var cssStr = {
            'font-size': '13px',
            'float': 'right',
            'border-left': '1px solid #CCCCCC',
            'width': '49%',
			'border-top': '1px solid #CCCCCC',
            'line-height': '40px'
        };
        var pDom = $('<p>').css({
            'line-height': '40px'
        }).text(_str);
        return _fakeMr_Confirm_leftButton.css(cssStr).append(pDom);
    }

    /*确认框右边的*/
    function getConfirm_rightButton(_str) {
        var _fakeMr_Confirm_rightButton = $('<a id="_fakeMr_Confirm_rightButton">' + '</a>');
        var cssStr = {
            'font-size': '13px',
            'float': 'right',
            'width': '49%',
			'border-top': '1px solid #CCCCCC',
            'line-height': '40px'
        };
        var pDom = $('<p>').css({
            'line-height': '40px'
        }).text(_str);
        return _fakeMr_Confirm_rightButton.css(cssStr).append(pDom);
    }

    /*body第一层的DIV*/
    function getMessageMainDiv() {
        var _fakeMr_Message_Text = $('<div id="_fakeMr_Message_Text"></div>');
        var cssStr = {
            'background': '#FFFFFF',
            'border-radius': '8px',
            'left': '50%',
            'position': 'fixed',
            'top': '40%',
            'width': '80%',
            'margin-left': '-40%',
            'text-align': 'center',
            "box-sizing": "content-box",
            'z-index': '999999999'
        };
        return _fakeMr_Message_Text.css(cssStr);
    }

    /*遮罩层*/
    function getMaskDiv() {
        var _maskDiv = $('<div id="_fakeMr_load_mask_div"></div>');
        return _maskDiv.css({
            'display': 'block',
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'background-color': '#000000',
            'top': '0',
            'left': '0',
            'opacity': '.6',
            'z-index': '999999998'
        }).click(function () {
            _closeWinDiv();
        });
    }

    $(function () {
        var dev = location.href.indexOf("?dev") > 0;
        var str = "\u0076\u0065\u0072\u0073\u0069\u006f\u006e\u003a\u0031\u002e\u0030\u002c\u4f5c\u8005\u003a\u90cf\u9ad8\u9633\u0028\u0046\u0061\u006b\u0065\u004d\u0072\u0029\u002c\u0051\u0051\u003a\u0031\u0031\u0037\u0034\u0035\u0034\u0030\u0035\u535a\u5ba2\u003a\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u006d\u0079\u002e\u006f\u0073\u0063\u0068\u0069\u006e\u0061\u002e\u006e\u0065\u0074\u002f\u006a\u0067\u0079";
//        $('body').attr("Plug_Alert_Message_Author_Info", str);
        if (dev) {
            var enStr = "\u203b\u0041\u0075\u0074\u0068\u006f\u0072\u003a\u0046\u0061\u006b\u0065\u004d\u0072\u203b\u0020\u0025\u0063\u0048\u0069\u002c\u0020\u0048\u0065\u006c\u006c\u006f\u0020\u0065\u0076\u0065\u0072\u0079\u006f\u006e\u0065\u003a\u0020\u0049\u0020\u0061\u006d\u0020\u0046\u0061\u006b\u0065\u004d\u0072\u0020\u0074\u0068\u0065\u0020\u0073\u0069\u0074\u0065\u0020\u0049\u0020\u0064\u0065\u0076\u0065\u006c\u006f\u0070\u0065\u0064\u0020\u0075\u0073\u0069\u006e\u0067\u0020\u0074\u0068\u0065\u0020\u006d\u0065\u0073\u0073\u0061\u0067\u0065\u0020\u0062\u006f\u0078\u0020\u0070\u006c\u0075\u0067\u0069\u006e\u002c\u0020\u0076\u0065\u0072\u0073\u0069\u006f\u006e\u0020\u0031\u002e\u0030\u0020\u004d\u0079\u0020\u0062\u006c\u006f\u0067\u003a\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u006d\u0079\u002e\u006f\u0073\u0063\u0068\u0069\u006e\u0061\u002e\u006e\u0065\u0074\u002f\u006a\u0067\u0079";
            if (window.console && window.console.log) {
//                console.log(enStr, "color:green");
            }
        }
    });
	
	window.Message = fakemr
})(window,jQuery);
//        Message.showMessage(jsonResult.result.cn);
//        Message.showNotify(jsonResult.result.cn,1000);
/*Message.showConfirm("我是郏高阳吗？","是","不是",function(){
 //第一个回调
 },function(){
 //第二个回调
 });*/