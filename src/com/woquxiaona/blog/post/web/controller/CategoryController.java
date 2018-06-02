package com.woquxiaona.blog.post.web.controller;

import com.woquxiaona.blog.post.domain.Category;
import com.woquxiaona.blog.post.service.CategoryService;
import com.woquxiaona.blog.post.service.impl.CategoryServiceImpl;
import com.woquxiaona.blog.utils.OutJson;
import com.woquxiaona.blog.utils.TransactionHandler;
import com.woquxiaona.blog.utils.UUIDGenerator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet({"/post/category/list.do",
        "/post/category/listAll.do",
        "/post/category/addClassify.do",
        "/post/category/getById.do",
        "/post/category/modifyClassify.do",
        "/admin/category/deleteClassifyById.do"
})
public class CategoryController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if ("/post/category/list.do".equals(servletPath)) {
            doListCategoryExceptOrder0(request, response);
        } else if ("/post/category/listAll.do".equals(servletPath)) {
            doListAllCategory(request, response);
        } else if ("/post/category/addClassify.do".equals(servletPath)) {
            doAddClassify(request, response);
        } else if ("/post/category/getById.do".equals(servletPath)) {
            doGetById(request, response);
        } else if ("/post/category/modifyClassify.do".equals(servletPath)) {
            doModifyClassify(request, response);
        } else if ("/admin/category/deleteClassifyById.do".equals(servletPath)) {
            doDeleteClassifyById(request, response);
        }
    }

    /**
     * 根据id删除分类
     *
     * @param request
     * @param response
     */
    private void doDeleteClassifyById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        CategoryService categoryService = (CategoryService) new TransactionHandler(new CategoryServiceImpl()).getProxy();
        int count = categoryService.deleteClassifyById(id);
        Map<String, Object> retMap = new HashMap<>();
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 保存修改分类
     *
     * @param request
     * @param response
     */
    private void doModifyClassify(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        String url = request.getParameter("url");
        System.out.println(id + "," + name + "," + url);
        Category category = new Category();
        category.setId(id);
        category.setName(name);
        category.setUrl(url);
        CategoryService categoryService = (CategoryService) new TransactionHandler(new CategoryServiceImpl()).getProxy();
        Map<String, Object> retMap = new HashMap<>();
        int count = categoryService.modifyClassify(category);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 根据id获取分类详情
     *
     * @param request
     * @param response
     */
    private void doGetById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        CategoryService categoryService = (CategoryService) new TransactionHandler(new CategoryServiceImpl()).getProxy();
        Category category = categoryService.getById(id);
        Map<String, Object> retMap = new HashMap<>(2);
        if (category != null) {
            retMap.put("category", category);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 添加分类
     *
     * @param request
     * @param response
     */
    private void doAddClassify(HttpServletRequest request, HttpServletResponse response) {
        String id = UUIDGenerator.generate();
        String url = request.getParameter("url");
        if (!url.contains(".jsp")) {
            url += ".jsp";
        }
        String name = request.getParameter("name");
        Category category = new Category();
        category.setId(id);
        category.setUrl(url);
        category.setName(name);
        CategoryService categoryService = (CategoryService) new TransactionHandler(new CategoryServiceImpl()).getProxy();
        int count = categoryService.addClassify(category);
        Map<String, Object> retMap = new HashMap<>(16);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 查询所有分类
     *
     * @param request
     * @param response
     */
    private void doListAllCategory(HttpServletRequest request, HttpServletResponse response) {
        CategoryService categoryService = (CategoryService) new TransactionHandler(new CategoryServiceImpl()).getProxy();
        List<Category> categories = categoryService.listAllCategory();
        Map<String, Object> retMap = new HashMap<>();
        if (categories != null) {
            retMap.put("categories", categories);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 查询除"未分类"之外的其他分类
     *
     * @param request
     * @param response
     */
    private void doListCategoryExceptOrder0(HttpServletRequest request, HttpServletResponse response) {
        CategoryService categoryService = (CategoryService) new TransactionHandler(new CategoryServiceImpl()).getProxy();
        List<Category> categories = categoryService.listCategory();
        Map<String, Object> retMap = new HashMap<>();
        if (categories != null) {
            retMap.put("categories", categories);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }
}
