package com.woquxiaona.blog.post.web.controller;

import com.woquxiaona.blog.post.service.CommentService;
import com.woquxiaona.blog.post.service.impl.CommentServiceImpl;
import com.woquxiaona.blog.utils.OutJson;
import com.woquxiaona.blog.utils.TransactionHandler;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet({"/post/comment/list.do"})
/**
 * 评论
 */
public class CommentController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if ("/post/comment/list.do".equals(servletPath)) {
            doListComment(request, response);
        }
    }

    /**
     * 评论列表
     *
     * @param request
     * @param response
     */
    private void doListComment(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Integer pageIndex = (pageNo - 1) * pageSize;
        CommentService commentService = (CommentService) new TransactionHandler(new CommentServiceImpl()).getProxy();
        Map<String, Object> retMap = new HashMap<>();
        try {
            List<Map<String,Object>> commentList = commentService.listComment(pageIndex,pageSize);
            retMap.put("commentList", commentList);
            retMap.put("success", true);
        } catch (Exception e) {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }
}
