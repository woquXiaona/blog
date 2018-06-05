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
    <script src="common/js/jquery.form.js"></script>
    <script type="text/javascript">
        $(function () {
            //获取友情链接列表
            listLinks();
        })

        function listLinks() {
            $.ajax({
                url: 'admin/link/list.do',
                type: 'get',
                success: function (data) {
                    if (data.success) {
                        var html = "";
                        $.each(data.linkList, function (index, obj) {
                            html += "<tr id='tr" + obj.link_id + "'>";
                            html += "<td>" + obj.orderNo + "</td>";
                            html += "<td>" + obj.link_name + "</td>";
                            html += "<td><a href='" + obj.link_url + "' target='_blank'>" + obj.link_url + "<a/></td>";
                            html += "<td>" + obj.link_description + "</td>";
                            if (obj.link_target == "_blank") {
                                html += "<td>作为新窗口打开</td>";
                            } else if (obj.link_target == "_self") {
                                html += "<td>在原窗口打开</td>";
                            }
                            html += "<td>";
                            if (obj.link_status == "1") {
                                html += "<h5 class='text-success'><span class='glyphicon glyphicon-ok'></span> 启用</h5>";
                            } else {
                                html += "<h5 class='text-danger'><span class='glyphicon glyphicon-remove'></span> 禁用</h5>";
                            }
                            html += "</td>";
                            html += "<td>";
                            html += "<a href='admin/modifylink.jsp?id=" + obj.link_id + "'>编辑</a>";
                            html += "&nbsp;|&nbsp;";
                            html += "<a href='javascript:deleteById(\"" + obj.link_id + "\")'>删除</a>";
                            html += "&nbsp;|&nbsp;";
                            if (obj.link_status == "1") {
                                html += "<a class='yincang' href='javascript:disableLink(\"" + obj.link_id + "\")'>禁用<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                            } else {
                                html += "<a class='qiyong' href='javascript:enableLink(\"" + obj.link_id + "\")'>启用<span class='hidden'>&nbsp;<img src='common/images/zhixing.gif' width='16' height='16'></span></a>";
                            }
                            html += "</td>";
                            html += "</tr>";
                        });
                        $("#linkListTBody").html(html);
                    }
                }
            })
        }

        //启用链接
        function enableLink(id) {
            $.ajax({
                url: 'admin/link/enableLink.do',
                data: {
                    "id": id
                },
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        listLinks();
                    } else {
                        alert("启用失败,请重试!")
                    }
                },
                error: function (data) {
                    alert("系统繁忙,请稍后再试");
                }
            })
        }

        //禁用链接
        function disableLink(id) {
            $.ajax({
                url: 'admin/link/disableLink.do',
                data: {
                    "id": id
                },
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        listLinks();
                    } else {
                        alert("禁用失败,请重试!")
                    }
                },
                error: function (data) {
                    alert("系统繁忙,请稍后再试");
                }
            })
        }

        //删除链接
        function deleteById(id) {
            if (window.confirm("您确定要将友情链接删除吗?删除后不可恢复!")) {
                $.ajax({
                    url: 'admin/link/deleteById.do',
                    data: {
                        "id": id
                    },
                    type: 'post',
                    success: function (data) {
                        if (data.success) {
                            $("#tr" + id).remove();
                        } else {
                            alert("删除失败,请重试!")
                        }
                    },
                    error: function (data) {
                        alert("系统繁忙,请稍后再试");
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
                    <img alt="博客管理中心" src="common/images/cortana.jpg" width="20" height="20">
                </a>
                <a class="navbar-brand" href="admin/index.jsp">博客管理中心</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="index.jsp" title="首页" target="_blank"><span class="glyphicon glyphicon-home"></span></a>
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
                        <div id="collapse_ym" class="panel-collapse collapse in">
                            <div class="list-group" style="margin-bottom: 0px;">
                                <a href="admin/addLinks.jsp">
                                    <button type="button" class="btn btn-default btn-block">
                                        添加友情链接
                                    </button>
                                </a>
                                <a href="admin/links.jsp">
                                    <button type="button" class="btn btn-default btn-block btn-primary">
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
            <link href="common/confirm/jquery-confirm.css" type="text/css"
                  rel="stylesheet">
            <div class="row bg-info text-center">
                <h4>管理友情链接</h4>
            </div>
            <br>
            <div class="container-fluid" style="min-height: 800px;">
                <form class="form-inline" method="post" action="">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>排序号</th>
                                    <th>名称</th>
                                    <th>链接地址</th>
                                    <th>描述</th>
                                    <th>打开方式</th>
                                    <th>启用状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody id="linkListTBody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
            <br>
            <div class="hidden" id="buxianshi">不显示</div>
            <div class="hidden" id="xianshi">显示</div>
            <div class="hidden" id="quedingshanchu">确定删除吗?</div>
            <div class="hidden" id="bukehuifu">您确定要将友情链接删除吗?删除后不可恢复!</div>
            <div class="hidden" id="jixu">继续</div>
            <div class="hidden" id="quxiao">取消</div>
            <script src="common/confirm/jquery-confirm.js"></script>
            <script src="common/js/links.js"></script>
        </div>
    </div>
</div>
</body>
</html>