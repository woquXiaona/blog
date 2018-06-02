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
    <link href="common/css/pagination-modified.css" rel="stylesheet" type="text/css">
    <link href="common/css/jquery.bs_pagination.min.css" rel="stylesheet" type="text/css">
    <!-- 返回顶部调用 begin -->
    <link href="common/css/lrtk.css" rel="stylesheet"/>
    <script type="text/javascript" src="common/js/jquery.js"></script>
    <script type="text/javascript" src="common/js/js.js"></script>
    <!-- 返回顶部调用 end-->
    <!--[if lt IE 9]>
    <script src="common/js/modernizr.js"></script>
    <![endif]-->
    <script type="text/javascript" src="common/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="common/js/jquery.bs_pagination.min.js"></script>
    <script type="text/javascript" src="common/js/en.min.js"></script>
    <script type="text/javascript">
        $(function () {
            //导航菜单
            category();
            //博客列表
            blogList(1, 5);
            //推荐文章
            tuijianBlogList(1, 9);
            //热门点击
            hotBlogs(1, 8);
            //名片
            $.ajax({
                url: 'admin/user/getBloggerInfo.do',
                type: 'get',
                success: function (data) {
                    if (data.success) {
                        if (data.user.user_nickname != null && data.user.user_nickname != "") {
                            $("#nickName").html(data.user.user_nickname);
                        }
                        if (data.user.weibo != null && data.user.weibo != "") {
                            $("#weibo").html(data.user.weibo);
                            $("#weibo").attr('href', data.user.weibo);
                        }
                        if (data.user.user_email != null && data.user.user_email != "") {
                            $("#email").html(data.user.user_email);
                        }
                        if (data.user.signature != null && data.user.signature != "") {
                            $("#signature").html(data.user.signature);
                        }
                    }
                }
            })
            //最新评论
            $.ajax({
                url: 'post/comment/list.do',
                data: {
                    "pageNo": 1,
                    "pageSize": 3
                },
                type: 'get',
                cache: false,
                success: function (data) {
                    var html = "";
                    $.each(data.commentList, function (index, obj) {
                        html += "<dl>";
                        html += "<dt><img src='" + obj.avatar + "'>";
                        html += "<dt>";
                        html += "<dd>" + obj.user_nickname + "";
                        html += "<time>" + obj.createtime + "</time>";
                        html += "</dd>";
                        html += "<dd>在 <a href='post/view.do?id=" + obj.id + "' class='title'>" + obj.post_title + "</a>中评论：";
                        html += "</dd>";
                        html += "<dd>" + obj.content + "</dd>";
                        html += "</dl>";
                    });
                    $("#newestCommentsList").append(html);
                }
            })
            //模糊查询
            $("#search").keydown(function (event) {
                if (event.keyCode == 13) {
                    window.location.href = "post/result.jsp?title=" + $.trim($("#search").val());
                    //最后清空搜索框内容
                    $("#search").val("");
                }
            });
        });

        //导航菜单
        function category() {
            $.ajax({
                url: 'post/category/list.do',
                type: 'get',
                success: function (data) {
                    if (data.success) {
                        var html = "";
                        $.each(data.categories, function (index, obj) {
                            html += "<li><a href='" + obj.url + "' target='_self' title='" + obj.name + "'>" + obj.name + "</a></li>";
                        });
                        $("#categroy").html(html);
                    }
                }
            });
        }

        //博客列表
        function blogList(pageNo, pageSize) {
            $.ajax({
                url: 'post/list.do',
                data: {
                    "pageNo": pageNo,
                    "pageSize": pageSize
                },
                type: "get",
                cache: false,
                success: function (data) {
                    var html = "";
                    $.each(data.list, function (index, obj) {
                        html += "<li>";
                        html += "<div class='arrow_box'>";
                        html += "<div class='ti'></div>";
                        html += "<!--三角形-->";
                        html += "<div class='ci'></div>";
                        html += "<!--圆形-->";
                        html += "<h2 class='title'><a href='post/view.do?id=" + obj.id + "'>" + obj.post_title + "</a></h2>";
                        html += "<ul class='textinfo'>";
                        html += "<a href='post/view.do?id=" + obj.id + "'>";
                        if (obj.thumbnail == null || obj.thumbnail == "") {
                            html += "<img src='common/images/nophoto.gif' width='150px' height='107px'>";
                        } else {
                            html += "<img src='" + obj.thumbnail + "'>";
                        }
                        html += "</a>";
                        html += "<p>" + obj.post_excerpt + "...</p>";
                        html += "</ul>";
                        html += "<ul class='details'>";
                        html += "<li class='comments'><a href='post/view.do?id=" + obj.id + "'>" + obj.post_comment_counts + "</a></li>";
                        html += "<li class='likes'><a id='likes" + obj.id + "' href='javascript:void(0)' onclick='javascript:addLikes(\"" + obj.id + "\")'>" + (obj.post_like == null ? "0" : obj.post_like) + "</a></li>";
                        html += "<li class='icon-time'><label>" + obj.post_time + "</label></li>";
                        html += "</ul>";
                        html += "</div>";
                        html += "<!--arrow_box end-->";
                        html += "</li>";
                    });
                    $("#blogList").html(html);
                    //分页插件
                    var totalRows = data.total;
                    var totalPages = totalRows % pageSize == 0 ? totalRows / pageSize : parseInt(totalRows / pageSize) + 1;
                    $("#blogPagination").bs_pagination({
                        currentPage: pageNo,
                        rowsPerPage: pageSize,
                        totalPages: totalPages,
                        totalRows: totalRows,
                        visiblePageLinks: 5,
                        showGoToPage: true,
                        showRowsPerPage: true,
                        showRowsInfo: true,
                        showRowsDefaultInfo: false,
                        onChangePage: function (event, data) {
                            display(data.currentPage, data.rowsPerPage);
                        }
                    });
                }
            })
        }

        //推荐文章
        function tuijianBlogList(pageNo, pageSize) {
            $.ajax({
                url: 'post/tuijian.do',
                data: {
                    "pageNo": pageNo,
                    "pageSize": pageSize
                },
                type: 'get',
                cache: false,
                success: function (data) {
                    var html = "";
                    $.each(data.list, function (index, obj) {
                        html += "<li><span><strong>" + (index + 1) + "</strong></span><a href='post/view.do?id=" + obj.id + "'>" + obj.post_title + "</a></li>";
                    });
                    $("#tuijianList").html(html);
                }
            });
        }

        //热门点击
        function hotBlogs(pageNo, pageSize) {
            $.ajax({
                url: 'post/hotHits.do',
                data: {
                    "pageNo": pageNo,
                    "pageSize": pageSize
                },
                type: 'get',
                cache: false,
                success: function (data) {
                    var html = "";
                    $.each(data.list, function (index, obj) {
                        html += "<li>";
                        html += "<span>";
                        html += "<a href='/'>" + obj.post_type + "</a>";
                        html += "</span>";
                        html += "<a href='post/view.do?id=" + obj.id + "'>" + obj.post_title + "</a>";
                        html += "</li>";
                    });
                    $("#hotBlogsList").html(html);
                }
            })
        }

        //点赞
        function addLikes(id) {
            $.ajax({
                url: 'post/addLikes.do',
                data: {
                    "id": id,
                },
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        $("#likes" + id).text(data.likes);
                        tuijianBlogList(1, 9);
                    }
                }
            });
        }
    </script>
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
<div id="mainbody">
    <div class="info">
        <figure><img src="common/images/art.jpg" alt="Panama Hat">
            <figcaption><strong>渡人如渡己，渡已，亦是渡</strong> 当我们被误解时，会花很多时间去辩白。
                但没有用，没人愿意听，大家习惯按自己的所闻、理解做出判别，每个人其实都很固执。与其努力且痛苦的试图扭转别人的评判，不如默默承受，给大家多一点时间和空间去了解。而我们省下辩解的功夫，去实现自身更久远的人生价值。其实，渡人如渡己，渡已，亦是渡人。
            </figcaption>
        </figure>
        <div class="card">
            <h1>我的名片</h1>
            <p>网名:&nbsp;
                <span id="nickName">本人王明亮</span>
            </p>
            <p>微博:&nbsp;
                <a id="weibo" target="_blank" href="https://weibo.com/woquYuXiaona">https://weibo.com/woquYuXiaona</a>
            </p>
            <p>Email:&nbsp;
                <span id="email">1754197260@qq.com</span>
            </p>
            <p>个性签名：&nbsp;
                <span id="signature">常伴长相守,永忆永相思</span>
            </p>
            <ul class="linkmore">
                <li>
                    <a href="#!"
                       data-method="offset"
                       data-type="auto"
                       class="talk"
                       title="给我留言">
                    </a>
                </li>
                <li><a href="/" class="address" title="联系地址"></a></li>
                <li><a href="/" class="email" title="给我写信"></a></li>
                <li><a href="/" class="photos" title="生活照片"></a></li>
                <li><a href="/" class="heart" title="关注我"></a></li>
            </ul>
        </div>
    </div>
    <!--info end-->
    <div class="blogs">
        <ul id="blogList" class="bloglist">
        </ul>
        <!--bloglist end-->
        <aside>
            <div class="search">
                <form class="searchform" onsubmit="return false">
                    <input id="search" type="text" placeholder="Search">
                </form>
            </div>
            <div class="tuijian">
                <h2>推荐文章</h2>
                <ol id="tuijianList"></ol>
            </div>
            <div class="clicks">
                <h2>热门点击</h2>
                <ol id="hotBlogsList">
                    <%--<li><span><a href="/">慢生活</a></span><a href="/">有一种思念，是淡淡的幸福,一个心情一行文字</a></li>
                    <li><span><a href="/">爱情美文</a></span><a href="/">励志人生-要做一个潇洒的女人</a></li>
                    <li><span><a href="/">慢生活</a></span><a href="/">女孩都有浪漫的小情怀――浪漫的求婚词</a></li>
                    <li><span><a href="/">博客模板</a></span><a href="/">Green绿色小清新的夏天-个人博客模板</a></li>
                    <li><span><a href="/">女生个人博客</a></span><a href="/">女生清新个人博客网站模板</a></li>
                    <li><span><a href="/">Wedding</a></span><a href="/">Wedding-婚礼主题、情人节网站模板</a></li>
                    <li><span><a href="/">三栏布局</a></span><a href="/">Column 三栏布局 个人网站模板</a></li>
                    <li><span><a href="/">个人网站模板</a></span><a href="/">时间煮雨-个人网站模板</a></li>
