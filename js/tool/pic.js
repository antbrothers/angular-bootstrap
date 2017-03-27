window.POP = {};
(function (P) {
    P.eventMap = {
        listen: {},
        on: function (type, fn) {
            if (typeof type === 'string') {
                if (!this.listen.hasOwnProperty(type)) {
                    this.listen[type] = [];
                }
                if (typeof fn === 'function') {
                    return this.listen[type].push(fn);
                }
            }
        },
        fire: function (type) {
            if (typeof type === 'string') {
                var _listenType = this.listen[type];
                if (_listenType instanceof Array) {
                    for (var i = 0; i < _listenType.length; i++) {
                        _listenType[i].apply(this, [].slice.call(arguments, 1));
                    }
                }
            }
        },
        remove: function (type) {
            if (type instanceof Array) {
                var _type;
                for (var i = 0; i < type.length; i++) {
                    if (type[i] && this.listen.hasOwnProperty(type[i])) {
                        delete this.listen[type[i]];
                    }
                }
            } else {
                if (type && this.listen.hasOwnProperty(type)) {
                    delete this.listen[type];
                }
            }
        }
    }
})(POP);
;(function (P, win, doc) {
    var _layer = 2000;

    P.pic = function (obj, option) {
        return new _t(obj, option);
    }

    var _t = function () {
        this.init.apply(this, arguments)
    }

    _t.prototype = {
        init: function (obj, option) {
            this.$el = typeof obj === 'string' ? doc.querySelector(obj) : obj;
            var _imgSrc = 'data:image/gif;base64,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';
            var opt = {
                dataSrc: 'data-src',
                _imgSrc: _imgSrc,
                item: 'li'
            }
            if (option && option instanceof Object) {
                for (var k in option) {
                    opt[k] = option[k];
                }
            }
            console.log(opt)
            this.opt = opt;
            this._index = this.opt.index;

            //创建弹出内容
            var _item = this.$el.querySelectorAll(this.opt.item);
            var _self = this;
            [].forEach.call(_item, function (item, i) {
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    this._index = i;
                    this.createContent();
                    this.initPage(i);
                    this.init = null;
                }.bind(_self), false);
            });

        },
        bindUI: function () {
            var _list = this._list;
            var _item = _list.querySelectorAll('span');
            var _self = this;
            this.isRun = false;

            _list.addEventListener('touchstart', this, false);
            _list.addEventListener('touchmove', this, false);
            _list.addEventListener('touchend', this, false);
            window.addEventListener('resize', this, false);

            this._wrap.addEventListener('click', function (e) {
                e.preventDefault();
                POP.eventMap.fire('wrapClick');
            }, true);
        },
        destroy: function () {

            var _list = this._list;
            this._wrap.classList.remove('isShow');
            this._wrap.addEventListener("webkitTransitionEnd", remove, false);
            this._wrap.addEventListener("transitionend", remove, false);

            function remove() {
                this.parentNode && this.parentNode.removeChild(this);
            }

            POP.eventMap.remove('wrapClick');
            _list.removeEventListener('touchstart', this, false);
            _list.removeEventListener('touchmove', this, false);
            _list.removeEventListener('touchend', this, false);
        },
        handleEvent: function (e) {
            var _type = e.type;
            switch (_type) {
                case 'touchstart':
                    this.touchstart(e)
                    break;
                case 'touchmove':
                    this.touchmove(e)
                    break;
                case 'touchend':
                    this.touchend(e)
                    break;
                case 'resize':
                    this.resize()
                    break;
            }
        },
        start: function (e) {
            return {
                _x: e.targetTouches[0].pageX,
                _y: e.targetTouches[0].pageY
            }
        },
        touchstart: function (e) {
            this.posX = this.start(e)._x;
            this.tranX = parseInt(this.getTransform(this._list)) || 0;
            this.offX = 0;
            this.startTime = new Date() * 1;
            this.isRun = true;
        },
        touchmove: function (e) {
            if (this.isRun) {
                this.offX = this.start(e)._x - this.posX;
                var _px = this.tranX + this.offX;
                var _index = this._index;
                if (_px > 8 || _px < -8) {
                    e.preventDefault()
                }
                if (_index == 0 && this.offX > 0 || _index == this.len - 1 && this.offX < 0) {
                    _px = this.tranX + this.offX * 0.3
                }

                this.setTransform(_px, 0);
                this._px = _px;
            }
        },
        touchend: function (e) {
            if ((Math.abs(this.offX) || 0) == 0) return;
            if (this.isRun) {
                var _endTime = new Date() * 1;
                var _pw = this.getWin.w() / 6;
                var _index = this._index;
                var _len = this.len;
                if (_endTime - this.startTime > 50 && Math.abs(this.offX) > _pw) {
                    _index = this.offX > _pw ? (_index == 0 ? 0 : --_index) : (_index >= _len - 1 ? _len - 1 : ++_index);
                    this._index = _index;
                    this.goTransform(_index);
                } else {
                    this.goTransform(_index);
                }
            }
            this.isRun = false;
        },
        resize: function () {
            this.getWin.w();
            this.getWin.h();
            this.initPage(this._index);
            this.initStyle();
        },
        goTransform: function (n) {
            var _w = -n * this.getWin.w();
            this.loadImg(n);
            this.pageCur.innerText = n + 1;
            this.setTransform(_w);
        },
        loadImg: function (n) {
            var _o = this._list.querySelectorAll('span')[n];
            var _img = _o.querySelector('img');
            var _dataSrc = 'data-src'
            if (_img.getAttribute(_dataSrc)) {
                _img.setAttribute('src', _img.getAttribute(_dataSrc));
                _img.removeAttribute(_dataSrc);
                _o.style.background = 'none';
            }
        },
        initPage: function (n) {
            this.loadImg(n);
            this._list.style.webkitTransition = 'none';
            this._list.style.webkitTransform = 'translate3d(' + -(n * this.getWin.w()) + 'px,0,0)';
        },
        setTransform: function (_x, ts) {
            this._list.style.webkitTransition = ts == 0 ? 'none' : 'all .5s';
            this._list.style.webkitTransform = 'translate3d(' + (_x ? _x : 0) + 'px,0,0)';
        },
        getTransform: function (o) {
            return win.getComputedStyle(o)['webkitTransform'].split(',')[4];
        },
        createContent: function () {
            _layer++;
            var _header = '<div class="pic_head">(<span class="pageCur">' + (this._index + 1) + '</span>/<span class="pageSize">' + this.$el.querySelectorAll(this.opt.item).length + '</span>)</div>';
            var _content = '<div class="picContent">\
								<div class="picList"></div>\
							</div>';
            this.getElement('body').insertAdjacentHTML('beforeEnd', '<div id="pic_wrap' + _layer + '" class="pic_wrap">' + _header + _content + '</div>');

            var _topHead = doc.querySelector('head');
            if (!_topHead.querySelector('#picStyle')) {
                var style = '<style id="picStyle">\
								.pic_wrap {position:fixed; left:0; top:0; width:100%; height:100%; z-index: 1000; opacity: 0; -webkit-transition:all .5s; transition:all .5s; }\
								.pic_head { width:100%; height:25px; line-height:25px; background:#000; text-align: center; color:#fff;}\
								.isShow { opacity: 1;}\
								.picContent {position:relative; width:100%; height:100%; background:#000; overflow: hidden;}\
								.picList {position: absolute; left:0; top:0; width:100%; height:100%;}\
								.picList .picItems {display: table-cell; vertical-align: middle; text-align: center; background:url(' + this.opt._imgSrc + ') no-repeat center center; background-size:16px 16px;}\
								.picList .picItems img {max-width: 100%; max-height: 100%; vertical-align: middle; }\
							</style>';
                _topHead.insertAdjacentHTML('beforeEnd', style);
            }

            var _wrap = this.getElement('#pic_wrap' + _layer);
            this._head = _wrap.querySelector('.pic_head');
            this._list = _wrap.querySelector('.picList');
            this.pageCur = _wrap.querySelector('.pageCur');
            this._wrap = _wrap;
            this._wrap.classList.add('isShow');
            this.initPic();
            this.bindUI();

            POP.eventMap.on('wrapClick', function () {
                this.destroy();
            }.bind(this));
        },
        initPic: function () {
            var _item = this.$el.querySelectorAll(this.opt.item);
            var _len = _item.length;
            if (_len) {

                var imgArr = [], _self = this;
                [].forEach.call(_item, function (item, i) {
                    if (item.getAttribute(_self.opt.dataSrc)) {
                        imgArr.push({
                            loadShow: 0,
                            src: item.getAttribute(_self.opt.dataSrc)
                        });
                    } else if (item.querySelector('img')) {
                        var _img = item.querySelector('img');
                        if (_img.getAttribute(_self.opt.dataSrc)) {
                            imgArr.push({
                                loadShow: 0,
                                src: _img.getAttribute(_self.opt.dataSrc)
                            });
                        } else {
                            imgArr.push({
                                loadShow: 1,
                                src: _img.getAttribute('src')
                            });
                        }
                    }
                });

                var _html = '';
                for (var i = 0; i < imgArr.length; i++) {
                    _html += '<span class="picItems"><img ' + (imgArr[i].loadShow ? "src" : "data-src") + '="' + imgArr[i].src + '"></span>';
                }

                this.len = _len;
                this._list.innerHTML = _html;

                this.initStyle();

            }
        },
        //初始化dom
        initStyle: function () {
            var _item = this._list.querySelectorAll('.picItems');
            var win = this.getWin;
            var _w = _item.length * win.w();
            this._list.style.width = _w + 'px';
            for (var i = 0; i < _item.length; i++) {
                _item[i].style.cssText = 'width:' + win.w() + 'px; height:' + parseInt(win.h() - this._head.offsetHeight) + 'px';
            }
        },
        getElement: function (o) {
            return typeof o === 'string' ? doc.querySelector(o) : o;
        },
        getWin: {
            w: function () {
                return win.innerWidth;
            },
            h: function () {
                return win.innerHeight;
            }
        }
    }

})(POP, window, document);
