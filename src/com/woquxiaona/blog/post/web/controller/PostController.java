package com.woquxiaona.blog.post.web.controller;

import com.woquxiaona.blog.admin.domain.User;
import com.woquxiaona.blog.post.domain.Category;
import com.woquxiaona.blog.post.domain.Post;
import com.woquxiaona.blog.post.service.PostService;
import com.woquxiaona.blog.post.service.impl.PostServiceImpl;
import com.woquxiaona.blog.utils.DateUtil;
import com.woquxiaona.blog.utils.OutJson;
import com.woquxiaona.blog.utils.TransactionHandler;
import com.woquxiaona.blog.utils.UUIDGenerator;
import com.woquxiaona.blog.vo.PaginationVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet({"/post/list.do",
        "/post/view.do",
        "/post/addLikes.do",
        "/post/search.do",
        "/post/addHits.do",
        "/post/hotHits.do",
        "/post/write.do",
        "/post/tuijian.do",
        "/post/removeById.do",
        "/post/listRecycledPosts.do",
        "/post/restore.do",
        "/post/completelyDelete.do",
        "/post/completelyDeleteSelected.do",
        "/post/restoreSelected.do",
        "/post/detail.do",
        "/post/allList.do",
        "/admin/rewrite.do"
})
public class PostController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if ("/post/list.do".equals(servletPath)) {
            doList(request, response);
        } else if ("/post/view.do".equals(servletPath)) {
            doView(request, response);
        } else if ("/post/search.do".equals(servletPath)) {
            doSearch(request, response);
        } else if ("/post/addLikes.do".equals(servletPath)) {
            doAddLikes(request, response);
        } else if ("/post/addHits.do".equals(servletPath)) {
            doAddHits(request, response);
        } else if ("/post/hotHits.do".equals(servletPath)) {
            doHotHits(request, response);
        } else if ("/post/write.do".equals(servletPath)) {
            doWrite(request, response);
        } else if ("/post/tuijian.do".equals(servletPath)) {
            doTuijian(request, response);
        } else if ("/post/removeById.do".equals(servletPath)) {
            removeById(request, response);
        } else if ("/post/listRecycledPosts.do".equals(servletPath)) {
            doListRecycledPosts(request, response);
        } else if ("/post/restore.do".equals(servletPath)) {
            doRestore(request, response);
        } else if ("/post/completelyDelete.do".equals(servletPath)) {
            doCompletelyDelete(request, response);
        } else if ("/post/completelyDeleteSelected.do".equals(servletPath)) {
            CompletelyDeleteSelected(request, response);
        } else if ("/post/restoreSelected.do".equals(servletPath)) {
            doRestoreSelected(request, response);
        } else if ("/post/detail.do".equals(servletPath)) {
            doDetail(request, response);
        } else if ("/post/allList.do".equals(servletPath)) {
            doListAll(request, response);
        } else if ("/admin/rewrite.do".equals(servletPath)) {
            doRewrite(request, response);
        }
    }

    /**
     * 编辑文章
     *
     * @param request
     * @param response
     */
    private void doRewrite(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("postId");
        String biaoti = request.getParameter("biaoti");
        String zhengwen = request.getParameter("zhengwen");
        String guanjianci = request.getParameter("guanjianci");
        String laiyuan = request.getParameter("laiyuan");
        String zhaiyao = request.getParameter("zhaiyao");
        String fenlei = request.getParameter("fenlei[]");
        String simiwenzhang = request.getParameter("simiwenzhang");
        String suolvetu = request.getParameter("suolvetu");
        String zhiding = request.getParameter("zhiding");
        String tuijian = request.getParameter("tuijian");
        String pinglun = request.getParameter("pinglun");
        String modifyTime = DateUtil.getSysTime();
        System.out.println(id);
        System.out.println(biaoti);
        System.out.println(zhengwen);
        System.out.println(guanjianci);
        System.out.println(laiyuan);
        System.out.println(zhaiyao);
        System.out.println(fenlei);
        System.out.println(simiwenzhang);
        System.out.println(suolvetu);
        System.out.println(zhiding);
        System.out.println(tuijian);
        System.out.println(pinglun);
        System.out.println(modifyTime);
        Post post = (Post) new TransactionHandler(new PostServiceImpl()).getProxy();
        post.setId(id);
        post.setPost_title(biaoti);
        post.setPost_content(zhengwen);
        post.setPost_keywords(guanjianci);
        post.setPost_source(laiyuan);
        post.setPost_excerpt(zhaiyao);
        post.setPost_type(fenlei);
        post.setPost_status(simiwenzhang);
        post.setThumbnail(suolvetu);
        post.setIstop(zhiding);
        post.setRecommended(tuijian);
        post.setComment_status(pinglun);
        post.setPost_modified_time(modifyTime);
        /*PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.rewrite(post);
        Map<String, Object> retMap = new HashMap<>();
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);*/

    }

    /**
     * 所有文章
     *
     * @param request
     * @param response
     */
    private void doListAll(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        PaginationVO<Post> paginationVO = postService.listAllPosts(map);
        OutJson.print(request, response, paginationVO);
    }

    /**
     * 文章详情
     *
     * @param request
     * @param response
     */
    private void doDetail(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        Map<String, Object> retMap = postService.detail(id);
        if (retMap != null && retMap.get("post") != null && retMap.get("categories") != null) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        Post post = (Post) retMap.get("post");
        System.out.println(post.getId());
        System.out.println(post.getPost_author());
        System.out.println(post.getPost_title());
        System.out.println(post.getPost_content());
        System.out.println(post.getPost_type());
        List<Category> categories = (List<Category>) retMap.get("categories");
        for (Category category : categories) {
            System.out.println(category.getName());
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 批量还原文章
     *
     * @param request
     * @param response
     */
    private void doRestoreSelected(HttpServletRequest request, HttpServletResponse response) {
        String[] ids = request.getParameterValues("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.restoreSelected(ids);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == ids.length) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 批量彻底删除文章
     *
     * @param request
     * @param response
     */
    private void CompletelyDeleteSelected(HttpServletRequest request, HttpServletResponse response) {
        String[] ids = request.getParameterValues("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.completelyDeleteSelected(ids);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == ids.length) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 彻底删除文章
     *
     * @param request
     * @param response
     */
    private void doCompletelyDelete(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.completelyDelete(id);
        Map<String, Object> retMap = new HashMap<>(16);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 还原文章
     *
     * @param request
     * @param response
     */
    private void doRestore(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.restore(id);
        Map<String, Object> retMap = new HashMap<>(16);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 已删除博客列表
     *
     * @param request
     * @param response
     */
    private void doListRecycledPosts(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        PaginationVO<Post> paginationVO = postService.listRecycledPosts(map);
        OutJson.print(request, response, paginationVO);
    }

    /**
     * 删除单条博客
     *
     * @param request
     * @param response
     */
    private void removeById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.removeById(id);
        Map<String, Object> retMap = new HashMap<>(16);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 推荐文章列表
     *
     * @param request
     * @param response
     */
    private void doTuijian(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        PaginationVO<Post> paginationVO = postService.tuijian(map);
        OutJson.print(request, response, paginationVO);
    }

    /**
     * 写文章
     *
     * @param request
     * @param response
     */
    private void doWrite(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        String post_title = request.getParameter("biaoti");
        String post_time = request.getParameter("fabushijian");
        if (post_time == "") {
            post_time = DateUtil.getSysTime();
        }
        String post_type = request.getParameter("fenlei[]");
        String post_keywords = request.getParameter("guanjianci");
        String post_source = request.getParameter("laiyuan");
        String post_content = request.getParameter("neirong");
        String comment_status = request.getParameter("pinglun	");
        if (comment_status != null && "0".equals(comment_status)) {
            comment_status = "0";
        } else {
            comment_status = "1";
        }
        String post_status = request.getParameter("simiwenzhang");
        if ("0".equals(post_status)) {
            post_status = "0";
        } else {
            post_status = "1";
        }
        String thumbnail = request.getParameter("suolvetu");
        if (thumbnail == "") {
            thumbnail = "common/images/nophoto.gif";
        }
        String recommended = request.getParameter("tuijian");
        if (recommended != null && "1".equals(recommended)) {
            recommended = "1";
        } else {
            recommended = "0";
        }
        String post_excerpt = request.getParameter("zhaiyao");
        if (post_excerpt==""){
            post_excerpt = post_content.substring(0,49);
        }
        String istop = request.getParameter("zhiding	");
        if (istop != null && "1".equals(istop)) {
            istop = "1";
        } else {
            istop = "0";
        }
        System.out.println("标题" + post_title);
        System.out.println("发布时间" + post_time);
        System.out.println("文章类型" + post_type);
        System.out.println("关键词" + post_keywords);
        System.out.println("来源" + post_source);
        System.out.println("内容" + post_content);
        System.out.println("评论状态" + comment_status);
        System.out.println("公开状态" + post_status);
        System.out.println("缩略图" + thumbnail);
        System.out.println("推荐状态" + recommended);
        System.out.println("摘要" + post_excerpt);
        System.out.println("置顶状态" + istop);
        Post post = new Post();
        post.setId(UUIDGenerator.generate());
        post.setPost_title(post_title);
        post.setPost_author(((User) request.getSession().getAttribute("user")).getId());
        post.setPost_time(post_time);
        post.setPost_type(post_type);
        post.setPost_keywords(post_keywords);
        post.setPost_source(post_source);
        post.setPost_content(post_content);
        post.setComment_status(comment_status);
        post.setPost_status(post_status);
        post.setThumbnail(thumbnail);
        post.setRecommended(recommended);
        post.setPost_excerpt(post_excerpt);
        post.setIstop(istop);
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        int count = postService.save(post);
        if (count == 1) {
            response.sendRedirect("/admin/write.jsp");
        }
    }

    /**
     * 热门点击
     *
     * @param request
     * @param response
     */
    private void doHotHits(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        PaginationVO<Post> paginationVO = postService.hotHits(map);
        OutJson.print(request, response, paginationVO);
    }

    /**
     * 统计阅读量
     *
     * @param request
     * @param response
     */
    private void doAddHits(HttpServletRequest request, HttpServletResponse response) {
        Integer count = Integer.valueOf(request.getParameter("count"));
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        Map map = postService.addHits(id, count);
        Map<String, Object> retMap = new HashMap<>();
        if ((int) map.get("count") == 1) {
            retMap.put("hits", map.get("hits"));
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 点赞
     *
     * @param request
     * @param response
     */
    private void doAddLikes(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        Map<String, Object> map = postService.addLikes(id);
        Map<String, Object> retMap = new HashMap<>();
        if ((int) map.get("count") == 1) {
            retMap.put("likes", map.get("likes"));
            retMap.put("success", true);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 模糊查询
     *
     * @param request
     * @param response
     */
    private void doSearch(HttpServletRequest request, HttpServletResponse response) {
        String title = request.getParameter("title");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        Map<String, Object> retMap = new HashMap<>();
        try {
            List<Post> postList = postService.queryByCondition(title);
            retMap.put("postList", postList);
            retMap.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 博客详情
     *
     * @param request
     * @param response
     */
    private void doView(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        Post post = postService.view(id);
        Map<String, Object> retMap = new HashMap<>();
        if (post != null) {
            request.getSession().setAttribute("post", post);
            response.sendRedirect("/post/view.jsp");
        }
    }

    /**
     * 分页查询博客列表
     *
     * @param request
     * @param response
     */
    private void doList(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        PostService postService = (PostService) new TransactionHandler(new PostServiceImpl()).getProxy();
        PaginationVO<Post> paginationVO = postService.listPost(map);
        OutJson.print(request, response, paginationVO);
    }
}
