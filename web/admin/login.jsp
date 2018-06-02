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
    <title>用户登录</title>
    <link rel="icon" href="common/images/cortana.jpg">
    <link rel="stylesheet" href="common/css/bootstrap.min.css">
    <link rel="stylesheet" href="common/css/login.css">
    <script src="common/js/jquery.js"></script>
    <script type="text/javascript">
        $(function () {

            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    $("#loginBtn").click();
                }
            });

            $("#user").focus(function () {
                $("#userMsgTip").html("");
            });
            $("#user").blur(function () {
                if ($.trim($("#user").val()) == "") {
                    $("#userMsgTip").html("用户名不能为空!");
                } else {
                    $("#userMsgTip").html("");
                }
            });
            $("#pwd").focus(function () {
                $("#msgTip").html("");
            });
            $("#pwd").blur(function () {
                if ($.trim($("#pwd").val()) == "") {
                    $("#msgTip").html("密码不能为空!");
                } else {
                    $("#msgTip").html("");
                }
            });

            //登录按钮点击事件
            $("#loginBtn").click(function () {
                var user = $.trim($("#user").val());
                var pwd = $.trim($("#pwd").val());
                var isRemPwd = $("#isRemPwd").prop("checked");
                $.ajax({
                    url: 'admin/login.do',
                    data: {
                        "user": user,
                        "pwd": pwd,
                        "isRemPwd": isRemPwd
                    },
                    type: 'post',
                    beforeSend: function () {
                        if (user == null || user == "") {
                            $("#userMsgTip").html("用户名不能为空!");
                            return false;
                        } else if (pwd == null || pwd == "") {
                            $("#msgTip").html("密码不能为空!");
                            return false;
                        } else {
                            return true;
                        }
                    },
                    success: function (data) {
                        if (data.success) {
                            window.location.href = "admin/index.jsp";
                        } else {
                            $("#msgTip").html(data.errMsg);
                        }
                    }
                })
            });
        })
    </script>
</head>
<body style="background-color: #3F3E3C">
<div class="container-fluid" id="catfishContentBlock">
    <div class="row">
        <br>
        <div class="hidden-xs"><br><br></div>
        <div class="col-xs-10 col-sm-6 col-md-4 col-xs-offset-1 col-sm-offset-3 col-md-offset-4">
            <h1 class="text-center" style="color:#89919a;">
                <img src="common/images/cortana.jpg" width="35" height="35">
                王明亮的个人博客 </h1><br>
            <div class="panel panel-default" id="denglukuang">
                <div class="panel-body">
                    <form>
                        <div class="form-group">
                            <label>用户名</label>
                            <c:if test="${not empty cookie.username}">
                                <input id="user" type="text" class="form-control" placeholder="用户名"
                                       value="${cookie.username.value}" autofocus>
                            </c:if>
                            <c:if test="${empty cookie.username}">
                                <input id="user" type="text" class="form-control" placeholder="用户名" autofocus>
                            </c:if>
                            <span id="userMsgTip" style="color: red;font-size: 12px"></span>
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <c:if test="${not empty cookie.pwd}">
                                <input id="pwd" type="password" class="form-control" placeholder="密码" value="${cookie.pwd.value}">
                            </c:if>
                            <c:if test="${empty cookie.pwd}">
                                <input id="pwd" type="password" class="form-control" placeholder="密码">
                            </c:if>
                            <span id="msgTip" style="color: red;font-size: 12px"></span>
                        </div>
                        <div class="checkbox" style="position: relative;top: 30px; left: 10px;">
                            <label>
                                <c:if test="${not empty cookie.username and not empty cookie.pwd}">
                                    <input id="isRemPwd" type="checkbox" checked> 记住我
                                </c:if>
                                <c:if test="${empty cookie.username or empty cookie.pwd}">
                                    <input id="isRemPwd" type="checkbox"> 记住我
                                </c:if>
                            </label>
                        </div>
                        <div class="text-center">
                            <button id="loginBtn" type="button" class="btn btn-default">登录</button>
                        </div>
                        <a href="index.jsp">首页</a>
                        <a href="admin/register.jsp" class="pull-right">注册</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>