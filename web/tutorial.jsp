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
    <title>王明亮的个人博客</title>
    <meta name="keywords" content="黑色模板,个人网站模板,个人博客模板,博客模板,css3,html5,网站模板"/>
    <meta name="description" content="这是一个有关黑色时间轴的css3 html5 网站模板"/>
    <link rel="icon" href="common/images/cortana.jpg">
    <link href="common/css/styles.css" rel="stylesheet">
    <link href="common/css/animation.css" rel="stylesheet">
    <!-- 返回顶部调用 begin -->
    <link href="common/css/lrtk.css" rel="stylesheet"/>
    <script type="text/javascript" src="common/js/jquery.js"></script>
    <script type="text/javascript" src="common/js/js.js"></script>
    <!-- 返回顶部调用 end-->
    <!--[if lt IE 9]>
    <script src="js/modernizr.js"></script>
    <![endif]-->
</head>
<body>
<header>
    <nav id="nav">
        <ul>
            <li><a href="/">网站首页</a></li>
        </ul>
        <ul id="categroy">
            <li><a href="news.jsp" target="_self" title="资讯">资讯</a></li>
            <li><a href="web.jsp" target="_self" title="Web">Web</a></li>
            <li><a href="basic.jsp" target="_self" title="基础技术">基础技术</a></li>
            <li><a href="books.jsp" target="_self" title="书籍">书籍</a></li>
            <li><a href="tutorial.jsp" target="_self" title="教程">教程</a></li>
            <li><a href="tools.jsp" target="_self" title="工具资源">工具资源</a></li>
            <li><a href="talk.jsp" target="_self" title="碎言碎语">碎言碎语</a></li>
        </ul>
        <ul>
            <li><a href="admin/login.jsp" target="_self" title="登录后台">登录后台</a></li>
        </ul>
        <script src="common/js/silder.js"></script><!--获取当前页导航 高亮显示标题-->
    </nav>
</header>
<!--header end-->
<!--mainbody end-->
<footer>
    <div class="footer-mid">
        <div class="info-text">
            <center>
                <p class="sites">
                    <a rel="nofollow" href="https://weibo.com/woquYuXiaona" target="_blank">新浪微博</a>
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
<div id="tbox"><a id="togbook" href="/e/tool/gbook/?bid=1"></a> <a id="gotop" href="javascript:void(0)"></a></div>
<!-- 代码结束 -->
</body>
</html>