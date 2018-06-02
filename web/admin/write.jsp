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
            //加载文章分类
            categories();
            //确定图片
            /*$("#queding").click(function () {
                $("#thumbnail").attr("src",$("#preview").attr("src"));
            });*/

        })

        function categories() {
            $.ajax({
                url: 'post/category/listAll.do',
                type: 'get',
                success: function (data) {
                    if (data.success) {
                        var html = "";
                        $.each(data.categories, function (index, obj) {
                            html += "<option value='" + obj.id + "'>" + obj.name + "</option>";
                        })
                        $("#categories").html(html);
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
                                    <button type="button" class="btn btn-default btn-block btn-primary">
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
            <link href="common/kindeditor/themes/default/default.css" type="text/css"
                  rel="stylesheet">
            <link href="common/kindeditor/plugins/code/prettify.css" type="text/css"
                  rel="stylesheet">
            <link href="common/uploadify/uploadify.css" type="text/css" rel="stylesheet">
            <link href="common/datetimepicker/css/bootstrap-datetimepicker.min.css"
                  type="text/css" rel="stylesheet">
            <div class="row bg-info text-center">
                <h4>写文章</h4>
            </div>
            <br>
            <div class="container-fluid">
                <div class="row" style="min-height: 800px;">
                    <form method="post" action="post/write.do" name="writeForm">
                        <div class="col-md-9">
                            <h4>带&nbsp;<b><span class="text-danger">*</span></b>&nbsp;号的为必填项</h4>
                            <div class="form-group">
                                <label>标题：&nbsp;<b><span class="text-danger">*</span></b></label>
                                <input type="text" autofocus class="form-control input-lg" placeholder="标题"
                                       name="biaoti" required>
                            </div>
                            <div class="form-group">
                                <label>内容：&nbsp;<b><span class="text-danger">*</span></b></label>
                                <textarea class="form-control hidden" rows="3" id="zhengwen" name="neirong"></textarea>
                            </div>
                            <div class="form-group">
                                <label>关键词：</label>
                                <input type="text" class="form-control input-lg" placeholder="关键词" name="guanjianci">
                                <p class="help-block">关键词之间用逗号“,”隔开</p>
                            </div>
                            <div class="form-group">
                                <label>文章来源：</label>
                                <input type="text" class="form-control input-lg" placeholder="文章来源" name="laiyuan">
                            </div>
                            <div class="form-group">
                                <label>摘要：</label>
                                <textarea class="form-control" rows="3" name="zhaiyao" id="zhaiyao"></textarea>
                            </div>
                            <div class="form-group">
                                <label>文章分类：</label>&nbsp;[<a href="admin/addclassify.jsp">添加分类</a>]
                                <select id="categories" multiple class="form-control" name="fenlei[]"
                                        style="height: 150px;">
                                </select>
                                <p class="help-block">windows：按住 Ctrl 按钮来选择多个选项,Mac：按住 command 按钮来选择多个选项</p>
                            </div>
                            <div class="form-group">
                                <label>私密文章：</label>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="simiwenzhang"> 设置为私密文章 </label>
                                    <p class="help-block">私密文章仅自己可以看到，别人无法访问</p>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-default" id="baocun">保存<span
                                        class="hidden">&nbsp;<img
                                        src="common/images/zhixing.gif" width="16"
                                        height="16"></span></button>
                            </div>
                            <br><br>
                        </div>

                        <div class="col-md-3">
                            <div class="panel panel-default">
                                <div class="panel-heading">缩略图</div>
                                <input type="hidden" id="slt" name="suolvetu" value="">
                                <div class="panel-body" id="suolvetu">
                                    <img id="thumbnail" src="common/images/default-thumbnail.png"
                                         class="img-responsive center-block" alt="缩略图">
                                </div>
                                <div class="panel-footer">
                                    <button type="button" id="shangchuantu" class="btn btn-default btn-block"
                                            data-toggle="modal" data-target="#myModal">
                                        上传图片
                                    </button>
                                    <button type="button" id="quxiaotu" class="btn btn-default btn-block hidden">
                                        取消图片
                                    </button>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">发布时间</div>
                                <div class="panel-body">
                                    <div class="form-group">
                                        <input type="text" name="fabushijian" id="fabushijian" class="form-control"
                                               placeholder="发布时间" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">状态</div>
                                <div class="panel-body">
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="zhiding" value="1">
                                            置顶 </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="zhiding" value="0" checked>
                                            不置顶 </label>
                                    </div>
                                    <hr>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="tuijian" value="1">
                                            推荐 </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="tuijian" value="0" checked>
                                            不推荐 </label>
                                    </div>
                                    <hr>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="pinglun" value="1" checked>
                                            允许评论 </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="pinglun" value="0">
                                            不允许评论 </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" id="myModalLabel">上传图片</h4>
                        </div>
                        <div class="modal-body">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" id="xuanbendi" class="active"><a href="#bendi" role="tab"
                                                                                         data-toggle="tab">本地图片</a></li>
                                <li role="presentation" id="xuanwangluo"><a href="#wangluo" role="tab"
                                                                            data-toggle="tab">网络图片</a></li>
                            </ul>
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="bendi">
                                    <div class="container-fluid">
                                        <div class="row"><br>
                                            <label>请选择上传图片</label>
                                            <div id="upload"></div>


                                            <%--<div class="form-group" id="caseIma">
                                                <label class="btn btn-primary">选择图片
                                                    <input type="file" style="display: none" class="form-control"
                                                           id="caseImage" name="caseImage" accept="jpg,png,gif,jpeg"
                                                           onchange="viewImage(this)"/>
                                                    <script>
                                                        //上传图片后预览图片
                                                        function viewImage(file) {
                                                            var preview = document.getElementById('preview');
                                                            if (file.files && file.files[0]) {
                                                                //alert(file.files[0])
                                                                var type = file.files[0].name.toLowerCase().split(".")[1];
                                                                if (type != "jpg" && type != "png" && type != "gif" && type != "bmp" && type != "jpeg" && type != "ico") {
                                                                    alert("格式不正确!");
                                                                    return;
                                                                }
                                                                preview.style.display = "block";
                                                                preview.style.width = "550px";
                                                                preview.src = window.URL.createObjectURL(file.files[0]);
                                                            }
                                                            return true;
                                                        }
                                                    </script>
                                                </label>
                                            </div>--%>
                                        </div>
                                    </div>
                                    <%--<div class="panel panel-default">
                                        <div id="localImag" class="panel-body" style="min-height: 199px;">
                                            <img id="preview" style="diplay:none"/>
                                        </div>
                                    </div>--%>
                                    <div class="panel panel-default">
                                        <div class="panel-body" style="min-height: 199px;">

                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="wangluo">
                                    <div class="form-group"><br>
                                        <label>图片地址</label>
                                        <input type="text" class="form-control" id="wangluodizhi" placeholder="http://"
                                               value="http://">
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-body" style="min-height: 200px;">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id="queding">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden" id="webroot">http://woquxiaona.com/</div>
            <div class="hidden" id="upload_url">upload</div>
            <div class="hidden" id="buttonText">选择图片</div>
            <div class="hidden" id="newv">0</div>
            <script type="text/javascript" charset="utf-8"
                    src="common/kindeditor/kindeditor-all.js"></script>
            <script type="text/javascript" charset="utf-8"
                    src="common/kindeditor/lang/zh-CN.js"></script>
            <script type="text/javascript"
                    src="common/kindeditor/plugins/code/prettify.js"></script>
            <script type="text/javascript"
                    src="common/uploadify/jquery.uploadify.js"></script>
            <script type="text/javascript"
                    src="common/datetimepicker/js/bootstrap-datetimepicker.min.js"
                    charset="UTF-8"></script>
            <script src="common/js/writeEditor.js"></script>
            <script src="common/js/write.js"></script>
        </div>
    </div>
</div>
</body>
</html>