--%> <%--<li><span><a href="/">古典风格</a></span><a href="/">花气袭人是酒香―个人网站模板</a></li>--%>
                </ol>
            </div>
            <div class="visitors" id="newestCommentsList">
                <h2>最新评论</h2>
                <%--<dl>
                    <dt><img src="common/images/s6.jpg">
                    <dt>
                    <dd>小林博客
                        <time>8月7日</time>
                    </dd>
                    <dd>在 <a href="http://www.yangqq.com/jstt/bj/2013-06-18/285.html"
                             class="title">如果个人博客网站再没有价值，你还会坚持吗？ </a>中评论：
                    </dd>
                    <dd>博客色彩丰富，很是好看</dd>
                </dl>--%>
            </div>
            <div class="viny">
                <dl>
                    <dt class="art"><img src="common/images/cupcake.jpg" alt="专辑"></dt>
                    <dd class="icon-song"><a href="https://www.xiami.com/album/1596345130" target="_blank">杯子蛋糕</a></dd>
                    <dd class="icon-artist">歌手：<a
                            href="https://www.xiami.com/artist/bKcgsg7ba45?spm=a1z1s.6659513.6856585.1.uPxRGB"
                            title="Sandy&Mandy" target="_blank">Sandy&Mandy</a></dd>
                    <dd class="icon-album">专辑类别：单曲</dd>
                    <dd class="icon-like"><span></span><a href="/">喜欢</a></dd>
                    <dd class="music">
                        <audio src="common/images/cupcake.mp3" controls="controls" loop="loop"></audio>
                    </dd>
                    <!--也可以添加loop属性 音频加载到末尾时，会重新播放-->
                </dl>
            </div>
        </aside>
    </div>
</div>
<!--mainbody end-->
<footer>
    <center style="background-color: #333">
        <div id="blogPagination" class="pagination"></div>
    </center>
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
<div id="tbox">
    <a id="togbook" href="/e/tool/gbook/?bid=1"></a>
    <a id="gotop" href="javascript:void(0)"></a></div>
<!-- 代码结束 -->
</body>
</html>