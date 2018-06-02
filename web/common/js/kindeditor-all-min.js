/* KindEditor 4.1.11 (2016-03-31), Copyright (C) kindsoft.net, Licence: http://kindeditor.net/license.php */
!function (window, undefined) {
    function _isArray(e) {
        return e ? "[object Array]" === Object.prototype.toString.call(e) : !1
    }

    function _isFunction(e) {
        return e ? "[object Function]" === Object.prototype.toString.call(e) : !1
    }

    function _inArray(e, t) {
        for (var n = 0, i = t.length; i > n; n++) if (e === t[n]) return n;
        return -1
    }

    function _each(e, t) {
        if (_isArray(e)) for (var n = 0, i = e.length; i > n && t.call(e[n], n, e[n]) !== !1; n++) ; else for (var a in e) if (e.hasOwnProperty(a) && t.call(e[a], a, e[a]) === !1) break
    }

    function _trim(e) {
        return e.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "")
    }

    function _inString(e, t, n) {
        return n = n === undefined ? "," : n, (n + t + n).indexOf(n + e + n) >= 0
    }

    function _addUnit(e, t) {
        return t = t || "px", e && /^-?\d+(?:\.\d+)?$/.test(e) ? e + t : e
    }

    function _removeUnit(e) {
        var t;
        return e && (t = /(\d+)/.exec(e)) ? parseInt(t[1], 10) : 0
    }

    function _escape(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }

    function _unescape(e) {
        return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    }

    function _toCamel(e) {
        var t = e.split("-");
        return e = "", _each(t, function (t, n) {
            e += t > 0 ? n.charAt(0).toUpperCase() + n.substr(1) : n
        }), e
    }

    function _toHex(e) {
        function t(e) {
            var t = parseInt(e, 10).toString(16).toUpperCase();
            return t.length > 1 ? t : "0" + t
        }

        return e.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi, function (e, n, i, a) {
            return "#" + t(n) + t(i) + t(a)
        })
    }

    function _toMap(e, t) {
        t = t === undefined ? "," : t;
        var n, i = {}, a = _isArray(e) ? e : e.split(t);
        return _each(a, function (e, t) {
            if (n = /^(\d+)\.\.(\d+)$/.exec(t)) for (var a = parseInt(n[1], 10); a <= parseInt(n[2], 10); a++) i[a.toString()] = !0; else i[t] = !0
        }), i
    }

    function _toArray(e, t) {
        return Array.prototype.slice.call(e, t || 0)
    }

    function _undef(e, t) {
        return e === undefined ? t : e
    }

    function _invalidUrl(e) {
        return !e || /[<>"]/.test(e)
    }

    function _addParam(e, t) {
        return e.indexOf("?") >= 0 ? e + "&" + t : e + "?" + t
    }

    function _extend(e, t, n) {
        n || (n = t, t = null);
        var i;
        if (t) {
            var a = function () {
            };
            a.prototype = t.prototype, i = new a, _each(n, function (e, t) {
                i[e] = t
            })
        } else i = n;
        i.constructor = e, e.prototype = i, e.parent = t ? t.prototype : null
    }

    function _json(text) {
        var match;
        (match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text)) && (text = match[0]);
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return eval("(" + text + ")");
        throw"JSON parse error"
    }

    function _getBasePath() {
        for (var e, t = document.getElementsByTagName("script"), n = 0, i = t.length; i > n; n++) if (e = t[n].src || "", /kindeditor[\w\-\.]*\.js/.test(e)) return e.substring(0, e.lastIndexOf("/") + 1);
        return ""
    }

    function _bindEvent(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, _useCapture) : e.attachEvent && e.attachEvent("on" + t, n)
    }

    function _unbindEvent(e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, _useCapture) : e.detachEvent && e.detachEvent("on" + t, n)
    }

    function KEvent(e, t) {
        this.init(e, t)
    }

    function _getId(e) {
        return e[_eventExpendo] || null
    }

    function _setId(e) {
        return e[_eventExpendo] = ++_eventId, _eventId
    }

    function _removeId(e) {
        try {
            delete e[_eventExpendo]
        } catch (t) {
            e.removeAttribute && e.removeAttribute(_eventExpendo)
        }
    }

    function _bind(e, t, n) {
        if (t.indexOf(",") >= 0) return void _each(t.split(","), function () {
            _bind(e, this, n)
        });
        var i = _getId(e);
        i || (i = _setId(e)), _eventData[i] === undefined && (_eventData[i] = {});
        var a = _eventData[i][t];
        a && a.length > 0 ? _unbindEvent(e, t, a[0]) : (_eventData[i][t] = [], _eventData[i].el = e), a = _eventData[i][t], 0 === a.length && (a[0] = function (t) {
            var n = t ? new KEvent(e, t) : undefined;
            _each(a, function (t, i) {
                t > 0 && i && i.call(e, n)
            })
        }), _inArray(n, a) < 0 && a.push(n), _bindEvent(e, t, a[0])
    }

    function _unbind(e, t, n) {
        if (t && t.indexOf(",") >= 0) return void _each(t.split(","), function () {
            _unbind(e, this, n)
        });
        var i = _getId(e);
        if (i) {
            if (t === undefined) return void(i in _eventData && (_each(_eventData[i], function (t, n) {
                "el" != t && n.length > 0 && _unbindEvent(e, t, n[0])
            }), delete _eventData[i], _removeId(e)));
            if (_eventData[i]) {
                var a = _eventData[i][t];
                if (a && a.length > 0) {
                    n === undefined ? (_unbindEvent(e, t, a[0]), delete _eventData[i][t]) : (_each(a, function (e, t) {
                        e > 0 && t === n && a.splice(e, 1)
                    }), 1 == a.length && (_unbindEvent(e, t, a[0]), delete _eventData[i][t]));
                    var o = 0;
                    _each(_eventData[i], function () {
                        o++
                    }), 2 > o && (delete _eventData[i], _removeId(e))
                }
            }
        }
    }

    function _fire(e, t) {
        if (t.indexOf(",") >= 0) return void _each(t.split(","), function () {
            _fire(e, this)
        });
        var n = _getId(e);
        if (n) {
            var i = _eventData[n][t];
            _eventData[n] && i && i.length > 0 && i[0]()
        }
    }

    function _ctrl(e, t, n) {
        t = /^\d{2,}$/.test(t) ? t : t.toUpperCase().charCodeAt(0), _bind(e, "keydown", function (i) {
            !i.ctrlKey || i.which != t || i.shiftKey || i.altKey || (n.call(e), i.stop())
        })
    }

    function _ready(e) {
        function t() {
            a || (a = !0, e(KindEditor), _readyFinished = !0)
        }

        function n() {
            if (!a) {
                try {
                    document.documentElement.doScroll("left")
                } catch (e) {
                    return void setTimeout(n, 100)
                }
                t()
            }
        }

        function i() {
            "complete" === document.readyState && t()
        }

        if (_readyFinished) return void e(KindEditor);
        var a = !1;
        if (document.addEventListener) _bind(document, "DOMContentLoaded", t); else if (document.attachEvent) {
            _bind(document, "readystatechange", i);
            var o = !1;
            try {
                o = null == window.frameElement
            } catch (r) {
            }
            document.documentElement.doScroll && o && n()
        }
        _bind(window, "load", t)
    }

    function _getCssList(e) {
        for (var t, n = {}, i = /\s*([\w\-]+)\s*:([^;]*)(;|$)/g; t = i.exec(e);) {
            var a = _trim(t[1].toLowerCase()), o = _trim(_toHex(t[2]));
            n[a] = o
        }
        return n
    }

    function _getAttrList(e) {
        for (var t, n = {}, i = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([^\s"'<>]+))|(?:([\w\-:"]+)="([^"]*)")|(?:([\w\-:"]+)='([^']*)'))(?=(?:\s|\/|>)+)/g; t = i.exec(e);) {
            var a = (t[1] || t[2] || t[4] || t[6]).toLowerCase(), o = (t[2] ? t[3] : t[4] ? t[5] : t[7]) || "";
            n[a] = o
        }
        return n
    }

    function _addClassToTag(e, t) {
        return e = /\s+class\s*=/.test(e) ? e.replace(/(\s+class=["']?)([^"']*)(["']?[\s>])/, function (e, n, i, a) {
            return (" " + i + " ").indexOf(" " + t + " ") < 0 ? "" === i ? n + t + a : n + i + " " + t + a : e
        }) : e.substr(0, e.length - 1) + ' class="' + t + '">'
    }

    function _formatCss(e) {
        var t = "";
        return _each(_getCssList(e), function (e, n) {
            t += e + ":" + n + ";"
        }), t
    }

    function _formatUrl(e, t, n, i) {
        function a(e) {
            for (var t = e.split("/"), n = [], i = 0, a = t.length; a > i; i++) {
                var o = t[i];
                ".." == o ? n.length > 0 && n.pop() : "" !== o && "." != o && n.push(o)
            }
            return "/" + n.join("/")
        }

        function o(t, n) {
            if (e.substr(0, t.length) === t) {
                for (var a = [], r = 0; n > r; r++) a.push("..");
                var s = ".";
                return a.length > 0 && (s += "/" + a.join("/")), "/" == i && (s += "/"), s + e.substr(t.length)
            }
            return (l = /^(.*)\//.exec(t)) ? o(l[1], ++n) : void 0
        }

        if (t = _undef(t, "").toLowerCase(), "data:" != e.substr(0, 5) && (e = e.replace(/([^:])\/\//g, "$1/")), _inArray(t, ["absolute", "relative", "domain"]) < 0) return e;
        if (n = n || location.protocol + "//" + location.host, i === undefined) {
            var r = location.pathname.match(/^(\/.*)\//);
            i = r ? r[1] : ""
        }
        var l;
        if (l = /^(\w+:\/\/[^\/]*)/.exec(e)) {
            if (l[1] !== n) return e
        } else if (/^\w+:/.test(e)) return e;
        return /^\//.test(e) ? e = n + a(e.substr(1)) : /^\w+:\/\//.test(e) || (e = n + a(i + "/" + e)), "relative" === t ? e = o(n + i, 0).substr(2) : "absolute" === t && e.substr(0, n.length) === n && (e = e.substr(n.length)), e
    }

    function _formatHtml(e, t, n, i, a) {
        null == e && (e = ""), n = n || "", i = _undef(i, !1), a = _undef(a, "	");
        var o = "xx-small,x-small,small,medium,large,x-large,xx-large".split(",");
        e = e.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/gi, function (e, t, n, i) {
            return t + n.replace(/<(?:br|br\s[^>]*)>/gi, "\n") + i
        }), e = e.replace(/<(?:br|br\s[^>]*)\s*\/?>\s*<\/p>/gi, "</p>"), e = e.replace(/(<(?:p|p\s[^>]*)>)\s*(<\/p>)/gi, "$1<br />$2"), e = e.replace(/\u200B/g, ""), e = e.replace(/\u00A9/g, "&copy;"), e = e.replace(/\u00AE/g, "&reg;"), e = e.replace(/\u2003/g, "&emsp;"), e = e.replace(/\u3000/g, "&emsp;"), e = e.replace(/<[^>]+/g, function (e) {
            return e.replace(/\s+/g, " ")
        });
        var r = {};
        t && (_each(t, function (e, t) {
            for (var n = e.split(","), i = 0, a = n.length; a > i; i++) r[n[i]] = _toMap(t)
        }), r.script || (e = e.replace(/(<(?:script|script\s[^>]*)>)([\s\S]*?)(<\/script>)/gi, "")), r.style || (e = e.replace(/(<(?:style|style\s[^>]*)>)([\s\S]*?)(<\/style>)/gi, "")));
        var l = /(\s*)<(\/)?([\w\-:]+)((?:\s+|(?:\s+[\w\-:]+)|(?:\s+[\w\-:]+=[^\s"'<>]+)|(?:\s+[\w\-:"]+="[^"]*")|(?:\s+[\w\-:"]+='[^']*'))*)(\/)?>(\s*)/g,
            s = [];
        return e = e.replace(l, function (e, l, d, c, u, p, h) {
            var f = e, m = l || "", g = d || "", v = c.toLowerCase(), _ = u || "", b = p ? " " + p : "", y = h || "";
            if (t && !r[v]) return "";
            if ("" === b && _SINGLE_TAG_MAP[v] && (b = " /"), _INLINE_TAG_MAP[v] && (m && (m = " "), y && (y = " ")), _PRE_TAG_MAP[v] && (g ? y = "\n" : m = "\n"), i && "br" == v && (y = "\n"), _BLOCK_TAG_MAP[v] && !_PRE_TAG_MAP[v]) if (i) {
                g && s.length > 0 && s[s.length - 1] === v ? s.pop() : s.push(v), m = "\n", y = "\n";
                for (var k = 0, w = g ? s.length : s.length - 1; w > k; k++) m += a, g || (y += a);
                b ? s.pop() : g || (y += a)
            } else m = y = "";
            if ("" !== _) {
                var S = _getAttrList(f);
                if ("font" === v) {
                    var E = {}, C = "";
                    _each(S, function (e, t) {
                        "color" === e && (E.color = t, delete S[e]), "size" === e && (E["font-size"] = o[parseInt(t, 10) - 1] || "", delete S[e]), "face" === e && (E["font-family"] = t, delete S[e]), "style" === e && (C = t)
                    }), C && !/;$/.test(C) && (C += ";"), _each(E, function (e, t) {
                        "" !== t && (/\s/.test(t) && (t = "'" + t + "'"), C += e + ":" + t + ";")
                    }), S.style = C
                }
                _each(S, function (e, i) {
                    if (_FILL_ATTR_MAP[e] && (S[e] = e), _inArray(e, ["src", "href"]) >= 0 && (S[e] = _formatUrl(i, n)), (t && "style" !== e && !r[v]["*"] && !r[v][e] || "body" === v && "contenteditable" === e || /^kindeditor_\d+$/.test(e)) && delete S[e], "style" === e && "" !== i) {
                        var a = _getCssList(i);
                        _each(a, function (e, n) {
                            !t || r[v].style || r[v]["." + e] || delete a[e]
                        });
                        var o = "";
                        _each(a, function (e, t) {
                            o += e + ":" + t + ";"
                        }), S.style = o
                    }
                }), _ = "", _each(S, function (e, t) {
                    ("style" !== e || "" !== t) && (t = t.replace(/"/g, "&quot;"), _ += " " + e + '="' + t + '"')
                })
            }
            return "font" === v && (v = "span"), m + "<" + g + v + _ + b + ">" + y
        }), e = e.replace(/(<(?:pre|pre\s[^>]*)>)([\s\S]*?)(<\/pre>)/gi, function (e, t, n, i) {
            return t + n.replace(/\n/g, '<span id="__kindeditor_pre_newline__">\n') + i
        }), e = e.replace(/\n\s*\n/g, "\n"), e = e.replace(/<span id="__kindeditor_pre_newline__">\n/g, "\n"), _trim(e)
    }

    function _clearMsWord(e, t) {
        return e = e.replace(/<meta[\s\S]*?>/gi, "").replace(/<![\s\S]*?>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<w:[^>]+>[\s\S]*?<\/w:[^>]+>/gi, "").replace(/<o:[^>]+>[\s\S]*?<\/o:[^>]+>/gi, "").replace(/<xml>[\s\S]*?<\/xml>/gi, "").replace(/<(?:table|td)[^>]*>/gi, function (e) {
            return e.replace(/border-bottom:([#\w\s]+)/gi, "border:$1")
        }), _formatHtml(e, t)
    }

    function _mediaType(e) {
        return /\.(rm|rmvb)(\?|$)/i.test(e) ? "audio/x-pn-realaudio-plugin" : /\.(swf|flv)(\?|$)/i.test(e) ? "application/x-shockwave-flash" : "video/x-ms-asf-plugin"
    }

    function _mediaClass(e) {
        return /realaudio/i.test(e) ? "ke-rm" : /flash/i.test(e) ? "ke-flash" : "ke-media"
    }

    function _mediaAttrs(e) {
        return _getAttrList(unescape(e))
    }

    function _mediaEmbed(e) {
        var t = "<embed ";
        return _each(e, function (e, n) {
            t += e + '="' + n + '" '
        }), t += "/>"
    }

    function _mediaImg(e, t) {
        var n = t.width, i = t.height, a = t.type || _mediaType(t.src), o = _mediaEmbed(t), r = "";
        /\D/.test(n) ? r += "width:" + n + ";" : n > 0 && (r += "width:" + n + "px;"), /\D/.test(i) ? r += "height:" + i + ";" : i > 0 && (r += "height:" + i + "px;");
        var l = '<img class="' + _mediaClass(a) + '" src="' + e + '" ';
        return "" !== r && (l += 'style="' + r + '" '), l += 'data-ke-tag="' + escape(o) + '" alt="" />'
    }

    function _tmpl(e, t) {
        var n = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return t ? n(t) : n
    }

    function _contains(e, t) {
        if (9 == e.nodeType && 9 != t.nodeType) return !0;
        for (; t = t.parentNode;) if (t == e) return !0;
        return !1
    }

    function _getAttr(e, t) {
        t = t.toLowerCase();
        var n = null;
        if (_GET_SET_ATTRIBUTE || "script" == e.nodeName.toLowerCase()) try {
            n = e.getAttribute(t, 2)
        } catch (i) {
            n = e.getAttribute(t, 1)
        } else {
            var a = e.ownerDocument.createElement("div");
            a.appendChild(e.cloneNode(!1));
            var o = _getAttrList(_unescape(a.innerHTML));
            t in o && (n = o[t])
        }
        return "style" === t && null !== n && (n = _formatCss(n)), n
    }

    function _queryAll(e, t) {
        function n(e) {
            return "string" != typeof e ? e : e.replace(/([^\w\-])/g, "\\$1")
        }

        function i(e) {
            return e.replace(/\\/g, "")
        }

        function a(e, t) {
            return "*" === e || e.toLowerCase() === n(t.toLowerCase())
        }

        function o(e, t, n) {
            var o = [], r = n.ownerDocument || n, l = r.getElementById(i(e));
            return l && a(t, l.nodeName) && _contains(n, l) && o.push(l), o
        }

        function r(e, t, n) {
            var o, r, l, s, d = n.ownerDocument || n, c = [];
            if (n.getElementsByClassName) for (o = n.getElementsByClassName(i(e)), r = 0, l = o.length; l > r; r++) s = o[r], a(t, s.nodeName) && c.push(s); else if (d.querySelectorAll) for (o = d.querySelectorAll(("#document" !== n.nodeName ? n.nodeName + " " : "") + t + "." + e), r = 0, l = o.length; l > r; r++) s = o[r], _contains(n, s) && c.push(s); else for (o = n.getElementsByTagName(t), e = " " + e + " ", r = 0, l = o.length; l > r; r++) if (s = o[r], 1 == s.nodeType) {
                var u = s.className;
                u && (" " + u + " ").indexOf(e) > -1 && c.push(s)
            }
            return c
        }

        function l(e, t, n) {
            for (var o, r = [], l = n.ownerDocument || n, s = l.getElementsByName(i(e)), d = 0, c = s.length; c > d; d++) o = s[d], a(t, o.nodeName) && _contains(n, o) && null !== o.getAttribute("name") && r.push(o);
            return r
        }

        function s(e, t, i, a) {
            for (var o, r = [], l = a.getElementsByTagName(i), s = 0, d = l.length; d > s; s++) o = l[s], 1 == o.nodeType && (null === t ? null !== _getAttr(o, e) && r.push(o) : t === n(_getAttr(o, e)) && r.push(o));
            return r
        }

        function d(e, t) {
            var n, i = [];
            n = /^((?:\\.|[^.#\s\[<>])+)/.exec(e);
            var a = n ? n[1] : "*";
            if (n = /#((?:[\w\-]|\\.)+)$/.exec(e)) i = o(n[1], a, t); else if (n = /\.((?:[\w\-]|\\.)+)$/.exec(e)) i = r(n[1], a, t); else if (n = /\[((?:[\w\-]|\\.)+)\]/.exec(e)) i = s(n[1].toLowerCase(), null, a, t); else if (n = /\[((?:[\w\-]|\\.)+)\s*=\s*['"]?((?:\\.|[^'"]+)+)['"]?\]/.exec(e)) {
                var d = n[1].toLowerCase(), c = n[2];
                i = "id" === d ? o(c, a, t) : "class" === d ? r(c, a, t) : "name" === d ? l(c, a, t) : s(d, c, a, t)
            } else for (var u, p = t.getElementsByTagName(a), h = 0, f = p.length; f > h; h++) u = p[h], 1 == u.nodeType && i.push(u);
            return i
        }

        var c = e.split(",");
        if (c.length > 1) {
            var u = [];
            return _each(c, function () {
                _each(_queryAll(this, t), function () {
                    _inArray(this, u) < 0 && u.push(this)
                })
            }), u
        }
        t = t || document;
        for (var p, h = [], f = /((?:\\.|[^\s>])+|[\s>])/g; p = f.exec(e);) " " !== p[1] && h.push(p[1]);
        var m = [];
        if (1 == h.length) return d(h[0], t);
        var g, v, _, b, y, k, w, S, E, C, x = !1;
        for (k = 0, lenth = h.length; k < lenth; k++) if (g = h[k], ">" !== g) {
            if (k > 0) {
                for (v = [], w = 0, E = m.length; E > w; w++) for (b = m[w], _ = d(g, b), S = 0, C = _.length; C > S; S++) y = _[S], x ? b === y.parentNode && v.push(y) : v.push(y);
                m = v
            } else m = d(g, t);
            if (0 === m.length) return []
        } else x = !0;
        return m
    }

    function _query(e, t) {
        var n = _queryAll(e, t);
        return n.length > 0 ? n[0] : null
    }

    function _get(e) {
        return K(e)[0]
    }

    function _getDoc(e) {
        return e ? e.ownerDocument || e.document || e : document
    }

    function _getWin(e) {
        if (!e) return window;
        var t = _getDoc(e);
        return t.parentWindow || t.defaultView
    }

    function _setHtml(e, t) {
        if (1 == e.nodeType) {
            var n = _getDoc(e);
            try {
                e.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + t;
                var i = n.getElementById("__kindeditor_temp_tag__");
                i.parentNode.removeChild(i)
            } catch (a) {
                K(e).empty(), K("@" + t, n).each(function () {
                    e.appendChild(this)
                })
            }
        }
    }

    function _hasClass(e, t) {
        return _inString(t, e.className, " ")
    }

    function _setAttr(e, t, n) {
        _IE && 8 > _V && "class" == t.toLowerCase() && (t = "className"), e.setAttribute(t, "" + n)
    }

    function _removeAttr(e, t) {
        _IE && 8 > _V && "class" == t.toLowerCase() && (t = "className"), _setAttr(e, t, ""), e.removeAttribute(t)
    }

    function _getNodeName(e) {
        return e && e.nodeName ? e.nodeName.toLowerCase() : ""
    }

    function _computedCss(e, t) {
        var n = _getWin(e), i = _toCamel(t), a = "";
        if (n.getComputedStyle) {
            var o = n.getComputedStyle(e, null);
            a = o[i] || o.getPropertyValue(t) || e.style[i]
        } else e.currentStyle && (a = e.currentStyle[i] || e.style[i]);
        return a
    }

    function _hasVal(e) {
        return !!_VALUE_TAG_MAP[_getNodeName(e)]
    }

    function _docElement(e) {
        return e = e || document, _QUIRKS ? e.body : e.documentElement
    }

    function _docHeight(e) {
        var t = _docElement(e);
        return Math.max(t.scrollHeight, t.clientHeight)
    }

    function _docWidth(e) {
        var t = _docElement(e);
        return Math.max(t.scrollWidth, t.clientWidth)
    }

    function _getScrollPos(e) {
        e = e || document;
        var t, n;
        return _IE || _NEWIE || _OPERA ? (t = _docElement(e).scrollLeft, n = _docElement(e).scrollTop) : (t = _getWin(e).scrollX, n = _getWin(e).scrollY), {
            x: t,
            y: n
        }
    }

    function KNode(e) {
        this.init(e)
    }

    function _updateCollapsed(e) {
        return e.collapsed = e.startContainer === e.endContainer && e.startOffset === e.endOffset, e
    }

    function _copyAndDelete(e, t, n) {
        function i(i, a, o) {
            var r, s = i.nodeValue.length;
            if (t) {
                var d = i.cloneNode(!0);
                r = a > 0 ? d.splitText(a) : d, s > o && r.splitText(o - a)
            }
            if (n) {
                var c = i;
                if (a > 0 && (c = i.splitText(a), e.setStart(i, a)), s > o) {
                    var u = c.splitText(o - a);
                    e.setEnd(u, 0)
                }
                l.push(c)
            }
            return r
        }

        function a() {
            n && e.up().collapse(!0);
            for (var t = 0, i = l.length; i > t; t++) {
                var a = l[t];
                a.parentNode && a.parentNode.removeChild(a)
            }
        }

        function o(a, h) {
            for (var f, m = a.firstChild; m;) {
                var g = new KRange(r).selectNode(m);
                if (d = g.compareBoundaryPoints(_START_TO_END, e), d >= 0 && 0 >= c && (c = g.compareBoundaryPoints(_START_TO_START, e)), c >= 0 && 0 >= u && (u = g.compareBoundaryPoints(_END_TO_END, e)), u >= 0 && 0 >= p && (p = g.compareBoundaryPoints(_END_TO_START, e)), p >= 0) return !1;
                if (f = m.nextSibling, d > 0) if (1 == m.nodeType) if (c >= 0 && 0 >= u) t && h.appendChild(m.cloneNode(!0)), n && l.push(m); else {
                    var v;
                    if (t && (v = m.cloneNode(!1), h.appendChild(v)), o(m, v) === !1) return !1
                } else if (3 == m.nodeType) {
                    var _;
                    if (_ = m == s.startContainer ? i(m, s.startOffset, m.nodeValue.length) : m == s.endContainer ? i(m, 0, s.endOffset) : i(m, 0, m.nodeValue.length), t) try {
                        h.appendChild(_)
                    } catch (b) {
                    }
                }
                m = f
            }
        }

        var r = e.doc, l = [], s = e.cloneRange().down(), d = -1, c = -1, u = -1, p = -1, h = e.commonAncestor(),
            f = r.createDocumentFragment();
        if (3 == h.nodeType) {
            var m = i(h, e.startOffset, e.endOffset);
            return t && f.appendChild(m), a(), t ? f : e
        }
        o(h, f), n && e.up().collapse(!0);
        for (var g = 0, v = l.length; v > g; g++) {
            var _ = l[g];
            _.parentNode && _.parentNode.removeChild(_)
        }
        return t ? f : e
    }

    function _moveToElementText(e, t) {
        for (var n = t; n;) {
            var i = K(n);
            if ("marquee" == i.name || "select" == i.name) return;
            n = n.parentNode
        }
        try {
            e.moveToElementText(t)
        } catch (a) {
        }
    }

    function _getStartEnd(e, t) {
        var n = e.parentElement().ownerDocument, i = e.duplicate();
        i.collapse(t);
        var a = i.parentElement(), o = a.childNodes;
        if (0 === o.length) return {node: a.parentNode, offset: K(a).index()};
        var r = n, l = 0, s = -1, d = e.duplicate();
        _moveToElementText(d, a);
        for (var c = 0, u = o.length; u > c; c++) {
            var p = o[c];
            if (s = d.compareEndPoints("StartToStart", i), 0 === s) return {node: p.parentNode, offset: c};
            if (1 == p.nodeType) {
                var h, f = e.duplicate(), m = K(p), g = p;
                m.isControl() && (h = n.createElement("span"), m.after(h), g = h, l += m.text().replace(/\r\n|\n|\r/g, "").length), _moveToElementText(f, g), d.setEndPoint("StartToEnd", f), s > 0 ? l += f.text.replace(/\r\n|\n|\r/g, "").length : l = 0, h && K(h).remove()
            } else 3 == p.nodeType && (d.moveStart("character", p.nodeValue.length), l += p.nodeValue.length);
            0 > s && (r = p)
        }
        if (0 > s && 1 == r.nodeType) return {node: a, offset: K(a.lastChild).index() + 1};
        if (s > 0) for (; r.nextSibling && 1 == r.nodeType;) r = r.nextSibling;
        if (d = e.duplicate(), _moveToElementText(d, a), d.setEndPoint("StartToEnd", i), l -= d.text.replace(/\r\n|\n|\r/g, "").length, s > 0 && 3 == r.nodeType) for (var v = r.previousSibling; v && 3 == v.nodeType;) l -= v.nodeValue.length, v = v.previousSibling;
        return {node: r, offset: l}
    }

    function _getEndRange(e, t) {
        var n = e.ownerDocument || e, i = n.body.createTextRange();
        if (n == e) return i.collapse(!0), i;
        if (1 == e.nodeType && e.childNodes.length > 0) {
            var a, o, r = e.childNodes;
            if (0 === t ? (o = r[0], a = !0) : (o = r[t - 1], a = !1), !o) return i;
            if ("head" === K(o).name) return 1 === t && (a = !0), 2 === t && (a = !1), i.collapse(a), i;
            if (1 == o.nodeType) {
                var l, s = K(o);
                return s.isControl() && (l = n.createElement("span"), a ? s.before(l) : s.after(l), o = l), _moveToElementText(i, o), i.collapse(a), l && K(l).remove(), i
            }
            e = o, t = a ? 0 : o.nodeValue.length
        }
        var d = n.createElement("span");
        return K(e).before(d), _moveToElementText(i, d), i.moveStart("character", t), K(d).remove(), i
    }

    function _toRange(e) {
        function t(e) {
            "tr" == K(e.node).name && (e.node = e.node.cells[e.offset], e.offset = 0)
        }

        var n, i;
        if (_IERANGE) {
            if (e.item) return n = _getDoc(e.item(0)), i = new KRange(n), i.selectNode(e.item(0)), i;
            n = e.parentElement().ownerDocument;
            var a = _getStartEnd(e, !0), o = _getStartEnd(e, !1);
            return t(a), t(o), i = new KRange(n), i.setStart(a.node, a.offset), i.setEnd(o.node, o.offset), i
        }
        var r = e.startContainer;
        return n = r.ownerDocument || r, i = new KRange(n), i.setStart(r, e.startOffset), i.setEnd(e.endContainer, e.endOffset), i
    }

    function KRange(e) {
        this.init(e)
    }

    function _range(e) {
        return e.nodeName ? new KRange(e) : e.constructor === KRange ? e : _toRange(e)
    }

    function _nativeCommand(e, t, n) {
        try {
            e.execCommand(t, !1, n)
        } catch (i) {
        }
    }

    function _nativeCommandValue(e, t) {
        var n = "";
        try {
            n = e.queryCommandValue(t)
        } catch (i) {
        }
        return "string" != typeof n && (n = ""), n
    }

    function _getSel(e) {
        var t = _getWin(e);
        return _IERANGE ? e.selection : t.getSelection()
    }

    function _getRng(e) {
        var t, n = _getSel(e);
        try {
            t = n.rangeCount > 0 ? n.getRangeAt(0) : n.createRange()
        } catch (i) {
        }
        return !_IERANGE || t && (t.item || t.parentElement().ownerDocument === e) ? t : null
    }

    function _singleKeyMap(e) {
        var t, n, i = {};
        return _each(e, function (e, a) {
            t = e.split(",");
            for (var o = 0, r = t.length; r > o; o++) n = t[o], i[n] = a
        }), i
    }

    function _hasAttrOrCss(e, t) {
        return _hasAttrOrCssByKey(e, t, "*") || _hasAttrOrCssByKey(e, t)
    }

    function _hasAttrOrCssByKey(e, t, n) {
        if (n = n || e.name, 1 !== e.type) return !1;
        var i = _singleKeyMap(t);
        if (!i[n]) return !1;
        for (var a = i[n].split(","), o = 0, r = a.length; r > o; o++) {
            var l = a[o];
            if ("*" === l) return !0;
            var s = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(l), d = s[1] ? "css" : "attr";
            l = s[2];
            var c = s[3] || "";
            if ("" === c && "" !== e[d](l)) return !0;
            if ("" !== c && e[d](l) === c) return !0
        }
        return !1
    }

    function _removeAttrOrCss(e, t) {
        1 == e.type && (_removeAttrOrCssByKey(e, t, "*"), _removeAttrOrCssByKey(e, t))
    }

    function _removeAttrOrCssByKey(e, t, n) {
        if (n = n || e.name, 1 === e.type) {
            var i = _singleKeyMap(t);
            if (i[n]) {
                for (var a = i[n].split(","), o = !1, r = 0, l = a.length; l > r; r++) {
                    var s = a[r];
                    if ("*" === s) {
                        o = !0;
                        break
                    }
                    var d = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(s);
                    s = d[2], d[1] ? (s = _toCamel(s), e[0].style[s] && (e[0].style[s] = "")) : e.removeAttr(s)
                }
                o && e.remove(!0)
            }
        }
    }

    function _getInnerNode(e) {
        for (var t = e; t.first();) t = t.first();
        return t
    }

    function _isEmptyNode(e) {
        return 1 != e.type || e.isSingle() ? !1 : "" === e.html().replace(/<[^>]+>/g, "")
    }

    function _mergeWrapper(e, t) {
        e = e.clone(!0);
        for (var n = _getInnerNode(e), i = e, a = !1; t;) {
            for (; i;) i.name === t.name && (_mergeAttrs(i, t.attr(), t.css()), a = !0), i = i.first();
            a || n.append(t.clone(!1)), a = !1, t = t.first()
        }
        return e
    }

    function _wrapNode(e, t) {
        if (t = t.clone(!0), 3 == e.type) return _getInnerNode(t).append(e.clone(!1)), e.replaceWith(t), t;
        for (var n, i = e; (n = e.first()) && 1 == n.children().length;) e = n;
        n = e.first();
        for (var a = e.doc.createDocumentFragment(); n;) a.appendChild(n[0]), n = n.next();
        return t = _mergeWrapper(i, t), a.firstChild && _getInnerNode(t).append(a), i.replaceWith(t), t
    }

    function _mergeAttrs(e, t, n) {
        _each(t, function (t, n) {
            "style" !== t && e.attr(t, n)
        }), _each(n, function (t, n) {
            e.css(t, n)
        })
    }

    function _inPreElement(e) {
        for (; e && "body" != e.name;) {
            if (_PRE_TAG_MAP[e.name] || "div" == e.name && e.hasClass("ke-script")) return !0;
            e = e.parent()
        }
        return !1
    }

    function KCmd(e) {
        this.init(e)
    }

    function _cmd(e) {
        if (e.nodeName) {
            var t = _getDoc(e);
            e = _range(t).selectNodeContents(t.body).collapse(!1)
        }
        return new KCmd(e)
    }

    function _drag(e) {
        var t = e.moveEl, n = e.moveFn, i = e.clickEl || t, a = e.beforeDrag,
            o = e.iframeFix === undefined ? !0 : e.iframeFix, r = [document];
        o && K("iframe").each(function () {
            var e = _formatUrl(this.src || "", "absolute");
            if (!/^https?:\/\//.test(e)) {
                var t;
                try {
                    t = _iframeDoc(this)
                } catch (n) {
                }
                if (t) {
                    var i = K(this).pos();
                    K(t).data("pos-x", i.x), K(t).data("pos-y", i.y), r.push(t)
                }
            }
        }), i.mousedown(function (e) {
            function o(e) {
                e.preventDefault();
                var t = K(_getDoc(e.target)), a = _round((t.data("pos-x") || 0) + e.pageX - f),
                    o = _round((t.data("pos-y") || 0) + e.pageY - m);
                n.call(i, c, u, p, h, a, o)
            }

            function l(e) {
                e.preventDefault()
            }

            function s(e) {
                e.preventDefault(), K(r).unbind("mousemove", o).unbind("mouseup", s).unbind("selectstart", l), d.releaseCapture && d.releaseCapture()
            }

            if (0 === e.button || 1 === e.button) {
                e.stopPropagation();
                var d = i.get(), c = _removeUnit(t.css("left")), u = _removeUnit(t.css("top")), p = t.width(),
                    h = t.height(), f = e.pageX, m = e.pageY;
                a && a(), K(r).mousemove(o).mouseup(s).bind("selectstart", l), d.setCapture && d.setCapture()
            }
        })
    }

    function KWidget(e) {
        this.init(e)
    }

    function _widget(e) {
        return new KWidget(e)
    }

    function _iframeDoc(e) {
        return e = _get(e), e.contentDocument || e.contentWindow.document
    }

    function _getInitHtml(e, t, n, i) {
        var a = ["" === _direction ? "<html>" : '<html dir="' + _direction + '">', '<head><meta charset="utf-8" /><title></title>', "<style>", "html {margin:0;padding:0;}", "body {margin:0;padding:5px;}", 'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}', "body, p, div {word-wrap: break-word;}", "p {margin:5px 0;}", "table {border-collapse:collapse;}", "img {border:0;}", "noscript {display:none;}", "table.ke-zeroborder td {border:1px dotted #AAA;}", "img.ke-flash {", "	border:1px solid #AAA;", "	background-image:url(" + e + "common/flash.gif);", "	background-position:center center;", "	background-repeat:no-repeat;", "	width:100px;", "	height:100px;", "}", "img.ke-rm {", "	border:1px solid #AAA;", "	background-image:url(" + e + "common/rm.gif);", "	background-position:center center;", "	background-repeat:no-repeat;", "	width:100px;", "	height:100px;", "}", "img.ke-media {", "	border:1px solid #AAA;", "	background-image:url(" + e + "common/media.gif);", "	background-position:center center;", "	background-repeat:no-repeat;", "	width:100px;", "	height:100px;", "}", "img.ke-anchor {", "	border:1px dashed #666;", "	width:16px;", "	height:16px;", "}", ".ke-script, .ke-noscript, .ke-display-none {", "	display:none;", "	font-size:0;", "	width:0;", "	height:0;", "}", ".ke-pagebreak {", "	border:1px dotted #AAA;", "	font-size:0;", "	height:2px;", "}", "</style>"];
        return _isArray(n) || (n = [n]), _each(n, function (e, t) {
            t && a.push('<link href="' + t + '" rel="stylesheet" />')
        }), i && a.push("<style>" + i + "</style>"), a.push("</head><body " + (t ? 'class="' + t + '"' : "") + "></body></html>"), a.join("\n")
    }

    function _elementVal(e, t) {
        if (e.hasVal()) {
            if (t === undefined) {
                var n = e.val();
                return n = n.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/gi, "")
            }
            return e.val(t)
        }
        return e.html(t)
    }

    function KEdit(e) {
        this.init(e)
    }

    function _edit(e) {
        return new KEdit(e)
    }

    function _selectToolbar(e, t) {
        var n = this, i = n.get(e);
        if (i) {
            if (i.hasClass("ke-disabled")) return;
            t(i)
        }
    }

    function KToolbar(e) {
        this.init(e)
    }

    function _toolbar(e) {
        return new KToolbar(e)
    }

    function KMenu(e) {
        this.init(e)
    }

    function _menu(e) {
        return new KMenu(e)
    }

    function KColorPicker(e) {
        this.init(e)
    }

    function _colorpicker(e) {
        return new KColorPicker(e)
    }

    function KUploadButton(e) {
        this.init(e)
    }

    function _uploadbutton(e) {
        return new KUploadButton(e)
    }

    function _createButton(e) {
        e = e || {};
        var t = e.name || "", n = K('<span class="ke-button-common ke-button-outer" title="' + t + '"></span>'),
            i = K('<input class="ke-button-common ke-button" type="button" value="' + t + '" />');
        return e.click && i.click(e.click), n.append(i), n
    }

    function KDialog(e) {
        this.init(e)
    }

    function _dialog(e) {
        return new KDialog(e)
    }

    function _tabs(e) {
        var t = _widget(e), n = t.remove, i = e.afterSelect, a = t.div, o = [];
        a.addClass("ke-tabs").bind("contextmenu,mousedown,mousemove", function (e) {
            e.preventDefault()
        });
        var r = K('<ul class="ke-tabs-ul ke-clearfix"></ul>');
        return a.append(r), t.add = function (e) {
            var t = K('<li class="ke-tabs-li">' + e.title + "</li>");
            t.data("tab", e), o.push(t), r.append(t)
        }, t.selectedIndex = 0, t.select = function (e) {
            t.selectedIndex = e, _each(o, function (n, i) {
                i.unbind(), n === e ? (i.addClass("ke-tabs-li-selected"), K(i.data("tab").panel).show("")) : (i.removeClass("ke-tabs-li-selected").removeClass("ke-tabs-li-on").mouseover(function () {
                    K(this).addClass("ke-tabs-li-on")
                }).mouseout(function () {
                    K(this).removeClass("ke-tabs-li-on")
                }).click(function () {
                    t.select(n)
                }), K(i.data("tab").panel).hide())
            }), i && i.call(t, e)
        }, t.remove = function () {
            _each(o, function () {
                this.remove()
            }), r.remove(), n.call(t)
        }, t
    }

    function _loadScript(e, t) {
        var n = document.getElementsByTagName("head")[0] || (_QUIRKS ? document.body : document.documentElement),
            i = document.createElement("script");
        n.appendChild(i), i.src = e, i.charset = "utf-8", i.onload = i.onreadystatechange = function () {
            this.readyState && "loaded" !== this.readyState || (t && t(), i.onload = i.onreadystatechange = null, n.removeChild(i))
        }
    }

    function _chopQuery(e) {
        var t = e.indexOf("?");
        return t > 0 ? e.substr(0, t) : e
    }

    function _loadStyle(e) {
        for (var t = document.getElementsByTagName("head")[0] || (_QUIRKS ? document.body : document.documentElement), n = document.createElement("link"), i = _chopQuery(_formatUrl(e, "absolute")), a = K('link[rel="stylesheet"]', t), o = 0, r = a.length; r > o; o++) if (_chopQuery(_formatUrl(a[o].href, "absolute")) === i) return;
        t.appendChild(n), n.href = e, n.rel = "stylesheet"
    }

    function _ajax(e, t, n, i, a) {
        n = n || "GET", a = a || "json";
        var o = window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        if (o.open(n, e, !0), o.onreadystatechange = function () {
                if (4 == o.readyState && 200 == o.status && t) {
                    var e = _trim(o.responseText);
                    "json" == a && (e = _json(e)), t(e)
                }
            }, "POST" == n) {
            var r = [];
            _each(i, function (e, t) {
                r.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
            });
            try {
                o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            } catch (l) {
            }
            o.send(r.join("&"))
        } else o.send(null)
    }

    function _plugin(e, t) {
        return e === undefined ? _plugins : t ? void(_plugins[e] = t) : _plugins[e]
    }

    function _parseLangKey(e) {
        var t, n = "core";
        return (t = /^(\w+)\.(\w+)$/.exec(e)) && (n = t[1], e = t[2]), {ns: n, key: e}
    }

    function _lang(e, t) {
        if (t = t === undefined ? K.options.langType : t, "string" == typeof e) {
            if (!_language[t]) return "no language";
            var n = e.length - 1;
            if ("." === e.substr(n)) return _language[t][e.substr(0, n)];
            var i = _parseLangKey(e);
            return _language[t][i.ns][i.key]
        }
        _each(e, function (e, n) {
            var i = _parseLangKey(e);
            _language[t] || (_language[t] = {}), _language[t][i.ns] || (_language[t][i.ns] = {}), _language[t][i.ns][i.key] = n
        })
    }

    function _getImageFromRange(e, t) {
        if (!e.collapsed) {
            e = e.cloneRange().up();
            var n = e.startContainer, i = e.startOffset;
            if (_WEBKIT || e.isControl()) {
                var a = K(n.childNodes[i]);
                if (a && "img" == a.name) return t(a) ? a : void 0
            }
        }
    }

    function _bindContextmenuEvent() {
        var e = this, t = e.edit.doc;
        K(t).contextmenu(function (t) {
            if (e.menu && e.hideMenu(), !e.useContextmenu) return void t.preventDefault();
            if (0 !== e._contextmenus.length) {
                var n = 0, i = [];
                for (_each(e._contextmenus, function () {
                    return "-" == this.title ? void i.push(this) : void(this.cond && this.cond() && (i.push(this), this.width && this.width > n && (n = this.width)))
                }); i.length > 0 && "-" == i[0].title;) i.shift();
                for (; i.length > 0 && "-" == i[i.length - 1].title;) i.pop();
                var a = null;
                if (_each(i, function (e) {
                        "-" == this.title && "-" == a.title && delete i[e], a = this
                    }), i.length > 0) {
                    t.preventDefault();
                    var o = K(e.edit.iframe).pos(), r = _menu({
                        x: o.x + t.clientX,
                        y: o.y + t.clientY,
                        width: n,
                        css: {visibility: "hidden"},
                        shadowMode: e.shadowMode
                    });
                    _each(i, function () {
                        this.title && r.addItem(this)
                    });
                    var l = _docElement(r.doc), s = r.div.height();
                    t.clientY + s >= l.clientHeight - 100 && r.pos(r.x, _removeUnit(r.y) - s), r.div.css("visibility", "visible"), e.menu = r
                }
            }
        })
    }

    function _bindNewlineEvent() {
        function e(e) {
            for (var t = K(e.commonAncestor()); t && (1 != t.type || t.isStyle());) t = t.parent();
            return t.name
        }

        var t = this, n = t.edit.doc, i = t.newlineTag;
        if (!(_IE && "br" !== i || _GECKO && 3 > _V && "p" !== i || _OPERA && 9 > _V)) {
            var a = _toMap("h1,h2,h3,h4,h5,h6,pre,li"), o = _toMap("p,h1,h2,h3,h4,h5,h6,pre,li,blockquote");
            K(n).keydown(function (r) {
                if (!(13 != r.which || r.shiftKey || r.ctrlKey || r.altKey)) {
                    t.cmd.selection();
                    var l = e(t.cmd.range);
                    if ("marquee" != l && "select" != l) return "br" !== i || a[l] ? void(o[l] || _nativeCommand(n, "formatblock", "<p>")) : (r.preventDefault(), void t.insertHtml("<br />" + (_IE && 9 > _V ? "" : "鈥�")))
                }
            }), K(n).keyup(function (a) {
                if (!(13 != a.which || a.shiftKey || a.ctrlKey || a.altKey) && "br" != i) {
                    if (_GECKO) {
                        var r = t.cmd.commonAncestor("p"), l = t.cmd.commonAncestor("a");
                        return void(l && "" == l.text() && (l.remove(!0), t.cmd.range.selectNodeContents(r[0]).collapse(!0), t.cmd.select()))
                    }
                    t.cmd.selection();
                    var s = e(t.cmd.range);
                    if ("marquee" != s && "select" != s) {
                        o[s] || _nativeCommand(n, "formatblock", "<p>");
                        var d = t.cmd.commonAncestor("div");
                        if (d) {
                            for (var c = K("<p></p>"), u = d[0].firstChild; u;) {
                                var p = u.nextSibling;
                                c.append(u), u = p
                            }
                            d.before(c), d.remove(), t.cmd.range.selectNodeContents(c[0]), t.cmd.select()
                        }
                    }
                }
            })
        }
    }

    function _bindTabEvent() {
        var e = this, t = e.edit.doc;
        K(t).keydown(function (n) {
            if (9 == n.which) {
                if (n.preventDefault(), e.afterTab) return void e.afterTab.call(e, n);
                var i = e.cmd, a = i.range;
                a.shrink(), a.collapsed && 1 == a.startContainer.nodeType && (a.insertNode(K("@&nbsp;", t)[0]), i.select()), e.insertHtml("&nbsp;&nbsp;&nbsp;&nbsp;")
            }
        })
    }

    function _bindFocusEvent() {
        var e = this;
        K(e.edit.textarea[0], e.edit.win).focus(function (t) {
            e.afterFocus && e.afterFocus.call(e, t)
        }).blur(function (t) {
            e.afterBlur && e.afterBlur.call(e, t)
        })
    }

    function _removeBookmarkTag(e) {
        return _trim(e.replace(/<span [^>]*id="?__kindeditor_bookmark_\w+_\d+__"?[^>]*><\/span>/gi, ""))
    }

    function _removeTempTag(e) {
        return e.replace(/<div[^>]+class="?__kindeditor_paste__"?[^>]*>[\s\S]*?<\/div>/gi, "")
    }

    function _addBookmarkToStack(e, t) {
        if (0 === e.length) return void e.push(t);
        var n = e[e.length - 1];
        _removeBookmarkTag(t.html) !== _removeBookmarkTag(n.html) && e.push(t)
    }

    function _undoToRedo(e, t) {
        var n, i, a = this, o = a.edit, r = o.doc.body;
        if (0 === e.length) return a;
        o.designMode ? (n = a.cmd.range,
            i = n.createBookmark(!0), i.html = r.innerHTML) : i = {html: r.innerHTML}, _addBookmarkToStack(t, i);
        var l = e.pop();
        return _removeBookmarkTag(i.html) === _removeBookmarkTag(l.html) && e.length > 0 && (l = e.pop()), o.designMode ? (o.html(l.html), l.start && (n.moveToBookmark(l), a.select())) : K(r).html(_removeBookmarkTag(l.html)), a
    }

    function KEditor(e) {
        function t(e, t) {
            KEditor.prototype[e] === undefined && (n[e] = t), n.options[e] = t
        }

        var n = this;
        n.options = {}, _each(e, function (n, i) {
            t(n, e[n])
        }), _each(K.options, function (e, i) {
            n[e] === undefined && t(e, i)
        });
        var i = K(n.srcElement || "<textarea/>");
        n.width || (n.width = i[0].style.width || i.width()), n.height || (n.height = i[0].style.height || i.height()), t("width", _undef(n.width, n.minWidth)), t("height", _undef(n.height, n.minHeight)), t("width", _addUnit(n.width)), t("height", _addUnit(n.height)), n.srcElement = i, n.initContent = "", n.plugin = {}, n.isCreated = !1, n._handlers = {}, n._contextmenus = [], n._undoStack = [], n._redoStack = [], n._firstAddBookmark = !0, n.menu = n.contextmenu = null, n.dialogs = []
    }

    function _editor(e) {
        return new KEditor(e)
    }

    function _create(e, t) {
        function n(e) {
            return _each(_plugins, function (t, n) {
                _isFunction(n) && (n.call(e, KindEditor), e._pluginStatus || (e._pluginStatus = {}), e._pluginStatus[t] = "inited")
            }), e.create()
        }

        if (t = t || {}, t.basePath = _undef(t.basePath, K.basePath), t.themesPath = _undef(t.themesPath, t.basePath + "themes/"), t.langPath = _undef(t.langPath, t.basePath + "lang/"), t.pluginsPath = _undef(t.pluginsPath, t.basePath + "plugins/"), _undef(t.loadStyleMode, K.options.loadStyleMode)) {
            var i = _undef(t.themeType, K.options.themeType);
            _loadStyle(t.themesPath + "default/default.css"), _loadStyle(t.themesPath + i + "/" + i + ".css")
        }
        var a = K(e);
        if (a && 0 !== a.length) {
            if (a.length > 1) return a.each(function () {
                _create(this, t)
            }), _instances[0];
            t.srcElement = a[0];
            var o = new KEditor(t);
            return _instances.push(o), _language[o.langType] ? n(o) : (_loadScript(o.langPath + o.langType + ".js?ver=" + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function () {
                n(o)
            }), o)
        }
    }

    function _eachEditor(e, t) {
        K(e).each(function (e, n) {
            K.each(_instances, function (e, i) {
                return i && i.srcElement[0] == n ? (t.call(i, e), !1) : void 0
            })
        })
    }

    if (!window.KindEditor) {
        window.console || (window.console = {}), console.log || (console.log = function () {
        });
        var _VERSION = "4.1.11 (2016-03-31)", _ua = navigator.userAgent.toLowerCase(),
            _IE = _ua.indexOf("msie") > -1 && -1 == _ua.indexOf("opera"),
            _NEWIE = -1 == _ua.indexOf("msie") && _ua.indexOf("trident") > -1,
            _GECKO = _ua.indexOf("gecko") > -1 && -1 == _ua.indexOf("khtml"), _WEBKIT = _ua.indexOf("applewebkit") > -1,
            _OPERA = _ua.indexOf("opera") > -1, _MOBILE = _ua.indexOf("mobile") > -1,
            _IOS = /ipad|iphone|ipod/.test(_ua), _QUIRKS = "CSS1Compat" != document.compatMode,
            _IERANGE = !window.getSelection, _matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(_ua),
            _V = _matches ? _matches[1] : "0", _TIME = (new Date).getTime(), _round = Math.round, K = {
                DEBUG: !1,
                VERSION: _VERSION,
                IE: _IE,
                GECKO: _GECKO,
                WEBKIT: _WEBKIT,
                OPERA: _OPERA,
                V: _V,
                TIME: _TIME,
                each: _each,
                isArray: _isArray,
                isFunction: _isFunction,
                inArray: _inArray,
                inString: _inString,
                trim: _trim,
                addUnit: _addUnit,
                removeUnit: _removeUnit,
                escape: _escape,
                unescape: _unescape,
                toCamel: _toCamel,
                toHex: _toHex,
                toMap: _toMap,
                toArray: _toArray,
                undef: _undef,
                invalidUrl: _invalidUrl,
                addParam: _addParam,
                extend: _extend,
                json: _json
            },
            _INLINE_TAG_MAP = _toMap("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
            _BLOCK_TAG_MAP = _toMap("address,applet,blockquote,body,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul"),
            _SINGLE_TAG_MAP = _toMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
            _STYLE_TAG_MAP = _toMap("b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u"),
            _CONTROL_TAG_MAP = _toMap("img,table,input,textarea,button"), _PRE_TAG_MAP = _toMap("pre,style,script"),
            _NOSPLIT_TAG_MAP = _toMap("html,head,body,td,tr,table,ol,ul,li"),
            _AUTOCLOSE_TAG_MAP = _toMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
            _FILL_ATTR_MAP = _toMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
            _VALUE_TAG_MAP = _toMap("input,button,textarea,select");
        K.basePath = _getBasePath(), K.options = {
            designMode: !0,
            fullscreenMode: !1,
            filterMode: !0,
            wellFormatMode: !0,
            shadowMode: !0,
            loadStyleMode: !0,
            basePath: K.basePath,
            themesPath: K.basePath + "themes/",
            langPath: K.basePath + "lang/",
            pluginsPath: K.basePath + "plugins/",
            themeType: "default",
            langType: "zh-CN",
            urlType: "",
            newlineTag: "p",
            resizeType: 2,
            syncType: "form",
            pasteType: 2,
            dialogAlignType: "page",
            useContextmenu: !0,
            fullscreenShortcut: !1,
            bodyClass: "ke-content",
            indentChar: "	",
            cssPath: "",
            cssData: "",
            minWidth: 650,
            minHeight: 100,
            minChangeSize: 50,
            zIndex: 811213,
            items: ["source", "|", "undo", "redo", "|", "preview", "print", "template", "code", "cut", "copy", "paste", "plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "image", "multiimage", "flash", "media", "insertfile", "table", "hr", "emoticons", "baidumap", "pagebreak", "anchor", "link", "unlink", "|", "about"],
            noDisableItems: ["source", "fullscreen"],
            colorTable: [["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"], ["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"], ["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"], ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]],
            fontSizeTable: ["9px", "10px", "12px", "14px", "16px", "18px", "24px", "32px"],
            htmlTags: {
                font: ["id", "class", "color", "size", "face", ".background-color"],
                span: ["id", "class", ".color", ".background-color", ".font-size", ".font-family", ".background", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".line-height"],
                div: ["id", "class", "align", ".border", ".margin", ".padding", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".background", ".font-style", ".text-decoration", ".vertical-align", ".margin-left"],
                table: ["id", "class", "border", "cellspacing", "cellpadding", "width", "height", "align", "bordercolor", ".padding", ".margin", ".border", "bgcolor", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".font-style", ".text-decoration", ".background", ".width", ".height", ".border-collapse"],
                "td,th": ["id", "class", "align", "valign", "width", "height", "colspan", "rowspan", "bgcolor", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".background", ".border"],
                a: ["id", "class", "href", "target", "name"],
                embed: ["id", "class", "src", "width", "height", "type", "loop", "autostart", "quality", ".width", ".height", "align", "allowscriptaccess", "wmode"],
                img: ["id", "class", "src", "width", "height", "border", "alt", "title", "align", ".width", ".height", ".border"],
                "p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6": ["id", "class", "align", ".text-align", ".color", ".background-color", ".font-size", ".font-family", ".background", ".font-weight", ".font-style", ".text-decoration", ".vertical-align", ".text-indent", ".margin-left"],
                pre: ["id", "class"],
                hr: ["id", "class", ".page-break-after"],
                "br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del": ["id", "class"],
                iframe: ["id", "class", "src", "frameborder", "width", "height", ".width", ".height"]
            },
            layout: '<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'
        };
        var _useCapture = !1,
            _INPUT_KEY_MAP = _toMap("8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222"),
            _CURSORMOVE_KEY_MAP = _toMap("33..40"), _CHANGE_KEY_MAP = {};
        _each(_INPUT_KEY_MAP, function (e, t) {
            _CHANGE_KEY_MAP[e] = t
        }), _each(_CURSORMOVE_KEY_MAP, function (e, t) {
            _CHANGE_KEY_MAP[e] = t
        });
        var _EVENT_PROPS = "altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which".split(",");
        _extend(KEvent, {
            init: function (e, t) {
                var n = this, i = e.ownerDocument || e.document || e;
                if (n.event = t, _each(_EVENT_PROPS, function (e, i) {
                        n[i] = t[i]
                    }), n.target || (n.target = n.srcElement || i), 3 === n.target.nodeType && (n.target = n.target.parentNode), !n.relatedTarget && n.fromElement && (n.relatedTarget = n.fromElement === n.target ? n.toElement : n.fromElement), null == n.pageX && null != n.clientX) {
                    var a = i.documentElement, o = i.body;
                    n.pageX = n.clientX + (a && a.scrollLeft || o && o.scrollLeft || 0) - (a && a.clientLeft || o && o.clientLeft || 0), n.pageY = n.clientY + (a && a.scrollTop || o && o.scrollTop || 0) - (a && a.clientTop || o && o.clientTop || 0)
                }
                switch (!n.which && (n.charCode || 0 === n.charCode ? n.charCode : n.keyCode) && (n.which = n.charCode || n.keyCode), !n.metaKey && n.ctrlKey && (n.metaKey = n.ctrlKey), n.which || n.button === undefined || (n.which = 1 & n.button ? 1 : 2 & n.button ? 3 : 4 & n.button ? 2 : 0), n.which) {
                    case 186:
                        n.which = 59;
                        break;
                    case 187:
                    case 107:
                    case 43:
                        n.which = 61;
                        break;
                    case 189:
                    case 45:
                        n.which = 109;
                        break;
                    case 42:
                        n.which = 106;
                        break;
                    case 47:
                        n.which = 111;
                        break;
                    case 78:
                        n.which = 110
                }
                n.which >= 96 && n.which <= 105 && (n.which -= 48)
            }, preventDefault: function () {
                var e = this.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }, stopPropagation: function () {
                var e = this.event;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }, stop: function () {
                this.preventDefault(), this.stopPropagation()
            }
        });
        var _eventExpendo = "kindeditor_" + _TIME, _eventId = 0, _eventData = {}, _readyFinished = !1;
        window.attachEvent && window.attachEvent("onunload", function () {
            _each(_eventData, function (e, t) {
                t.el && _unbind(t.el)
            })
        }), K.ctrl = _ctrl, K.ready = _ready, K.formatUrl = _formatUrl, K.formatHtml = _formatHtml, K.getCssList = _getCssList, K.getAttrList = _getAttrList, K.mediaType = _mediaType, K.mediaAttrs = _mediaAttrs, K.mediaEmbed = _mediaEmbed, K.mediaImg = _mediaImg, K.clearMsWord = _clearMsWord, K.tmpl = _tmpl;
        var _getSetAttrDiv = document.createElement("div");
        _getSetAttrDiv.setAttribute("className", "t");
        var _GET_SET_ATTRIBUTE = "t" !== _getSetAttrDiv.className;
        K.query = _query, K.queryAll = _queryAll, _extend(KNode, {
            init: function (e) {
                var t = this;
                e = _isArray(e) ? e : [e];
                for (var n = 0, i = 0, a = e.length; a > i; i++) e[i] && (t[i] = e[i].constructor === KNode ? e[i][0] : e[i], n++);
                t.length = n, t.doc = _getDoc(t[0]), t.name = _getNodeName(t[0]), t.type = t.length > 0 ? t[0].nodeType : null, t.win = _getWin(t[0])
            }, each: function (e) {
                for (var t = this, n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t;
                return t
            }, bind: function (e, t) {
                return this.each(function () {
                    _bind(this, e, t)
                }), this
            }, unbind: function (e, t) {
                return this.each(function () {
                    _unbind(this, e, t)
                }), this
            }, fire: function (e) {
                return this.length < 1 ? this : (_fire(this[0], e), this)
            }, hasAttr: function (e) {
                return this.length < 1 ? !1 : !!_getAttr(this[0], e)
            }, attr: function (e, t) {
                var n = this;
                return e === undefined ? _getAttrList(n.outer()) : "object" == typeof e ? (_each(e, function (e, t) {
                    n.attr(e, t)
                }), n) : t === undefined ? (t = n.length < 1 ? null : _getAttr(n[0], e), null === t ? "" : t) : (n.each(function () {
                    _setAttr(this, e, t)
                }), n)
            }, removeAttr: function (e) {
                return this.each(function () {
                    _removeAttr(this, e)
                }), this
            }, get: function (e) {
                return this.length < 1 ? null : this[e || 0]
            }, eq: function (e) {
                return this.length < 1 ? null : this[e] ? new KNode(this[e]) : null
            }, hasClass: function (e) {
                return this.length < 1 ? !1 : _hasClass(this[0], e)
            }, addClass: function (e) {
                return this.each(function () {
                    _hasClass(this, e) || (this.className = _trim(this.className + " " + e))
                }), this
            }, removeClass: function (e) {
                return this.each(function () {
                    _hasClass(this, e) && (this.className = _trim(this.className.replace(new RegExp("(^|\\s)" + e + "(\\s|$)"), " ")))
                }), this
            }, html: function (e) {
                var t = this;
                return e === undefined ? t.length < 1 || 1 != t.type ? "" : _formatHtml(t[0].innerHTML) : (t.each(function () {
                    _setHtml(this, e)
                }), t)
            }, text: function () {
                var e = this;
                return e.length < 1 ? "" : _IE ? e[0].innerText : e[0].textContent
            }, hasVal: function () {
                return this.length < 1 ? !1 : _hasVal(this[0])
            }, val: function (e) {
                var t = this;
                return e === undefined ? t.length < 1 ? "" : t.hasVal() ? t[0].value : t.attr("value") : (t.each(function () {
                    _hasVal(this) ? this.value = e : _setAttr(this, "value", e)
                }), t)
            }, css: function (e, t) {
                var n = this;
                return e === undefined ? _getCssList(n.attr("style")) : "object" == typeof e ? (_each(e, function (e, t) {
                    n.css(e, t)
                }), n) : t === undefined ? n.length < 1 ? "" : n[0].style[_toCamel(e)] || _computedCss(n[0], e) || "" : (n.each(function () {
                    this.style[_toCamel(e)] = t
                }), n)
            }, width: function (e) {
                var t = this;
                return e === undefined ? t.length < 1 ? 0 : t[0].offsetWidth : t.css("width", _addUnit(e))
            }, height: function (e) {
                var t = this;
                return e === undefined ? t.length < 1 ? 0 : t[0].offsetHeight : t.css("height", _addUnit(e))
            }, opacity: function (e) {
                return this.each(function () {
                    this.style.opacity === undefined ? this.style.filter = 1 == e ? "" : "alpha(opacity=" + 100 * e + ")" : this.style.opacity = 1 == e ? "" : e
                }), this
            }, data: function (e, t) {
                var n = this;
                return e = "kindeditor_data_" + e, t === undefined ? n.length < 1 ? null : n[0][e] : (this.each(function () {
                    this[e] = t
                }), n)
            }, pos: function () {
                var e = this, t = e[0], n = 0, i = 0;
                if (t) if (t.getBoundingClientRect) {
                    var a = t.getBoundingClientRect(), o = _getScrollPos(e.doc);
                    n = a.left + o.x, i = a.top + o.y
                } else for (; t;) n += t.offsetLeft, i += t.offsetTop, t = t.offsetParent;
                return {x: _round(n), y: _round(i)}
            }, clone: function (e) {
                return new KNode(this.length < 1 ? [] : this[0].cloneNode(e))
            }, append: function (e) {
                return this.each(function () {
                    this.appendChild && this.appendChild(_get(e))
                }), this
            }, appendTo: function (e) {
                return this.each(function () {
                    _get(e).appendChild(this)
                }), this
            }, before: function (e) {
                return this.each(function () {
                    this.parentNode.insertBefore(_get(e), this)
                }), this
            }, after: function (e) {
                return this.each(function () {
                    this.nextSibling ? this.parentNode.insertBefore(_get(e), this.nextSibling) : this.parentNode.appendChild(_get(e))
                }), this
            }, replaceWith: function (e) {
                var t = [];
                return this.each(function (n, i) {
                    _unbind(i);
                    var a = _get(e);
                    i.parentNode.replaceChild(a, i), t.push(a)
                }), K(t)
            }, empty: function () {
                var e = this;
                return e.each(function (e, t) {
                    for (var n = t.firstChild; n;) {
                        if (!t.parentNode) return;
                        var i = n.nextSibling;
                        n.parentNode.removeChild(n), n = i
                    }
                }), e
            }, remove: function (e) {
                var t = this;
                return t.each(function (n, i) {
                    if (i.parentNode) {
                        if (_unbind(i), e) for (var a = i.firstChild; a;) {
                            var o = a.nextSibling;
                            i.parentNode.insertBefore(a, i), a = o
                        }
                        i.parentNode.removeChild(i), delete t[n]
                    }
                }), t.length = 0, t
            }, show: function (e) {
                var t = this;
                return e === undefined && (e = t._originDisplay || ""), "none" != t.css("display") ? t : t.css("display", e)
            }, hide: function () {
                var e = this;
                return e.length < 1 ? e : (e._originDisplay = e[0].style.display, e.css("display", "none"))
            }, outer: function () {
                var e = this;
                if (e.length < 1) return "";
                var t, n = e.doc.createElement("div");
                return n.appendChild(e[0].cloneNode(!0)), t = _formatHtml(n.innerHTML), n = null, t
            }, isSingle: function () {
                return !!_SINGLE_TAG_MAP[this.name]
            }, isInline: function () {
                return !!_INLINE_TAG_MAP[this.name]
            }, isBlock: function () {
                return !!_BLOCK_TAG_MAP[this.name]
            }, isStyle: function () {
                return !!_STYLE_TAG_MAP[this.name]
            }, isControl: function () {
                return !!_CONTROL_TAG_MAP[this.name]
            }, contains: function (e) {
                return this.length < 1 ? !1 : _contains(this[0], _get(e))
            }, parent: function () {
                if (this.length < 1) return null;
                var e = this[0].parentNode;
                return e ? new KNode(e) : null
            }, children: function () {
                if (this.length < 1) return new KNode([]);
                for (var e = [], t = this[0].firstChild; t;) (3 != t.nodeType || "" !== _trim(t.nodeValue)) && e.push(t), t = t.nextSibling;
                return new KNode(e)
            }, first: function () {
                var e = this.children();
                return e.length > 0 ? e.eq(0) : null
            }, last: function () {
                var e = this.children();
                return e.length > 0 ? e.eq(e.length - 1) : null
            }, index: function () {
                if (this.length < 1) return -1;
                for (var e = -1, t = this[0]; t;) e++, t = t.previousSibling;
                return e
            }, prev: function () {
                if (this.length < 1) return null;
                var e = this[0].previousSibling;
                return e ? new KNode(e) : null
            }, next: function () {
                if (this.length < 1) return null;
                var e = this[0].nextSibling;
                return e ? new KNode(e) : null
            }, scan: function (e, t) {
                function n(i) {
                    for (var a = t ? i.firstChild : i.lastChild; a;) {
                        var o = t ? a.nextSibling : a.previousSibling;
                        if (e(a) === !1) return !1;
                        if (n(a) === !1) return !1;
                        a = o
                    }
                }

                if (!(this.length < 1)) return t = t === undefined ? !0 : t, n(this[0]), this
            }
        }), _each("blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error,contextmenu".split(","), function (e, t) {
            KNode.prototype[t] = function (e) {
                return e ? this.bind(t, e) : this.fire(t)
            }
        });
        var _K = K;
        K = function (e, t) {
            function n(e) {
                return e[0] || (e = []), new KNode(e)
            }

            if (e !== undefined && null !== e) {
                if ("string" == typeof e) {
                    t && (t = _get(t));
                    var i = e.length;
                    if ("@" === e.charAt(0) && (e = e.substr(1)), e.length !== i || /<.+>/.test(e)) {
                        var a = t ? t.ownerDocument || t : document, o = a.createElement("div"), r = [];
                        o.innerHTML = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + e;
                        for (var l = 0, s = o.childNodes.length; s > l; l++) {
                            var d = o.childNodes[l];
                            "__kindeditor_temp_tag__" != d.id && r.push(d)
                        }
                        return n(r)
                    }
                    return n(_queryAll(e, t))
                }
                return e && e.constructor === KNode ? e : (e.toArray && (e = e.toArray()), n(_isArray(e) ? e : _toArray(arguments)))
            }
        }, _each(_K, function (e, t) {
            K[e] = t
        }), K.NodeClass = KNode, window.KindEditor = K;
        var _START_TO_START = 0, _START_TO_END = 1, _END_TO_END = 2, _END_TO_START = 3, _BOOKMARK_ID = 0;
        _extend(KRange, {
            init: function (e) {
                var t = this;
                t.startContainer = e, t.startOffset = 0, t.endContainer = e, t.endOffset = 0, t.collapsed = !0, t.doc = e
            }, commonAncestor: function () {
                function e(e) {
                    for (var t = []; e;) t.push(e), e = e.parentNode;
                    return t
                }

                for (var t, n, i = e(this.startContainer), a = e(this.endContainer), o = 0, r = i.length, l = a.length; ++o && (t = i[r - o], n = a[l - o], t && n && t === n);) ;
                return i[r - o + 1]
            }, setStart: function (e, t) {
                var n = this, i = n.doc;
                return n.startContainer = e, n.startOffset = t, n.endContainer === i && (n.endContainer = e, n.endOffset = t), _updateCollapsed(this)
            }, setEnd: function (e, t) {
                var n = this, i = n.doc;
                return n.endContainer = e, n.endOffset = t, n.startContainer === i && (n.startContainer = e, n.startOffset = t), _updateCollapsed(this)
            }, setStartBefore: function (e) {
                return this.setStart(e.parentNode || this.doc, K(e).index())
            }, setStartAfter: function (e) {
                return this.setStart(e.parentNode || this.doc, K(e).index() + 1)
            }, setEndBefore: function (e) {
                return this.setEnd(e.parentNode || this.doc, K(e).index())
            }, setEndAfter: function (e) {
                return this.setEnd(e.parentNode || this.doc, K(e).index() + 1)
            }, selectNode: function (e) {
                return this.setStartBefore(e).setEndAfter(e)
            }, selectNodeContents: function (e) {
                var t = K(e);
                if (3 == t.type || t.isSingle()) return this.selectNode(e);
                var n = t.children();
                return n.length > 0 ? this.setStartBefore(n[0]).setEndAfter(n[n.length - 1]) : this.setStart(e, 0).setEnd(e, 0)
            }, collapse: function (e) {
                return e ? this.setEnd(this.startContainer, this.startOffset) : this.setStart(this.endContainer, this.endOffset)
            }, compareBoundaryPoints: function (e, t) {
                var n = this.get(), i = t.get();
                if (!_IERANGE) return n.compareBoundaryPoints(e, i);
                var a = {};
                a[_START_TO_START] = "StartToStart", a[_START_TO_END] = "EndToStart", a[_END_TO_END] = "EndToEnd", a[_END_TO_START] = "StartToEnd";
                var o = n.compareEndPoints(a[e], i);
                if (0 !== o) return o;
                var r, l, s, d, c;
                if ((e === _START_TO_START || e === _END_TO_START) && (r = this.startContainer, d = this.startOffset), (e === _START_TO_END || e === _END_TO_END) && (r = this.endContainer, d = this.endOffset), (e === _START_TO_START || e === _START_TO_END) && (l = t.startContainer, c = t.startOffset), (e === _END_TO_END || e === _END_TO_START) && (l = t.endContainer, c = t.endOffset), r === l) {
                    var u = d - c;
                    return u > 0 ? 1 : 0 > u ? -1 : 0
                }
                for (s = l; s && s.parentNode !== r;) s = s.parentNode;
                if (s) return K(s).index() >= d ? -1 : 1;
                for (s = r; s && s.parentNode !== l;) s = s.parentNode;
                return s ? K(s).index() >= c ? 1 : -1 : (s = K(l).next(), s && s.contains(r) ? 1 : (s = K(r).next(), s && s.contains(l) ? -1 : void 0))
            }, cloneRange: function () {
                return new KRange(this.doc).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset)
            }, toString: function () {
                var e = this.get(), t = _IERANGE ? e.text : e.toString();
                return t.replace(/\r\n|\n|\r/g, "")
            }, cloneContents: function () {
                return _copyAndDelete(this, !0, !1)
            }, deleteContents: function () {
                return _copyAndDelete(this, !1, !0)
            }, extractContents: function () {
                return _copyAndDelete(this, !0, !0)
            }, insertNode: function (e) {
                var t, n, i, a = this, o = a.startContainer, r = a.startOffset, l = a.endContainer, s = a.endOffset,
                    d = 1;
                return "#document-fragment" === e.nodeName.toLowerCase() && (t = e.firstChild, n = e.lastChild, d = e.childNodes.length), 1 == o.nodeType ? (i = o.childNodes[r], i ? (o.insertBefore(e, i), o === l && (s += d)) : o.appendChild(e)) : 3 == o.nodeType && (0 === r ? (o.parentNode.insertBefore(e, o), o.parentNode === l && (s += d)) : r >= o.nodeValue.length ? o.nextSibling ? o.parentNode.insertBefore(e, o.nextSibling) : o.parentNode.appendChild(e) : (i = r > 0 ? o.splitText(r) : o, o.parentNode.insertBefore(e, i), o === l && (l = i, s -= r))), t ? a.setStartBefore(t).setEndAfter(n) : a.selectNode(e), a.compareBoundaryPoints(_END_TO_END, a.cloneRange().setEnd(l, s)) >= 1 ? a : a.setEnd(l, s)
            }, surroundContents: function (e) {
                return e.appendChild(this.extractContents()), this.insertNode(e).selectNode(e)
            }, isControl: function () {
                var e = this, t = e.startContainer, n = e.startOffset, i = e.endContainer, a = e.endOffset;
                return 1 == t.nodeType && t === i && n + 1 === a && K(t.childNodes[n]).isControl()
            }, get: function (e) {
                var t, n = this, i = n.doc;
                if (!_IERANGE) {
                    t = i.createRange();
                    try {
                        t.setStart(n.startContainer, n.startOffset), t.setEnd(n.endContainer, n.endOffset)
                    } catch (a) {
                    }
                    return t
                }
                if (e && n.isControl()) return t = i.body.createControlRange(), t.addElement(n.startContainer.childNodes[n.startOffset]), t;
                var o = n.cloneRange().down();
                return t = i.body.createTextRange(), t.setEndPoint("StartToStart", _getEndRange(o.startContainer, o.startOffset)), t.setEndPoint("EndToStart", _getEndRange(o.endContainer, o.endOffset)), t
            }, html: function () {
                return K(this.cloneContents()).outer()
            }, down: function () {
                function e(e, n, i) {
                    if (1 == e.nodeType) {
                        var a = K(e).children();
                        if (0 !== a.length) {
                            var o, r, l, s;
                            n > 0 && (o = a.eq(n - 1)), n < a.length && (r = a.eq(n)), o && 3 == o.type && (l = o[0], s = l.nodeValue.length), r && 3 == r.type && (l = r[0], s = 0), l && (i ? t.setStart(l, s) : t.setEnd(l, s))
                        }
                    }
                }

                var t = this;
                return e(t.startContainer, t.startOffset, !0), e(t.endContainer, t.endOffset, !1), t
            }, up: function () {
                function e(e, n, i) {
                    3 == e.nodeType && (0 === n ? i ? t.setStartBefore(e) : t.setEndBefore(e) : n == e.nodeValue.length && (i ? t.setStartAfter(e) : t.setEndAfter(e)))
                }

                var t = this;
                return e(t.startContainer, t.startOffset, !0), e(t.endContainer, t.endOffset, !1), t
            }, enlarge: function (e) {
                function t(t, i, a) {
                    var o, r = K(t);
                    if (!(3 == r.type || _NOSPLIT_TAG_MAP[r.name] || !e && r.isBlock())) if (0 === i) {
                        for (; !r.prev() && (o = r.parent(), o && !_NOSPLIT_TAG_MAP[o.name] && (e || !o.isBlock()));) r = o;
                        a ? n.setStartBefore(r[0]) : n.setEndBefore(r[0])
                    } else if (i == r.children().length) {
                        for (; !r.next() && (o = r.parent(), o && !_NOSPLIT_TAG_MAP[o.name] && (e || !o.isBlock()));) r = o;
                        a ? n.setStartAfter(r[0]) : n.setEndAfter(r[0])
                    }
                }

                var n = this;
                return n.up(), t(n.startContainer, n.startOffset, !0), t(n.endContainer, n.endOffset, !1), n
            }, shrink: function () {
                for (var e, t = this, n = t.collapsed; 1 == t.startContainer.nodeType && (e = t.startContainer.childNodes[t.startOffset]) && 1 == e.nodeType && !K(e).isSingle();) t.setStart(e, 0);
                if (n) return t.collapse(n);
                for (; 1 == t.endContainer.nodeType && t.endOffset > 0 && (e = t.endContainer.childNodes[t.endOffset - 1]) && 1 == e.nodeType && !K(e).isSingle();) t.setEnd(e, e.childNodes.length);
                return t
            }, createBookmark: function (e) {
                var t, n = this, i = n.doc, a = K('<span style="display:none;"></span>', i)[0];
                return a.id = "__kindeditor_bookmark_start_" + _BOOKMARK_ID++ + "__", n.collapsed || (t = a.cloneNode(!0), t.id = "__kindeditor_bookmark_end_" + _BOOKMARK_ID++ + "__"), t && n.cloneRange().collapse(!1).insertNode(t).setEndBefore(t), n.insertNode(a).setStartAfter(a), {
                    start: e ? "#" + a.id : a,
                    end: t ? e ? "#" + t.id : t : null
                }
            }, moveToBookmark: function (e) {
                var t = this, n = t.doc, i = K(e.start, n), a = e.end ? K(e.end, n) : null;
                return !i || i.length < 1 ? t : (t.setStartBefore(i[0]), i.remove(), a && a.length > 0 ? (t.setEndBefore(a[0]), a.remove()) : t.collapse(!0), t)
            }, dump: function () {
                console.log("--------------------"), console.log(3 == this.startContainer.nodeType ? this.startContainer.nodeValue : this.startContainer, this.startOffset), console.log(3 == this.endContainer.nodeType ? this.endContainer.nodeValue : this.endContainer, this.endOffset)
            }
        }), K.RangeClass = KRange, K.range = _range, K.START_TO_START = _START_TO_START, K.START_TO_END = _START_TO_END, K.END_TO_END = _END_TO_END, K.END_TO_START = _END_TO_START, _extend(KCmd, {
            init: function (e) {
                var t = this, n = e.doc;
                t.doc = n, t.win = _getWin(n), t.sel = _getSel(n), t.range = e
            }, selection: function (e) {
                var t = this, n = t.doc, i = _getRng(n);
                return t.sel = _getSel(n), i ? (t.range = _range(i), "html" == K(t.range.startContainer).name && t.range.selectNodeContents(n.body).collapse(!1), t) : (e && t.range.selectNodeContents(n.body).collapse(!1), t)
            }, select: function (e) {
                e = _undef(e, !0);
                var t, n = this, i = n.sel, a = n.range.cloneRange().shrink(), o = a.startContainer, r = a.startOffset,
                    l = (a.endContainer, a.endOffset, _getDoc(o)), s = n.win, d = !1;
                if (e && 1 == o.nodeType && a.collapsed) {
                    if (_IERANGE) {
                        var c = K("<span>&nbsp;</span>", l);
                        a.insertNode(c[0]), t = l.body.createTextRange();
                        try {
                            t.moveToElementText(c[0])
                        } catch (u) {
                        }
                        return t.collapse(!1), t.select(), c.remove(), s.focus(), n
                    }
                    if (_WEBKIT) {
                        var p = o.childNodes;
                        (K(o).isInline() || r > 0 && K(p[r - 1]).isInline() || p[r] && K(p[r]).isInline()) && (a.insertNode(l.createTextNode("鈥�")), d = !0)
                    }
                }
                if (_IERANGE) try {
                    t = a.get(!0), t.select()
                } catch (h) {
                } else if (d && a.collapse(!1), t = a.get(!0), i.removeAllRanges(), i.addRange(t), l !== document) {
                    var f = K(t.endContainer).pos();
                    s.scrollTo(f.x, f.y)
                }
                return s.focus(), n
            }, wrap: function (e) {
                var t, n = this, i = n.doc, a = n.range;
                if (t = K(e, i), a.collapsed) return a.shrink(), a.insertNode(t[0]).selectNodeContents(t[0]), n;
                if (t.isBlock()) {
                    for (var o = t.clone(!0), r = o; r.first();) r = r.first();
                    return r.append(a.extractContents()), a.insertNode(o[0]).selectNode(o[0]), n
                }
                a.enlarge();
                var l = a.createBookmark(), s = a.commonAncestor(), d = !1;
                return K(s).scan(function (e) {
                    if (!d && e == l.start) return void(d = !0);
                    if (d) {
                        if (e == l.end) return !1;
                        var n = K(e);
                        if (_inPreElement(n)) return;
                        if (3 == n.type && _trim(e.nodeValue).length > 0) {
                            for (var i; (i = n.parent()) && i.isStyle() && 1 == i.children().length;) n = i;
                            _wrapNode(n, t)
                        }
                    }
                }), a.moveToBookmark(l), n
            }, split: function (e, t) {
                for (var n, i = this.range, a = i.doc, o = i.cloneRange().collapse(e), r = o.startContainer, l = o.startOffset, s = 3 == r.nodeType ? r.parentNode : r, d = !1; s && s.parentNode;) {
                    if (n = K(s), t) {
                        if (!n.isStyle()) break;
                        if (!_hasAttrOrCss(n, t)) break
                    } else if (_NOSPLIT_TAG_MAP[n.name]) break;
                    d = !0, s = s.parentNode
                }
                if (d) {
                    var c = a.createElement("span");
                    i.cloneRange().collapse(!e).insertNode(c), e ? o.setStartBefore(s.firstChild).setEnd(r, l) : o.setStart(r, l).setEndAfter(s.lastChild);
                    var u = o.extractContents(), p = u.firstChild, h = u.lastChild;
                    e ? (o.insertNode(u), i.setStartAfter(h).setEndBefore(c)) : (s.appendChild(u), i.setStartBefore(c).setEndBefore(p));
                    var f = c.parentNode;
                    if (f == i.endContainer) {
                        var m = K(c).prev(), g = K(c).next();
                        m && g && 3 == m.type && 3 == g.type ? i.setEnd(m[0], m[0].nodeValue.length) : e || i.setEnd(i.endContainer, i.endOffset - 1)
                    }
                    f.removeChild(c)
                }
                return this
            }, remove: function (e) {
                var t = this, n = t.doc, i = t.range;
                if (i.enlarge(), 0 === i.startOffset) {
                    for (var a, o = K(i.startContainer); (a = o.parent()) && a.isStyle() && 1 == a.children().length;) o = a;
                    i.setStart(o[0], 0), o = K(i.startContainer), o.isBlock() && _removeAttrOrCss(o, e);
                    var r = o.parent();
                    r && r.isBlock() && _removeAttrOrCss(r, e)
                }
                var l, s;
                if (i.collapsed) {
                    if (t.split(!0, e), l = i.startContainer, s = i.startOffset, s > 0) {
                        var d = K(l.childNodes[s - 1]);
                        d && _isEmptyNode(d) && (d.remove(), i.setStart(l, s - 1))
                    }
                    var c = K(l.childNodes[s]);
                    return c && _isEmptyNode(c) && c.remove(), _isEmptyNode(l) && (i.startBefore(l), l.remove()), i.collapse(!0), t
                }
                t.split(!0, e), t.split(!1, e);
                var u = n.createElement("span"), p = n.createElement("span");
                i.cloneRange().collapse(!1).insertNode(p), i.cloneRange().collapse(!0).insertNode(u);
                var h = [], f = !1;
                K(i.commonAncestor()).scan(function (e) {
                    return f || e != u ? e == p ? !1 : void(f && h.push(e)) : void(f = !0)
                }), K(u).remove(), K(p).remove(), l = i.startContainer, s = i.startOffset;
                var m = i.endContainer, g = i.endOffset;
                if (s > 0) {
                    var v = K(l.childNodes[s - 1]);
                    v && _isEmptyNode(v) && (v.remove(), i.setStart(l, s - 1), l == m && i.setEnd(m, g - 1));
                    var _ = K(l.childNodes[s]);
                    _ && _isEmptyNode(_) && (_.remove(), l == m && i.setEnd(m, g - 1))
                }
                var b = K(m.childNodes[i.endOffset]);
                b && _isEmptyNode(b) && b.remove();
                var y = i.createBookmark(!0);
                return _each(h, function (t, n) {
                    _removeAttrOrCss(K(n), e)
                }), i.moveToBookmark(y), t
            }, commonNode: function (e) {
                function t(t) {
                    for (var n = t, i = t; i;) {
                        if (_hasAttrOrCss(K(i), e)) return K(i);
                        i = i.parentNode
                    }
                    for (; n && (n = n.lastChild);) if (_hasAttrOrCss(K(n), e)) return K(n);
                    return null
                }

                var n = this.range, i = n.endContainer, a = n.endOffset,
                    o = 3 == i.nodeType || 0 === a ? i : i.childNodes[a - 1], r = t(o);
                if (r) return r;
                if (1 == o.nodeType || 3 == i.nodeType && 0 === a) {
                    var l = K(o).prev();
                    if (l) return t(l)
                }
                return null
            }, commonAncestor: function (e) {
                function t(t) {
                    for (; t;) {
                        if (1 == t.nodeType && t.tagName.toLowerCase() === e) return t;
                        t = t.parentNode
                    }
                    return null
                }

                var n = this.range, i = n.startContainer, a = n.startOffset, o = n.endContainer, r = n.endOffset,
                    l = 3 == i.nodeType || 0 === a ? i : i.childNodes[a - 1],
                    s = 3 == o.nodeType || 0 === r ? o : o.childNodes[r - 1], d = t(l), c = t(s);
                return d && c && d === c ? K(d) : null
            }, state: function (e) {
                var t = this, n = t.doc, i = !1;
                try {
                    i = n.queryCommandState(e)
                } catch (a) {
                }
                return i
            }, val: function (e) {
                function t(e) {
                    return e.toLowerCase()
                }

                var n = this, i = n.doc;
                n.range;
                e = t(e);
                var a, o = "";
                return "fontfamily" === e || "fontname" === e ? (o = _nativeCommandValue(i, "fontname"), o = o.replace(/['"]/g, ""), t(o)) : "formatblock" === e ? (o = _nativeCommandValue(i, e), "" === o && (a = n.commonNode({"h1,h2,h3,h4,h5,h6,p,div,pre,address": "*"}), a && (o = a.name)), "Normal" === o && (o = "p"), t(o)) : "fontsize" === e ? (a = n.commonNode({"*": ".font-size"}), a && (o = a.css("font-size")), t(o)) : "forecolor" === e ? (a = n.commonNode({"*": ".color"}), a && (o = a.css("color")), o = _toHex(o), "" === o && (o = "default"), t(o)) : "hilitecolor" === e ? (a = n.commonNode({"*": ".background-color"}), a && (o = a.css("background-color")), o = _toHex(o), "" === o && (o = "default"), t(o)) : o
            }, toggle: function (e, t) {
                var n = this;
                return n.commonNode(t) ? n.remove(t) : n.wrap(e), n.select()
            }, bold: function () {
                return this.toggle("<strong></strong>", {span: ".font-weight=bold", strong: "*", b: "*"})
            }, italic: function () {
                return this.toggle("<em></em>", {span: ".font-style=italic", em: "*", i: "*"})
            }, underline: function () {
                return this.toggle("<u></u>", {span: ".text-decoration=underline", u: "*"})
            }, strikethrough: function () {
                return this.toggle("<s></s>", {span: ".text-decoration=line-through", s: "*"})
            }, forecolor: function (e) {
                return this.wrap('<span style="color:' + e + ';"></span>').select()
            }, hilitecolor: function (e) {
                return this.wrap('<span style="background-color:' + e + ';"></span>').select()
            }, fontsize: function (e) {
                return this.wrap('<span style="font-size:' + e + ';"></span>').select()
            }, fontname: function (e) {
                return this.fontfamily(e)
            }, fontfamily: function (e) {
                return this.wrap('<span style="font-family:' + e + ';"></span>').select()
            }, removeformat: function () {
                var e = {"*": ".font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family,.text-indent"},
                    t = _STYLE_TAG_MAP;
                return _each(t, function (t, n) {
                    e[t] = "*"
                }), this.remove(e), this.select()
            }, inserthtml: function (e, t) {
                function n(e, t) {
                    t = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + t;
                    var n = e.get();
                    n.item ? n.item(0).outerHTML = t : n.pasteHTML(t);
                    var i = e.doc.getElementById("__kindeditor_temp_tag__");
                    i.parentNode.removeChild(i);
                    var o = _toRange(n);
                    e.setEnd(o.endContainer, o.endOffset), e.collapse(!1), a.select(!1)
                }

                function i(e, t) {
                    var n = e.doc, i = n.createDocumentFragment();
                    K("@" + t, n).each(function () {
                        i.appendChild(this)
                    }), e.deleteContents(), e.insertNode(i), e.collapse(!1), a.select(!1)
                }

                var a = this, o = a.range;
                if ("" === e) return a;
                if (_IERANGE && t) {
                    try {
                        n(o, e)
                    } catch (r) {
                        i(o, e)
                    }
                    return a
                }
                return i(o, e), a
            }, hr: function () {
                return this.inserthtml("<hr />")
            }, print: function () {
                return this.win.print(), this
            }, insertimage: function (e, t, n, i, a, o) {
                t = _undef(t, ""), a = _undef(a, 0);
                var r = '<img src="' + _escape(e) + '" data-ke-src="' + _escape(e) + '" ';
                return n && (r += 'width="' + _escape(n) + '" '), i && (r += 'height="' + _escape(i) + '" '), t && (r += 'title="' + _escape(t) + '" '), o && (r += 'align="' + _escape(o) + '" '), r += 'alt="' + _escape(t) + '" ', r += "/>", this.inserthtml(r)
            }, createlink: function (e, t) {
                function n(e, t, n) {
                    K(e).attr("href", t).attr("data-ke-src", t), n ? K(e).attr("target", n) : K(e).removeAttr("target")
                }

                var i = this, a = i.doc, o = i.range;
                i.select();
                var r = i.commonNode({a: "*"});
                r && !o.isControl() && (o.selectNode(r.get()), i.select());
                var l = '<a href="' + _escape(e) + '" data-ke-src="' + _escape(e) + '" ';
                if (t && (l += ' target="' + _escape(t) + '"'), o.collapsed) return l += ">" + _escape(e) + "</a>", i.inserthtml(l);
                if (o.isControl()) {
                    var s = K(o.startContainer.childNodes[o.startOffset]);
                    return l += "></a>", s.after(K(l, a)), s.next().append(s), o.selectNode(s[0]), i.select()
                }
                var d = o.startContainer, c = o.startOffset, u = o.endContainer, p = o.endOffset;
                if (1 == d.nodeType && d === u && c + 1 === p) {
                    var h = d.childNodes[c];
                    if ("a" == h.nodeName.toLowerCase()) return n(h, e, t), i
                }
                return _nativeCommand(a, "createlink", "__kindeditor_temp_url__"), K('a[href="__kindeditor_temp_url__"]', a).each(function () {
                    n(this, e, t)
                }), i
            }, unlink: function () {
                var e = this, t = e.doc, n = e.range;
                if (e.select(), n.collapsed) {
                    var i = e.commonNode({a: "*"});
                    if (i && (n.selectNode(i.get()), e.select()), _nativeCommand(t, "unlink", null), _WEBKIT && "img" === K(n.startContainer).name) {
                        var a = K(n.startContainer).parent();
                        "a" === a.name && a.remove(!0)
                    }
                } else _nativeCommand(t, "unlink", null);
                return e
            }
        }), _each("formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript".split(","), function (e, t) {
            KCmd.prototype[t] = function (e) {
                var n = this;
                return n.select(), _nativeCommand(n.doc, t, e), _IERANGE && _inArray(t, "justifyleft,justifycenter,justifyright,justifyfull".split(",")) >= 0 && n.selection(), (!_IERANGE || _inArray(t, "formatblock,selectall,insertorderedlist,insertunorderedlist".split(",")) >= 0) && n.selection(), n
            }
        }), _each("cut,copy,paste".split(","), function (e, t) {
            KCmd.prototype[t] = function () {
                var e = this;
                if (!e.doc.queryCommandSupported(t)) throw"not supported";
                return e.select(), _nativeCommand(e.doc, t, null), e
            }
        }), K.CmdClass = KCmd, K.cmd = _cmd, _extend(KWidget, {
            init: function (e) {
                var t = this;
                if (t.name = e.name || "", t.doc = e.doc || document, t.win = _getWin(t.doc), t.x = _addUnit(e.x), t.y = _addUnit(e.y), t.z = e.z, t.width = _addUnit(e.width), t.height = _addUnit(e.height), t.div = K('<div style="display:block;"></div>'), t.options = e, t._alignEl = e.alignEl, t.width && t.div.css("width", t.width), t.height && t.div.css("height", t.height), t.z && t.div.css({
                        position: "absolute",
                        left: t.x,
                        top: t.y,
                        "z-index": t.z
                    }), !t.z || t.x !== undefined && t.y !== undefined || t.autoPos(t.width, t.height), e.cls && t.div.addClass(e.cls), e.shadowMode && t.div.addClass("ke-shadow"), e.css && t.div.css(e.css), e.src ? K(e.src).replaceWith(t.div) : K(t.doc.body).append(t.div), e.html && t.div.html(e.html), e.autoScroll) if (_IE && 7 > _V || _QUIRKS) {
                    var n = _getScrollPos();
                    K(t.win).bind("scroll", function (e) {
                        var i = _getScrollPos(), a = i.x - n.x, o = i.y - n.y;
                        t.pos(_removeUnit(t.x) + a, _removeUnit(t.y) + o, !1)
                    })
                } else t.div.css("position", "fixed")
            }, pos: function (e, t, n) {
                var i = this;
                return n = _undef(n, !0), null !== e && (e = 0 > e ? 0 : _addUnit(e), i.div.css("left", e), n && (i.x = e)), null !== t && (t = 0 > t ? 0 : _addUnit(t), i.div.css("top", t), n && (i.y = t)), i
            }, autoPos: function (e, t) {
                var n = this, i = _removeUnit(e) || 0, a = _removeUnit(t) || 0, o = _getScrollPos();
                if (n._alignEl) {
                    var r = K(n._alignEl), l = r.pos(), s = _round(r[0].clientWidth / 2 - i / 2),
                        d = _round(r[0].clientHeight / 2 - a / 2);
                    x = 0 > s ? l.x : l.x + s, y = 0 > d ? l.y : l.y + d
                } else {
                    var c = _docElement(n.doc);
                    x = _round(o.x + (c.clientWidth - i) / 2), y = _round(o.y + (c.clientHeight - a) / 2)
                }
                return _IE && 7 > _V || _QUIRKS || (x -= o.x, y -= o.y), n.pos(x, y)
            }, remove: function () {
                var e = this;
                return (_IE && 7 > _V || _QUIRKS) && K(e.win).unbind("scroll"), e.div.remove(), _each(e, function (t) {
                    e[t] = null
                }), this
            }, show: function () {
                return this.div.show(), this
            }, hide: function () {
                return this.div.hide(), this
            }, draggable: function (e) {
                var t = this;
                return e = e || {}, e.moveEl = t.div, e.moveFn = function (e, n, i, a, o, r) {
                    (e += o) < 0 && (e = 0), (n += r) < 0 && (n = 0), t.pos(e, n)
                }, _drag(e), t
            }
        }), K.WidgetClass = KWidget, K.widget = _widget;
        var html, _direction = "";
        (html = document.getElementsByTagName("html")) && (_direction = html[0].dir), _extend(KEdit, KWidget, {
            init: function (e) {
                function t() {
                    var t = _iframeDoc(n.iframe);
                    t.open(), l && (t.domain = document.domain), t.write(_getInitHtml(i, a, o, r)), t.close(), n.win = n.iframe[0].contentWindow, n.doc = t;
                    var s = _cmd(t);
                    n.afterChange(function (e) {
                        s.selection()
                    }), _WEBKIT && K(t).click(function (e) {
                        "img" === K(e.target).name && (s.selection(!0), s.range.selectNode(e.target), s.select())
                    }), _IE && (n._mousedownHandler = function () {
                        var e = s.range.cloneRange();
                        e.shrink(), e.isControl() && n.blur()
                    }, K(document).mousedown(n._mousedownHandler), K(t).keydown(function (e) {
                        if (8 == e.which) {
                            s.selection();
                            var t = s.range;
                            t.isControl() && (t.collapse(!0), K(t.startContainer.childNodes[t.startOffset]).remove(), e.preventDefault())
                        }
                    })), n.cmd = s, n.html(_elementVal(n.srcElement)), _IE ? (t.body.disabled = !0, t.body.contentEditable = !0, t.body.removeAttribute("disabled")) : t.designMode = "on", e.afterCreate && e.afterCreate.call(n)
                }

                var n = this;
                KEdit.parent.init.call(n, e), n.srcElement = K(e.srcElement), n.div.addClass("ke-edit"), n.designMode = _undef(e.designMode, !0), n.beforeGetHtml = e.beforeGetHtml, n.beforeSetHtml = e.beforeSetHtml, n.afterSetHtml = e.afterSetHtml;
                var i = _undef(e.themesPath, ""), a = e.bodyClass, o = e.cssPath, r = e.cssData,
                    l = "res:" != location.protocol && location.host.replace(/:\d+/, "") !== document.domain,
                    s = "document.open();" + (l ? 'document.domain="' + document.domain + '";' : "") + "document.close();",
                    d = _IE ? ' src="javascript:void(function(){' + encodeURIComponent(s) + '}())"' : "";
                n.iframe = K('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + d + "></iframe>").css("width", "100%"), n.textarea = K('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css("width", "100%"), n.tabIndex = isNaN(parseInt(e.tabIndex, 10)) ? n.srcElement.attr("tabindex") : parseInt(e.tabIndex, 10), n.iframe.attr("tabindex", n.tabIndex), n.textarea.attr("tabindex", n.tabIndex), n.width && n.setWidth(n.width), n.height && n.setHeight(n.height), n.designMode ? n.textarea.hide() : n.iframe.hide(), l && n.iframe.bind("load", function (e) {
                    n.iframe.unbind("load"), _IE ? t() : setTimeout(t, 0)
                }), n.div.append(n.iframe), n.div.append(n.textarea), n.srcElement.hide(), !l && t()
            }, setWidth: function (e) {
                var t = this;
                return e = _addUnit(e), t.width = e, t.div.css("width", e), t
            }, setHeight: function (e) {
                var t = this;
                return e = _addUnit(e), t.height = e, t.div.css("height", e), t.iframe.css("height", e), (_IE && 8 > _V || _QUIRKS) && (e = _addUnit(_removeUnit(e) - 2)), t.textarea.css("height", e), t
            }, remove: function () {
                var e = this, t = e.doc;
                K(t.body).unbind(), K(t).unbind(), K(e.win).unbind(), e._mousedownHandler && K(document).unbind("mousedown", e._mousedownHandler), _elementVal(e.srcElement, e.html()), e.srcElement.show(), e.iframe.unbind(), e.textarea.unbind(), KEdit.parent.remove.call(e)
            }, html: function (e, t) {
                var n = this, i = n.doc;
                if (n.designMode) {
                    var a = i.body;
                    return e === undefined ? (e = t ? "<!doctype html><html>" + a.parentNode.innerHTML + "</html>" : a.innerHTML, n.beforeGetHtml && (e = n.beforeGetHtml(e)), _GECKO && "<br />" == e && (e = ""), e) : (n.beforeSetHtml && (e = n.beforeSetHtml(e)), _IE && _V >= 9 && (e = e.replace(/(<.*?checked=")checked(".*>)/gi, "$1$2")), K(a).html(e), n.afterSetHtml && n.afterSetHtml(), n)
                }
                return e === undefined ? n.textarea.val() : (n.textarea.val(e), n)
            }, design: function (e) {
                var t, n = this;
                if (e === undefined ? !n.designMode : e) {
                    if (!n.designMode) {
                        t = n.html(), n.designMode = !0, n.textarea.hide(), n.html(t);
                        var i = n.iframe, a = _removeUnit(n.height);
                        i.height(a - 2), i.show(), setTimeout(function () {
                            i.height(a)
                        }, 0)
                    }
                } else n.designMode && (t = n.html(), n.designMode = !1, n.html(t), n.iframe.hide(), n.textarea.show());
                return n.focus()
            }, focus: function () {
                var e = this;
                return e.designMode ? e.win.focus() : e.textarea[0].focus(), e
            }, blur: function () {
                var e = this;
                if (_IE) {
                    var t = K('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />', e.div);
                    e.div.append(t), t[0].focus(), t.remove()
                } else e.designMode ? e.win.blur() : e.textarea[0].blur();
                return e
            }, afterChange: function (e) {
                function t(t) {
                    setTimeout(function () {
                        e(t)
                    }, 1)
                }

                var n = this, i = n.doc, a = i.body;
                return K(i).keyup(function (t) {
                    t.ctrlKey || t.altKey || !_CHANGE_KEY_MAP[t.which] || e(t)
                }), K(i).mouseup(e).contextmenu(e), K(n.win).blur(e), K(a).bind("paste", t), K(a).bind("cut", t), n
            }
        }), K.EditClass = KEdit, K.edit = _edit, K.iframeDoc = _iframeDoc, _extend(KToolbar, KWidget, {
            init: function (e) {
                function t(e) {
                    var t = K(e);
                    return t.hasClass("ke-outline") ? t : t.hasClass("ke-toolbar-icon") ? t.parent() : void 0
                }

                function n(e, n) {
                    var i = t(e.target);
                    if (i) {
                        if (i.hasClass("ke-disabled")) return;
                        if (i.hasClass("ke-selected")) return;
                        i[n]("ke-on")
                    }
                }

                var i = this;
                KToolbar.parent.init.call(i, e), i.disableMode = _undef(e.disableMode, !1), i.noDisableItemMap = _toMap(_undef(e.noDisableItems, [])), i._itemMap = {}, i.div.addClass("ke-toolbar").bind("contextmenu,mousedown,mousemove", function (e) {
                    e.preventDefault()
                }).attr("unselectable", "on"), i.div.mouseover(function (e) {
                    n(e, "addClass")
                }).mouseout(function (e) {
                    n(e, "removeClass")
                }).click(function (e) {
                    var n = t(e.target);
                    if (n) {
                        if (n.hasClass("ke-disabled")) return;
                        i.options.click.call(this, e, n.attr("data-name"))
                    }
                })
            }, get: function (e) {
                return this._itemMap[e] ? this._itemMap[e] : this._itemMap[e] = K("span.ke-icon-" + e, this.div).parent()
            }, select: function (e) {
                return _selectToolbar.call(this, e, function (e) {
                    e.addClass("ke-selected")
                }), self
            }, unselect: function (e) {
                return _selectToolbar.call(this, e, function (e) {
                    e.removeClass("ke-selected").removeClass("ke-on")
                }), self
            }, enable: function (e) {
                var t = this, n = e.get ? e : t.get(e);
                return n && (n.removeClass("ke-disabled"), n.opacity(1)), t
            }, disable: function (e) {
                var t = this, n = e.get ? e : t.get(e);
                return n && (n.removeClass("ke-selected").addClass("ke-disabled"), n.opacity(.5)), t
            }, disableAll: function (e, t) {
                var n = this, i = n.noDisableItemMap;
                return t && (i = _toMap(t)), (e === undefined ? !n.disableMode : e) ? (K("span.ke-outline", n.div).each(function () {
                    var e = K(this), t = e[0].getAttribute("data-name", 2);
                    i[t] || n.disable(e)
                }), n.disableMode = !0) : (K("span.ke-outline", n.div).each(function () {
                    var e = K(this), t = e[0].getAttribute("data-name", 2);
                    i[t] || n.enable(e)
                }), n.disableMode = !1), n
            }
        }), K.ToolbarClass = KToolbar, K.toolbar = _toolbar, _extend(KMenu, KWidget, {
            init: function (e) {
                var t = this;
                e.z = e.z || 811213, KMenu.parent.init.call(t, e), t.centerLineMode = _undef(e.centerLineMode, !0), t.div.addClass("ke-menu").bind("click,mousedown", function (e) {
                    e.stopPropagation()
                }).attr("unselectable", "on")
            }, addItem: function (e) {
                var t = this;
                if ("-" === e.title) return void t.div.append(K('<div class="ke-menu-separator"></div>'));
                var n = K('<div class="ke-menu-item" unselectable="on"></div>'),
                    i = K('<div class="ke-inline-block ke-menu-item-left"></div>'),
                    a = K('<div class="ke-inline-block ke-menu-item-right"></div>'), o = _addUnit(e.height),
                    r = _undef(e.iconClass, "");
                t.div.append(n), o && (n.css("height", o), a.css("line-height", o));
                var l;
                return t.centerLineMode && (l = K('<div class="ke-inline-block ke-menu-item-center"></div>'), o && l.css("height", o)), n.mouseover(function (e) {
                    K(this).addClass("ke-menu-item-on"), l && l.addClass("ke-menu-item-center-on")
                }).mouseout(function (e) {
                    K(this).removeClass("ke-menu-item-on"), l && l.removeClass("ke-menu-item-center-on")
                }).click(function (t) {
                    e.click.call(K(this)), t.stopPropagation()
                }).append(i), l && n.append(l), n.append(a), e.checked && (r = "ke-icon-checked"), "" !== r && i.html('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ' + r + '"></span>'), a.html(e.title), t
            }, remove: function () {
                var e = this;
                return e.options.beforeRemove && e.options.beforeRemove.call(e), K(".ke-menu-item", e.div[0]).unbind(), KMenu.parent.remove.call(e), e
            }
        }), K.MenuClass = KMenu, K.menu = _menu, _extend(KColorPicker, KWidget, {
            init: function (e) {
                var t = this;
                e.z = e.z || 811213, KColorPicker.parent.init.call(t, e);
                var n = e.colors || [["#E53333", "#E56600", "#FF9900", "#64451D", "#DFC5A4", "#FFE500"], ["#009900", "#006600", "#99BB00", "#B8D100", "#60D978", "#00D5FF"], ["#337FE5", "#003399", "#4C33E5", "#9933E5", "#CC33E5", "#EE33EE"], ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"]];
                t.selectedColor = (e.selectedColor || "").toLowerCase(), t._cells = [], t.div.addClass("ke-colorpicker").bind("click,mousedown", function (e) {
                    e.stopPropagation()
                }).attr("unselectable", "on");
                var i = t.doc.createElement("table");
                t.div.append(i), i.className = "ke-colorpicker-table", i.cellPadding = 0, i.cellSpacing = 0, i.border = 0;
                var a = i.insertRow(0), o = a.insertCell(0);
                o.colSpan = n[0].length, t._addAttr(o, "", "ke-colorpicker-cell-top");
                for (var r = 0; r < n.length; r++) {
                    a = i.insertRow(r + 1);
                    for (var l = 0; l < n[r].length; l++) o = a.insertCell(l), t._addAttr(o, n[r][l], "ke-colorpicker-cell")
                }
            }, _addAttr: function (e, t, n) {
                var i = this;
                e = K(e).addClass(n), i.selectedColor === t.toLowerCase() && e.addClass("ke-colorpicker-cell-selected"), e.attr("title", t || i.options.noColor), e.mouseover(function (e) {
                    K(this).addClass("ke-colorpicker-cell-on")
                }), e.mouseout(function (e) {
                    K(this).removeClass("ke-colorpicker-cell-on")
                }), e.click(function (e) {
                    e.stop(), i.options.click.call(K(this), t)
                }), t ? e.append(K('<div class="ke-colorpicker-cell-color" unselectable="on"></div>').css("background-color", t)) : e.html(i.options.noColor), K(e).attr("unselectable", "on"), i._cells.push(e)
            }, remove: function () {
                var e = this;
                return _each(e._cells, function () {
                    this.unbind()
                }), KColorPicker.parent.remove.call(e), e
            }
        }), K.ColorPickerClass = KColorPicker, K.colorpicker = _colorpicker, _extend(KUploadButton, {
            init: function (e) {
                var t = this, n = K(e.button), i = e.fieldName || "file", a = e.url || "", o = n.val(),
                    r = e.extraParams || {}, l = n[0].className || "",
                    s = e.target || "kindeditor_upload_iframe_" + (new Date).getTime();
                e.afterError = e.afterError || function (e) {
                    alert(e)
                };
                var d = [];
                for (var c in r) d.push('<input type="hidden" name="' + c + '" value="' + r[c] + '" />');
                var u = ['<div class="ke-inline-block ' + l + '">', e.target ? "" : '<iframe name="' + s + '" style="display:none;"></iframe>', e.form ? '<div class="ke-upload-area">' : '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + s + '" action="' + a + '">', '<span class="ke-button-common">', d.join(""), '<input type="button" class="ke-button-common ke-button" value="' + o + '" />', "</span>", '<input type="file" class="ke-upload-file" name="' + i + '" tabindex="-1" />', e.form ? "</div>" : "</form>", "</div>"].join(""),
                    p = K(u, n.doc);
                n.hide(), n.before(p), t.div = p, t.button = n, t.iframe = e.target ? K('iframe[name="' + s + '"]') : K("iframe", p), t.form = e.form ? K(e.form) : K("form", p), t.fileBox = K(".ke-upload-file", p);
                var h = e.width || K(".ke-button-common", p).width();
                K(".ke-upload-area", p).width(h), t.options = e
            }, submit: function () {
                var e = this, t = e.iframe;
                return t.bind("load", function () {
                    t.unbind();
                    var n = document.createElement("form");
                    e.fileBox.before(n), K(n).append(e.fileBox), n.reset(), K(n).remove(!0);
                    var i, a = K.iframeDoc(t), o = a.getElementsByTagName("pre")[0], r = "";
                    r = o ? o.innerHTML : a.body.innerHTML, r = _unescape(r), t[0].src = "javascript:false";
                    try {
                        i = K.json(r)
                    } catch (l) {
                        e.options.afterError.call(e, "<!doctype html><html>" + a.body.parentNode.innerHTML + "</html>")
                    }
                    i && e.options.afterUpload.call(e, i)
                }), e.form[0].submit(), e
            }, remove: function () {
                var e = this;
                return e.fileBox && e.fileBox.unbind(), e.iframe.remove(), e.div.remove(), e.button.show(), e
            }
        }), K.UploadButtonClass = KUploadButton, K.uploadbutton = _uploadbutton, _extend(KDialog, KWidget, {
            init: function (e) {
                var t = this, n = _undef(e.shadowMode, !0);
                e.z = e.z || 811213, e.shadowMode = !1, e.autoScroll = _undef(e.autoScroll, !0), KDialog.parent.init.call(t, e);
                var i = e.title, a = K(e.body, t.doc), o = e.previewBtn, r = e.yesBtn, l = e.noBtn, s = e.closeBtn,
                    d = _undef(e.showMask, !0);
                t.div.addClass("ke-dialog").bind("click,mousedown", function (e) {
                    e.stopPropagation()
                });
                var c = K('<div class="ke-dialog-content"></div>').appendTo(t.div);
                _IE && 7 > _V ? t.iframeMask = K('<iframe src="about:blank" class="ke-dialog-shadow"></iframe>').appendTo(t.div) : n && K('<div class="ke-dialog-shadow"></div>').appendTo(t.div);
                var u = K('<div class="ke-dialog-header"></div>');
                c.append(u), u.html(i), t.closeIcon = K('<span class="ke-dialog-icon-close" title="' + s.name + '"></span>').click(s.click), u.append(t.closeIcon), t.draggable({
                    clickEl: u,
                    beforeDrag: e.beforeDrag
                });
                var p = K('<div class="ke-dialog-body"></div>');
                c.append(p), p.append(a);
                var h = K('<div class="ke-dialog-footer" style="text-align:center;"></div>');
                if ((o || r || l) && c.append(h), _each([{btn: o, name: "preview"}, {btn: r, name: "yes"}, {
                        btn: l,
                        name: "no"
                    }], function () {
                        if (this.btn) {
                            var e = _createButton(this.btn);
                            e.addClass("ke-dialog-" + this.name), h.append(e)
                        }
                    }), t.height && p.height(_removeUnit(t.height) - u.height() - h.height()), t.div.width(t.div.width()), t.div.height(t.div.height()), t.mask = null, d) {
                    var f = _docElement(t.doc), m = Math.max(f.scrollWidth, f.clientWidth),
                        g = Math.max(f.scrollHeight, f.clientHeight);
                    t.mask = _widget({x: 0, y: 0, z: t.z - 1, cls: "ke-dialog-mask", width: m, height: g})
                }
                t.autoPos(t.div.width(), t.div.height()), t.footerDiv = h, t.bodyDiv = p, t.headerDiv = u, t.isLoading = !1
            }, setMaskIndex: function (e) {
                var t = this;
                t.mask.div.css("z-index", e)
            }, showLoading: function (e) {
                e = _undef(e, "");
                var t = this, n = t.bodyDiv;
                return t.loading = K('<div class="ke-dialog-loading"><div class="ke-inline-block ke-dialog-loading-content" style="margin-top:' + Math.round(n.height() / 3) + 'px;">' + e + "</div></div>").width(n.width()).height(n.height()).css("top", t.headerDiv.height() + "px"), n.css("visibility", "hidden").after(t.loading), t.isLoading = !0, t
            }, hideLoading: function () {
                return this.loading && this.loading.remove(), this.bodyDiv.css("visibility", "visible"), this.isLoading = !1, this
            }, remove: function () {
                var e = this;
                return e.options.beforeRemove && e.options.beforeRemove.call(e), e.mask && e.mask.remove(), e.iframeMask && e.iframeMask.remove(), e.closeIcon.unbind(), K("input", e.div).unbind(), K("button", e.div).unbind(), e.footerDiv.unbind(), e.bodyDiv.unbind(), e.headerDiv.unbind(), K("iframe", e.div).each(function () {
                    K(this).remove()
                }), KDialog.parent.remove.call(e), e
            }
        }), K.DialogClass = KDialog, K.dialog = _dialog, K.tabs = _tabs, K.loadScript = _loadScript, K.loadStyle = _loadStyle, K.ajax = _ajax;
        var _plugins = {}, _language = {};
        KEditor.prototype = {
            lang: function (e) {
                return _lang(e, this.langType)
            }, loadPlugin: function (e, t) {
                var n = this, i = this._pluginStatus;
                return i || (i = this._pluginStatus = {}), _plugins[e] ? _isFunction(_plugins[e]) ? (i[e] || (_plugins[e].call(n, KindEditor), i[e] = "inited"), t && t.call(n), n) : (setTimeout(function () {
                    n.loadPlugin(e, t)
                }, 100), n) : (_plugins[e] = "loading", _loadScript(n.pluginsPath + e + "/" + e + ".js?ver=" + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function () {
                    setTimeout(function () {
                        _plugins[e] && n.loadPlugin(e, t)
                    }, 0)
                }), n)
            }, handler: function (e, t) {
                var n = this;
                return n._handlers[e] || (n._handlers[e] = []), _isFunction(t) ? (n._handlers[e].push(t), n) : (_each(n._handlers[e], function () {
                    t = this.call(n, t)
                }), t)
            }, clickToolbar: function (e, t) {
                var n = this, i = "clickToolbar" + e;
                return t === undefined ? n._handlers[i] ? n.handler(i) : (n.loadPlugin(e, function () {
                    n.handler(i)
                }), n) : n.handler(i, t)
            }, updateState: function () {
                var e = this;
                return _each("justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,subscript,superscript,bold,italic,underline,strikethrough".split(","), function (t, n) {
                    e.cmd.state(n) ? e.toolbar.select(n) : e.toolbar.unselect(n)
                }), e
            }, addContextmenu: function (e) {
                return this._contextmenus.push(e), this
            }, afterCreate: function (e) {
                return this.handler("afterCreate", e)
            }, beforeRemove: function (e) {
                return this.handler("beforeRemove", e)
            }, beforeGetHtml: function (e) {
                return this.handler("beforeGetHtml", e)
            }, beforeSetHtml: function (e) {
                return this.handler("beforeSetHtml", e)
            }, afterSetHtml: function (e) {
                return this.handler("afterSetHtml", e)
            }, create: function () {
                function e() {
                    return 0 === s.height() ? void setTimeout(e, 100) : void t.resize(i, a, !1)
                }

                var t = this, n = t.fullscreenMode;
                if (t.isCreated) return t;
                if (t.srcElement.data("kindeditor")) return t;
                t.srcElement.data("kindeditor", "true"), n ? _docElement().style.overflow = "hidden" : _docElement().style.overflow = "";
                var i = n ? _docElement().clientWidth + "px" : t.width,
                    a = n ? _docElement().clientHeight + "px" : t.height;
                (_IE && 8 > _V || _QUIRKS) && (a = _addUnit(_removeUnit(a) + 2));
                var o = t.container = K(t.layout);
                n ? K(document.body).append(o) : t.srcElement.before(o);
                var r = K(".toolbar", o), l = K(".edit", o), s = t.statusbar = K(".statusbar", o);
                o.removeClass("container").addClass("ke-container ke-container-" + t.themeType).css("width", i), n ? (o.css({
                    position: "absolute",
                    left: 0,
                    top: 0,
                    "z-index": 811211
                }), _GECKO || (t._scrollPos = _getScrollPos()), window.scrollTo(0, 0), K(document.body).css({
                    height: "1px",
                    overflow: "hidden"
                }), K(document.body.parentNode).css("overflow", "hidden"), t._fullscreenExecuted = !0) : (t._fullscreenExecuted && (K(document.body).css({
                    height: "",
                    overflow: ""
                }), K(document.body.parentNode).css("overflow", "")), t._scrollPos && window.scrollTo(t._scrollPos.x, t._scrollPos.y));
                var d = [];
                K.each(t.items, function (e, n) {
                    "|" == n ? d.push('<span class="ke-inline-block ke-separator"></span>') : "/" == n ? d.push('<div class="ke-hr"></div>') : (d.push('<span class="ke-outline" data-name="' + n + '" title="' + t.lang(n) + '" unselectable="on">'), d.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + n + '" unselectable="on"></span></span>'))
                });
                var c = t.toolbar = _toolbar({
                    src: r,
                    html: d.join(""),
                    noDisableItems: t.noDisableItems,
                    click: function (e, n) {
                        if (e.stop(), t.menu) {
                            var i = t.menu.name;
                            if (t.hideMenu(), i === n) return
                        }
                        t.clickToolbar(n)
                    }
                }), u = _removeUnit(a) - c.div.height(), p = t.edit = _edit({
                    height: u > 0 && _removeUnit(a) > t.minHeight ? u : t.minHeight,
                    src: l,
                    srcElement: t.srcElement,
                    designMode: t.designMode,
                    themesPath: t.themesPath,
                    bodyClass: t.bodyClass,
                    cssPath: t.cssPath,
                    cssData: t.cssData,
                    beforeGetHtml: function (e) {
                        return e = t.beforeGetHtml(e), e = _removeBookmarkTag(_removeTempTag(e)), _formatHtml(e, t.filterMode ? t.htmlTags : null, t.urlType, t.wellFormatMode, t.indentChar)
                    },
                    beforeSetHtml: function (e) {
                        return e = _formatHtml(e, t.filterMode ? t.htmlTags : null, "", !1), t.beforeSetHtml(e)
                    },
                    afterSetHtml: function () {
                        t.edit = p = this, t.afterSetHtml()
                    },
                    afterCreate: function () {
                        if (t.edit = p = this, t.cmd = p.cmd, t._docMousedownFn = function (e) {
                                t.menu && t.hideMenu()
                            }, K(p.doc, document).mousedown(t._docMousedownFn), _bindContextmenuEvent.call(t), _bindNewlineEvent.call(t), _bindTabEvent.call(t), _bindFocusEvent.call(t), p.afterChange(function (e) {
                                p.designMode && (t.updateState(), t.addBookmark(), t.options.afterChange && t.options.afterChange.call(t))
                            }), p.textarea.keyup(function (e) {
                                e.ctrlKey || e.altKey || !_INPUT_KEY_MAP[e.which] || t.options.afterChange && t.options.afterChange.call(t)
                            }), t.readonlyMode && t.readonly(), t.isCreated = !0, "" === t.initContent && (t.initContent = t.html()), t._undoStack.length > 0) {
                            var e = t._undoStack.pop();
                            e.start && (t.html(e.html), p.cmd.range.moveToBookmark(e), t.select())
                        }
                        t.afterCreate(), t.options.afterCreate && t.options.afterCreate.call(t)
                    }
                });
                return s.removeClass("statusbar").addClass("ke-statusbar").append('<span class="ke-inline-block ke-statusbar-center-icon"></span>').append('<span class="ke-inline-block ke-statusbar-right-icon"></span>'), t._fullscreenResizeHandler && (K(window).unbind("resize", t._fullscreenResizeHandler), t._fullscreenResizeHandler = null), e(), n ? (t._fullscreenResizeHandler = function (e) {
                    t.isCreated && t.resize(_docElement().clientWidth, _docElement().clientHeight, !1)
                }, K(window).bind("resize", t._fullscreenResizeHandler), c.select("fullscreen"), s.first().css("visibility", "hidden"), s.last().css("visibility", "hidden")) : (_GECKO && K(window).bind("scroll", function (e) {
                    t._scrollPos = _getScrollPos()
                }), t.resizeType > 0 ? _drag({
                    moveEl: o, clickEl: s, moveFn: function (e, n, i, a, o, r) {
                        a += r, t.resize(null, a)
                    }
                }) : s.first().css("visibility", "hidden"), 2 === t.resizeType ? _drag({
                    moveEl: o,
                    clickEl: s.last(),
                    moveFn: function (e, n, i, a, o, r) {
                        i += o, a += r, t.resize(i, a)
                    }
                }) : s.last().css("visibility", "hidden")), t
            }, remove: function () {
                var e = this;
                return e.isCreated ? (e.beforeRemove(), e.srcElement.data("kindeditor", ""), e.menu && e.hideMenu(), _each(e.dialogs, function () {
                    e.hideDialog()
                }), K(document).unbind("mousedown", e._docMousedownFn), e.toolbar.remove(), e.edit.remove(), e.statusbar.last().unbind(), e.statusbar.unbind(), e.container.remove(), e.container = e.toolbar = e.edit = e.menu = null, e.dialogs = [], e.isCreated = !1, e) : e
            }, resize: function (e, t, n) {
                var i = this;
                return n = _undef(n, !0), e && (/%/.test(e) || (e = _removeUnit(e), e = e < i.minWidth ? i.minWidth : e), i.container.css("width", _addUnit(e)), n && (i.width = _addUnit(e))), t && (t = _removeUnit(t), editHeight = _removeUnit(t) - i.toolbar.div.height() - i.statusbar.height(), editHeight = editHeight < i.minHeight ? i.minHeight : editHeight, i.edit.setHeight(editHeight), n && (i.height = _addUnit(t))), i
            }, select: function () {
                return this.isCreated && this.cmd.select(), this
            }, html: function (e) {
                var t = this;
                return e === undefined ? t.isCreated ? t.edit.html() : _elementVal(t.srcElement) : (t.isCreated ? t.edit.html(e) : _elementVal(t.srcElement, e), t.isCreated && t.cmd.selection(), t)
            }, fullHtml: function () {
                return this.isCreated ? this.edit.html(undefined, !0) : ""
            }, text: function (e) {
                var t = this;
                return e === undefined ? _trim(t.html().replace(/<(?!img|embed).*?>/gi, "").replace(/&nbsp;/gi, " ")) : t.html(_escape(e))
            }, isEmpty: function () {
                return "" === _trim(this.text().replace(/\r\n|\n|\r/, ""))
            }, isDirty: function () {
                return _trim(this.initContent.replace(/\r\n|\n|\r|t/g, "")) !== _trim(this.html().replace(/\r\n|\n|\r|t/g, ""))
            }, selectedHtml: function () {
                var e = this.isCreated ? this.cmd.range.html() : "";
                return e = _removeBookmarkTag(_removeTempTag(e))
            }, count: function (e) {
                var t = this;
                return e = (e || "html").toLowerCase(), "html" === e ? t.html().length : "text" === e ? t.text().replace(/<(?:img|embed).*?>/gi, "K").replace(/\r\n|\n|\r/g, "").length : 0
            }, exec: function (e) {
                e = e.toLowerCase();
                var t = this, n = t.cmd, i = _inArray(e, "selectall,copy,paste,print".split(",")) < 0;
                return i && t.addBookmark(!1), n[e].apply(n, _toArray(arguments, 1)), i && (t.updateState(), t.addBookmark(!1), t.options.afterChange && t.options.afterChange.call(t)), t
            }, insertHtml: function (e, t) {
                return this.isCreated ? (e = this.beforeSetHtml(e), this.exec("inserthtml", e, t), this) : this
            }, appendHtml: function (e) {
                if (this.html(this.html() + e), this.isCreated) {
                    var t = this.cmd;
                    t.range.selectNodeContents(t.doc.body).collapse(!1), t.select()
                }
                return this
            }, sync: function () {
                return _elementVal(this.srcElement, this.html()), this
            }, focus: function () {
                return this.isCreated ? this.edit.focus() : this.srcElement[0].focus(), this
            }, blur: function () {
                return this.isCreated ? this.edit.blur() : this.srcElement[0].blur(), this
            }, addBookmark: function (e) {
                e = _undef(e, !0);
                var t, n = this, i = n.edit, a = i.doc.body, o = _removeTempTag(a.innerHTML);
                if (e && n._undoStack.length > 0) {
                    var r = n._undoStack[n._undoStack.length - 1];
                    if (Math.abs(o.length - _removeBookmarkTag(r.html).length) < n.minChangeSize) return n
                }
                if (i.designMode && !n._firstAddBookmark) {
                    var l = n.cmd.range;
                    t = l.createBookmark(!0), t.html = _removeTempTag(a.innerHTML), l.moveToBookmark(t)
                } else t = {html: o};
                return n._firstAddBookmark = !1, _addBookmarkToStack(n._undoStack, t), n
            }, undo: function () {
                return _undoToRedo.call(this, this._undoStack, this._redoStack)
            }, redo: function () {
                return _undoToRedo.call(this, this._redoStack, this._undoStack)
            }, fullscreen: function (e) {
                return this.fullscreenMode = e === undefined ? !this.fullscreenMode : e, this.addBookmark(!1), this.remove().create()
            }, readonly: function (e) {
                e = _undef(e, !0);
                var t = this, n = t.edit, i = n.doc;
                t.designMode ? t.toolbar.disableAll(e, []) : _each(t.noDisableItems, function () {
                    t.toolbar[e ? "disable" : "enable"](this)
                }), _IE ? i.body.contentEditable = !e : i.designMode = e ? "off" : "on", n.textarea[0].disabled = e
            }, createMenu: function (e) {
                var t = this, n = e.name, i = t.toolbar.get(n), a = i.pos();
                return e.x = a.x, e.y = a.y + i.height(), e.z = t.options.zIndex, e.shadowMode = _undef(e.shadowMode, t.shadowMode), e.selectedColor !== undefined ? (e.cls = "ke-colorpicker-" + t.themeType, e.noColor = t.lang("noColor"), t.menu = _colorpicker(e)) : (e.cls = "ke-menu-" + t.themeType, e.centerLineMode = !1, t.menu = _menu(e)), t.menu
            }, hideMenu: function () {
                return this.menu.remove(), this.menu = null, this
            }, hideContextmenu: function () {
                return this.contextmenu.remove(), this.contextmenu = null, this
            }, createDialog: function (e) {
                var t = this;
                e.name;
                if (e.z = t.options.zIndex, e.shadowMode = _undef(e.shadowMode, t.shadowMode), e.closeBtn = _undef(e.closeBtn, {
                        name: t.lang("close"),
                        click: function (e) {
                            t.hideDialog(), _IE && t.cmd && t.cmd.select()
                        }
                    }), e.noBtn = _undef(e.noBtn, {
                        name: t.lang(e.yesBtn ? "no" : "close"), click: function (e) {
                            t.hideDialog(), _IE && t.cmd && t.cmd.select()
                        }
                    }), "page" != t.dialogAlignType && (e.alignEl = t.container), e.cls = "ke-dialog-" + t.themeType, t.dialogs.length > 0) {
                    var n = t.dialogs[0], i = t.dialogs[t.dialogs.length - 1];
                    n.setMaskIndex(i.z + 2), e.z = i.z + 3, e.showMask = !1
                }
                var a = _dialog(e);
                return t.dialogs.push(a), a
            }, hideDialog: function () {
                var e = this;
                if (e.dialogs.length > 0 && e.dialogs.pop().remove(), e.dialogs.length > 0) {
                    var t = e.dialogs[0], n = e.dialogs[e.dialogs.length - 1];
                    t.setMaskIndex(n.z - 1)
                }
                return e
            }, errorDialog: function (e) {
                var t = this, n = t.createDialog({
                    width: 750,
                    title: t.lang("uploadError"),
                    body: '<div style="padding:10px 20px;"><iframe frameborder="0" style="width:708px;height:400px;"></iframe></div>'
                }), i = K("iframe", n.div), a = K.iframeDoc(i);
                return a.open(), a.write(e), a.close(), K(a.body).css("background-color", "#FFF"), i[0].contentWindow.focus(), t
            }
        }, _instances = [], K.remove = function (e) {
            _eachEditor(e, function (e) {
                this.remove(), _instances.splice(e, 1)
            })
        }, K.sync = function (e) {
            _eachEditor(e, function () {
                this.sync()
            })
        }, K.html = function (e, t) {
            _eachEditor(e, function () {
                this.html(t)
            })
        }, K.insertHtml = function (e, t) {
            _eachEditor(e, function () {
                this.insertHtml(t)
            })
        }, K.appendHtml = function (e, t) {
            _eachEditor(e, function () {
                this.appendHtml(t)
            })
        }, _IE && 7 > _V && _nativeCommand(document, "BackgroundImageCache", !0), K.EditorClass = KEditor, K.editor = _editor, K.create = _create, K.instances = _instances, K.plugin = _plugin, K.lang = _lang, _plugin("core", function (e) {
            var t = this,
                n = {undo: "Z", redo: "Y", bold: "B", italic: "I", underline: "U", print: "P", selectall: "A"};
            if (t.afterSetHtml(function () {
                    t.options.afterChange && t.options.afterChange.call(t)
                }), t.afterCreate(function () {
                    if ("form" == t.syncType) {
                        for (var n = e(t.srcElement), i = !1; n = n.parent();) if ("form" == n.name) {
                            i = !0;
                            break
                        }
                        if (i) {
                            n.bind("submit", function (n) {
                                t.sync(), e(window).bind("unload", function () {
                                    t.edit.textarea.remove()
                                })
                            });
                            var a = e('[type="reset"]', n);
                            a.click(function () {
                                t.html(t.initContent), t.cmd.selection()
                            }), t.beforeRemove(function () {
                                n.unbind(), a.unbind()
                            })
                        }
                    }
                }), t.clickToolbar("source", function () {
                    t.edit.designMode ? (t.toolbar.disableAll(!0), t.edit.design(!1), t.toolbar.select("source")) : (t.toolbar.disableAll(!1), t.edit.design(!0), t.toolbar.unselect("source"), _GECKO ? setTimeout(function () {
                        t.cmd.selection()
                    }, 0) : t.cmd.selection()), t.designMode = t.edit.designMode
                }), t.afterCreate(function () {
                    t.designMode || t.toolbar.disableAll(!0).select("source")
                }), t.clickToolbar("fullscreen", function () {
                    t.fullscreen()
                }), t.fullscreenShortcut) {
                var i = !1;
                t.afterCreate(function () {
                    if (e(t.edit.doc, t.edit.textarea).keyup(function (e) {
                            27 == e.which && setTimeout(function () {
                                t.fullscreen()
                            }, 0)
                        }), i) {
                        if (_IE && !t.designMode) return;
                        t.focus()
                    }
                    i || (i = !0)
                })
            }
            _each("undo,redo".split(","), function (e, i) {
                n[i] && t.afterCreate(function () {
                    _ctrl(this.edit.doc, n[i], function () {
                        t.clickToolbar(i)
                    })
                }), t.clickToolbar(i, function () {
                    t[i]()
                })
            }), t.clickToolbar("formatblock", function () {
                var e = t.lang("formatblock.formatBlock"), n = {h1: 28, h2: 24, h3: 18, H4: 14, p: 12},
                    i = t.cmd.val("formatblock"),
                    a = t.createMenu({name: "formatblock", width: "en" == t.langType ? 200 : 150});
                _each(e, function (e, o) {
                    var r = "font-size:" + n[e] + "px;";
                    "h" === e.charAt(0) && (r += "font-weight:bold;"), a.addItem({
                        title: '<span style="' + r + '" unselectable="on">' + o + "</span>",
                        height: n[e] + 12,
                        checked: i === e || i === o,
                        click: function () {
                            t.select().exec("formatblock", "<" + e + ">").hideMenu()
                        }
                    })
                })
            }), t.clickToolbar("fontname", function () {
                var e = t.cmd.val("fontname"), n = t.createMenu({name: "fontname", width: 150});
                _each(t.lang("fontname.fontName"), function (i, a) {
                    n.addItem({
                        title: '<span style="font-family: ' + i + ';" unselectable="on">' + a + "</span>",
                        checked: e === i.toLowerCase() || e === a.toLowerCase(),
                        click: function () {
                            t.exec("fontname", i).hideMenu()
                        }
                    })
                })
            }), t.clickToolbar("fontsize", function () {
                var e = t.cmd.val("fontsize"), n = t.createMenu({name: "fontsize", width: 150});
                _each(t.fontSizeTable, function (i, a) {
                    n.addItem({
                        title: '<span style="font-size:' + a + ';" unselectable="on">' + a + "</span>",
                        height: _removeUnit(a) + 12,
                        checked: e === a,
                        click: function () {
                            t.exec("fontsize", a).hideMenu()
                        }
                    })
                })
            }), _each("forecolor,hilitecolor".split(","), function (e, n) {
                t.clickToolbar(n, function () {
                    t.createMenu({
                        name: n,
                        selectedColor: t.cmd.val(n) || "default",
                        colors: t.colorTable,
                        click: function (e) {
                            t.exec(n, e).hideMenu()
                        }
                    })
                })
            }), _each("cut,copy,paste".split(","), function (e, n) {
                t.clickToolbar(n, function () {
                    t.focus();
                    try {
                        t.exec(n, null)
                    } catch (e) {
                        alert(t.lang(n + "Error"))
                    }
                })
            }), t.clickToolbar("about", function () {
                var e = '<div style="margin:20px;"><div>KindEditor ' + _VERSION + '</div><div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div></div>';
                t.createDialog({name: "about", width: 350, title: t.lang("about"), body: e})
            }), t.plugin.getSelectedLink = function () {
                return t.cmd.commonAncestor("a")
            }, t.plugin.getSelectedImage = function () {
                return _getImageFromRange(t.edit.cmd.range, function (e) {
                    return !/^ke-\w+$/i.test(e[0].className)
                })
            }, t.plugin.getSelectedFlash = function () {
                return _getImageFromRange(t.edit.cmd.range, function (e) {
                    return "ke-flash" == e[0].className
                })
            }, t.plugin.getSelectedMedia = function () {
                return _getImageFromRange(t.edit.cmd.range, function (e) {
                    return "ke-media" == e[0].className || "ke-rm" == e[0].className
                })
            }, t.plugin.getSelectedAnchor = function () {
                return _getImageFromRange(t.edit.cmd.range, function (e) {
                    return "ke-anchor" == e[0].className
                })
            }, _each("link,image,flash,media,anchor".split(","), function (e, n) {
                var i = n.charAt(0).toUpperCase() + n.substr(1);
                _each("edit,delete".split(","), function (e, a) {
                    t.addContextmenu({
                        title: t.lang(a + i),
                        click: function () {
                            t.loadPlugin(n, function () {
                                t.plugin[n][a](), t.hideMenu()
                            })
                        },
                        cond: t.plugin["getSelected" + i],
                        width: 150,
                        iconClass: "edit" == a ? "ke-icon-" + n : undefined
                    })
                }), t.addContextmenu({title: "-"})
            }), t.plugin.getSelectedTable = function () {
                return t.cmd.commonAncestor("table")
            }, t.plugin.getSelectedRow = function () {
                return t.cmd.commonAncestor("tr")
            }, t.plugin.getSelectedCell = function () {
                return t.cmd.commonAncestor("td")
            }, _each("prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,rowsplit,colsplit,coldelete,rowdelete,insert,delete".split(","), function (e, n) {
                var i = _inArray(n, ["prop", "delete"]) < 0 ? t.plugin.getSelectedCell : t.plugin.getSelectedTable;
                t.addContextmenu({
                    title: t.lang("table" + n), click: function () {
                        t.loadPlugin("table", function () {
                            t.plugin.table[n](), t.hideMenu()
                        })
                    }, cond: i, width: 170, iconClass: "ke-icon-table" + n
                })
            }), t.addContextmenu({title: "-"}), _each("selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,indent,outdent,subscript,superscript,hr,print,bold,italic,underline,strikethrough,removeformat,unlink".split(","), function (e, i) {
                n[i] && t.afterCreate(function () {
                    _ctrl(this.edit.doc, n[i], function () {
                        t.cmd.selection(), t.clickToolbar(i)
                    })
                }), t.clickToolbar(i, function () {
                    t.focus().exec(i, null)
                })
            }), t.afterCreate(function () {
                function n() {
                    i.range.moveToBookmark(a), i.select(), _WEBKIT && (e("div." + l, o).each(function () {
                        e(this).after("<br />").remove(!0)
                    }), e("span.Apple-style-span", o).remove(!0), e("span.Apple-tab-span", o).remove(!0), e("span[style]", o).each(function () {
                        "nowrap" == e(this).css("white-space") && e(this).remove(!0)
                    }), e("meta", o).remove());
                    var n = o[0].innerHTML;
                    o.remove(), "" !== n && (_WEBKIT && (n = n.replace(/(<br>)\1/gi, "$1")), 2 === t.pasteType && (n = n.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/gi, ""), /schemas-microsoft-com|worddocument|mso-\w+/i.test(n) ? n = _clearMsWord(n, t.filterMode ? t.htmlTags : e.options.htmlTags) : (n = _formatHtml(n, t.filterMode ? t.htmlTags : null), n = t.beforeSetHtml(n))), 1 === t.pasteType && (n = n.replace(/&nbsp;/gi, " "), n = n.replace(/\n\s*\n/g, "\n"), n = n.replace(/<br[^>]*>/gi, "\n"), n = n.replace(/<\/p><p[^>]*>/gi, "\n"), n = n.replace(/<[^>]+>/g, ""), n = n.replace(/ {2}/g, " &nbsp;"), "p" == t.newlineTag ? /\n/.test(n) && (n = n.replace(/^/, "<p>").replace(/$/, "<br /></p>").replace(/\n/g, "<br /></p><p>")) : n = n.replace(/\n/g, "<br />$&")), t.insertHtml(n, !0))
                }

                var i, a, o, r = t.edit.doc, l = "__kindeditor_paste__", s = !1;
                e(r.body).bind("paste", function (d) {
                    if (0 === t.pasteType) return void d.stop();
                    if (!s) {
                        if (s = !0, e("div." + l, r).remove(), i = t.cmd.selection(), a = i.range.createBookmark(), o = e('<div class="' + l + '"></div>', r).css({
                                position: "absolute",
                                width: "1px",
                                height: "1px",
                                overflow: "hidden",
                                left: "-1981px",
                                top: e(a.start).pos().y + "px",
                                "white-space": "nowrap"
                            }), e(r.body).append(o), _IE) {
                            var c = i.range.get(!0);
                            c.moveToElementText(o[0]), c.select(), c.execCommand("paste"), d.preventDefault()
                        } else i.range.selectNodeContents(o[0]), i.select(), o[0].tabIndex = -1, o[0].focus();
                        setTimeout(function () {
                            n(), s = !1
                        }, 0)
                    }
                })
            }), t.beforeGetHtml(function (e) {
                return _IE && 8 >= _V && (e = e.replace(/<div\s+[^>]*data-ke-input-tag="([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi, function (e, t) {
                    return unescape(t)
                }), e = e.replace(/(<input)((?:\s+[^>]*)?>)/gi, function (e, t, n) {
                    return /\s+type="[^"]+"/i.test(e) ? e : t + ' type="text"' + n
                })), e.replace(/(<(?:noscript|noscript\s[^>]*)>)([\s\S]*?)(<\/noscript>)/gi, function (e, t, n, i) {
                    return t + _unescape(n).replace(/\s+/g, " ") + i
                }).replace(/<img[^>]*class="?ke-(flash|rm|media)"?[^>]*>/gi, function (e) {
                    var t = _getAttrList(e), n = _getCssList(t.style || ""), i = _mediaAttrs(t["data-ke-tag"]),
                        a = _undef(n.width, ""), o = _undef(n.height, "");
                    return /px/i.test(a) && (a = _removeUnit(a)), /px/i.test(o) && (o = _removeUnit(o)), i.width = _undef(t.width, a), i.height = _undef(t.height, o), _mediaEmbed(i)
                }).replace(/<img[^>]*class="?ke-anchor"?[^>]*>/gi, function (e) {
                    var t = _getAttrList(e);
                    return '<a name="' + unescape(t["data-ke-name"]) + '"></a>'
                }).replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi, function (e, t, n) {
                    return "<script" + unescape(t) + ">" + unescape(n) + "</script>"
                }).replace(/<div\s+[^>]*data-ke-noscript-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/gi, function (e, t, n) {
                    return "<noscript" + unescape(t) + ">" + unescape(n) + "</noscript>"
                }).replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/gi, function (e, t, n, i) {
                    return e = e.replace(/(\s+(?:href|src)=")[^"]*(")/i, function (e, t, i) {
                        return t + _unescape(n) + i
                    }), e = e.replace(/\s+data-ke-src="[^"]*"/i, "")
                }).replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/gi, function (e, t, n) {
                    return t + n
                })
            }), t.beforeSetHtml(function (e) {
                return _IE && 8 >= _V && (e = e.replace(/<input[^>]*>|<(select|button)[^>]*>[\s\S]*?<\/\1>/gi, function (e) {
                    var t = _getAttrList(e), n = _getCssList(t.style || "");
                    return "none" == n.display ? '<div class="ke-display-none" data-ke-input-tag="' + escape(e) + '"></div>' : e
                })), e.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/gi, function (e) {
                    var n = _getAttrList(e);
                    return n.src = _undef(n.src, ""), n.width = _undef(n.width, 0), n.height = _undef(n.height, 0), _mediaImg(t.themesPath + "common/blank.gif", n)
                }).replace(/<a[^>]*name="([^"]+)"[^>]*>(?:<\/a>)?/gi, function (e) {
                    var n = _getAttrList(e);
                    return n.href !== undefined ? e : '<img class="ke-anchor" src="' + t.themesPath + 'common/anchor.gif" data-ke-name="' + escape(n.name) + '" />'
                }).replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, function (e, t, n) {
                    return '<div class="ke-script" data-ke-script-attr="' + escape(t) + '">' + escape(n) + "</div>"
                }).replace(/<noscript([^>]*)>([\s\S]*?)<\/noscript>/gi, function (e, t, n) {
                    return '<div class="ke-noscript" data-ke-noscript-attr="' + escape(t) + '">' + escape(n) + "</div>"
                }).replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/gi, function (e, t, n, i, a) {
                    return e.match(/\sdata-ke-src="[^"]*"/i) ? e : e = t + n + '="' + i + '" data-ke-src="' + _escape(i) + '"' + a
                }).replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/gi, function (e, t, n) {
                    return t + "data-ke-" + n
                }).replace(/<table[^>]*\s+border="0"[^>]*>/gi, function (e) {
                    return e.indexOf("ke-zeroborder") >= 0 ? e : _addClassToTag(e, "ke-zeroborder")
                })
            })
        })
    }
}(window), KindEditor.lang({
    source: "HTML浠ｇ爜",
    preview: "棰勮",
    undo: "鍚庨€€(Ctrl+Z)",
    redo: "鍓嶈繘(Ctrl+Y)",
    cut: "鍓垏(Ctrl+X)",
    copy: "澶嶅埗(Ctrl+C)",
    paste: "绮樿创(Ctrl+V)",
    plainpaste: "绮樿创涓烘棤鏍煎紡鏂囨湰",
    wordpaste: "浠嶹ord绮樿创",
    selectall: "鍏ㄩ€�(Ctrl+A)",
    justifyleft: "宸﹀榻�",
    justifycenter: "灞呬腑",
    justifyright: "鍙冲榻�",
    justifyfull: "涓ょ瀵归綈",
    insertorderedlist: "缂栧彿",
    insertunorderedlist: "椤圭洰绗﹀彿",
    indent: "澧炲姞缂╄繘",
    outdent: "鍑忓皯缂╄繘",
    subscript: "涓嬫爣",
    superscript: "涓婃爣",
    formatblock: "娈佃惤",
    fontname: "瀛椾綋",
    fontsize: "鏂囧瓧澶у皬",
    forecolor: "鏂囧瓧棰滆壊",
    hilitecolor: "鏂囧瓧鑳屾櫙",
    bold: "绮椾綋(Ctrl+B)",
    italic: "鏂滀綋(Ctrl+I)",
    underline: "涓嬪垝绾�(Ctrl+U)",
    strikethrough: "鍒犻櫎绾�",
    removeformat: "鍒犻櫎鏍煎紡",
    image: "鍥剧墖",
    multiimage: "鎵归噺鍥剧墖涓婁紶",
    flash: "Flash",
    media: "瑙嗛煶棰�",
    table: "琛ㄦ牸",
    tablecell: "鍗曞厓鏍�",
    hr: "鎻掑叆妯嚎",
    emoticons: "鎻掑叆琛ㄦ儏",
    link: "瓒呯骇閾炬帴",
    unlink: "鍙栨秷瓒呯骇閾炬帴",
    fullscreen: "鍏ㄥ睆鏄剧ず",
    about: "鍏充簬",
    print: "鎵撳嵃(Ctrl+P)",
    filemanager: "鏂囦欢绌洪棿",
    code: "鎻掑叆绋嬪簭浠ｇ爜",
    map: "Google鍦板浘",
    baidumap: "鐧惧害鍦板浘",
    lineheight: "琛岃窛",
    clearhtml: "娓呯悊HTML浠ｇ爜",
    pagebreak: "鎻掑叆鍒嗛〉绗�",
    quickformat: "涓€閿帓鐗�",
    insertfile: "鎻掑叆鏂囦欢",
    template: "鎻掑叆妯℃澘",
    anchor: "閿氱偣",
    yes: "纭畾",
    no: "鍙栨秷",
    close: "鍏抽棴",
    editImage: "鍥剧墖灞炴€�",
    deleteImage: "鍒犻櫎鍥剧墖",
    editFlash: "Flash灞炴€�",
    deleteFlash: "鍒犻櫎Flash",
    editMedia: "瑙嗛煶棰戝睘鎬�",
    deleteMedia: "鍒犻櫎瑙嗛煶棰�",
    editLink: "瓒呯骇閾炬帴灞炴€�",
    deleteLink: "鍙栨秷瓒呯骇閾炬帴",
    editAnchor: "閿氱偣灞炴€�",
    deleteAnchor: "鍒犻櫎閿氱偣",
    tableprop: "琛ㄦ牸灞炴€�",
    tablecellprop: "鍗曞厓鏍煎睘鎬�",
    tableinsert: "鎻掑叆琛ㄦ牸",
    tabledelete: "鍒犻櫎琛ㄦ牸",
    tablecolinsertleft: "宸︿晶鎻掑叆鍒�",
    tablecolinsertright: "鍙充晶鎻掑叆鍒�",
    tablerowinsertabove: "涓婃柟鎻掑叆琛�",
    tablerowinsertbelow: "涓嬫柟鎻掑叆琛�",
    tablerowmerge: "鍚戜笅鍚堝苟鍗曞厓鏍�",
    tablecolmerge: "鍚戝彸鍚堝苟鍗曞厓鏍�",
    tablerowsplit: "鎷嗗垎琛�",
    tablecolsplit: "鎷嗗垎鍒�",
    tablecoldelete: "鍒犻櫎鍒�",
    tablerowdelete: "鍒犻櫎琛�",
    noColor: "鏃犻鑹�",
    pleaseSelectFile: "璇烽€夋嫨鏂囦欢銆�",
    invalidImg: "璇疯緭鍏ユ湁鏁堢殑URL鍦板潃銆俓n鍙厑璁竕pg,gif,bmp,png鏍煎紡銆�",
    invalidMedia: "璇疯緭鍏ユ湁鏁堢殑URL鍦板潃銆俓n鍙厑璁竤wf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb鏍煎紡銆�",
    invalidWidth: "瀹藉害蹇呴』涓烘暟瀛椼€�",
    invalidHeight: "楂樺害蹇呴』涓烘暟瀛椼€�",
    invalidBorder: "杈规蹇呴』涓烘暟瀛椼€�",
    invalidUrl: "璇疯緭鍏ユ湁鏁堢殑URL鍦板潃銆�",
    invalidRows: "琛屾暟涓哄繀閫夐」锛屽彧鍏佽杈撳叆澶т簬0鐨勬暟瀛椼€�",
    invalidCols: "鍒楁暟涓哄繀閫夐」锛屽彧鍏佽杈撳叆澶т簬0鐨勬暟瀛椼€�",
    invalidPadding: "杈硅窛蹇呴』涓烘暟瀛椼€�",
    invalidSpacing: "闂磋窛蹇呴』涓烘暟瀛椼€�",
    invalidJson: "鏈嶅姟鍣ㄥ彂鐢熸晠闅溿€�",
    uploadSuccess: "涓婁紶鎴愬姛銆�",
    cutError: "鎮ㄧ殑娴忚鍣ㄥ畨鍏ㄨ缃笉鍏佽浣跨敤鍓垏鎿嶄綔锛岃浣跨敤蹇嵎閿�(Ctrl+X)鏉ュ畬鎴愩€�",
    copyError: "鎮ㄧ殑娴忚鍣ㄥ畨鍏ㄨ缃笉鍏佽浣跨敤澶嶅埗鎿嶄綔锛岃浣跨敤蹇嵎閿�(Ctrl+C)鏉ュ畬鎴愩€�",
    pasteError: "鎮ㄧ殑娴忚鍣ㄥ畨鍏ㄨ缃笉鍏佽浣跨敤绮樿创鎿嶄綔锛岃浣跨敤蹇嵎閿�(Ctrl+V)鏉ュ畬鎴愩€�",
    ajaxLoading: "鍔犺浇涓紝璇风◢鍊� ...",
    uploadLoading: "涓婁紶涓紝璇风◢鍊� ...",
    uploadError: "涓婁紶閿欒",
    "plainpaste.comment": "璇蜂娇鐢ㄥ揩鎹烽敭(Ctrl+V)鎶婂唴瀹圭矘璐村埌涓嬮潰鐨勬柟妗嗛噷銆�",
    "wordpaste.comment": "璇蜂娇鐢ㄥ揩鎹烽敭(Ctrl+V)鎶婂唴瀹圭矘璐村埌涓嬮潰鐨勬柟妗嗛噷銆�",
    "code.pleaseInput": "璇疯緭鍏ョ▼搴忎唬鐮併€�",
    "link.url": "URL",
    "link.linkType": "鎵撳紑绫诲瀷",
    "link.newWindow": "鏂扮獥鍙�",
    "link.selfWindow": "褰撳墠绐楀彛",
    "flash.url": "URL",
    "flash.width": "瀹藉害",
    "flash.height": "楂樺害",
    "flash.upload": "涓婁紶",
    "flash.viewServer": "鏂囦欢绌洪棿",
    "media.url": "URL",
    "media.width": "瀹藉害",
    "media.height": "楂樺害",
    "media.autostart": "鑷姩鎾斁",
    "media.upload": "涓婁紶",
    "media.viewServer": "鏂囦欢绌洪棿",
    "image.remoteImage": "缃戠粶鍥剧墖",
    "image.localImage": "鏈湴涓婁紶",
    "image.remoteUrl": "鍥剧墖鍦板潃",
    "image.localUrl": "涓婁紶鏂囦欢",
    "image.size": "鍥剧墖澶у皬",
    "image.width": "瀹�",
    "image.height": "楂�",
    "image.resetSize": "閲嶇疆澶у皬",
    "image.align": "瀵归綈鏂瑰紡",
    "image.defaultAlign": "榛樿鏂瑰紡",
    "image.leftAlign": "宸﹀榻�",
    "image.rightAlign": "鍙冲榻�",
    "image.imgTitle": "鍥剧墖璇存槑",
    "image.upload": "娴忚...",
    "image.viewServer": "鍥剧墖绌洪棿",
    "multiimage.uploadDesc": "鍏佽鐢ㄦ埛鍚屾椂涓婁紶<%=uploadLimit%>寮犲浘鐗囷紝鍗曞紶鍥剧墖瀹归噺涓嶈秴杩�<%=sizeLimit%>",
    "multiimage.startUpload": "寮€濮嬩笂浼�",
    "multiimage.clearAll": "鍏ㄩ儴娓呯┖",
    "multiimage.insertAll": "鍏ㄩ儴鎻掑叆",
    "multiimage.queueLimitExceeded": "鏂囦欢鏁伴噺瓒呰繃闄愬埗銆�",
    "multiimage.fileExceedsSizeLimit": "鏂囦欢澶у皬瓒呰繃闄愬埗銆�",
    "multiimage.zeroByteFile": "鏃犳硶涓婁紶绌烘枃浠躲€�",
    "multiimage.invalidFiletype": "鏂囦欢绫诲瀷涓嶆纭€�",
    "multiimage.unknownError": "鍙戠敓寮傚父锛屾棤娉曚笂浼犮€�",
    "multiimage.pending": "绛夊緟涓婁紶",
    "multiimage.uploadError": "涓婁紶澶辫触",
    "filemanager.emptyFolder": "绌烘枃浠跺す",
    "filemanager.moveup": "绉诲埌涓婁竴绾ф枃浠跺す",
    "filemanager.viewType": "鏄剧ず鏂瑰紡锛�",
    "filemanager.viewImage": "缂╃暐鍥�",
    "filemanager.listImage": "璇︾粏淇℃伅",
    "filemanager.orderType": "鎺掑簭鏂瑰紡锛�",
    "filemanager.fileName": "鍚嶇О",
    "filemanager.fileSize": "澶у皬",
    "filemanager.fileType": "绫诲瀷",
    "insertfile.url": "URL",
    "insertfile.title": "鏂囦欢璇存槑",
    "insertfile.upload": "涓婁紶",
    "insertfile.viewServer": "鏂囦欢绌洪棿",
    "table.cells": "鍗曞厓鏍兼暟",
    "table.rows": "琛屾暟",
    "table.cols": "鍒楁暟",
    "table.size": "澶у皬",
    "table.width": "瀹藉害",
    "table.height": "楂樺害",
    "table.percent": "%",
    "table.px": "px",
    "table.space": "杈硅窛闂磋窛",
    "table.padding": "杈硅窛",
    "table.spacing": "闂磋窛",
    "table.align": "瀵归綈鏂瑰紡",
    "table.textAlign": "姘村钩瀵归綈",
    "table.verticalAlign": "鍨傜洿瀵归綈",
    "table.alignDefault": "榛樿",
    "table.alignLeft": "宸﹀榻�",
    "table.alignCenter": "灞呬腑",
    "table.alignRight": "鍙冲榻�",
    "table.alignTop": "椤堕儴",
    "table.alignMiddle": "涓儴",
    "table.alignBottom": "搴曢儴",
    "table.alignBaseline": "鍩虹嚎",
    "table.border": "杈规",
    "table.borderWidth": "杈规",
    "table.borderColor": "棰滆壊",
    "table.backgroundColor": "鑳屾櫙棰滆壊",
    "map.address": "鍦板潃: ",
    "map.search": "鎼滅储",
    "baidumap.address": "鍦板潃: ",
    "baidumap.search": "鎼滅储",
    "baidumap.insertDynamicMap": "鎻掑叆鍔ㄦ€佸湴鍥�",
    "anchor.name": "閿氱偣鍚嶇О",
    "formatblock.formatBlock": {h1: "鏍囬 1", h2: "鏍囬 2", h3: "鏍囬 3", h4: "鏍囬 4", p: "姝� 鏂�"},
    "fontname.fontName": {
        SimSun: "瀹嬩綋",
        NSimSun: "鏂板畫浣�",
        FangSong_GB2312: "浠垮畫_GB2312",
        KaiTi_GB2312: "妤蜂綋_GB2312",
        SimHei: "榛戜綋",
        "Microsoft YaHei": "寰蒋闆呴粦",
        Arial: "Arial",
        "Arial Black": "Arial Black",
        "Times New Roman": "Times New Roman",
        "Courier New": "Courier New",
        Tahoma: "Tahoma",
        Verdana: "Verdana"
    },
    "lineheight.lineHeight": [{1: "鍗曞€嶈璺�"}, {1.5: "1.5鍊嶈璺�"}, {2: "2鍊嶈璺�"}, {2.5: "2.5鍊嶈璺�"}, {3: "3鍊嶈璺�"}],
    "template.selectTemplate": "鍙€夋ā鏉�",
    "template.replaceContent": "鏇挎崲褰撳墠鍐呭",
    "template.fileList": {"1.html": "鍥剧墖鍜屾枃瀛�", "2.html": "琛ㄦ牸", "3.html": "椤圭洰缂栧彿"}
}, "zh-CN"), KindEditor.options.langType = "zh-CN", KindEditor.plugin("anchor", function (e) {
    var t = this, n = "anchor", i = t.lang(n + ".");
    t.plugin.anchor = {
        edit: function () {
            var a = ['<div style="padding:20px;">', '<div class="ke-dialog-row">', '<label for="keName">' + i.name + "</label>", '<input class="ke-input-text" type="text" id="keName" name="name" value="" style="width:100px;" />', "</div>", "</div>"].join(""),
                o = t.createDialog({
                    name: n,
                    width: 300,
                    title: t.lang(n),
                    body: a,
                    yesBtn: {
                        name: t.lang("yes"), click: function (e) {
                            t.insertHtml('<a name="' + l.val() + '">').hideDialog().focus()
                        }
                    }
                }), r = o.div, l = e('input[name="name"]', r), s = t.plugin.getSelectedAnchor();
            s && l.val(unescape(s.attr("data-ke-name"))), l[0].focus(), l[0].select()
        }, "delete": function () {
            t.plugin.getSelectedAnchor().remove()
        }
    }, t.clickToolbar(n, t.plugin.anchor.edit)
}), KindEditor.plugin("autoheight", function (e) {
    function t() {
        var e = a.edit, t = e.doc.body;
        e.iframe[0].scroll = "no", t.style.overflowY = "hidden"
    }

    function n() {
        var t = a.edit, n = t.doc.body;
        t.iframe.height(o), a.resize(null, Math.max((e.IE ? n.scrollHeight : n.offsetHeight) + 76, o))
    }

    function i() {
        o = e.removeUnit(a.height), a.edit.afterChange(n), t(), n()
    }

    var a = this;
    if (a.autoHeightMode) {
        var o;
        a.isCreated ? i() : a.afterCreate(i)
    }
}), KindEditor.plugin("baidumap", function (e) {
    var t = this, n = "baidumap", i = t.lang(n + "."), a = e.undef(t.mapWidth, 558), o = e.undef(t.mapHeight, 360);
    t.clickToolbar(n, function () {
        function r() {
            l = m[0].contentWindow, s = e.iframeDoc(m)
        }

        var l, s,
            d = ['<div style="padding:10px 20px;">', '<div class="ke-header">', '<div class="ke-left">', i.address + ' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ', '<span class="ke-button-common ke-button-outer">', '<input type="button" name="searchBtn" class="ke-button-common ke-button" value="' + i.search + '" />', "</span>", "</div>", '<div class="ke-right">', '<input type="checkbox" id="keInsertDynamicMap" name="insertDynamicMap" value="1" /> <label for="keInsertDynamicMap">' + i.insertDynamicMap + "</label>", "</div>", '<div class="ke-clearfix"></div>', "</div>", '<div class="ke-map" style="width:' + a + "px;height:" + o + 'px;"></div>', "</div>"].join(""),
            c = t.createDialog({
                name: n,
                width: a + 42,
                title: t.lang(n),
                body: d,
                yesBtn: {
                    name: t.lang("yes"), click: function (e) {
                        var n = l.map, i = n.getCenter(), r = i.lng + "," + i.lat, s = n.getZoom(),
                            d = [f[0].checked ? t.pluginsPath + "baidumap/index.html" : "http://api.map.baidu.com/staticimage", "?center=" + encodeURIComponent(r), "&zoom=" + encodeURIComponent(s), "&width=" + a, "&height=" + o, "&markers=" + encodeURIComponent(r), "&markerStyles=" + encodeURIComponent("l,A")].join("");
                        f[0].checked ? t.insertHtml('<iframe src="' + d + '" frameborder="0" style="width:' + (a + 2) + "px;height:" + (o + 2) + 'px;"></iframe>') : t.exec("insertimage", d), t.hideDialog().focus()
                    }
                },
                beforeRemove: function () {
                    h.remove(), s && s.write(""), m.remove()
                }
            }), u = c.div, p = e('[name="address"]', u), h = e('[name="searchBtn"]', u),
            f = e('[name="insertDynamicMap"]', c.div),
            m = e('<iframe class="ke-textarea" frameborder="0" src="' + t.pluginsPath + 'baidumap/map.html" style="width:' + a + "px;height:" + o + 'px;"></iframe>');
        m.bind("load", function () {
            m.unbind("load"), e.IE ? r() : setTimeout(r, 0)
        }), e(".ke-map", u).replaceWith(m), h.click(function () {
            l.search(p.val())
        })
    })
}), KindEditor.plugin("map", function (e) {
    var t = this, n = "map", i = t.lang(n + ".");
    t.clickToolbar(n, function () {
        function a() {
            o = p[0].contentWindow, r = e.iframeDoc(p)
        }

        var o, r,
            l = ['<div style="padding:10px 20px;">', '<div class="ke-dialog-row">', i.address + ' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ', '<span class="ke-button-common ke-button-outer">', '<input type="button" name="searchBtn" class="ke-button-common ke-button" value="' + i.search + '" />', "</span>", "</div>", '<div class="ke-map" style="width:558px;height:360px;"></div>', "</div>"].join(""),
            s = t.createDialog({
                name: n,
                width: 600,
                title: t.lang(n),
                body: l,
                yesBtn: {
                    name: t.lang("yes"), click: function (e) {
                        var n = (o.geocoder, o.map), i = n.getCenter().lat() + "," + n.getCenter().lng(),
                            a = n.getZoom(), r = n.getMapTypeId(), l = "http://maps.googleapis.com/maps/api/staticmap";
                        l += "?center=" + encodeURIComponent(i), l += "&zoom=" + encodeURIComponent(a), l += "&size=558x360", l += "&maptype=" + encodeURIComponent(r), l += "&markers=" + encodeURIComponent(i), l += "&language=" + t.langType, l += "&sensor=false", t.exec("insertimage", l).hideDialog().focus()
                    }
                },
                beforeRemove: function () {
                    u.remove(), r && r.write(""), p.remove()
                }
            }), d = s.div, c = e('[name="address"]', d), u = e('[name="searchBtn"]', d),
            p = (["<!doctype html><html><head>", '<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />', "<style>", "	html { height: 100% }", "	body { height: 100%; margin: 0; padding: 0; background-color: #FFF }", "	#map_canvas { height: 100% }", "</style>", '<script src="http://maps.googleapis.com/maps/api/js?sensor=false&language=' + t.langType + '"></script>', "<script>", "var map, geocoder;", "function initialize() {", "	var latlng = new google.maps.LatLng(31.230393, 121.473704);", "	var options = {", "		zoom: 11,", "		center: latlng,", "		disableDefaultUI: true,", "		panControl: true,", "		zoomControl: true,", "		mapTypeControl: true,", "		scaleControl: true,", "		streetViewControl: false,", "		overviewMapControl: true,", "		mapTypeId: google.maps.MapTypeId.ROADMAP", "	};", '	map = new google.maps.Map(document.getElementById("map_canvas"), options);', "	geocoder = new google.maps.Geocoder();", "	geocoder.geocode({latLng: latlng}, function(results, status) {", "		if (status == google.maps.GeocoderStatus.OK) {", "			if (results[3]) {", '				parent.document.getElementById("kindeditor_plugin_map_address").value = results[3].formatted_address;', "			}", "		}", "	});", "}", "function search(address) {", "	if (!map) return;", "	geocoder.geocode({address : address}, function(results, status) {", "		if (status == google.maps.GeocoderStatus.OK) {", "			map.setZoom(11);", "			map.setCenter(results[0].geometry.location);", "			var marker = new google.maps.Marker({", "				map: map,", "				position: results[0].geometry.location", "			});", "		} else {", '			alert("Invalid address: " + address);', "		}", "	});", "}", "</script>", "</head>", '<body onload="initialize();">', '<div id="map_canvas" style="width:100%; height:100%"></div>', "</body></html>"].join("\n"), e('<iframe class="ke-textarea" frameborder="0" src="' + t.pluginsPath + 'map/map.html" style="width:558px;height:360px;"></iframe>'));
        p.bind("load", function () {
            p.unbind("load"), e.IE ? a() : setTimeout(a, 0)
        }), e(".ke-map", d).replaceWith(p), u.click(function () {
            o.search(c.val())
        })
    })
}), KindEditor.plugin("clearhtml", function (e) {
    var t = this, n = "clearhtml";
    t.clickToolbar(n, function () {
        t.focus();
        var n = t.html();
        n = n.replace(/(<script[^>]*>)([\s\S]*?)(<\/script>)/gi, ""), n = n.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, ""), n = e.formatHtml(n, {
            a: ["href", "target"],
            embed: ["src", "width", "height", "type", "loop", "autostart", "quality", ".width", ".height", "align", "allowscriptaccess"],
            img: ["src", "width", "height", "border", "alt", "title", ".width", ".height"],
            table: ["border"],
            "td,th": ["rowspan", "colspan"],
            "div,hr,br,tbody,tr,p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6": []
        }), t.html(n), t.cmd.selection(!0), t.addBookmark()
    })
}), KindEditor.plugin("code", function (e) {
    var t = this, n = "code";
    t.clickToolbar(n, function () {
        var i = t.lang(n + "."),
            a = ['<div style="padding:10px 20px;">', '<div class="ke-dialog-row">', '<select class="ke-code-type">', '<option value="js">JavaScript</option>', '<option value="html">HTML</option>', '<option value="css">CSS</option>', '<option value="php">PHP</option>', '<option value="pl">Perl</option>', '<option value="py">Python</option>', '<option value="rb">Ruby</option>', '<option value="java">Java</option>', '<option value="vb">ASP/VB</option>', '<option value="cpp">C/C++</option>', '<option value="cs">C#</option>', '<option value="xml">XML</option>', '<option value="bsh">Shell</option>', '<option value="">Other</option>', "</select>", "</div>", '<textarea class="ke-textarea" style="width:408px;height:260px;"></textarea>', "</div>"].join(""),
            o = t.createDialog({
                name: n,
                width: 450,
                title: t.lang(n),
                body: a,
                yesBtn: {
                    name: t.lang("yes"), click: function (n) {
                        var a = e(".ke-code-type", o.div).val(), l = r.val(), s = "" === a ? "" : " lang-" + a,
                            d = '<pre class="prettyprint' + s + '">\n' + e.escape(l) + "</pre> ";
                        return "" === e.trim(l) ? (alert(i.pleaseInput), void r[0].focus()) : void t.insertHtml(d).hideDialog().focus()
                    }
                }
            }), r = e("textarea", o.div);
        r[0].focus()
    })
}), KindEditor.plugin("emoticons", function (e) {
    var t = this, n = "emoticons", i = t.emoticonsPath || t.pluginsPath + "emoticons/images/",
        a = void 0 === t.allowPreviewEmoticons ? !0 : t.allowPreviewEmoticons, o = 1;
    t.clickToolbar(n, function () {
        function r(n, a, o) {
            k ? n.mouseover(function () {
                a > v ? (k.css("left", 0), k.css("right", "")) : (k.css("left", ""), k.css("right", 0)), w.attr("src", i + o + ".gif"), e(this).addClass("ke-on")
            }) : n.mouseover(function () {
                e(this).addClass("ke-on")
            }), n.mouseout(function () {
                e(this).removeClass("ke-on")
            }), n.click(function (e) {
                t.insertHtml('<img src="' + i + o + '.gif" border="0" alt="" />').hideMenu().focus(), e.stop()
            })
        }

        function l(t, n) {
            var a = document.createElement("table");
            n.append(a), k && (e(a).mouseover(function () {
                k.show("block")
            }), e(a).mouseout(function () {
                k.hide()
            }), b.push(e(a))), a.className = "ke-table", a.cellPadding = 0, a.cellSpacing = 0, a.border = 0;
            for (var o = (t - 1) * m + f, l = 0; u > l; l++) for (var s = a.insertRow(l), d = 0; p > d; d++) {
                var c = e(s.insertCell(d));
                c.addClass("ke-cell"), r(c, d, o);
                var h = e('<span class="ke-img"></span>').css("background-position", "-" + 24 * o + "px 0px").css("background-image", "url(" + i + "static.gif)");
                c.append(h), b.push(c), o++
            }
            return a
        }

        function s() {
            e.each(b, function () {
                this.unbind()
            })
        }

        function d(e, t) {
            e.click(function (e) {
                s(), E.parentNode.removeChild(E), S.remove(), E = l(t, _), c(t), o = t, e.stop()
            })
        }

        function c(t) {
            S = e('<div class="ke-page"></div>'), _.append(S);
            for (var n = 1; g >= n; n++) {
                if (t !== n) {
                    var i = e('<a href="javascript:;">[' + n + "]</a>");
                    d(i, n), S.append(i), b.push(i)
                } else S.append(e("@[" + n + "]"));
                S.append(e("@&nbsp;"))
            }
        }

        var u = 5, p = 9, h = 135, f = 0, m = u * p, g = Math.ceil(h / m), v = Math.floor(p / 2),
            _ = e('<div class="ke-plugin-emoticons"></div>'), b = [], y = t.createMenu({
                name: n, beforeRemove: function () {
                    s()
                }
            });
        y.div.append(_);
        var k, w;
        a && (k = e('<div class="ke-preview"></div>').css("right", 0), w = e('<img class="ke-preview-img" src="' + i + f + '.gif" />'), _.append(k), k.append(w));
        var S, E = l(o, _);
        c(o)
    })
}), KindEditor.plugin("filemanager", function (e) {
    function t(e, t, n) {
        return e + " (" + Math.ceil(t / 1024) + "KB, " + n + ")"
    }

    function n(e, n) {
        n.is_dir ? e.attr("title", n.filename) : e.attr("title", t(n.filename, n.filesize, n.datetime))
    }

    var i = this, a = "filemanager", o = e.undef(i.fileManagerJson, i.basePath + "php/file_manager_json.php"),
        r = i.pluginsPath + a + "/images/", l = i.lang(a + ".");
    i.plugin.filemanagerDialog = function (t) {
        function s(t, n, a) {
            var r = "path=" + t + "&order=" + n + "&dir=" + m;
            b.showLoading(i.lang("ajaxLoading")), e.ajax(e.addParam(o, r + "&" + (new Date).getTime()), function (e) {
                b.hideLoading(), a(e)
            })
        }

        function d(t, n, i, a) {
            var o = e.formatUrl(n.current_url + i.filename, "absolute"),
                r = encodeURIComponent(n.current_dir_path + i.filename + "/");
            i.is_dir ? t.click(function (e) {
                s(r, E.val(), a)
            }) : i.is_photo ? t.click(function (e) {
                v.call(this, o, i.filename)
            }) : t.click(function (e) {
                v.call(this, o, i.filename)
            }), C.push(t)
        }

        function c(t, n) {
            function i() {
                "VIEW" == S.val() ? s(t.current_dir_path, E.val(), p) : s(t.current_dir_path, E.val(), u)
            }

            e.each(C, function () {
                this.unbind()
            }), w.unbind(), S.unbind(), E.unbind(), t.current_dir_path && w.click(function (e) {
                s(t.moveup_dir_path, E.val(), n)
            }), S.change(i), E.change(i), k.html("")
        }

        function u(t) {
            c(t, u);
            var n = document.createElement("table");
            n.className = "ke-table", n.cellPadding = 0, n.cellSpacing = 0, n.border = 0, k.append(n);
            for (var i = t.file_list, a = 0, o = i.length; o > a; a++) {
                var s = i[a], p = e(n.insertRow(a));
                p.mouseover(function (t) {
                    e(this).addClass("ke-on")
                }).mouseout(function (t) {
                    e(this).removeClass("ke-on")
                });
                var h = r + (s.is_dir ? "folder-16.gif" : "file-16.gif"),
                    f = e('<img src="' + h + '" width="16" height="16" alt="' + s.filename + '" align="absmiddle" />'),
                    m = e(p[0].insertCell(0)).addClass("ke-cell ke-name").append(f).append(document.createTextNode(" " + s.filename));
                !s.is_dir || s.has_file ? (p.css("cursor", "pointer"), m.attr("title", s.filename), d(m, t, s, u)) : m.attr("title", l.emptyFolder), e(p[0].insertCell(1)).addClass("ke-cell ke-size").html(s.is_dir ? "-" : Math.ceil(s.filesize / 1024) + "KB"), e(p[0].insertCell(2)).addClass("ke-cell ke-datetime").html(s.datetime)
            }
        }

        function p(t) {
            c(t, p);
            for (var i = t.file_list, a = 0, o = i.length; o > a; a++) {
                var s = i[a], u = e('<div class="ke-inline-block ke-item"></div>');
                k.append(u);
                var h = e('<div class="ke-inline-block ke-photo"></div>').mouseover(function (t) {
                    e(this).addClass("ke-on")
                }).mouseout(function (t) {
                    e(this).removeClass("ke-on")
                });
                u.append(h);
                var f = t.current_url + s.filename,
                    m = s.is_dir ? r + "folder-64.gif" : s.is_photo ? f : r + "file-64.gif",
                    g = e('<img src="' + m + '" width="80" height="80" alt="' + s.filename + '" />');
                !s.is_dir || s.has_file ? (h.css("cursor", "pointer"), n(h, s), d(h, t, s, p)) : h.attr("title", l.emptyFolder), h.append(g), u.append('<div class="ke-name" title="' + s.filename + '">' + s.filename + "</div>")
            }
        }

        var h = e.undef(t.width, 650), f = e.undef(t.height, 510), m = e.undef(t.dirName, ""),
            g = e.undef(t.viewType, "VIEW").toUpperCase(), v = t.clickFn,
            _ = ['<div style="padding:10px 20px;">', '<div class="ke-plugin-filemanager-header">', '<div class="ke-left">', '<img class="ke-inline-block" name="moveupImg" src="' + r + 'go-up.gif" width="16" height="16" border="0" alt="" /> ', '<a class="ke-inline-block" name="moveupLink" href="javascript:;">' + l.moveup + "</a>", "</div>", '<div class="ke-right">', l.viewType + ' <select class="ke-inline-block" name="viewType">', '<option value="VIEW">' + l.viewImage + "</option>", '<option value="LIST">' + l.listImage + "</option>", "</select> ", l.orderType + ' <select class="ke-inline-block" name="orderType">', '<option value="NAME">' + l.fileName + "</option>", '<option value="SIZE">' + l.fileSize + "</option>", '<option value="TYPE">' + l.fileType + "</option>", "</select>", "</div>", '<div class="ke-clearfix"></div>', "</div>", '<div class="ke-plugin-filemanager-body"></div>', "</div>"].join(""),
            b = i.createDialog({name: a, width: h, height: f, title: i.lang(a), body: _}), y = b.div,
            k = e(".ke-plugin-filemanager-body", y), w = (e('[name="moveupImg"]', y), e('[name="moveupLink"]', y)),
            S = (e('[name="viewServer"]', y), e('[name="viewType"]', y)), E = e('[name="orderType"]', y), C = [];
        return S.val(g), s("", E.val(), "VIEW" == g ? p : u), b
    }
}), KindEditor.plugin("flash", function (e) {
    var t = this, n = "flash", i = t.lang(n + "."), a = e.undef(t.allowFlashUpload, !0),
        o = e.undef(t.allowFileManager, !1), r = e.undef(t.formatUploadUrl, !0),
        l = e.undef(t.extraFileUploadParams, {}), s = e.undef(t.filePostName, "imgFile"),
        d = e.undef(t.uploadJson, t.basePath + "php/upload_json.php");
    t.plugin.flash = {
        edit: function () {
            var c = ['<div style="padding:20px;">', '<div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' + i.url + "</label>", '<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + i.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + i.viewServer + '" />', "</span>", "</div>", '<div class="ke-dialog-row">', '<label for="keWidth" style="width:60px;">' + i.width + "</label>", '<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" /> ', "</div>", '<div class="ke-dialog-row">', '<label for="keHeight" style="width:60px;">' + i.height + "</label>", '<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" /> ', "</div>", "</div>"].join(""),
                u = t.createDialog({
                    name: n,
                    width: 450,
                    title: t.lang(n),
                    body: c,
                    yesBtn: {
                        name: t.lang("yes"), click: function (n) {
                            var i = e.trim(h.val()), a = m.val(), o = g.val();
                            if ("http://" == i || e.invalidUrl(i)) return alert(t.lang("invalidUrl")), void h[0].focus();
                            if (!/^\d*$/.test(a)) return alert(t.lang("invalidWidth")), void m[0].focus();
                            if (!/^\d*$/.test(o)) return alert(t.lang("invalidHeight")), void g[0].focus();
                            var r = e.mediaImg(t.themesPath + "common/blank.gif", {
                                src: i,
                                type: e.mediaType(".swf"),
                                width: a,
                                height: o,
                                quality: "high"
                            });
                            t.insertHtml(r).hideDialog().focus()
                        }
                    }
                }), p = u.div, h = e('[name="url"]', p), f = e('[name="viewServer"]', p), m = e('[name="width"]', p),
                g = e('[name="height"]', p);
            if (h.val("http://"), a) {
                var v = e.uploadbutton({
                    button: e(".ke-upload-button", p)[0],
                    fieldName: s,
                    extraParams: l,
                    url: e.addParam(d, "dir=flash"),
                    afterUpload: function (i) {
                        if (u.hideLoading(), 0 === i.error) {
                            var a = i.url;
                            r && (a = e.formatUrl(a, "absolute")), h.val(a), t.afterUpload && t.afterUpload.call(t, a, i, n), alert(t.lang("uploadSuccess"))
                        } else alert(i.message)
                    },
                    afterError: function (e) {
                        u.hideLoading(), t.errorDialog(e)
                    }
                });
                v.fileBox.change(function (e) {
                    u.showLoading(t.lang("uploadLoading")), v.submit()
                })
            } else e(".ke-upload-button", p).hide();
            o ? f.click(function (n) {
                t.loadPlugin("filemanager", function () {
                    t.plugin.filemanagerDialog({
                        viewType: "LIST", dirName: "flash", clickFn: function (n, i) {
                            t.dialogs.length > 1 && (e('[name="url"]', p).val(n), t.afterSelectFile && t.afterSelectFile.call(t, n), t.hideDialog())
                        }
                    })
                })
            }) : f.hide();
            var _ = t.plugin.getSelectedFlash();
            if (_) {
                var b = e.mediaAttrs(_.attr("data-ke-tag"));
                h.val(b.src), m.val(e.removeUnit(_.css("width")) || b.width || 0), g.val(e.removeUnit(_.css("height")) || b.height || 0)
            }
            h[0].focus(), h[0].select()
        }, "delete": function () {
            t.plugin.getSelectedFlash().remove(), t.addBookmark()
        }
    }, t.clickToolbar(n, t.plugin.flash.edit)
}), KindEditor.plugin("image", function (e) {
    var t = this, n = "image", i = e.undef(t.allowImageUpload, !0), a = e.undef(t.allowImageRemote, !0),
        o = e.undef(t.formatUploadUrl, !0), r = e.undef(t.allowFileManager, !1),
        l = e.undef(t.uploadJson, t.basePath + "php/upload_json.php"), s = e.undef(t.imageTabIndex, 0),
        d = t.pluginsPath + "image/images/", c = e.undef(t.extraFileUploadParams, {}),
        u = e.undef(t.filePostName, "imgFile"), p = e.undef(t.fillDescAfterUploadImage, !1), h = t.lang(n + ".");
    t.plugin.imageDialog = function (i) {
        function a(e, t) {
            U.val(e), A.val(t), R = e, M = t
        }

        var s = (i.imageUrl, e.undef(i.imageWidth, ""), e.undef(i.imageHeight, ""), e.undef(i.imageTitle, ""), e.undef(i.imageAlign, ""), e.undef(i.showRemote, !0)),
            f = e.undef(i.showLocal, !0), m = e.undef(i.tabIndex, 0), g = i.clickFn,
            v = "kindeditor_upload_iframe_" + (new Date).getTime(), _ = [];
        for (var b in c) _.push('<input type="hidden" name="' + b + '" value="' + c[b] + '" />');
        var y,
            k = ['<div style="padding:20px;">', '<div class="tabs"></div>', '<div class="tab1" style="display:none;">', '<div class="ke-dialog-row">', '<label for="remoteUrl" style="width:60px;">' + h.remoteUrl + "</label>", '<input type="text" id="remoteUrl" class="ke-input-text" name="url" value="" style="width:200px;" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + h.viewServer + '" />', "</span>", "</div>", '<div class="ke-dialog-row">', '<label for="remoteWidth" style="width:60px;">' + h.size + "</label>", h.width + ' <input type="text" id="remoteWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> ', h.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> ', '<img class="ke-refresh-btn" src="' + d + 'refresh.png" width="16" height="16" alt="" style="cursor:pointer;" title="' + h.resetSize + '" />', "</div>", '<div class="ke-dialog-row">', '<label style="width:60px;">' + h.align + "</label>", '<input type="radio" name="align" class="ke-inline-block" value="" checked="checked" /> <img name="defaultImg" src="' + d + 'align_top.gif" width="23" height="25" alt="" />', ' <input type="radio" name="align" class="ke-inline-block" value="left" /> <img name="leftImg" src="' + d + 'align_left.gif" width="23" height="25" alt="" />', ' <input type="radio" name="align" class="ke-inline-block" value="right" /> <img name="rightImg" src="' + d + 'align_right.gif" width="23" height="25" alt="" />', "</div>", '<div class="ke-dialog-row">', '<label for="remoteTitle" style="width:60px;">' + h.imgTitle + "</label>", '<input type="text" id="remoteTitle" class="ke-input-text" name="title" value="" style="width:200px;" />', "</div>", "</div>", '<div class="tab2" style="display:none;">', '<iframe name="' + v + '" style="display:none;"></iframe>', '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + v + '" action="' + e.addParam(l, "dir=image") + '">', '<div class="ke-dialog-row">', _.join(""), '<label style="width:60px;">' + h.localUrl + "</label>", '<input type="text" name="localUrl" class="ke-input-text" tabindex="-1" style="width:200px;" readonly="true" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + h.upload + '" />', "</div>", "</form>", "</div>", "</div>"].join(""),
            w = 320, S = f && s ? 300 : 250, E = t.createDialog({
                name: n,
                width: w,
                height: S,
                title: t.lang(n),
                body: k,
                yesBtn: {
                    name: t.lang("yes"), click: function (n) {
                        if (!E.isLoading) {
                            if (f && s && y && 1 === y.selectedIndex || !s) return "" == D.fileBox.val() ? void alert(t.lang("pleaseSelectFile")) : (E.showLoading(t.lang("uploadLoading")), D.submit(), void T.val(""));
                            var i = e.trim(x.val()), a = U.val(), o = A.val(), r = F.val(), l = "";
                            return I.each(function () {
                                return this.checked ? (l = this.value, !1) : void 0
                            }), "http://" == i || e.invalidUrl(i) ? (alert(t.lang("invalidUrl")), void x[0].focus()) : /^\d*$/.test(a) ? /^\d*$/.test(o) ? void g.call(t, i, r, a, o, 0, l) : (alert(t.lang("invalidHeight")), void A[0].focus()) : (alert(t.lang("invalidWidth")), void U[0].focus())
                        }
                    }
                },
                beforeRemove: function () {
                    K.unbind(), U.unbind(), A.unbind(), N.unbind()
                }
            }), C = E.div, x = e('[name="url"]', C), T = e('[name="localUrl"]', C), K = e('[name="viewServer"]', C),
            U = e('.tab1 [name="width"]', C), A = e('.tab1 [name="height"]', C), N = e(".ke-refresh-btn", C),
            F = e('.tab1 [name="title"]', C), I = e('.tab1 [name="align"]', C);
        s && f ? (y = e.tabs({
            src: e(".tabs", C), afterSelect: function (e) {
            }
        }), y.add({title: h.remoteImage, panel: e(".tab1", C)}), y.add({
            title: h.localImage,
            panel: e(".tab2", C)
        }), y.select(m)) : s ? e(".tab1", C).show() : f && e(".tab2", C).show();
        var D = e.uploadbutton({
            button: e(".ke-upload-button", C)[0],
            fieldName: u,
            form: e(".ke-form", C),
            target: v,
            width: 60,
            afterUpload: function (i) {
                if (E.hideLoading(), 0 === i.error) {
                    var a = i.url;
                    o && (a = e.formatUrl(a, "absolute")), t.afterUpload && t.afterUpload.call(t, a, i, n), p ? (e(".ke-dialog-row #remoteUrl", C).val(a), e(".ke-tabs-li", C)[0].click(), e(".ke-refresh-btn", C).click()) : g.call(t, a, i.title, i.width, i.height, i.border, i.align)
                } else alert(i.message)
            },
            afterError: function (e) {
                E.hideLoading(), t.errorDialog(e)
            }
        });
        D.fileBox.change(function (e) {
            T.val(D.fileBox.val())
        }), r ? K.click(function (n) {
            t.loadPlugin("filemanager", function () {
                t.plugin.filemanagerDialog({
                    viewType: "VIEW", dirName: "image", clickFn: function (n, i) {
                        t.dialogs.length > 1 && (e('[name="url"]', C).val(n), t.afterSelectFile && t.afterSelectFile.call(t, n), t.hideDialog())
                    }
                })
            })
        }) : K.hide();
        var R = 0, M = 0;
        return N.click(function (t) {
            var n = e('<img src="' + x.val() + '" />', document).css({
                position: "absolute",
                visibility: "hidden",
                top: 0,
                left: "-1000px"
            });
            n.bind("load", function () {
                a(n.width(), n.height()), n.remove()
            }), e(document.body).append(n)
        }), U.change(function (e) {
            R > 0 && A.val(Math.round(M / R * parseInt(this.value, 10)))
        }), A.change(function (e) {
            M > 0 && U.val(Math.round(R / M * parseInt(this.value, 10)))
        }), x.val(i.imageUrl), a(i.imageWidth, i.imageHeight), F.val(i.imageTitle), I.each(function () {
            return this.value === i.imageAlign ? (this.checked = !0, !1) : void 0
        }), s && 0 === m && (x[0].focus(), x[0].select()), E
    }, t.plugin.image = {
        edit: function () {
            var e = t.plugin.getSelectedImage();
            t.plugin.imageDialog({
                imageUrl: e ? e.attr("data-ke-src") : "http://",
                imageWidth: e ? e.width() : "",
                imageHeight: e ? e.height() : "",
                imageTitle: e ? e.attr("title") : "",
                imageAlign: e ? e.attr("align") : "",
                showRemote: a,
                showLocal: i,
                tabIndex: e ? 0 : s,
                clickFn: function (n, i, a, o, r, l) {
                    e ? (e.attr("src", n), e.attr("data-ke-src", n), e.attr("width", a), e.attr("height", o), e.attr("title", i), e.attr("align", l), e.attr("alt", i)) : t.exec("insertimage", n, i, a, o, r, l), setTimeout(function () {
                        t.hideDialog().focus()
                    }, 0)
                }
            })
        }, "delete": function () {
            var e = t.plugin.getSelectedImage();
            "a" == e.parent().name && (e = e.parent()), e.remove(), t.addBookmark()
        }
    }, t.clickToolbar(n, t.plugin.image.edit)
}), KindEditor.plugin("insertfile", function (e) {
    var t = this, n = "insertfile", i = e.undef(t.allowFileUpload, !0), a = e.undef(t.allowFileManager, !1),
        o = e.undef(t.formatUploadUrl, !0), r = e.undef(t.uploadJson, t.basePath + "php/upload_json.php"),
        l = e.undef(t.extraFileUploadParams, {}), s = e.undef(t.filePostName, "imgFile"), d = t.lang(n + ".");
    t.plugin.fileDialog = function (c) {
        var u = e.undef(c.fileUrl, "http://"), p = e.undef(c.fileTitle, ""), h = c.clickFn,
            f = ['<div style="padding:20px;">', '<div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' + d.url + "</label>", '<input type="text" id="keUrl" name="url" class="ke-input-text" style="width:160px;" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + d.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + d.viewServer + '" />', "</span>", "</div>", '<div class="ke-dialog-row">', '<label for="keTitle" style="width:60px;">' + d.title + "</label>", '<input type="text" id="keTitle" class="ke-input-text" name="title" value="" style="width:160px;" /></div>', "</div>", "</form>", "</div>"].join(""),
            m = t.createDialog({
                name: n,
                width: 450,
                title: t.lang(n),
                body: f,
                yesBtn: {
                    name: t.lang("yes"), click: function (n) {
                        var i = e.trim(v.val()), a = b.val();
                        return "http://" == i || e.invalidUrl(i) ? (alert(t.lang("invalidUrl")), void v[0].focus()) : ("" === e.trim(a) && (a = i), void h.call(t, i, a))
                    }
                }
            }), g = m.div, v = e('[name="url"]', g), _ = e('[name="viewServer"]', g), b = e('[name="title"]', g);
        if (i) {
            var y = e.uploadbutton({
                button: e(".ke-upload-button", g)[0],
                fieldName: s,
                url: e.addParam(r, "dir=file"),
                extraParams: l,
                afterUpload: function (i) {
                    if (m.hideLoading(), 0 === i.error) {
                        var a = i.url;
                        o && (a = e.formatUrl(a, "absolute")), v.val(a), t.afterUpload && t.afterUpload.call(t, a, i, n), alert(t.lang("uploadSuccess"))
                    } else alert(i.message)
                },
                afterError: function (e) {
                    m.hideLoading(), t.errorDialog(e)
                }
            });
            y.fileBox.change(function (e) {
                m.showLoading(t.lang("uploadLoading")), y.submit()
            })
        } else e(".ke-upload-button", g).hide();
        a ? _.click(function (n) {
            t.loadPlugin("filemanager", function () {
                t.plugin.filemanagerDialog({
                    viewType: "LIST", dirName: "file", clickFn: function (n, i) {
                        t.dialogs.length > 1 && (e('[name="url"]', g).val(n), t.afterSelectFile && t.afterSelectFile.call(t, n), t.hideDialog())
                    }
                })
            })
        }) : _.hide(), v.val(u), b.val(p), v[0].focus(), v[0].select()
    }, t.clickToolbar(n, function () {
        t.plugin.fileDialog({
            clickFn: function (e, n) {
                var i = '<a class="ke-insertfile" href="' + e + '" data-ke-src="' + e + '" target="_blank">' + n + "</a>";
                t.insertHtml(i).hideDialog().focus()
            }
        })
    })
}), KindEditor.plugin("lineheight", function (e) {
    var t = this, n = "lineheight", i = t.lang(n + ".");
    t.clickToolbar(n, function () {
        var a = "", o = t.cmd.commonNode({"*": ".line-height"});
        o && (a = o.css("line-height"));
        var r = t.createMenu({name: n, width: 150});
        e.each(i.lineHeight, function (n, i) {
            e.each(i, function (e, n) {
                r.addItem({
                    title: n, checked: a === e, click: function () {
                        t.cmd.toggle('<span style="line-height:' + e + ';"></span>', {span: ".line-height=" + e}), t.updateState(), t.addBookmark(), t.hideMenu()
                    }
                })
            })
        })
    })
}), KindEditor.plugin("link", function (e) {
    var t = this, n = "link";
    t.plugin.link = {
        edit: function () {
            var i = t.lang(n + "."),
                a = '<div style="padding:20px;"><div class="ke-dialog-row"><label for="keUrl" style="width:60px;">' + i.url + '</label><input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:260px;" /></div><div class="ke-dialog-row""><label for="keType" style="width:60px;">' + i.linkType + '</label><select id="keType" name="type"></select></div></div>',
                o = t.createDialog({
                    name: n,
                    width: 450,
                    title: t.lang(n),
                    body: a,
                    yesBtn: {
                        name: t.lang("yes"), click: function (n) {
                            var i = e.trim(l.val());
                            return "http://" == i || e.invalidUrl(i) ? (alert(t.lang("invalidUrl")), void l[0].focus()) : void t.exec("createlink", i, s.val()).hideDialog().focus()
                        }
                    }
                }), r = o.div, l = e('input[name="url"]', r), s = e('select[name="type"]', r);
            l.val("http://"), s[0].options[0] = new Option(i.newWindow, "_blank"), s[0].options[1] = new Option(i.selfWindow, ""), t.cmd.selection();
            var d = t.plugin.getSelectedLink();
            d && (t.cmd.range.selectNode(d[0]), t.cmd.select(), l.val(d.attr("data-ke-src")), s.val(d.attr("target"))), l[0].focus(), l[0].select()
        }, "delete": function () {
            t.exec("unlink", null)
        }
    }, t.clickToolbar(n, t.plugin.link.edit)
}), KindEditor.plugin("media", function (e) {
    var t = this, n = "media", i = t.lang(n + "."), a = e.undef(t.allowMediaUpload, !0),
        o = e.undef(t.allowFileManager, !1), r = e.undef(t.formatUploadUrl, !0),
        l = e.undef(t.extraFileUploadParams, {}), s = e.undef(t.filePostName, "imgFile"),
        d = e.undef(t.uploadJson, t.basePath + "php/upload_json.php");
    t.plugin.media = {
        edit: function () {
            var c = ['<div style="padding:20px;">', '<div class="ke-dialog-row">', '<label for="keUrl" style="width:60px;">' + i.url + "</label>", '<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;', '<input type="button" class="ke-upload-button" value="' + i.upload + '" /> &nbsp;', '<span class="ke-button-common ke-button-outer">', '<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + i.viewServer + '" />', "</span>", "</div>", '<div class="ke-dialog-row">', '<label for="keWidth" style="width:60px;">' + i.width + "</label>", '<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" />', "</div>", '<div class="ke-dialog-row">', '<label for="keHeight" style="width:60px;">' + i.height + "</label>", '<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" />', "</div>", '<div class="ke-dialog-row">', '<label for="keAutostart">' + i.autostart + "</label>", '<input type="checkbox" id="keAutostart" name="autostart" value="" /> ', "</div>", "</div>"].join(""),
                u = t.createDialog({
                    name: n,
                    width: 450,
                    height: 230,
                    title: t.lang(n),
                    body: c,
                    yesBtn: {
                        name: t.lang("yes"), click: function (n) {
                            var i = e.trim(h.val()), a = m.val(), o = g.val();
                            if ("http://" == i || e.invalidUrl(i)) return alert(t.lang("invalidUrl")), void h[0].focus();
                            if (!/^\d*$/.test(a)) return alert(t.lang("invalidWidth")), void m[0].focus();
                            if (!/^\d*$/.test(o)) return alert(t.lang("invalidHeight")), void g[0].focus();
                            var r = e.mediaImg(t.themesPath + "common/blank.gif", {
                                src: i,
                                type: e.mediaType(i),
                                width: a,
                                height: o,
                                autostart: v[0].checked ? "true" : "false",
                                loop: "true"
                            });
                            t.insertHtml(r).hideDialog().focus()
                        }
                    }
                }), p = u.div, h = e('[name="url"]', p), f = e('[name="viewServer"]', p), m = e('[name="width"]', p),
                g = e('[name="height"]', p), v = e('[name="autostart"]', p);
            if (h.val("http://"), a) {
                var _ = e.uploadbutton({
                    button: e(".ke-upload-button", p)[0],
                    fieldName: s,
                    extraParams: l,
                    url: e.addParam(d, "dir=media"),
                    afterUpload: function (i) {
                        if (u.hideLoading(), 0 === i.error) {
                            var a = i.url;
                            r && (a = e.formatUrl(a, "absolute")), h.val(a), t.afterUpload && t.afterUpload.call(t, a, i, n), alert(t.lang("uploadSuccess"))
                        } else alert(i.message)
                    },
                    afterError: function (e) {
                        u.hideLoading(), t.errorDialog(e)
                    }
                });
                _.fileBox.change(function (e) {
                    u.showLoading(t.lang("uploadLoading")), _.submit()
                })
            } else e(".ke-upload-button", p).hide();
            o ? f.click(function (n) {
                t.loadPlugin("filemanager", function () {
                    t.plugin.filemanagerDialog({
                        viewType: "LIST", dirName: "media", clickFn: function (n, i) {
                            t.dialogs.length > 1 && (e('[name="url"]', p).val(n), t.afterSelectFile && t.afterSelectFile.call(t, n), t.hideDialog())
                        }
                    })
                })
            }) : f.hide();
            var b = t.plugin.getSelectedMedia();
            if (b) {
                var y = e.mediaAttrs(b.attr("data-ke-tag"));
                h.val(y.src), m.val(e.removeUnit(b.css("width")) || y.width || 0), g.val(e.removeUnit(b.css("height")) || y.height || 0), v[0].checked = "true" === y.autostart
            }
            h[0].focus(), h[0].select()
        }, "delete": function () {
            t.plugin.getSelectedMedia().remove(), t.addBookmark()
        }
    }, t.clickToolbar(n, t.plugin.media.edit)
}), function (e) {
    function t(e) {
        this.init(e)
    }

    e.extend(t, {
        init: function (t) {
            function n(t, n) {
                e(".ke-status > div", t).hide(), e(".ke-message", t).addClass("ke-error").show().html(e.escape(n))
            }

            var i = this;
            t.afterError = t.afterError || function (e) {
                alert(e)
            }, i.options = t, i.progressbars = {}, i.div = e(t.container).html(['<div class="ke-swfupload">', '<div class="ke-swfupload-top">', '<div class="ke-inline-block ke-swfupload-button">', '<input type="button" value="Browse" />', "</div>", '<div class="ke-inline-block ke-swfupload-desc">' + t.uploadDesc + "</div>", '<span class="ke-button-common ke-button-outer ke-swfupload-startupload">', '<input type="button" class="ke-button-common ke-button" value="' + t.startButtonValue + '" />', "</span>", "</div>", '<div class="ke-swfupload-body"></div>', "</div>"].join("")), i.bodyDiv = e(".ke-swfupload-body", i.div);
            var a = {
                debug: !1,
                upload_url: t.uploadUrl,
                flash_url: t.flashUrl,
                file_post_name: t.filePostName,
                button_placeholder: e(".ke-swfupload-button > input", i.div)[0],
                button_image_url: t.buttonImageUrl,
                button_width: t.buttonWidth,
                button_height: t.buttonHeight,
                button_cursor: SWFUpload.CURSOR.HAND,
                file_types: t.fileTypes,
                file_types_description: t.fileTypesDesc,
                file_upload_limit: t.fileUploadLimit,
                file_size_limit: t.fileSizeLimit,
                post_params: t.postParams,
                file_queued_handler: function (e) {
                    e.url = i.options.fileIconUrl, i.appendFile(e)
                },
                file_queue_error_handler: function (n, i, a) {
                    var o = "";
                    switch (i) {
                        case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                            o = t.queueLimitExceeded;
                            break;
                        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                            o = t.fileExceedsSizeLimit;
                            break;
                        case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                            o = t.zeroByteFile;
                            break;
                        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                            o = t.invalidFiletype;
                            break;
                        default:
                            o = t.unknownError
                    }
                    e.DEBUG && alert(o)
                },
                upload_start_handler: function (t) {
                    var n = this, i = e('div[data-id="' + t.id + '"]', n.bodyDiv);
                    e(".ke-status > div", i).hide(), e(".ke-progressbar", i).show()
                },
                upload_progress_handler: function (e, t, n) {
                    var a = Math.round(100 * t / n), o = i.progressbars[e.id];
                    o.bar.css("width", Math.round(80 * a / 100) + "px"), o.percent.html(a + "%")
                },
                upload_error_handler: function (t, a, o) {
                    if (t && t.filestatus == SWFUpload.FILE_STATUS.ERROR) {
                        var r = e('div[data-id="' + t.id + '"]', i.bodyDiv).eq(0);
                        n(r, i.options.errorMessage)
                    }
                },
                upload_success_handler: function (t, a) {
                    var o = e('div[data-id="' + t.id + '"]', i.bodyDiv).eq(0), r = {};
                    try {
                        r = e.json(a)
                    } catch (l) {
                        i.options.afterError.call(this, "<!doctype html><html>" + a + "</html>")
                    }
                    return 0 !== r.error ? void n(o, e.DEBUG ? r.message : i.options.errorMessage) : (t.url = r.url, e(".ke-img", o).attr("src", t.url).attr("data-status", t.filestatus).data("data", r), void e(".ke-status > div", o).hide())
                }
            };
            i.swfu = new SWFUpload(a), e(".ke-swfupload-startupload input", i.div).click(function () {
                i.swfu.startUpload()
            })
        }, getUrlList: function () {
            var t = [];
            return e(".ke-img", self.bodyDiv).each(function () {
                var n = e(this), i = n.attr("data-status");
                i == SWFUpload.FILE_STATUS.COMPLETE && t.push(n.data("data"))
            }), t
        }, removeFile: function (t) {
            var n = this;
            n.swfu.cancelUpload(t);
            var i = e('div[data-id="' + t + '"]', n.bodyDiv);
            e(".ke-photo", i).unbind(), e(".ke-delete", i).unbind(), i.remove()
        }, removeFiles: function () {
            var t = this;
            e(".ke-item", t.bodyDiv).each(function () {
                t.removeFile(e(this).attr("data-id"))
            })
        }, appendFile: function (t) {
            var n = this, i = e('<div class="ke-inline-block ke-item" data-id="' + t.id + '"></div>');
            n.bodyDiv.append(i);
            var a = e('<div class="ke-inline-block ke-photo"></div>').mouseover(function (t) {
                e(this).addClass("ke-on")
            }).mouseout(function (t) {
                e(this).removeClass("ke-on")
            });
            i.append(a);
            var o = e('<img src="' + t.url + '" class="ke-img" data-status="' + t.filestatus + '" width="80" height="80" alt="' + t.name + '" />');
            a.append(o), e('<span class="ke-delete"></span>').appendTo(a).click(function () {
                n.removeFile(t.id)
            });
            var r = e('<div class="ke-status"></div>').appendTo(a);
            e(['<div class="ke-progressbar">', '<div class="ke-progressbar-bar"><div class="ke-progressbar-bar-inner"></div></div>', '<div class="ke-progressbar-percent">0%</div></div>'].join("")).hide().appendTo(r), e('<div class="ke-message">' + n.options.pendingMessage + "</div>").appendTo(r), i.append('<div class="ke-name">' + t.name + "</div>"), n.progressbars[t.id] = {
                bar: e(".ke-progressbar-bar-inner", a),
                percent: e(".ke-progressbar-percent", a)
            }
        }, remove: function () {
            this.removeFiles(), this.swfu.destroy(), this.div.html("")
        }
    }), e.swfupload = function (e, n) {
        return new t(e, n)
    }
}(KindEditor), KindEditor.plugin("multiimage", function (e) {
    var t = this, n = "multiimage",
        i = (e.undef(t.formatUploadUrl, !0), e.undef(t.uploadJson, t.basePath + "php/upload_json.php")),
        a = t.pluginsPath + "multiimage/images/", o = e.undef(t.imageSizeLimit, "1MB"),
        r = (e.undef(t.imageFileTypes, "*.jpg;*.gif;*.png"), e.undef(t.imageUploadLimit, 20)),
        l = e.undef(t.filePostName, "imgFile"), s = t.lang(n + ".");
    t.plugin.multiImageDialog = function (d) {
        var c = d.clickFn, u = e.tmpl(s.uploadDesc, {uploadLimit: r, sizeLimit: o}),
            p = ['<div style="padding:20px;">', '<div class="swfupload">', "</div>", "</div>"].join(""),
            h = t.createDialog({
                name: n,
                width: 650,
                height: 510,
                title: t.lang(n),
                body: p,
                previewBtn: {
                    name: s.insertAll, click: function (e) {
                        c.call(t, m.getUrlList())
                    }
                },
                yesBtn: {
                    name: s.clearAll, click: function (e) {
                        m.removeFiles()
                    }
                },
                beforeRemove: function () {
                    (!e.IE || e.V <= 8) && m.remove()
                }
            }), f = h.div, m = e.swfupload({
                container: e(".swfupload", f),
                buttonImageUrl: a + ("zh-CN" == t.langType ? "select-files-zh-CN.png" : "select-files-en.png"),
                buttonWidth: "zh-CN" == t.langType ? 72 : 88,
                buttonHeight: 23,
                fileIconUrl: a + "image.png",
                uploadDesc: u,
                startButtonValue: s.startUpload,
                uploadUrl: e.addParam(i, "dir=image"),
                flashUrl: a + "swfupload.swf",
                filePostName: l,
                fileTypes: "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
                fileTypesDesc: "Image Files",
                fileUploadLimit: r,
                fileSizeLimit: o,
                postParams: e.undef(t.extraFileUploadParams, {}),
                queueLimitExceeded: s.queueLimitExceeded,
                fileExceedsSizeLimit: s.fileExceedsSizeLimit,
                zeroByteFile: s.zeroByteFile,
                invalidFiletype: s.invalidFiletype,
                unknownError: s.unknownError,
                pendingMessage: s.pending,
                errorMessage: s.uploadError,
                afterError: function (e) {
                    t.errorDialog(e)
                }
            });
        return h
    }, t.clickToolbar(n, function () {
        t.plugin.multiImageDialog({
            clickFn: function (n) {
                0 !== n.length && (e.each(n, function (e, n) {
                    t.afterUpload && t.afterUpload.call(t, n.url, n, "multiimage"), t.exec("insertimage", n.url, n.title, n.width, n.height, n.border, n.align)
                }), setTimeout(function () {
                    t.hideDialog().focus()
                }, 0))
            }
        })
    })
}), function () {
    window.SWFUpload = function (e) {
        this.initSWFUpload(e)
    }, SWFUpload.prototype.initSWFUpload = function (e) {
        try {
            this.customSettings = {}, this.settings = e, this.eventQueue = [], this.movieName = "KindEditor_SWFUpload_" + SWFUpload.movieCount++, this.movieElement = null, SWFUpload.instances[this.movieName] = this, this.initSettings(), this.loadFlash(), this.displayDebugInfo()
        } catch (t) {
            throw delete SWFUpload.instances[this.movieName], t
        }
    }, SWFUpload.instances = {}, SWFUpload.movieCount = 0, SWFUpload.version = "2.2.0 2009-03-25", SWFUpload.QUEUE_ERROR = {
        QUEUE_LIMIT_EXCEEDED: -100,
        FILE_EXCEEDS_SIZE_LIMIT: -110,
        ZERO_BYTE_FILE: -120,
        INVALID_FILETYPE: -130
    }, SWFUpload.UPLOAD_ERROR = {
        HTTP_ERROR: -200,
        MISSING_UPLOAD_URL: -210,
        IO_ERROR: -220,
        SECURITY_ERROR: -230,
        UPLOAD_LIMIT_EXCEEDED: -240,
        UPLOAD_FAILED: -250,
        SPECIFIED_FILE_ID_NOT_FOUND: -260,
        FILE_VALIDATION_FAILED: -270,
        FILE_CANCELLED: -280,
        UPLOAD_STOPPED: -290
    }, SWFUpload.FILE_STATUS = {
        QUEUED: -1,
        IN_PROGRESS: -2,
        ERROR: -3,
        COMPLETE: -4,
        CANCELLED: -5
    }, SWFUpload.BUTTON_ACTION = {
        SELECT_FILE: -100,
        SELECT_FILES: -110,
        START_UPLOAD: -120
    }, SWFUpload.CURSOR = {ARROW: -1, HAND: -2}, SWFUpload.WINDOW_MODE = {
        WINDOW: "window",
        TRANSPARENT: "transparent",
        OPAQUE: "opaque"
    }, SWFUpload.completeURL = function (e) {
        if ("string" != typeof e || e.match(/^https?:\/\//i) || e.match(/^\//)) return e;
        var t = (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""), window.location.pathname.lastIndexOf("/"));
        return 0 >= t ? path = "/" : path = window.location.pathname.substr(0, t) + "/", path + e
    }, SWFUpload.prototype.initSettings = function () {
        this.ensureDefault = function (e, t) {
            this.settings[e] = void 0 == this.settings[e] ? t : this.settings[e]
        }, this.ensureDefault("upload_url", ""), this.ensureDefault("preserve_relative_urls", !1), this.ensureDefault("file_post_name", "Filedata"), this.ensureDefault("post_params", {}), this.ensureDefault("use_query_string", !1), this.ensureDefault("requeue_on_error", !1), this.ensureDefault("http_success", []), this.ensureDefault("assume_success_timeout", 0), this.ensureDefault("file_types", "*.*"), this.ensureDefault("file_types_description", "All Files"), this.ensureDefault("file_size_limit", 0), this.ensureDefault("file_upload_limit", 0), this.ensureDefault("file_queue_limit", 0), this.ensureDefault("flash_url", "swfupload.swf"), this.ensureDefault("prevent_swf_caching", !0), this.ensureDefault("button_image_url", ""), this.ensureDefault("button_width", 1), this.ensureDefault("button_height", 1), this.ensureDefault("button_text", ""), this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;"), this.ensureDefault("button_text_top_padding", 0), this.ensureDefault("button_text_left_padding", 0), this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES), this.ensureDefault("button_disabled", !1), this.ensureDefault("button_placeholder_id", ""), this.ensureDefault("button_placeholder", null), this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW), this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW), this.ensureDefault("debug", !1), this.settings.debug_enabled = this.settings.debug, this.settings.return_upload_start_handler = this.returnUploadStart, this.ensureDefault("swfupload_loaded_handler", null), this.ensureDefault("file_dialog_start_handler", null), this.ensureDefault("file_queued_handler", null), this.ensureDefault("file_queue_error_handler", null), this.ensureDefault("file_dialog_complete_handler", null), this.ensureDefault("upload_start_handler", null), this.ensureDefault("upload_progress_handler", null), this.ensureDefault("upload_error_handler", null), this.ensureDefault("upload_success_handler", null), this.ensureDefault("upload_complete_handler", null), this.ensureDefault("debug_handler", this.debugMessage), this.ensureDefault("custom_settings", {}), this.customSettings = this.settings.custom_settings, this.settings.prevent_swf_caching && (this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime()), this.settings.preserve_relative_urls || (this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url), this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url)), delete this.ensureDefault
    }, SWFUpload.prototype.loadFlash = function () {
        var e, t;
        if (null !== document.getElementById(this.movieName)) throw"ID " + this.movieName + " is already in use. The Flash Object could not be added";
        if (e = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder, void 0 == e) throw"Could not find the placeholder element: " + this.settings.button_placeholder_id;
        t = document.createElement("div"), t.innerHTML = this.getFlashHTML(), e.parentNode.replaceChild(t.firstChild, e), void 0 == window[this.movieName] && (window[this.movieName] = this.getMovieElement())
    }, SWFUpload.prototype.getFlashHTML = function () {
        var e = "";
        return KindEditor.IE && KindEditor.V > 8 && (e = ' classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'), ['<object id="', this.movieName, '"' + e + ' type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
    }, SWFUpload.prototype.getFlashVars = function () {
        var e = this.buildParamString(), t = this.settings.http_success.join(",");
        return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(t), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(e), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
    }, SWFUpload.prototype.getMovieElement = function () {
        if (void 0 == this.movieElement && (this.movieElement = document.getElementById(this.movieName)), null === this.movieElement) throw"Could not find Flash element";
        return this.movieElement
    }, SWFUpload.prototype.buildParamString = function () {
        var e = this.settings.post_params, t = [];
        if ("object" == typeof e) for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n.toString()) + "=" + encodeURIComponent(e[n].toString()));
        return t.join("&amp;")
    }, SWFUpload.prototype.destroy = function () {
        try {
            this.cancelUpload(null, !1);
            var e = null;
            if (e = this.getMovieElement(), e && "unknown" == typeof e.CallFunction) {
                for (var t in e) try {
                    "function" == typeof e[t] && (e[t] = null)
                } catch (n) {
                }
                try {
                    e.parentNode.removeChild(e)
                } catch (i) {
                }
            }
            return window[this.movieName] = null, SWFUpload.instances[this.movieName] = null, delete SWFUpload.instances[this.movieName], this.movieElement = null, this.settings = null, this.customSettings = null, this.eventQueue = null, this.movieName = null, !0
        } catch (a) {
            return !1
        }
    }, SWFUpload.prototype.displayDebugInfo = function () {
        this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "	", "upload_url:               ", this.settings.upload_url, "\n", "	", "flash_url:                ", this.settings.flash_url, "\n", "	", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "	", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "	", "http_success:             ", this.settings.http_success.join(", "), "\n", "	", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "	", "file_post_name:           ", this.settings.file_post_name, "\n", "	", "post_params:              ", this.settings.post_params.toString(), "\n", "	", "file_types:               ", this.settings.file_types, "\n", "	", "file_types_description:   ", this.settings.file_types_description, "\n", "	", "file_size_limit:          ", this.settings.file_size_limit, "\n", "	", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "	", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "	", "debug:                    ", this.settings.debug.toString(), "\n", "	", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "	", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "	", "button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n", "	", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "	", "button_width:             ", this.settings.button_width.toString(), "\n", "	", "button_height:            ", this.settings.button_height.toString(), "\n", "	", "button_text:              ", this.settings.button_text.toString(), "\n", "	", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "	", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "	", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "	", "button_action:            ", this.settings.button_action.toString(), "\n", "	", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "	", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "	", "swfupload_loaded_handler assigned:  ", ("function" == typeof this.settings.swfupload_loaded_handler).toString(), "\n", "	", "file_dialog_start_handler assigned: ", ("function" == typeof this.settings.file_dialog_start_handler).toString(), "\n", "	", "file_queued_handler assigned:       ", ("function" == typeof this.settings.file_queued_handler).toString(), "\n", "	", "file_queue_error_handler assigned:  ", ("function" == typeof this.settings.file_queue_error_handler).toString(), "\n", "	", "upload_start_handler assigned:      ", ("function" == typeof this.settings.upload_start_handler).toString(), "\n", "	", "upload_progress_handler assigned:   ", ("function" == typeof this.settings.upload_progress_handler).toString(), "\n", "	", "upload_error_handler assigned:      ", ("function" == typeof this.settings.upload_error_handler).toString(), "\n", "	", "upload_success_handler assigned:    ", ("function" == typeof this.settings.upload_success_handler).toString(), "\n", "	", "upload_complete_handler assigned:   ", ("function" == typeof this.settings.upload_complete_handler).toString(), "\n", "	", "debug_handler assigned:             ", ("function" == typeof this.settings.debug_handler).toString(), "\n"].join(""))
    }, SWFUpload.prototype.addSetting = function (e, t, n) {
        return void 0 == t ? this.settings[e] = n : this.settings[e] = t
    }, SWFUpload.prototype.getSetting = function (e) {
        return void 0 != this.settings[e] ? this.settings[e] : ""
    }, SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
        argumentArray = argumentArray || [];
        var movieElement = this.getMovieElement(), returnValue, returnString;
        try {
            returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>"), returnValue = eval(returnString)
        } catch (ex) {
            throw"Call to " + functionName + " failed"
        }
        return void 0 != returnValue && "object" == typeof returnValue.post && (returnValue = this.unescapeFilePostParams(returnValue)), returnValue
    }, SWFUpload.prototype.selectFile = function () {
        this.callFlash("SelectFile")
    }, SWFUpload.prototype.selectFiles = function () {
        this.callFlash("SelectFiles")
    }, SWFUpload.prototype.startUpload = function (e) {
        this.callFlash("StartUpload", [e])
    }, SWFUpload.prototype.cancelUpload = function (e, t) {
        t !== !1 && (t = !0), this.callFlash("CancelUpload", [e, t])
    }, SWFUpload.prototype.stopUpload = function () {
        this.callFlash("StopUpload")
    }, SWFUpload.prototype.getStats = function () {
        return this.callFlash("GetStats")
    }, SWFUpload.prototype.setStats = function (e) {
        this.callFlash("SetStats", [e])
    }, SWFUpload.prototype.getFile = function (e) {
        return "number" == typeof e ? this.callFlash("GetFileByIndex", [e]) : this.callFlash("GetFile", [e])
    }, SWFUpload.prototype.addFileParam = function (e, t, n) {
        return this.callFlash("AddFileParam", [e, t, n])
    }, SWFUpload.prototype.removeFileParam = function (e, t) {
        this.callFlash("RemoveFileParam", [e, t])
    }, SWFUpload.prototype.setUploadURL = function (e) {
        this.settings.upload_url = e.toString(), this.callFlash("SetUploadURL", [e])
    }, SWFUpload.prototype.setPostParams = function (e) {
        this.settings.post_params = e, this.callFlash("SetPostParams", [e])
    }, SWFUpload.prototype.addPostParam = function (e, t) {
        this.settings.post_params[e] = t, this.callFlash("SetPostParams", [this.settings.post_params])
    }, SWFUpload.prototype.removePostParam = function (e) {
        delete this.settings.post_params[e], this.callFlash("SetPostParams", [this.settings.post_params])
    }, SWFUpload.prototype.setFileTypes = function (e, t) {
        this.settings.file_types = e, this.settings.file_types_description = t, this.callFlash("SetFileTypes", [e, t])
    }, SWFUpload.prototype.setFileSizeLimit = function (e) {
        this.settings.file_size_limit = e, this.callFlash("SetFileSizeLimit", [e])
    }, SWFUpload.prototype.setFileUploadLimit = function (e) {
        this.settings.file_upload_limit = e, this.callFlash("SetFileUploadLimit", [e])
    }, SWFUpload.prototype.setFileQueueLimit = function (e) {
        this.settings.file_queue_limit = e, this.callFlash("SetFileQueueLimit", [e])
    }, SWFUpload.prototype.setFilePostName = function (e) {
        this.settings.file_post_name = e, this.callFlash("SetFilePostName", [e])
    }, SWFUpload.prototype.setUseQueryString = function (e) {
        this.settings.use_query_string = e, this.callFlash("SetUseQueryString", [e])
    }, SWFUpload.prototype.setRequeueOnError = function (e) {
        this.settings.requeue_on_error = e, this.callFlash("SetRequeueOnError", [e])
    }, SWFUpload.prototype.setHTTPSuccess = function (e) {
        "string" == typeof e && (e = e.replace(" ", "").split(",")), this.settings.http_success = e, this.callFlash("SetHTTPSuccess", [e])
    }, SWFUpload.prototype.setAssumeSuccessTimeout = function (e) {
        this.settings.assume_success_timeout = e, this.callFlash("SetAssumeSuccessTimeout", [e])
    }, SWFUpload.prototype.setDebugEnabled = function (e) {
        this.settings.debug_enabled = e, this.callFlash("SetDebugEnabled", [e])
    }, SWFUpload.prototype.setButtonImageURL = function (e) {
        void 0 == e && (e = ""), this.settings.button_image_url = e, this.callFlash("SetButtonImageURL", [e])
    }, SWFUpload.prototype.setButtonDimensions = function (e, t) {
        this.settings.button_width = e, this.settings.button_height = t;
        var n = this.getMovieElement();
        void 0 != n && (n.style.width = e + "px", n.style.height = t + "px"), this.callFlash("SetButtonDimensions", [e, t])
    }, SWFUpload.prototype.setButtonText = function (e) {
        this.settings.button_text = e, this.callFlash("SetButtonText", [e])
    }, SWFUpload.prototype.setButtonTextPadding = function (e, t) {
        this.settings.button_text_top_padding = t, this.settings.button_text_left_padding = e, this.callFlash("SetButtonTextPadding", [e, t])
    }, SWFUpload.prototype.setButtonTextStyle = function (e) {
        this.settings.button_text_style = e, this.callFlash("SetButtonTextStyle", [e])
    }, SWFUpload.prototype.setButtonDisabled = function (e) {
        this.settings.button_disabled = e, this.callFlash("SetButtonDisabled", [e])
    }, SWFUpload.prototype.setButtonAction = function (e) {
        this.settings.button_action = e, this.callFlash("SetButtonAction", [e]);
    }, SWFUpload.prototype.setButtonCursor = function (e) {
        this.settings.button_cursor = e, this.callFlash("SetButtonCursor", [e])
    }, SWFUpload.prototype.queueEvent = function (e, t) {
        void 0 == t ? t = [] : t instanceof Array || (t = [t]);
        var n = this;
        if ("function" == typeof this.settings[e]) this.eventQueue.push(function () {
            this.settings[e].apply(this, t)
        }), setTimeout(function () {
            n.executeNextEvent()
        }, 0); else if (null !== this.settings[e]) throw"Event handler " + e + " is unknown or is not a function"
    }, SWFUpload.prototype.executeNextEvent = function () {
        var e = this.eventQueue ? this.eventQueue.shift() : null;
        "function" == typeof e && e.apply(this)
    }, SWFUpload.prototype.unescapeFilePostParams = function (e) {
        var t, n = /[$]([0-9a-f]{4})/i, i = {};
        if (void 0 != e) {
            for (var a in e.post) if (e.post.hasOwnProperty(a)) {
                t = a;
                for (var o; null !== (o = n.exec(t));) t = t.replace(o[0], String.fromCharCode(parseInt("0x" + o[1], 16)));
                i[t] = e.post[a]
            }
            e.post = i
        }
        return e
    }, SWFUpload.prototype.testExternalInterface = function () {
        try {
            return this.callFlash("TestExternalInterface")
        } catch (e) {
            return !1
        }
    }, SWFUpload.prototype.flashReady = function () {
        var e = this.getMovieElement();
        return e ? (this.cleanUp(e), void this.queueEvent("swfupload_loaded_handler")) : void this.debug("Flash called back ready but the flash movie can't be found.")
    }, SWFUpload.prototype.cleanUp = function (e) {
        try {
            if (this.movieElement && "unknown" == typeof e.CallFunction) {
                this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
                for (var t in e) try {
                    "function" == typeof e[t] && (e[t] = null)
                } catch (n) {
                }
            }
        } catch (i) {
        }
        window.__flash__removeCallback = function (e, t) {
            try {
                e && (e[t] = null)
            } catch (n) {
            }
        }
    }, SWFUpload.prototype.fileDialogStart = function () {
        this.queueEvent("file_dialog_start_handler")
    }, SWFUpload.prototype.fileQueued = function (e) {
        e = this.unescapeFilePostParams(e), this.queueEvent("file_queued_handler", e)
    }, SWFUpload.prototype.fileQueueError = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("file_queue_error_handler", [e, t, n])
    }, SWFUpload.prototype.fileDialogComplete = function (e, t, n) {
        this.queueEvent("file_dialog_complete_handler", [e, t, n])
    }, SWFUpload.prototype.uploadStart = function (e) {
        e = this.unescapeFilePostParams(e), this.queueEvent("return_upload_start_handler", e)
    }, SWFUpload.prototype.returnUploadStart = function (e) {
        var t;
        if ("function" == typeof this.settings.upload_start_handler) e = this.unescapeFilePostParams(e), t = this.settings.upload_start_handler.call(this, e); else if (void 0 != this.settings.upload_start_handler) throw"upload_start_handler must be a function";
        void 0 === t && (t = !0), t = !!t, this.callFlash("ReturnUploadStart", [t])
    }, SWFUpload.prototype.uploadProgress = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_progress_handler", [e, t, n])
    }, SWFUpload.prototype.uploadError = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_error_handler", [e, t, n])
    }, SWFUpload.prototype.uploadSuccess = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_success_handler", [e, t, n])
    }, SWFUpload.prototype.uploadComplete = function (e) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_complete_handler", e)
    }, SWFUpload.prototype.debug = function (e) {
        this.queueEvent("debug_handler", e)
    }, SWFUpload.prototype.debugMessage = function (e) {
        if (this.settings.debug) {
            var t, n = [];
            if ("object" == typeof e && "string" == typeof e.name && "string" == typeof e.message) {
                for (var i in e) e.hasOwnProperty(i) && n.push(i + ": " + e[i]);
                t = n.join("\n") || "", n = t.split("\n"), t = "EXCEPTION: " + n.join("\nEXCEPTION: "), SWFUpload.Console.writeLine(t)
            } else SWFUpload.Console.writeLine(e)
        }
    }, SWFUpload.Console = {}, SWFUpload.Console.writeLine = function (e) {
        var t, n;
        try {
            t = document.getElementById("SWFUpload_Console"), t || (n = document.createElement("form"), document.getElementsByTagName("body")[0].appendChild(n), t = document.createElement("textarea"), t.id = "SWFUpload_Console", t.style.fontFamily = "monospace", t.setAttribute("wrap", "off"), t.wrap = "off", t.style.overflow = "auto", t.style.width = "700px", t.style.height = "350px", t.style.margin = "5px", n.appendChild(t)), t.value += e + "\n", t.scrollTop = t.scrollHeight - t.clientHeight
        } catch (i) {
            alert("Exception: " + i.name + " Message: " + i.message)
        }
    }
}(), function () {
    "function" == typeof SWFUpload && (SWFUpload.queue = {}, SWFUpload.prototype.initSettings = function (e) {
        return function () {
            "function" == typeof e && e.call(this), this.queueSettings = {}, this.queueSettings.queue_cancelled_flag = !1, this.queueSettings.queue_upload_count = 0, this.queueSettings.user_upload_complete_handler = this.settings.upload_complete_handler, this.queueSettings.user_upload_start_handler = this.settings.upload_start_handler, this.settings.upload_complete_handler = SWFUpload.queue.uploadCompleteHandler, this.settings.upload_start_handler = SWFUpload.queue.uploadStartHandler, this.settings.queue_complete_handler = this.settings.queue_complete_handler || null
        }
    }(SWFUpload.prototype.initSettings), SWFUpload.prototype.startUpload = function (e) {
        this.queueSettings.queue_cancelled_flag = !1, this.callFlash("StartUpload", [e])
    }, SWFUpload.prototype.cancelQueue = function () {
        this.queueSettings.queue_cancelled_flag = !0, this.stopUpload();
        for (var e = this.getStats(); e.files_queued > 0;) this.cancelUpload(), e = this.getStats()
    }, SWFUpload.queue.uploadStartHandler = function (e) {
        var t;
        return "function" == typeof this.queueSettings.user_upload_start_handler && (t = this.queueSettings.user_upload_start_handler.call(this, e)), t = t === !1 ? !1 : !0, this.queueSettings.queue_cancelled_flag = !t, t
    }, SWFUpload.queue.uploadCompleteHandler = function (e) {
        var t, n = this.queueSettings.user_upload_complete_handler;
        if (e.filestatus === SWFUpload.FILE_STATUS.COMPLETE && this.queueSettings.queue_upload_count++, t = "function" == typeof n ? n.call(this, e) === !1 ? !1 : !0 : e.filestatus === SWFUpload.FILE_STATUS.QUEUED ? !1 : !0) {
            var i = this.getStats();
            i.files_queued > 0 && this.queueSettings.queue_cancelled_flag === !1 ? this.startUpload() : this.queueSettings.queue_cancelled_flag === !1 ? (this.queueEvent("queue_complete_handler", [this.queueSettings.queue_upload_count]), this.queueSettings.queue_upload_count = 0) : (this.queueSettings.queue_cancelled_flag = !1, this.queueSettings.queue_upload_count = 0)
        }
    })
}(), KindEditor.plugin("pagebreak", function (e) {
    var t = this, n = "pagebreak",
        i = e.undef(t.pagebreakHtml, '<hr style="page-break-after: always;" class="ke-pagebreak" />');
    t.clickToolbar(n, function () {
        var n = t.cmd, a = n.range;
        t.focus();
        var o = "br" == t.newlineTag || e.WEBKIT ? "" : '<span id="__kindeditor_tail_tag__"></span>';
        if (t.insertHtml(i + o), "" !== o) {
            var r = e("#__kindeditor_tail_tag__", t.edit.doc);
            a.selectNodeContents(r[0]), r.removeAttr("id"), n.select()
        }
    })
}), KindEditor.plugin("plainpaste", function (e) {
    var t = this, n = "plainpaste";
    t.clickToolbar(n, function () {
        var i = t.lang(n + "."),
            a = '<div style="padding:10px 20px;"><div style="margin-bottom:10px;">' + i.comment + '</div><textarea class="ke-textarea" style="width:408px;height:260px;"></textarea></div>',
            o = t.createDialog({
                name: n,
                width: 450,
                title: t.lang(n),
                body: a,
                yesBtn: {
                    name: t.lang("yes"), click: function (n) {
                        var i = r.val();
                        i = e.escape(i), i = i.replace(/ {2}/g, " &nbsp;"), i = "p" == t.newlineTag ? i.replace(/^/, "<p>").replace(/$/, "</p>").replace(/\n/g, "</p><p>") : i.replace(/\n/g, "<br />$&"), t.insertHtml(i).hideDialog().focus()
                    }
                }
            }), r = e("textarea", o.div);
        r[0].focus()
    })
}), KindEditor.plugin("preview", function (e) {
    var t = this, n = "preview";
    t.clickToolbar(n, function () {
        var i = (t.lang(n + "."), '<div style="padding:10px 20px;"><iframe class="ke-textarea" frameborder="0" style="width:708px;height:400px;"></iframe></div>'),
            a = t.createDialog({name: n, width: 750, title: t.lang(n), body: i}), o = e("iframe", a.div),
            r = e.iframeDoc(o);
        r.open(), r.write(t.fullHtml()), r.close(), e(r.body).css("background-color", "#FFF"), o[0].contentWindow.focus()
    })
}), KindEditor.plugin("quickformat", function (e) {
    function t(e) {
        for (var t = e.first(); t && t.first();) t = t.first();
        return t
    }

    var n = this, i = "quickformat", a = e.toMap("blockquote,center,div,h1,h2,h3,h4,h5,h6,p");
    n.clickToolbar(i, function () {
        n.focus();
        for (var i, o = n.edit.doc, r = n.cmd.range, l = e(o.body).first(), s = [], d = [], c = r.createBookmark(!0); l;) {
            i = l.next();
            var u = t(l);
            u && "img" == u.name || (a[l.name] ? (l.html(l.html().replace(/^(\s|&nbsp;|銆€)+/gi, "")), l.css("text-indent", "2em")) : d.push(l), (!i || a[i.name] || a[l.name] && !a[i.name]) && (d.length > 0 && s.push(d), d = [])), l = i
        }
        e.each(s, function (t, n) {
            var i = e('<p style="text-indent:2em;"></p>', o);
            n[0].before(i), e.each(n, function (e, t) {
                i.append(t)
            })
        }), r.moveToBookmark(c), n.addBookmark()
    })
}), KindEditor.plugin("table", function (e) {
    function t(e, t) {
        t = t.toUpperCase(), e.css("background-color", t), e.css("color", "#000000" === t ? "#FFFFFF" : "#000000"), e.html(t)
    }

    function n(n, i) {
        function o() {
            e.each(s, function () {
                this.remove()
            }), s = [], e(document).unbind("click,mousedown", o), n.unbind("click,mousedown", o)
        }

        i.bind("click,mousedown", function (e) {
            e.stopPropagation()
        }), i.click(function (i) {
            o();
            var r = e(this), l = r.pos(), d = e.colorpicker({
                x: l.x,
                y: l.y + r.height(),
                z: 811214,
                selectedColor: e(this).html(),
                colors: a.colorTable,
                noColor: a.lang("noColor"),
                shadowMode: a.shadowMode,
                click: function (e) {
                    t(r, e), o()
                }
            });
            s.push(d), e(document).bind("click,mousedown", o), n.bind("click,mousedown", o)
        })
    }

    function i(e, t, n) {
        for (var i = 0, a = 0, o = t.cells.length; o > a && t.cells[a] != n; a++) i += t.cells[a].rowSpan - 1;
        return n.cellIndex - i
    }

    var a = this, o = "table", r = a.lang(o + "."), l = "ke-zeroborder", s = [];
    a.plugin.table = {
        prop: function (i) {
            var s = ['<div style="padding:20px;">', '<div class="ke-dialog-row">', '<label for="keRows" style="width:90px;">' + r.cells + "</label>", r.rows + ' <input type="text" id="keRows" class="ke-input-text ke-input-number" name="rows" value="" maxlength="4" /> &nbsp; ', r.cols + ' <input type="text" class="ke-input-text ke-input-number" name="cols" value="" maxlength="4" />', "</div>", '<div class="ke-dialog-row">', '<label for="keWidth" style="width:90px;">' + r.size + "</label>", r.width + ' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ', '<select name="widthType">', '<option value="%">' + r.percent + "</option>", '<option value="px">' + r.px + "</option>", "</select> &nbsp; ", r.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ', '<select name="heightType">', '<option value="%">' + r.percent + "</option>", '<option value="px">' + r.px + "</option>", "</select>", "</div>", '<div class="ke-dialog-row">', '<label for="kePadding" style="width:90px;">' + r.space + "</label>", r.padding + ' <input type="text" id="kePadding" class="ke-input-text ke-input-number" name="padding" value="" maxlength="4" /> &nbsp; ', r.spacing + ' <input type="text" class="ke-input-text ke-input-number" name="spacing" value="" maxlength="4" />', "</div>", '<div class="ke-dialog-row">', '<label for="keAlign" style="width:90px;">' + r.align + "</label>", '<select id="keAlign" name="align">', '<option value="">' + r.alignDefault + "</option>", '<option value="left">' + r.alignLeft + "</option>", '<option value="center">' + r.alignCenter + "</option>", '<option value="right">' + r.alignRight + "</option>", "</select>", "</div>", '<div class="ke-dialog-row">', '<label for="keBorder" style="width:90px;">' + r.border + "</label>", r.borderWidth + ' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ', r.borderColor + ' <span class="ke-inline-block ke-input-color"></span>', "</div>", '<div class="ke-dialog-row">', '<label for="keBgColor" style="width:90px;">' + r.backgroundColor + "</label>", '<span class="ke-inline-block ke-input-color"></span>', "</div>", "</div>"].join(""),
                d = a.cmd.range.createBookmark(), c = a.createDialog({
                    name: o, width: 500, title: a.lang(o), body: s, beforeRemove: function () {
                        w.unbind()
                    }, yesBtn: {
                        name: a.lang("yes"), click: function (t) {
                            var n = p.val(), i = h.val(), o = f.val(), r = m.val(), s = g.val(), c = v.val(), u = _.val(),
                                E = b.val(), C = y.val(), x = k.val(), T = e(w[0]).html() || "", K = e(w[1]).html() || "";
                            if (0 == n || !/^\d+$/.test(n)) return alert(a.lang("invalidRows")), void p[0].focus();
                            if (0 == i || !/^\d+$/.test(i)) return alert(a.lang("invalidRows")), void h[0].focus();
                            if (!/^\d*$/.test(o)) return alert(a.lang("invalidWidth")), void f[0].focus();
                            if (!/^\d*$/.test(r)) return alert(a.lang("invalidHeight")), void m[0].focus();
                            if (!/^\d*$/.test(u)) return alert(a.lang("invalidPadding")), void _[0].focus();
                            if (!/^\d*$/.test(E)) return alert(a.lang("invalidSpacing")), void b[0].focus();
                            if (!/^\d*$/.test(x)) return alert(a.lang("invalidBorder")), void k[0].focus();
                            if (S) return "" !== o ? S.width(o + s) : S.css("width", ""), void 0 !== S[0].width && S.removeAttr("width"), "" !== r ? S.height(r + c) : S.css("height", ""), void 0 !== S[0].height && S.removeAttr("height"), S.css("background-color", K), void 0 !== S[0].bgColor && S.removeAttr("bgColor"), "" !== u ? S[0].cellPadding = u : S.removeAttr("cellPadding"), "" !== E ? S[0].cellSpacing = E : S.removeAttr("cellSpacing"), "" !== C ? S[0].align = C : S.removeAttr("align"), "" !== x ? S.attr("border", x) : S.removeAttr("border"), "" === x || "0" === x ? S.addClass(l) : S.removeClass(l), "" !== T ? S.attr("borderColor", T) : S.removeAttr("borderColor"), a.hideDialog().focus(), a.cmd.range.moveToBookmark(d), a.cmd.select(), void a.addBookmark();
                            var U = "";
                            "" !== o && (U += "width:" + o + s + ";"), "" !== r && (U += "height:" + r + c + ";"), "" !== K && (U += "background-color:" + K + ";");
                            var A = "<table";
                            "" !== U && (A += ' style="' + U + '"'), "" !== u && (A += ' cellpadding="' + u + '"'), "" !== E && (A += ' cellspacing="' + E + '"'), "" !== C && (A += ' align="' + C + '"'), "" !== x && (A += ' border="' + x + '"'), ("" === x || "0" === x) && (A += ' class="' + l + '"'), "" !== T && (A += ' bordercolor="' + T + '"'), A += ">";
                            for (var N = 0; n > N; N++) {
                                A += "<tr>";
                                for (var F = 0; i > F; F++) A += "<td>" + (e.IE ? "&nbsp;" : "<br />") + "</td>";
                                A += "</tr>"
                            }
                            A += "</table>", e.IE || (A += "<br />"), a.insertHtml(A), a.select().hideDialog().focus(), a.addBookmark()
                        }
                    }
                }), u = c.div, p = e('[name="rows"]', u).val(3), h = e('[name="cols"]', u).val(2),
                f = e('[name="width"]', u).val(100), m = e('[name="height"]', u), g = e('[name="widthType"]', u),
                v = e('[name="heightType"]', u), _ = e('[name="padding"]', u).val(2),
                b = e('[name="spacing"]', u).val(0), y = e('[name="align"]', u), k = e('[name="border"]', u).val(1),
                w = e(".ke-input-color", u);
            n(u, w.eq(0)), n(u, w.eq(1)), t(w.eq(0), "#000000"), t(w.eq(1), ""), p[0].focus(), p[0].select();
            var S;
            if (!i && (S = a.plugin.getSelectedTable())) {
                p.val(S[0].rows.length), h.val(S[0].rows.length > 0 ? S[0].rows[0].cells.length : 0), p.attr("disabled", !0), h.attr("disabled", !0);
                var E, C = S[0].style.width || S[0].width, x = S[0].style.height || S[0].height;
                void 0 !== C && (E = /^(\d+)((?:px|%)*)$/.exec(C)) ? (f.val(E[1]), g.val(E[2])) : f.val(""), void 0 !== x && (E = /^(\d+)((?:px|%)*)$/.exec(x)) && (m.val(E[1]), v.val(E[2])), _.val(S[0].cellPadding || ""), b.val(S[0].cellSpacing || ""), y.val(S[0].align || ""), k.val(void 0 === S[0].border ? "" : S[0].border), t(w.eq(0), e.toHex(S.attr("borderColor") || "")), t(w.eq(1), e.toHex(S[0].style.backgroundColor || S[0].bgColor || "")), f[0].focus(), f[0].select()
            }
        }, cellprop: function () {
            var i = ['<div style="padding:20px;">', '<div class="ke-dialog-row">', '<label for="keWidth" style="width:90px;">' + r.size + "</label>", r.width + ' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ', '<select name="widthType">', '<option value="%">' + r.percent + "</option>", '<option value="px">' + r.px + "</option>", "</select> &nbsp; ", r.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ', '<select name="heightType">', '<option value="%">' + r.percent + "</option>", '<option value="px">' + r.px + "</option>", "</select>", "</div>", '<div class="ke-dialog-row">', '<label for="keAlign" style="width:90px;">' + r.align + "</label>", r.textAlign + ' <select id="keAlign" name="textAlign">', '<option value="">' + r.alignDefault + "</option>", '<option value="left">' + r.alignLeft + "</option>", '<option value="center">' + r.alignCenter + "</option>", '<option value="right">' + r.alignRight + "</option>", "</select> ", r.verticalAlign + ' <select name="verticalAlign">', '<option value="">' + r.alignDefault + "</option>", '<option value="top">' + r.alignTop + "</option>", '<option value="middle">' + r.alignMiddle + "</option>", '<option value="bottom">' + r.alignBottom + "</option>", '<option value="baseline">' + r.alignBaseline + "</option>", "</select>", "</div>", '<div class="ke-dialog-row">', '<label for="keBorder" style="width:90px;">' + r.border + "</label>", r.borderWidth + ' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ', r.borderColor + ' <span class="ke-inline-block ke-input-color"></span>', "</div>", '<div class="ke-dialog-row">', '<label for="keBgColor" style="width:90px;">' + r.backgroundColor + "</label>", '<span class="ke-inline-block ke-input-color"></span>', "</div>", "</div>"].join(""),
                l = a.cmd.range.createBookmark(), s = a.createDialog({
                    name: o,
                    width: 500,
                    title: a.lang("tablecell"),
                    body: i,
                    beforeRemove: function () {
                        b.unbind()
                    },
                    yesBtn: {
                        name: a.lang("yes"), click: function (t) {
                            var n = c.val(), i = u.val(), o = p.val(), r = h.val(), s = (f.val(), m.val(), g.val()),
                                d = v.val(), y = _.val(), w = e(b[0]).html() || "", S = e(b[1]).html() || "";
                            return /^\d*$/.test(n) ? /^\d*$/.test(i) ? /^\d*$/.test(y) ? (k.css({
                                width: "" !== n ? n + o : "",
                                height: "" !== i ? i + r : "",
                                "background-color": S,
                                "text-align": s,
                                "vertical-align": d,
                                "border-width": y,
                                "border-style": "" !== y ? "solid" : "",
                                "border-color": w
                            }), a.hideDialog().focus(), a.cmd.range.moveToBookmark(l), a.cmd.select(), void a.addBookmark()) : (alert(a.lang("invalidBorder")), void _[0].focus()) : (alert(a.lang("invalidHeight")), void u[0].focus()) : (alert(a.lang("invalidWidth")), void c[0].focus())
                        }
                    }
                }), d = s.div, c = e('[name="width"]', d).val(100), u = e('[name="height"]', d),
                p = e('[name="widthType"]', d), h = e('[name="heightType"]', d), f = e('[name="padding"]', d).val(2),
                m = e('[name="spacing"]', d).val(0), g = e('[name="textAlign"]', d), v = e('[name="verticalAlign"]', d),
                _ = e('[name="border"]', d).val(1), b = e(".ke-input-color", d);
            n(d, b.eq(0)), n(d, b.eq(1)), t(b.eq(0), "#000000"), t(b.eq(1), ""), c[0].focus(), c[0].select();
            var y, k = a.plugin.getSelectedCell(), w = k[0].style.width || k[0].width || "",
                S = k[0].style.height || k[0].height || "";
            (y = /^(\d+)((?:px|%)*)$/.exec(w)) ? (c.val(y[1]), p.val(y[2])) : c.val(""), (y = /^(\d+)((?:px|%)*)$/.exec(S)) && (u.val(y[1]), h.val(y[2])), g.val(k[0].style.textAlign || ""), v.val(k[0].style.verticalAlign || "");
            var E = k[0].style.borderWidth || "";
            E && (E = parseInt(E)), _.val(E), t(b.eq(0), e.toHex(k[0].style.borderColor || "")), t(b.eq(1), e.toHex(k[0].style.backgroundColor || "")), c[0].focus(), c[0].select()
        }, insert: function () {
            this.prop(!0)
        }, "delete": function () {
            var e = a.plugin.getSelectedTable();
            a.cmd.range.setStartBefore(e[0]).collapse(!0), a.cmd.select(), e.remove(), a.addBookmark()
        }, colinsert: function (t) {
            var n = a.plugin.getSelectedTable()[0], o = a.plugin.getSelectedRow()[0], r = a.plugin.getSelectedCell()[0],
                l = r.cellIndex + t;
            l += n.rows[0].cells.length - o.cells.length;
            for (var s = 0, d = n.rows.length; d > s; s++) {
                var c = n.rows[s], u = c.insertCell(l);
                u.innerHTML = e.IE ? "" : "<br />", l = i(n, c, u)
            }
            a.cmd.range.selectNodeContents(r).collapse(!0), a.cmd.select(), a.addBookmark()
        }, colinsertleft: function () {
            this.colinsert(0)
        }, colinsertright: function () {
            this.colinsert(1)
        }, rowinsert: function (t) {
            var n = a.plugin.getSelectedTable()[0], i = a.plugin.getSelectedRow()[0], o = a.plugin.getSelectedCell()[0],
                r = i.rowIndex;
            1 === t && (r = i.rowIndex + (o.rowSpan - 1) + t);
            for (var l = n.insertRow(r), s = 0, d = i.cells.length; d > s; s++) {
                i.cells[s].rowSpan > 1 && (d -= i.cells[s].rowSpan - 1);
                var c = l.insertCell(s);
                1 === t && i.cells[s].colSpan > 1 && (c.colSpan = i.cells[s].colSpan), c.innerHTML = e.IE ? "" : "<br />"
            }
            for (var u = r; u >= 0; u--) {
                var p = n.rows[u].cells;
                if (p.length > s) {
                    for (var h = o.cellIndex; h >= 0; h--) p[h].rowSpan > 1 && (p[h].rowSpan += 1);
                    break
                }
            }
            a.cmd.range.selectNodeContents(o).collapse(!0), a.cmd.select(), a.addBookmark()
        }, rowinsertabove: function () {
            this.rowinsert(0)
        }, rowinsertbelow: function () {
            this.rowinsert(1)
        }, rowmerge: function () {
            var e = a.plugin.getSelectedTable()[0], t = a.plugin.getSelectedRow()[0], n = a.plugin.getSelectedCell()[0],
                i = t.rowIndex, o = i + n.rowSpan, r = e.rows[o];
            if (!(e.rows.length <= o)) {
                var l = n.cellIndex;
                if (!(r.cells.length <= l)) {
                    var s = r.cells[l];
                    n.colSpan === s.colSpan && (n.rowSpan += s.rowSpan, r.deleteCell(l), a.cmd.range.selectNodeContents(n).collapse(!0), a.cmd.select(), a.addBookmark())
                }
            }
        }, colmerge: function () {
            var e = (a.plugin.getSelectedTable()[0], a.plugin.getSelectedRow()[0]), t = a.plugin.getSelectedCell()[0],
                n = (e.rowIndex, t.cellIndex), i = n + 1;
            if (!(e.cells.length <= i)) {
                var o = e.cells[i];
                t.rowSpan === o.rowSpan && (t.colSpan += o.colSpan, e.deleteCell(i), a.cmd.range.selectNodeContents(t).collapse(!0), a.cmd.select(), a.addBookmark())
            }
        }, rowsplit: function () {
            var t = a.plugin.getSelectedTable()[0], n = a.plugin.getSelectedRow()[0], o = a.plugin.getSelectedCell()[0],
                r = n.rowIndex;
            if (1 !== o.rowSpan) {
                for (var l = i(t, n, o), s = 1, d = o.rowSpan; d > s; s++) {
                    var c = t.rows[r + s], u = c.insertCell(l);
                    o.colSpan > 1 && (u.colSpan = o.colSpan), u.innerHTML = e.IE ? "" : "<br />", l = i(t, c, u)
                }
                e(o).removeAttr("rowSpan"), a.cmd.range.selectNodeContents(o).collapse(!0), a.cmd.select(), a.addBookmark()
            }
        }, colsplit: function () {
            var t = (a.plugin.getSelectedTable()[0], a.plugin.getSelectedRow()[0]), n = a.plugin.getSelectedCell()[0],
                i = n.cellIndex;
            if (1 !== n.colSpan) {
                for (var o = 1, r = n.colSpan; r > o; o++) {
                    var l = t.insertCell(i + o);
                    n.rowSpan > 1 && (l.rowSpan = n.rowSpan), l.innerHTML = e.IE ? "" : "<br />"
                }
                e(n).removeAttr("colSpan"), a.cmd.range.selectNodeContents(n).collapse(!0), a.cmd.select(), a.addBookmark()
            }
        }, coldelete: function () {
            for (var t = a.plugin.getSelectedTable()[0], n = a.plugin.getSelectedRow()[0], i = a.plugin.getSelectedCell()[0], o = i.cellIndex, r = 0, l = t.rows.length; l > r; r++) {
                var s = t.rows[r], d = s.cells[o];
                d.colSpan > 1 ? (d.colSpan -= 1, 1 === d.colSpan && e(d).removeAttr("colSpan")) : s.deleteCell(o), d.rowSpan > 1 && (r += d.rowSpan - 1)
            }
            0 === n.cells.length ? (a.cmd.range.setStartBefore(t).collapse(!0), a.cmd.select(), e(t).remove()) : a.cmd.selection(!0), a.addBookmark()
        }, rowdelete: function () {
            for (var t = a.plugin.getSelectedTable()[0], n = a.plugin.getSelectedRow()[0], i = a.plugin.getSelectedCell()[0], o = n.rowIndex, r = i.rowSpan - 1; r >= 0; r--) t.deleteRow(o + r);
            0 === t.rows.length ? (a.cmd.range.setStartBefore(t).collapse(!0), a.cmd.select(), e(t).remove()) : a.cmd.selection(!0), a.addBookmark()
        }
    }, a.clickToolbar(o, a.plugin.table.prop)
}), KindEditor.plugin("template", function (e) {
    function t(t) {
        return a + t + "?ver=" + encodeURIComponent(e.DEBUG ? e.TIME : e.VERSION)
    }

    var n = this, i = "template", a = (n.lang(i + "."), n.pluginsPath + i + "/html/");
    n.clickToolbar(i, function () {
        var a = n.lang(i + "."),
            o = ['<div style="padding:10px 20px;">', '<div class="ke-header">', '<div class="ke-left">', a.selectTemplate + " <select>"];
        e.each(a.fileList, function (e, t) {
            o.push('<option value="' + e + '">' + t + "</option>")
        }), html = [o.join(""), "</select></div>", '<div class="ke-right">', '<input type="checkbox" id="keReplaceFlag" name="replaceFlag" value="1" /> <label for="keReplaceFlag">' + a.replaceContent + "</label>", "</div>", '<div class="ke-clearfix"></div>', "</div>", '<iframe class="ke-textarea" frameborder="0" style="width:458px;height:260px;background-color:#FFF;"></iframe>', "</div>"].join("");
        var r = n.createDialog({
            name: i,
            width: 500,
            title: n.lang(i),
            body: html,
            yesBtn: {
                name: n.lang("yes"), click: function (t) {
                    var i = e.iframeDoc(d);
                    n[s[0].checked ? "html" : "insertHtml"](i.body.innerHTML).hideDialog().focus()
                }
            }
        }), l = e("select", r.div), s = e('[name="replaceFlag"]', r.div), d = e("iframe", r.div);
        s[0].checked = !0, d.attr("src", t(l.val())), l.change(function () {
            d.attr("src", t(this.value))
        })
    })
}), KindEditor.plugin("wordpaste", function (e) {
    var t = this, n = "wordpaste";
    t.clickToolbar(n, function () {
        var i = t.lang(n + "."),
            a = '<div style="padding:10px 20px;"><div style="margin-bottom:10px;">' + i.comment + '</div><iframe class="ke-textarea" frameborder="0" style="width:408px;height:260px;"></iframe></div>',
            o = t.createDialog({
                name: n,
                width: 450,
                title: t.lang(n),
                body: a,
                yesBtn: {
                    name: t.lang("yes"), click: function (n) {
                        var i = s.body.innerHTML;
                        i = e.clearMsWord(i, t.filterMode ? t.htmlTags : e.options.htmlTags), t.insertHtml(i).hideDialog().focus()
                    }
                }
            }), r = o.div, l = e("iframe", r), s = e.iframeDoc(l);
        e.IE || (s.designMode = "on"), s.open(), s.write("<!doctype html><html><head><title>WordPaste</title></head>"), s.write('<body style="background-color:#FFF;font-size:12px;margin:2px;">'), e.IE || s.write("<br />"), s.write("</body></html>"), s.close(), e.IE && (s.body.contentEditable = "true"), l[0].contentWindow.focus()
    })
}), KindEditor.plugin("fixtoolbar", function (e) {
    function t() {
        var t = e(".ke-toolbar"), n = t.pos().y;
        e(window).bind("scroll", function () {
            "fixed" == t.css("position") ? document.body.scrollTop - n < 0 && (t.css("position", "static"), t.css("top", "auto")) : t.pos().y - document.body.scrollTop < 0 && (t.css("position", "fixed"), t.css("top", 0))
        })
    }

    var n = this;
    n.fixToolBar && (n.isCreated ? t() : n.afterCreate(t))
});