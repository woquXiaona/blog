package com.woquxiaona.blog.admin.web.controller;

import com.woquxiaona.blog.admin.domain.GuestBook;
import com.woquxiaona.blog.admin.domain.User;
import com.woquxiaona.blog.admin.service.UserService;
import com.woquxiaona.blog.admin.service.impl.UserServiceImpl;
import com.woquxiaona.blog.exceptions.LoginException;
import com.woquxiaona.blog.utils.*;
import com.woquxiaona.blog.vo.PaginationVO;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@WebServlet({"/admin/login.do",
        "/admin/user/getBloggerInfo.do",
        "/admin/user/changePassword.do",
        "/admin/user/quit.do",
        "/admin/register.do",
        "/admin/user/checkUser.do",
        "/admin/user/list.do",
        "/admin/user/enable.do",
        "/admin/user/disable.do",
        "/admin/user/downgrade.do",
        "/admin/user/upgrade.do",
        "/admin/user/getById.do",
        "/admin/user/modifyUser.do",
        "/admin/user/guestbook.do"
})
public class UserController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if ("/admin/login.do".equals(servletPath)) {
            doLogin(request, response);
        } else if ("/admin/user/getBloggerInfo.do".equals(servletPath)) {
            doGetBloggerInfo(request, response);
        } else if ("/admin/user/changePassword.do".equals(servletPath)) {
            doChangePassword(request, response);
        } else if ("/admin/user/quit.do".equals(servletPath)) {
            doQuit(request, response);
        } else if ("/admin/register.do".equals(servletPath)) {
            doRegister(request, response);
        } else if ("/admin/user/checkUser.do".equals(servletPath)) {
            doCheckUser(request, response);
        } else if ("/admin/user/list.do".equals(servletPath)) {
            doListUserByCondition(request, response);
        } else if ("/admin/user/enable.do".equals(servletPath)) {
            doEnable(request, response);
        } else if ("/admin/user/disable.do".equals(servletPath)) {
            doDisable(request, response);
        } else if ("/admin/user/downgrade.do".equals(servletPath)) {
            doDowngrade(request, response);
        } else if ("/admin/user/upgrade.do".equals(servletPath)) {
            doUpgrade(request, response);
        } else if ("/admin/user/getById.do".equals(servletPath)) {
            doGetById(request, response);
        } else if ("/admin/user/modifyUser.do".equals(servletPath)) {
            doModifyUser(request, response);
        } else if ("/admin/user/guestbook.do".equals(servletPath)) {
            doGuestBook(request, response);
        }
    }

    /**
     * 用户留言
     *
     * @param request
     * @param response
     */
    private void doGuestBook(HttpServletRequest request, HttpServletResponse response) {
        String id = UUIDGenerator.generate();
        String name = request.getParameter("name");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String email = request.getParameter("email");
        String createTime = DateUtil.getSysTime();
        GuestBook guestBook = new GuestBook();
        guestBook.setId(id);
        guestBook.setFull_name(name);
        guestBook.setEmail(email);
        guestBook.setTitle(title);
        guestBook.setMsg(content);
        guestBook.setCreatetime(createTime);
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        int count = userService.guestBook(guestBook);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 修改用户信息
     *
     * @param request
     * @param response
     */
    private void doModifyUser(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/html;charset=utf-8");
        File file = new File(getServletContext().getRealPath("/common/mnt"));
        if (file.exists()) {
            if (!file.isDirectory()) {
                file.mkdir();
            }
        } else {
            file.mkdir();
        }
        String path = getServletContext().getRealPath("/common/mnt");
        FileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        List items = null;
        try {
            items = upload.parseRequest(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Iterator iterator = items.iterator();
        String id = null;
        String name = null;
        String sex = null;
        String birthday = null;
        String email = null;
        String university = null;
        String mobile = null;
        String qq = null;
        String weibo = null;
        String wechat = null;
        String facebook = null;
        String twitter = null;
        String signature = null;
        while (iterator.hasNext()) {
            FileItem item = (FileItem) iterator.next();
            if (item.isFormField()) {
                String value = item.getString();
                if (item.getFieldName().equals("id")) {
                    id = value;
                } else if (item.getFieldName().equals("name")) {
                    name = value;
                } else if (item.getFieldName().equals("sex")) {
                    sex = value;
                } else if (item.getFieldName().equals("birthday")) {
                    birthday = value;
                } else if (item.getFieldName().equals("email")) {
                    email = value;
                } else if (item.getFieldName().equals("university")) {
                    university = value;
                } else if (item.getFieldName().equals("mobile")) {
                    mobile = value;
                } else if (item.getFieldName().equals("qq")) {
                    qq = value;
                } else if (item.getFieldName().equals("weibo")) {
                    weibo = value;
                } else if (item.getFieldName().equals("wechat")) {
                    wechat = value;
                } else if (item.getFieldName().equals("facebook")) {
                    facebook = value;
                } else if (item.getFieldName().equals("twitter")) {
                    twitter = value;
                } else if (item.getFieldName().equals("signature")) {
                    signature = value;
                }
            } else {
                String fieldName = item.getFieldName();
                String name1 = item.getName();
                System.out.println("fieldName:" + fieldName);
                System.out.println("name1:" + name1);
            }
        }
    }

    /**
     * 根据id获取用户信息
     *
     * @param request
     * @param response
     */
    private void doGetById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        User user = userService.getById(id);
        Map<String, Object> retMap = new HashMap<>(2);
        if (user != null) {
            retMap.put("user", user);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 升级
     *
     * @param request
     * @param response
     */
    private void doUpgrade(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        Integer user_type = Integer.valueOf(request.getParameter("user_type"));
        user_type -= 1;
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        int count = userService.upgrade(id, user_type);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 降级
     *
     * @param request
     * @param response
     */
    private void doDowngrade(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        Integer user_type = Integer.valueOf(request.getParameter("user_type"));
        user_type += 1;
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        int count = userService.downgrade(id, user_type);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 封禁账户
     *
     * @param request
     * @param response
     */
    private void doDisable(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        int count = userService.disable(id);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 启用账户
     *
     * @param request
     * @param response
     */
    private void doEnable(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        int count = userService.enable(id);
        Map<String, Object> retMap = new HashMap<>(1);
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 获取用户列表
     *
     * @param request
     * @param response
     */
    private void doListUserByCondition(HttpServletRequest request, HttpServletResponse response) {
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        String name = request.getParameter("name");
        Map<String, Object> map = new HashMap<>();
        map.put("startIndex", (pageNo - 1) * pageSize);
        map.put("pageSize", pageSize);
        map.put("name", name);
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        PaginationVO<User> paginationVO = userService.listUserByCondition(map);
        OutJson.print(request, response, paginationVO);
    }

    /**
     * 判断用户名是否已存在
     *
     * @param request
     * @param response
     */
    private void doCheckUser(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("user");
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        User user = userService.checkUser(username);
        Map<String, Object> retMap = new HashMap<>();
        if (user != null) {
            retMap.put("success", false);
        } else {
            retMap.put("success", true);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 用户注册
     *
     * @param request
     * @param response
     */
    private void doRegister(HttpServletRequest request, HttpServletResponse response) {
        String id = UUIDGenerator.generate();
        String username = request.getParameter("user");
        String pwd = MD5.get(request.getParameter("pwd"));
        String email = request.getParameter("email");
        String createTime = DateUtil.getSysTime();
        String userStatus = "1";
        String userType = "4";
        User user = new User();
        user.setId(id);
        user.setUser_login(username);
        user.setUser_pass(pwd);
        user.setUser_email(email);
        user.setCreate_time(createTime);
        user.setUser_status(userStatus);
        user.setUser_type(userType);
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        int count = userService.save(user);
        Map<String, Object> retMap = new HashMap<>();
        if (count == 1) {
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 退出登录
     *
     * @param request
     * @param response
     */
    private void doQuit(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.getSession().invalidate();
        response.sendRedirect("/admin/login.jsp");
    }

    /**
     * 修改密码
     *
     * @param request
     * @param response
     */
    private void doChangePassword(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        String oldUserPass = request.getParameter("old_user_pass");
        String newUserPass = request.getParameter("new_user_pass");
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("old_user_pass", oldUserPass);
        map.put("new_user_pass", newUserPass);
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        Map<String, Object> retMap = new HashMap<>();
        User user = userService.changePassword(map);
        if (user != null) {
            retMap.put("success", true);
        } else {
            retMap.put("errorMessage", "原密码有误!");
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 获取博主信息,显示我的名片
     *
     * @param request
     * @param response
     */
    private void doGetBloggerInfo(HttpServletRequest request, HttpServletResponse response) {
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        Map<String, Object> retMap = new HashMap<>();
        User user = userService.getBloggerInfo();
        if (user != null) {
            retMap.put("user", user);
            retMap.put("success", true);
        } else {
            retMap.put("success", false);
        }
        OutJson.print(request, response, retMap);
    }

    /**
     * 登录后台
     *
     * @param request
     * @param response
     */
    private void doLogin(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("user");
        String pwd = request.getParameter("pwd");
        String ip = request.getRemoteAddr();
        if (pwd.length() != 32) {
            pwd = MD5.get(pwd);
        }
        String isRemPwd = request.getParameter("isRemPwd");
        UserService userService = (UserService) new TransactionHandler(new UserServiceImpl()).getProxy();
        Map<String, Object> retMap = new HashMap<>();
        try {
            User user = userService.login(username, pwd, ip);
            request.getSession().setAttribute("user", user);
            if ("true".equals(isRemPwd)) {
                Cookie cookie = new Cookie("username", username);
                Cookie cookie2 = new Cookie("pwd", pwd);
                cookie.setMaxAge(10 * 24 * 60 * 60);
                cookie2.setMaxAge(10 * 24 * 60 * 60);
                cookie.setPath(request.getContextPath());
                cookie2.setPath(request.getContextPath());
                response.addCookie(cookie);
                response.addCookie(cookie2);
            }
            retMap.put("success", true);
        } catch (LoginException e) {
            retMap.put("success", false);
            retMap.put("errMsg", e.getMessage());
        }
        OutJson.print(request, response, retMap);


    }
}
