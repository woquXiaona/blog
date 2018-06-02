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
    <link href="common/css/styles.css" rel="stylesheet">
    <link href="common/css/animation.css" rel="stylesheet">
    <!-- 返回顶部调用 begin -->
    <link href="common/common/css/lrtk.css" rel="stylesheet"/>
    <script type="text/javascript" src="common/js/jquery.js"></script>
    <script type="text/javascript" src="common/js/js.js"></script>
    <!-- 返回顶部调用 end-->
    <!--[if lt IE 9]>
    <script src="common/js/modernizr.js"></script>
    <![endif]-->
    <script type="text/javascript">
        $(function () {
            var title = "${param.title}";
            $.ajax({
                url: 'post/search.do',
                data: {
                    "title": title
                },
                type: 'get',
                success: function (data) {
                    var html = "";
                    $.each(data.postList, function (index, obj) {
                        html += "<li>";
                        html += "<div class='arrow_box'>";
                        html += "<h2 class='title'><a>" + obj.post_title + "</a></h2>";
                        html += "<ul class='textinfo'>";
                        html += "<p>" + obj.post_excerpt + "...</p>";
                        html += "</ul>";
                        html += "</div>";
                        html += "</li>";
                    });
                    $("#div").html(html);
                }
            });
        })
    </script>
</head>
<body>
<div id="div">

</div>
</body>
</html>
