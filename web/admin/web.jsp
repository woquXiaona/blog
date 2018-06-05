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
    <title>博客后台</title>
    <link rel="icon" href="common/images/cortana.jpg">
    <link rel="stylesheet" href="common/css/bootstrap.min.css">
    <script src="common/js/jquery.min.js"></script>
    <script src="common/js/bootstrap.min.js"></script>
    <script type="text/javascript">
        $(function () {
            alert("尚未实现!");
        })
    </script>
</head>
<body style="background-color:#96b7e0;">
<div class="row">
    <nav id="navbar-example" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
                        data-target="#bs-example-js-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="admin/index.jsp">
                    <img alt="博客管理中心" src="common/images/cortana.jpg" width="20"
                         height="20">
                </a>
                <a class="navbar-brand" href="admin/index.jsp">博客管理中心</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="index.jsp" title="首页" target="_blank"><span
                            class="glyphicon glyphicon-home"></span></a></li>
                    <li><a href="admin/write.jsp" title="写文章"><span
                            class="glyphicon glyphicon-pencil"></span></a></li>
                    <li><a href="admin/personal.jsp" title="修改个人信息"><span
                            class="glyphicon glyphicon-list-alt"></span></a></li>
                    <li><a href="admin/change.jsp" title="修改登录密码"><span class="glyphicon glyphicon-lock"></span></a>
                    </li>
                    <li><a href="admin/clearcache.jsp" title="清除缓存"><span
                            class="glyphicon glyphicon-repeat"></span></a></li>
                    <li><a href="admin/user/quit.do" title="退出"><span
                            class="glyphicon glyphicon-log-out"></span></a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li id="fat-menu" class="dropdown">
                        <a id="drop3" href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            欢迎，
                            <c:if test="${not empty user.user_nickname}">
                                ${user.user_nickname}
                            </c:if>
                            <c:if test="${empty user.user_nickname}">
                                ${user.user_login}
                            </c:if>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="drop3">
                            <li role="presentation"><a role="menuitem" tabindex="-1"
                                                       href="admin/change.jsp"><span
                                    class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;修改登录密码</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1"
                                                       href="admin/personal.jsp"><span
                                    class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;修改个人信息</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1"
                                                       href="admin/user/quit.do"><span
                                    class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;退出</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
