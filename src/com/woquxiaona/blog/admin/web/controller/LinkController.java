package com.woquxiaona.blog.admin.web.controller;

import com.woquxiaona.blog.admin.domain.Link;
import com.woquxiaona.blog.admin.service.LinkService;
import com.woquxiaona.blog.admin.service.impl.LinkServiceImpl;
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

@WebServlet({
        "/admin/link/addLinks.do",
        "/admin/link/list.do",
        "/admin/link/enableLink.do",
        "/admin/link/disableLink.do",
        "/admin/link/deleteById.do",
        "/admin/link/detail.do",
        "/admin/link/modifyLink.do"
})
public class LinkController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if ("/admin/link/addLinks.do".equals(servletPath)) {
            doAddLinks(request, response);
        } else if ("/admin/link/list.do".equals(servletPath)) {
            doList(request, response);
        } else if ("/admin/link/enableLink.do".equals(servletPath)) {
            doEnableLink(request, response);
        } else if ("/admin/link/disableLink.do".equals(servletPath)) {
            doDisableLink(request, response);
        } else if ("/admin/link/deleteById.do".equals(servletPath)) {
            doDeleteById(request, response);
        } else if ("/admin/link/detail.do".equals(servletPath)) {
            doDetail(request, response);
        } else if ("/admin/link/modifyLink.do".equals(servletPath)) {
            doModifyLink(request, response);
        }
    }

    /**
     * 修改链接
     *
     * @param request
     * @param response
     */
    private void doModifyLink(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("linkId");
        String name = request.getParameter("name");
        String url = request.getParameter("url");
        if (!url.contains("http")) {
            url = "http://" + url;
        }
        String target = request.getParameter("target");
        String description = request.getParameter("description");
        Link link = new Link();
        link.setLink_id(id);
        link.setLink_name(name);
        link.setLink_url(url);
        link.setLink_target(target);
        link.setLink_description(description);
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        int count = linkService.modifyLink(link);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 获取链接详情
     *
     * @param request
     * @param response
     */
    private void doDetail(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        Link link = linkService.detail(id);
        Map<String, Object> retMap = new HashMap<>(2);
        if (link != null) {
            retMap.put("link", link);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 删除链接
     *
     * @param request
     * @param response
     */
    private void doDeleteById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        int count = linkService.deleteById(id);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 禁用链接
     *
     * @param request
     * @param response
     */
    private void doDisableLink(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        int count = linkService.disableLink(id);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 启用链接
     *
     * @param request
     * @param response
     */
    private void doEnableLink(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        int count = linkService.enableLink(id);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 获取友情链接列表
     *
     * @param request
     * @param response
     */
    private void doList(HttpServletRequest request, HttpServletResponse response) {
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        List<Link> linkList = linkService.getAll();
        Map<String, Object> retMap = new HashMap<>(2);
        if (linkList != null) {
            retMap.put("linkList", linkList);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 添加友情链接
     *
     * @param request
     * @param response
     */
    private void doAddLinks(HttpServletRequest request, HttpServletResponse response) {
        LinkService linkService = (LinkService) new TransactionHandler(new LinkServiceImpl()).getProxy();
        String name = request.getParameter("name");
        String url = request.getParameter("url");
        if (!url.contains("http")) {
            url = "http://" + url;
        }
        String target = request.getParameter("target");
        String description = request.getParameter("description");
        Link link = new Link();
        link.setLink_id(UUIDGenerator.generate());
        link.setLink_name(name);
        link.setLink_url(url);
        link.setLink_description(description);
        link.setLink_status("1");
        link.setLink_target(target);
        int count = linkService.addLinks(link);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }
}
