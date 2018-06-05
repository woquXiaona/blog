<%@ page contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + request.getContextPath() + "/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="common/css/view.css"/>
    <link rel="stylesheet" type="text/css" href="common/css/styles.css"/>
    <!-- 返回顶部调用 begin -->
    <link href="common/css/lrtk.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="common/js/jquery.js"></script>
    <script type="text/javascript" src="common/js/js.js"></script>
    <script type="text/javascript" src="common/js/jquery.form.js"></script>
    <!-- 返回顶部调用 end-->
    <!--[if lt IE 9]>
    <script src="common/js/modernizr.js"></script>
    <![endif]-->
    <script>
        $(function () {
            var userid = "${user.id}";
            $("#submit").on("click", function () {
                $("#form").ajaxForm({
                    url: 'admin/user/guestbook.do',
                    type: 'post',
                    clearForm: true,
                    beforeSend: function () {
                        if (userid == "") {
                            if (window.confirm("尚未登陆")) {
                                window.location.href = "admin/login.jsp";
                            }
                            return false;
                        }
                    },
                    success: function (data) {
                        if (data.success) {
                            alert("提交成功");
                            window.location.href="index.jsp";
                        }
                    }
                });
            });
        })
    </script>
</head>
<body>
<div id="mainbody">
    <div>
        <center>
            <form id="form" style="overflow: hidden;padding: 10px;">
                <label style="color: white">昵称</label>
                <input id="name"
                       name="name"
                       type="text"
                       style="outline: none;
                       background: rgba(0, 0, 0, 0.25) no-repeat 3px -318px;
                       border: 1px solid #111;
                       width: 220px;
                       line-height: 30px;
                       color: #b9b9b9;"
                       value="${user.user_nickname}"
                       required>
                </p>
                <label style="color: white;">标题</label>
                <input id="title"
                       name="title"
                       type="text"
                       style="outline: none;
                       background: rgba(0, 0, 0, 0.25) no-repeat 3px -318px;
                       border: 1px solid #111;
                       width: 220px;
                       line-height: 30px;
                       margin-top: 10px;
                       color: #b9b9b9;">
                </p>
                <label style="color: white">内容</label>
                <textarea id="content"
                          name="content"
                          cols="3"
                          style="outline: none;
                          background: rgba(0, 0, 0, 0.25) no-repeat 3px -318px;
                          border: 1px solid #111;
                          width: 220px;
                          height:300px;
                          line-height: 20px;
                          color: #b9b9b9;
                          resize: none;
                          margin-top: 10px;
                          font-size: 15px"
                          required>
                </textarea>
                </p>
                <label style="color: white">邮箱</label>
                <input id="email"
                       name="email"
                       type="text"
                       style="outline: none;
                       background: rgba(0, 0, 0, 0.25) no-repeat 3px -318px;
                       border: 1px solid #111;
                       width: 220px;
                       line-height: 30px;
                       color: #b9b9b9;"
                       required>
                </p>
                <button id="submit" type="submit"
                        style="color: white; margin-top: 10px; background-color: #3F3E3C; border: 1px solid #111111">发送
                </button>
            </form>
        </center>
    </div>
</div>
<!--mainbody end-->
<footer>
    <div class="footer-mid">
        <div class="info-text">
            <center>
                <p class="sites">
                    <a rel="nofollow" href="//www.mi.com/index.html" target="_blank">新浪微博</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="https://www.miui.com/" target="_blank">MIUI</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="https://home.mi.com/index.html" target="_blank">米家</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="http://www.miliao.com/" target="_blank">米聊</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="https://www.duokan.com/" target="_blank">多看</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="http://game.xiaomi.com/" target="_blank">游戏</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="http://web.music.xiaomi.com/" target="_blank">音乐</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="http://www.miwifi.com/" target="_blank">路由器</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="//www.mi.com/micard/" target="_blank">米粉卡</a>
                    <span class="sep">|</span>
                    <a rel="nofollow" href="https://www.miui.com/res/doc/privacy/cn.html" target="_blank">隐私政策</a>
                </p>
                <br>
                <p>
                    <a href="//www.woquXiaona.com/" target="_blank" title="woquXiaona.com">woquXiaona.com</a>
                    <a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow">冀ICP备17033992号</a>
                    <a rel="nofollow" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13063102000041"
                       target="_blank">冀公网安备13063102000041号 </a>
                </p>
            </center>
        </div>
    </div>
</footer>
<!-- jQuery仿腾讯回顶部和建议 代码开始 -->
<div id="tbox">
    <a id="togbook" href="guestbook.jsp"></a>
    <a id="gotop" href="javascript:void(0)"></a></div>
<!-- 代码结束 -->
</body>
</html>