<div class="panel panel-default">
    <div class="panel-body"></div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-sm-3 col-md-2">
            <div class="collapse navbar-collapse"
                 style="position: fixed; top: 51px; bottom: 0; padding-top: 10px; z-index: 1000; background-color:#96b7e0; color: #DDDDDD;"
                 id="bs-example-js-navbar-collapse">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="heading_nr">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse_nr">
                                    <span class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;内容管理&nbsp;&nbsp;<span
                                        class="caret"></span>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_nr" class="panel-collapse collapse">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/write.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        写文章
                                    </button>
                                </a>
                                <a href="admin/articles.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        所有文章
                                    </button>
                                </a>
                                <a href="admin/addclassify.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        添加分类
                                    </button>
                                </a>
                                <a href="admin/classify.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        分类管理
                                    </button>
                                </a>
                                <a href="admin/comments.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        评论管理
                                    </button>
                                </a>
                                <a href="admin/simiwz.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        私密文章
                                    </button>
                                </a>
                                <a href="admin/recycle.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        回收站
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="heading_ym">
                            <h4 class="panel-title">
                                <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
                                   href="#collapse_ym">
                                    <span class="glyphicon glyphicon-file"></span>&nbsp;&nbsp;页面管理&nbsp;&nbsp;<span
                                        class="caret"></span>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_ym" class="panel-collapse collapse">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/addLinks.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        添加友情链接
                                    </button>
                                </a>
                                <a href="admin/links.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        管理友情链接
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="heading_cd">
                            <h4 class="panel-title">
                                <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
                                   href="#collapse_cd">
                                    <span class="glyphicon glyphicon-th-list"></span>&nbsp;&nbsp;菜单管理&nbsp;&nbsp;<span
                                        class="caret"></span>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_cd" class="panel-collapse collapse">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/addmenu.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        添加菜单
                                    </button>
                                </a>
                                <a href="admin/managemenu.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        管理菜单
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="heading_xt">
                            <h4 class="panel-title">
                                <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
                                   href="#collapse_xt">
                                    <span class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;系统设置&nbsp;&nbsp;<span
                                        class="caret"></span>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_xt" class="panel-collapse collapse in">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/web.jsp">
                                    <button type="button" class="btn btn-default btn-block btn-primary">
                                        网站信息
                                    </button>
                                </a>
                                <a href="admin/clearcache.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        清除缓存
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="heading_yh">
                            <h4 class="panel-title">
                                <a class="collapsed" data-toggle="collapse" data-parent="#accordion"
                                   href="#collapse_yh">
                                    <span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;用户管理&nbsp;&nbsp;<span
                                        class="caret"></span>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_yh" class="panel-collapse collapse">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/general.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        所有用户
                                    </button>
                                </a>
                                <a href="admin/personal.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        个人信息
                                    </button>
                                </a>
                                <a href="admin/change.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        修改密码
                                    </button>
                                </a>
                                <a href="admin/shoucang.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        我的收藏
                                    </button>
                                </a>
                                <a href="admin/pinglun.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        我的评论
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="admin/user/quit.do">
                    <button type="button" class="btn btn-default btn-block"><span
                            class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;退出
                    </button>
                </a><br>
            </div>
        </div>
        <div class="col-xs-12 col-sm-9 col-md-10 pull-right" style="background-color:#FFFFFF;">
            <link href="common/uploadify/uploadify.css" type="text/css" rel="stylesheet">
            <div class="row bg-info text-center">
                <h4>网站信息</h4>
            </div>
            <br>
            <div class="container-fluid" style="min-height: 800px;">
                <div class="row">
                    <form method="post" action="">
                        <div class="form-group">
                            <label>站点标题：</label>
                            <input type="text" class="form-control" name="title" value="王明亮的个人博客" placeholder="站点标题">
                        </div>
                        <div class="form-group">
                            <label>副标题：</label>
                            <input type="text" class="form-control" name="subtitle" value="Hello,world!"
                                   placeholder="副标题">
                        </div>
                        <div class="form-group">
                            <label>站点域名：</label>
                            <input type="text" class="form-control" name="domain" value="http://woquxiaona.com/">
                            <p class="help-block">域名要以“/”结尾。</p>
                        </div>
                        <div class="form-group">
                            <label>站点关键字：</label>
                            <input type="text" class="form-control" name="keyword" value="">
                        </div>
                        <div class="form-group">
                            <label>站点描述：</label>
                            <textarea class="form-control" name="description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>站长邮箱：</label>
                            <input type="email" class="form-control" name="email" value="1754197260@qq.com"
                                   placeholder="站长邮箱">
                        </div>
                        <div class="form-group">
                            <label>评论是否需要审核：</label>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="pinglun"> 评论需要审核 </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>用户名过滤：</label>
                            <input type="text" class="form-control" name="guolv" value="">
                            <p class="help-block">您可以设置不允许注册的用户名，用逗号“，”隔开</p>
                        </div>
                        <div class="form-group">
                            <label>首页显示数量：</label>
                            <input type="number" class="form-control" name="homeShows" value="10">
                            <p class="help-block">可以设置在首页显示的记录数量</p>
                        </div>
                        <div class="form-group">
                            <label>每页显示数量：</label>
                            <input type="number" class="form-control" name="everyPageShows" value="10">
                            <p class="help-block">可以设置分类页面中的显示数量</p>
                        </div>
                        <div class="form-group">
                            <label>是否开启留言：</label>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="openMessage"> 开启留言 </label>
                            </div>
                            <p class="help-block">开启留言需要主题支持</p>
                        </div>
                        <div class="form-group">
                            <label>是否关闭评论：</label>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="closeComment"> 关闭评论 </label>
                            </div>
                            <p class="help-block">关闭评论后，写文章时设置评论将失效</p>
                        </div>
                        <div class="form-group">
                            <label>是否允许注册登录：</label>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="notAllowLogin"> 不允许注册登录 </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>是否关闭站点：</label>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="guanbi"> 关闭站点 </label>
                            </div>
                            <p class="help-block">当您需要网站维护时，可以用来关闭站点</p>
                        </div>
                        <div class="form-group">
                            <label>网站图标：</label>
                            <div id="upload_ico"></div>
                            <div style="width: 200px;">
                                <img src="common/images/default-thumbnail.png"
                                     class="img-thumbnail img-responsive" id="icotubiaoIco">
                            </div>
                            <input type="hidden" value="" name="ico" id="icotubiao">
                            <p class="help-block">请上传ico图标文件</p>
                        </div>
                        <div class="form-group">
                            <label>备案信息：</label>
                            <input type="text" class="form-control" name="record" value="">
                        </div>
                        <div class="form-group">
                            <label>版权信息：</label>
                            <textarea class="form-control" name="copyright" rows="3">王明亮的个人博客</textarea>
                        </div>
                        <div class="form-group">
                            <label>统计代码：</label>
                            <textarea class="form-control" name="statistics" rows="3"></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-default">保存<span class="hidden">&nbsp;<img
                                    src="common/images/zhixing.gif" width="16" height="16"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br><br>
            <div class="hidden" id="webroot">http://woquxiaona.com/</div>
            <div class="hidden" id="buttonText">选择图片</div>
            <div class="hidden" id="icobuttonText">选择图标</div>
            <script type="text/javascript"
                    src="common/uploadify/jquery.uploadify.js"></script>
            <script src="common/js/web.js"></script>
        </div>
    </div>
</div>
</body>
</html>