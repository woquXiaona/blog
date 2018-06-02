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
            //博客列表
            allPostsList(1, 10);
        })

        //博客列表
        function allPostsList(pageNo, pageSize) {
            $.ajax({
                url: 'post/allList.do',
                data: {
                    "pageNo": pageNo,
                    "pageSize": pageSize
                },
                type: 'get',
                cache: false,
                success: function (data) {
                    var html = "";
                    $.each(data.list, function (index, obj) {
                        html += "<tr id='tr" + obj.id + "'>";
                        html += "<td>";
                        html += "<input class='gouxuan' type='checkbox' value='" + obj.id + "'>";
                        html += "</td>";
                        html += "<td><a href='post/view.jsp?id=" + obj.id + "' target='_self'>" + obj.post_title + "</a></td>";
                        html += "<td>" + obj.post_hits + "</td>";
                        html += "<td>" + obj.post_comment_counts + "</td>";
                        html += "<td>" + obj.post_author + "</td>";
                        html += "<td>" + obj.post_time + "</td>";
                        html += "<td>";
                        if (obj.istop == "1") {
                            html += "<h5 class='text-muted'>置顶</h5>";
                        } else {
                            html += "<h5 class='text-muted'>不置顶</h5>";
                        }
                        if (obj.recommended == "1") {
                            html += "<h5 class='text-muted'>推荐</h5>";
                        } else {
                            html += "<h5 class='text-muted'>不推荐</h5>";
                        }
                        html += "</td>";
                        html += "<td>";
                        html += "<a href='admin/rewrite.jsp?id=" + obj.id + "' target='_blank'>编辑</a>";
                        html += "&nbsp;|&nbsp;";
                        html += "<a class='twitter' href='javascript:void(0)' onclick='removeById(\"" + obj.id + "\")'>删除</a>";
                        html += "</td>";
                        html += "</tr>";
                    });
                    $("#blogListTBody").html(html);
                }
            });
        }

        //删除单条博客
        function removeById(id) {
            if (window.confirm("您确定要将这篇文章放入回收站吗?")) {
                $.ajax({
                    url: 'post/removeById.do',
                    data: {
                        "id": id
                    },
                    type: 'post',
                    success: function (data) {
                        if (data.success) {
                            $("#tr" + id).remove();
                        } else {
                            alert("删除失败!")
                        }
                    },
                    error: function (data) {
                        alert("系统繁忙,请稍后再试!");
                    }
                })
            }
        }

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
                    <img alt="博客管理中心"
                         src="common/images/cortana.jpg" width="20" height="20">
                </a>
                <a class="navbar-brand" href="admin/index.jsp">博客管理中心</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="index.jsp" title="首页" target="_self"><span
                            class="glyphicon glyphicon-home"></span></a>
                    </li>
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
                        <div id="collapse_nr" class="panel-collapse collapse in">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/write.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        写文章
                                    </button>
                                </a>
                                <a href="admin/articles.jsp">
                                    <button type="button" class="btn btn-default btn-block btn-primary">
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
                        <div id="collapse_xt" class="panel-collapse collapse">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/web.jsp">
                                    <button type="button" class="btn btn-default btn-block">
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
                                <a href="/admin/personal.jsp">
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
            <link href="common/datetimepicker/css/bootstrap-datetimepicker.min.css"
                  type="text/css" rel="stylesheet">
            <link href="common/confirm/jquery-confirm.css" type="text/css"
                  rel="stylesheet">
            <div class="row bg-info text-center">
                <h4>所有文章</h4>
            </div>
            <br>
            <div class="container-fluid" style="min-height: 800px;">
                <div class="row">
                    <div class="well">
                        <form class="form-inline" role="form" method="get" action="search">
                            <div class="form-group">
                                <label>分类：</label>
                                <select class="form-control" name="fenlei">
                                    <option value="0">全部</option>
                                </select>
                            </div>&nbsp;&nbsp;
                            <div class="form-group">
                                <label>时间：</label>
                                <input type="text" class="form-control" readonly id="fromdatetime" name="start">&nbsp;—
                                <input type="text" class="form-control" readonly id="todatetime" name="end">
                            </div>&nbsp;&nbsp;
                            <div class="form-group">
                                <label>关键字：</label>
                                <input type="text" name="key" class="form-control" placeholder="关键字">
                            </div>
                            <button type="submit" class="btn btn-default"><span
                                    class="glyphicon glyphicon-search"></span>&nbsp;搜索
                            </button>
                        </form>
                    </div>
                </div>
                <div>
                    <p>
                        <label>批量操作：</label>
                        <button type="button" id="zhiding" class="btn btn-primary btn-sm">置顶<span
                                class="hidden">&nbsp;<img
                                src="images/zhixing_bai.gif" width="14" height="14"></span>
                        </button>
                        <button type="button" id="weizhiding" class="btn btn-primary btn-sm">取消置顶<span class="hidden">&nbsp;<img
                                src="images/zhixing_bai.gif" width="14" height="14"></span>
                        </button>
                        <button type="button" id="tuijian" class="btn btn-primary btn-sm">推荐<span
                                class="hidden">&nbsp;<img
                                src="images/zhixing_bai.gif" width="14" height="14"></span>
                        </button>
                        <button type="button" id="weituijian" class="btn btn-primary btn-sm">取消推荐<span class="hidden">&nbsp;<img
                                src="images/zhixing_bai.gif" width="14" height="14"></span>
                        </button>
                        <button type="button" id="pshanchu" class="btn btn-primary btn-sm">删除<span class="hidden">&nbsp;<img
                                src="images/zhixing_bai.gif" width="14" height="14"></span>
                        </button>
                    </p>
                </div>
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="zxuan">
                                </th>
                                <th>标题</th>
                                <th>点击量</th>
                                <th>评论量</th>
                                <th>作者</th>
                                <th>发布时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody id="blogListTBody">
                            <%--<tr>
                                <td>
                                    <input class="gouxuan" type="checkbox" value="2">
                                </td>
                                <td><a href="post/view.jsp" target="_self">世界，您好！</a></td>
                                <td>1</td>
                                <td>0</td>
                                <td>本人王明亮</td>
                                <td>2016-10-17 15:42:11</td>
                                <td>
                                    <h5 class="text-muted">不置顶</h5>
                                    <h5 class="text-muted">不推荐</h5>
                                </td>
                                <td>
                                    <a href="admin/rewrite.jsp?art=2" target="_blank">编辑</a>
                                    &nbsp;|&nbsp;
                                    <a class="twitter" data-title="确定删除吗?" href="#!">删除</a>
                                </td>
                            </tr>--%>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <br>
            <div class="hidden" id="quedingshanchu">确定删除吗?</div>
            <div class="hidden" id="fangruhuishouzhan">您确定要将这篇文章放入回收站吗?</div>
            <div class="hidden" id="jixu">继续</div>
            <div class="hidden" id="quxiao">取消</div>
            <div class="hidden" id="wenzhanghuishou">您确定要将选中文章放入回收站吗?</div>
            <div class="hidden" id="yishenhe">已审核</div>
            <div class="hidden" id="meishenhe">未审核</div>
            <div class="hidden" id="yizhiding">已置顶</div>
            <div class="hidden" id="meizhiding">不置顶</div>
            <div class="hidden" id="yituijian">推荐</div>
            <div class="hidden" id="meituijian">不推荐</div>
            <div class="hidden" id="jinggao">警告!</div>
            <div class="hidden" id="zhishaoxuanyixiang">请至少选择一项!</div>
            <div class="hidden" id="queding">确定</div>
            <script type="text/javascript"
                    src="common/datetimepicker/js/bootstrap-datetimepicker.min.js"
                    charset="UTF-8"></script>
            <script src="common/confirm/jquery-confirm.js"></script>
            <script src="common/js/articles.js"></script>
        </div>
    </div>
</div>
</body>
</html>