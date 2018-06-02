package com.woquxiaona.blog.admin.web.controller;

import com.woquxiaona.blog.admin.domain.Menu;
import com.woquxiaona.blog.admin.service.MenuService;
import com.woquxiaona.blog.admin.service.impl.MenuServiceImpl;
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
import java.util.Map;

@WebServlet({
        "/admin/menu/addMenu.do",
        "/admin/menu/list.do",
        "/admin/menu/deleteById.do",
        "/admin/menu/detail.do",
        "/admin/menu/modifyMenu.do"
})
public class MenuController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if ("/admin/menu/addMenu.do".equals(servletPath)) {
            doAddMenu(request, response);
        } else if ("/admin/menu/list.do".equals(servletPath)) {
            doListMenu(request, response);
        } else if ("/admin/menu/deleteById.do".equals(servletPath)) {
            doDeleteById(request, response);
        } else if ("/admin/menu/detail.do".equals(servletPath)) {
            doDetail(request, response);
        } else if ("/admin/menu/modifyMenu.do".equals(servletPath)) {
            doModifyMenu(request, response);
        }
    }

    /**
     * 修改菜单
     *
     * @param request
     * @param response
     */
    private void doModifyMenu(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        String url = request.getParameter("url");
        String diyUrl = request.getParameter("diyUrl");
        String status = request.getParameter("status");
        String target = request.getParameter("target");
        Menu menu = new Menu();
        menu.setId(id);
        menu.setName(name);
        if (diyUrl != null && diyUrl != "") {
            if (!diyUrl.contains("//")) {
                diyUrl = "http://" + diyUrl;
            }
            menu.setUrl(diyUrl);
        } else {
            menu.setUrl(url);
        }
        menu.setTarget(target);
        menu.setStatus(status);
        MenuService menuService = (MenuService) new TransactionHandler(new MenuServiceImpl()).getProxy();
        int count = menuService.modifyMenu(menu);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);

    }

    /**
     * 菜单详情
     *
     * @param request
     * @param response
     */
    private void doDetail(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        MenuService menuService = (MenuService) new TransactionHandler(new MenuServiceImpl()).getProxy();
        Map<String, Object> map = menuService.detail(id);
        if (map != null) {
            map.put("success", true);
        } else {
            map.put("success", false);
        }
        OutJson.print(request, response, map);
    }

    /**
     * 删除菜单
     *
     * @param request
     * @param response
     */
    private void doDeleteById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        MenuService menuService = (MenuService) new TransactionHandler(new MenuServiceImpl()).getProxy();
        int count = menuService.deleteById(id);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 菜单列表
     *
     * @param request
     * @param response
     */
    private void doListMenu(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        MenuService menuService = (MenuService) new TransactionHandler(new MenuServiceImpl()).getProxy();
        PaginationVO<Menu> paginationVO = menuService.getAll(map);
        OutJson.print(request, response, paginationVO);
    }

    /**
     * 添加菜单
     *
     * @param request
     * @param response
     */
    private void doAddMenu(HttpServletRequest request, HttpServletResponse response) {
        String id = UUIDGenerator.generate();
        String name = request.getParameter("name");
        String url = request.getParameter("url");
        String diyUrl = request.getParameter("diyUrl");
        String target = request.getParameter("target");
        String status = request.getParameter("status");
        Menu menu = new Menu();
        menu.setId(id);
        menu.setName(name);
        menu.setUrl(url);
        if (diyUrl != null && diyUrl != "") {
            if (!diyUrl.contains("http")) {
                diyUrl = "http://" + diyUrl;
            }
            menu.setUrl(diyUrl);
        } else {
            menu.setUrl(url);
        }
        menu.setTarget(target);
        menu.setStatus(status);
        MenuService menuService = (MenuService) new TransactionHandler(new MenuServiceImpl()).getProxy();
        int count = menuService.addMenu(menu);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }
}
