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
    <link rel="icon" href="images/cortana.jpg">
    <link rel="stylesheet" href="common/css/bootstrap.min.css">
    <script src="common/js/jquery.min.js"></script>
    <script src="common/js/bootstrap.min.js"></script>
    <script src="common/js/jquery.form.js" type="text/javascript"></script>
    <%--<script src="common/uploadify/jquery.uploadify.min.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        $(function () {
            var id = "${user.id}";
            getById(id);

            $("#personalBtn").on('click', function () {
                $("#personalForm").ajaxForm({
                    url: 'admin/user/modifyUser.do',
                    type: 'post',
                    success: function (data) {
                        if (data.success) {
                            //window.location.href = "admin/personal.jsp";
                        } else {
                            alert("修改失败!")
                        }
                    },
                    error: function (data) {
                        alert("系统繁忙,请稍后再试!");
                    }
                });
            });

            /*$("#uploadify").change(function () {
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl) {
                    $("#avatarImg").attr("src", objUrl);
                    $("#avatar").val(objUrl);
                }
            });*/

            $("#upload").uploadify({
                'swf'       : 'common/uploadify/uploadify.swf',
                'uploader'  : 'UploadServlet.do',
                'folder'         : '/common/mnt',
                'queueID'        : 'upload',
                'cancelImg'      : 'common/uploadify/uploadify-cancel.png',
                'buttonText'     : '选择',
                'auto'           : true, //设置true 自动上传 设置false还需要手动点击按钮
                'multi'          : false,
                'wmode'          : 'transparent',
                'simUploadLimit' : 999,
                'fileTypeExts'        : '*.*',
                'fileTypeDesc'       : 'All Files'
            });

        })

        //根据id获取用户信息
        function getById(id) {
            $.ajax({
                url: 'admin/user/getById.do',
                data: {
                    "id": id
                },
                type: 'get',
                success: function (data) {
                    if (data.success) {
                        $("#name").val(data.user.user_nickname);
                        if (data.user.sex == "1") {
                            $("#sex").val("1");
                        } else if (data.user.sex == "2") {
                            $("#sex").val("2");
                        } else {
                            $("#sex").val("0");
                        }
                        $("#birthday").val(data.user.birthday);
                        $("#email").val(data.user.user_email);
                        $("#university").val(data.user.university);
                        $("#mobile").val(data.user.mobile);
                        $("#qq").val(data.user.qq);
                        $("#weibo").val(data.user.weibo);
                        $("#wechat").val(data.user.wechat);
                        $("#facebook").val(data.user.facebook);
                        $("#twitter").val(data.user.twitter);
                        $("#signature").val(data.user.signature);
                        $("#avatarImg").attr("src", data.user.avatar);
                    }
                }
            })
        }

        /*function getObjectURL(file) {
            var url = null;
            // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }*/
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
                                    <button type="button" class="btn btn-default btn-block">
                                        所有用户
                                    </button>
                                </a>
                                <a href="admin/personal.jsp">
                                    <button type="button" class="btn btn-default btn-block btn-primary">
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
            <link href="common/datetimepicker/jqueryui/jquery-ui.min.css" type="text/css"
                  rel="stylesheet">
            <div class="row bg-info text-center">
                <h4>个人信息</h4>
            </div>
            <br>
            <div class="container-fluid" style="min-height: 800px;">
                <div class="row">
                    <form id="personalForm" method="post" action="" enctype="multipart/form-data">
                        <h4>带&nbsp;<b><span class="text-danger">*</span></b>&nbsp;号的为必填项</h4>
                        <input id="id" type="hidden" name="id" value="${user.id}"/>
                        <div class="form-group">
                            <label>昵称：</label>
                            <input id="name" type="text" class="form-control" name="name" placeholder="昵称">
                        </div>
                        <div class="form-group">
                            <label>性别：</label>
                            <select id="sex" class="form-control" name="sex">
                                <option value="0">保密</option>
                                <option value="1">男</option>
                                <option value="2">女</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>生日：</label>
                            <input type="text" class="form-control" name="birthday" id="birthday">
                        </div>
                        <div class="form-group">
                            <label>邮箱：&nbsp;<b><span class="text-danger">*</span></b></label>
                            <input id="email" type="email" class="form-control" name="email" placeholder="邮箱" required>
                        </div>
                        <div class="form-group">
                            <label>毕业学校：</label>
                            <input id="university" type="text" class="form-control" name="university">
                        </div>
                        <div class="form-group">
                            <label>手机：</label>
                            <input id="mobile" type="text" class="form-control" maxlength="20" name="mobile">
                        </div>
                        <div class="form-group">
                            <label>QQ：</label>
                            <input id="qq" type="text" class="form-control" name="qq">
                        </div>
                        <div class="form-group">
                            <label>微博：</label>
                            <input id="weibo" type="text" class="form-control" name="weibo">
                        </div>
                        <div class="form-group">
                            <label>微信：</label>
                            <input id="wechat" type="text" class="form-control" name="wechat">
                        </div>
                        <div class="form-group">
                            <label>脸书：</label>
                            <input id="facebook" type="text" class="form-control" name="facebook">
                        </div>
                        <div class="form-group">
                            <label>推特：</label>
                            <input id="twitter" type="text" class="form-control" name="twitter">
                        </div>
                        <div class="form-group">
                            <label>个性签名：</label>
                            <textarea id="signature" class="form-control" name="signature" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>头像：</label>
                            <img src="common/images/headicon_128.png" class="img-thumbnail"
                                 id="avatarImg" name="avatarImg" width="140">
                            <input type="hidden" name="avatar" id="avatar">
                            <%--<input type="file" name="uploadify" id="uploadify"/>--%>
                            <div id="upload"></div>
                        </div>
                        <div class="text-center">
                            <button id="personalBtn" type="submit" class="btn btn-default">保存<span class="hidden">&nbsp;<img
                                    src="images/zhixing.gif" width="16" height="16"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br>
            <div class="hidden" id="webroot">http://192.168.52.1/</div>
            <div class="hidden" id="buttonText">选择图片</div>
            <%--<script type="text/javascript"
                    src="common/uploadify/jquery.uploadify.js"></script>--%>
            <script src="common/datetimepicker/jqueryui/jquery-ui.min.js"></script>
            <script src="common/js/personal.js"></script>
        </div>
    </div>
</div>
</body>
</html>