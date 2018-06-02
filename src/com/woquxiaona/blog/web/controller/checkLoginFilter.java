package com.woquxiaona.blog.web.controller;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter({"/admin/*"})
public class checkLoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        String servletPath = request.getServletPath();
        if ("/admin/login.do".equals(servletPath) || "/admin/login.jsp".equals(servletPath) || "/admin/user/getBloggerInfo.do".equals(servletPath) || "/admin/register.do".equals(servletPath) || "/admin/register.jsp".equals(servletPath) || "/admin/user/checkUser.do".equals(servletPath)) {
            chain.doFilter(request, response);
        } else {
            HttpSession session = request.getSession();
            if (session != null && session.getAttribute("user") != null) {
                chain.doFilter(request, response);
            } else {
                response.sendRedirect("/admin/login.jsp");
            }
        }
    }

}
