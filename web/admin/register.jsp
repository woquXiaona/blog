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
    <title>新用户</title>
    <link rel="icon" href="common/images/cortana.jpg">
    <link rel="stylesheet" href="common/css/bootstrap.min.css">
    <link rel="stylesheet" href="common/css/catfishBottom.css">
    <script src="common/js/jquery.min.js"></script>
    <script type="text/javascript">
        $(function () {

            //用户名
            $("#user").focus(function () {
                $("#userTip").html("");
            });
            $("#user").blur(function () {
                if ($.trim($("#user").val()) == null || $.trim($("#user").val()) == "") {
                    $("#userTip").html("请输入用户名!");
                } else {
                    $.ajax({
                        url: 'admin/user/checkUser.do',
                        data: {
                            "user": $.trim($("#user").val())
                        },
                        type: 'post',
                        success: function (data) {
                            if (data.success) {
                                $("#userTip").html("");
                            } else {
                                $("#userTip").html("用户名已存在");
                            }
                        }
                    })
                }
            });

            //密码
            $("#pwd").focus(function () {
                $("#pwdTip").html("");
            });
            $("#pwd").blur(function () {
                if ($.trim($("#pwd").val()) == "") {
                    $("#pwdTip").html("请输入密码!");
                } else {
                    $("#repeatPwdTip").html("");
                    if ($.trim($("#pwd").val()).length > 16 || $.trim($("#pwd").val()).length < 8) {
                        $("#pwdTip").html("密码长度需要在8~16位之间!");
                    } else {
                        if ($.trim($("#repeatPwd").val()) != "") {
                            if ($.trim($("#repeatPwd").val()) != $.trim($("#pwd").val())) {
                                $("#repeatPwdTip").html("密码不一致!");
                            } else {
                                $("#repeatPwdTip").html("");
                            }
                        } else {
                            $("#repeatPwdTip").html("");
                        }
                    }
                }
            });

            //确认密码
            $("#repeatPwd").focus(function () {
                $("#repeatPwdTip").html("");
            });
            $("#repeatPwd").blur(function () {
                if ($.trim($("#repeatPwd").val()) == "") {
                    $("#repeatPwdTip").html("请输入密码!");
                } else {
                    $("#repeatPwdTip").html("");
                    if ($.trim($("#repeatPwd").val()).length > 16 || $.trim($("#repeatPwd").val()).length < 8) {
                        $("#repeatPwdTip").html("密码长度需要在8~16位之间!");
                    } else {
                        if ($.trim($("#pwd").val()) != "") {
                            if ($.trim($("#pwd").val()) == $.trim($("#repeatPwd").val())) {
                                $("#pwdTip").html("");
                                $("#repeatPwdTip").html("");
                            } else {
                                $("#pwdTip").html("");
                                $("#repeatPwdTip").html("密码不一致!");
                            }
                        } else {
                            $("#pwdTip").html("");
                            $("#repeatPwdTip").html("");
                        }
                    }
                }
            });

            //邮箱
            $("#email").focus(function () {
                $("#emailTip").html("");
            });
            $("#email").blur(function () {
                if ($.trim($("#email").val()) == "") {
                    $("#emailTip").html("请输入邮箱");
                } else {
                    var regExp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    var ok = regExp.test($.trim($("#email").val()));
                    if (!ok) {
                        $("#emailTip").html("邮箱格式不正确!");
                    } else {
                        $("#emailTip").html("");
                    }
                }
            });

            //注册
            $("#registerBtn").click(function () {
                $("#user").blur();
                $("#repeatPwd").blur();
                $("#email").blur();
                $.ajax({
                    url: 'admin/register.do',
                    data: {
                        "user": $.trim($("#user").val()),
                        "pwd": $.trim($("#pwd").val()),
                        "email": $.trim($("#email").val())
                    },
                    type: 'post',
                    beforeSend: function () {
                        if ($("#userTip").html() == "" && $("#pwdTip").html() == "" && $("#repeatPwdTip").html() == "" && $("#emailTip").html() == "") {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    success: function (data) {
                        if (data.success) {
                            window.location.href = "admin/login.jsp";
                        } else {
                            alert("注册失败!")
                        }
                    }
                })
            });
        })
    </script>
</head>
<body style="background-color: #3F3E3C;">
<div class="container-fluid" id="catfishContentBlock">
    <div class="row">
        <br>
        <div class="hidden-xs"><br><br></div>
        <div class="col-xs-10 col-sm-6 col-md-4 col-xs-offset-1 col-sm-offset-3 col-md-offset-4">
            <h2 class="text-center" style="color:#fff;">
                <img src="common/images/cortana.jpg" width="32" height="32">
                王明亮的个人博客
                <small>新用户</small>
            </h2>
            <br>
            <div class="panel panel-default" id="zhucekuang">
                <div class="panel-body">
                    <form method="post" action="">
                        <div class="form-group">
                            <label>用户名</label>
                            <input id="user" type="text" class="form-control" name="user" placeholder="用户名"
                                   maxlength="50" autofocus>
                            <span id="userTip" style="color: red;font-size: 12px"></span>
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input id="pwd" type="password" class="form-control" name="pwd" placeholder="密码">
                            <span id="pwdTip" style="color: red;font-size: 12px"></span>
                        </div>
                        <div class="form-group">
                            <label>确认密码</label>
                            <input id="repeatPwd" type="password" class="form-control" placeholder="确认密码">
                            <span id="repeatPwdTip" style="color: red;font-size: 12px"></span>
                        </div>
                        <div class="form-group">
                            <label>邮箱</label>
                            <input id="email" type="email" class="form-control" name="email" placeholder="邮箱">
                            <span id="emailTip" style="color: red;font-size: 12px"></span>
                        </div>
                        <div class="text-center">
                            <button id="registerBtn" type="button" class="btn btn-default">注册</button>
                        </div>
                        <a href="index.jsp">首页</a>
                        <a href="admin/login.jsp" class="pull-right">登录</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>