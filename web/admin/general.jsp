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
            //用户列表
            listUser(1, 10);

            //搜索
            $("#searchBtn").click(function () {
                listUser(1,10);
            });
        })

        //获取根据条件用户列表
        function listUser(pageNo, pageSize) {
            $.ajax({
                url: 'admin/user/list.do',
                data: {
                    "name": $.trim($("#user").val()),
                    "pageNo": pageNo,
                    "pageSize": pageSize
                },
                type: 'get',
                success: function (data) {
                    var html = "";
                    $.each(data.list, function (index, obj) {
                        html += "<tr id='tr" + obj.id + "'>";
                        html += "<td nowrap='nowrap'>" + obj.user_login + "</td>";
                        if (obj.user_nickname == null) {
                            html += "<td nowrap='nowrap'></td>";
                        } else {
                            html += "<td nowrap='nowrap'>" + obj.user_nickname + "</td>";
                        }
                        if (obj.avatar == null || obj.avatar == "") {
                            html += "<td nowrap='nowrap'></td>";
                        } else {
                            html += "<td nowrap='nowrap'><img width='32px' height='32px' src='" + obj.avatar + "'></td>";
                        }
                        html += "<td nowrap='nowrap'>" + obj.user_email + "</td>";
                        if (obj.user_type == "1") {
                            html += "<td nowrap='nowrap'>博主</td>";
                        } else if (obj.user_type == "2") {
                            html += "<td nowrap='nowrap'>管理员</td>";
                        } else if (obj.user_type == "3") {
                            html += "<td nowrap='nowrap'>作者</td>";
                        } else if (obj.user_type == "4") {
                            html += "<td nowrap='nowrap'>读者</td>";
                        }
                        html += "<td nowrap='nowrap'>" + obj.create_time + "</td>";
                        if (obj.last_login_time == null || obj.last_login_time == "") {
                            html += "<td nowrap='nowrap'></td>";
                        } else {
                            html += "<td nowrap='nowrap'>" + obj.last_login_time + "</td>";
                        }
                        if (obj.last_login_ip == null || obj.last_login_ip == "") {
                            html += "<td nowrap='nowrap'></td>";
                        } else {
                            html += "<td nowrap='nowrap'>" + obj.last_login_ip + "</td>";
                        }
                        html += "<td nowrap='nowrap'>";
                        if (obj.user_status == "1") {
                            html += "<h5 class='text-success'><span class='glyphicon glyphicon-ok'></span> 正常</h5>";
                        } else if (obj.user_status == "0") {
                            html += "<h5 class='text-danger'><span class='glyphicon glyphicon-remove'></span> 封禁</h5>";
                        }
                        html += "</td>";
                        html += "<td nowrap='nowrap'>";
                        if (obj.user_status == "1") {
                            if (obj.user_type == "1") {
                                html += "";
                            } else {
                                html += "<a class='lahei' href='javascript:disable(\"" + obj.id + "\")'>封禁<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                            }
                        } else if (obj.user_status == "0") {
                            if (obj.user_type == "1") {
                                html += "";
                            } else {
                                html += "<a class='qiyong' href='javascript:enable(\"" + obj.id + "\")'>启用<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                            }
                        }
                        html += "&nbsp;";
                        if (obj.user_type == "2") {
                            html += "<a class='jiangquan' href='javascript:downgrade(\"" + obj.id + "\",\"" + obj.user_type + "\")'>降级<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                        } else if (obj.user_type == "3") {
                            html += "<a class='jiangquan' href='javascript:downgrade(\"" + obj.id + "\",\"" + obj.user_type + "\")'>降级<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                            html += "&nbsp;";
                            html += "<a class='tiquan' href='javascript:upgrade(\""+obj.id+"\",\""+obj.user_type+"\")'>升级<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                        } else if (obj.user_type == "4") {
                            html += "<a class='tiquan' href='javascript:upgrade(\""+obj.id+"\",\""+obj.user_type+"\")'>升级<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                        }
                        html += "</td>";
                        html += "</tr>";
                    });
                    $("#userListTBody").html(html);
                    $("#user").val("");
                }
            })
        }

        //启用
        function enable(id) {
            $.ajax({
                url: 'admin/user/enable.do',
                data: {
                    "id": id
                },
                type: 'post',
                success: function (data) {
                    listUser(1, 10);
                }
            })
        }

        //封禁
        function disable(id) {
            $.ajax({
                url: 'admin/user/disable.do',
                data: {
                    "id": id
                },
                type: 'post',
                success: function (data) {
                    listUser(1, 10);
                }
            })
        }

        //降级
        function downgrade(id, user_type) {
            $.ajax({
                url: 'admin/user/downgrade.do',
                data: {
                    "id": id,
                    "user_type": user_type
                },
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        listUser(1, 10);
                    }
                }
            })
        }

        //升级
        function upgrade(id,user_type) {
            $.ajax({
                url: 'admin/user/upgrade.do',
                data: {
                    "id": id,
                    "user_type": user_type
                },
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        listUser(1, 10);
                    }
                }
            })
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
                    <li><a href="index.jsp" title="首页" target="_self"><span class="glyphicon glyphicon-home"></span></a>
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
                        <div id="collapse_yh" class="panel-collapse collapse in">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/general.jsp">
                                    <button type="button" class="btn btn-default btn-block btn-primary">
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
            <div class="row bg-info text-center">
                <h4>所有用户</h4>
            </div>
            <br>
            <div class="container-fluid" style="min-height: 800px;">
                <div class="row">
                    <div class="well">
                        <form class="form-inline" role="form">
                            <div class="form-group">
                                <label>用户名或者昵称：</label>
                                <input id="user" type="text" name="user" class="form-control" placeholder="用户名或者昵称">
                            </div>
                            <button id="searchBtn" type="button" class="btn btn-default"><span
                                    class="glyphicon glyphicon-search"></span>&nbsp;搜索
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th nowrap='nowrap'>用户名</th>
                                <th nowrap='nowrap'>昵称</th>
                                <th nowrap='nowrap'>头像</th>
                                <th nowrap='nowrap'>邮箱</th>
                                <th nowrap='nowrap'>用户类型</th>
                                <th nowrap='nowrap'>注册时间</th>
                                <th nowrap='nowrap'>最后登录时间</th>
                                <th nowrap='nowrap'>最后登录IP</th>
                                <th nowrap='nowrap'>状态</th>
                                <th nowrap='nowrap'>操作</th>
                            </tr>
                            </thead>
                            <tbody id="userListTBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="hidden" id="jinyong">禁用</div>
            <div class="hidden" id="zhengchang">正常</div>
            <script src="common/js/general.js"></script>
        </div>
    </div>
</div>
</body>
</html>