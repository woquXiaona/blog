package com.woquxiaona.blog.admin.service;

import com.woquxiaona.blog.admin.domain.GuestBook;
import com.woquxiaona.blog.admin.domain.User;
import com.woquxiaona.blog.exceptions.LoginException;
import com.woquxiaona.blog.vo.PaginationVO;

import java.util.Map;

public interface UserService {

    /**
     * 登录后台
     *
     * @param username
     * @param pwd
     * @param ip
     * @return
     */
    User login(String username, String pwd, String ip) throws LoginException;

    /**
     * 获取博主信息,显示我的名片
     *
     * @return
     */
    User getBloggerInfo();

    /**
     * 修改密码
     *
     * @param map
     * @return
     */
    User changePassword(Map<String, Object> map);

    /**
     * 判断用户名是否已存在
     *
     * @param username
     * @return
     */
    User checkUser(String username);

    /**
     * 用户注册
     *
     * @param user
     * @return
     */
    int save(User user);

    /**
     * 获取用户列表
     *
     * @param map
     * @return
     */
    PaginationVO<User> listUserByCondition(Map<String, Object> map);

    /**
     * 启用账户
     * @param id
     * @return
     */
    int enable(String id);

    /**
     * 封禁账户
     * @param id
     * @return
     */
    int disable(String id);

    /**
     * 降级
     *
     * @param id
     * @param user_type
     * @return
     */
    int downgrade(String id, Integer user_type);

    /**
     * 升级
     * @param id
     * @param user_type
     * @return
     */
    int upgrade(String id, Integer user_type);

    /**
     * 根据id获取用户信息
     * @param id
     * @return
     */
    User getById(String id);

    /**
     * 修改用户信息
     * @param user
     * @return
     */
    int modifyUser(User user);

    /**
     * 用户留言
     * @param guestBook
     * @return
     */
    int guestBook(GuestBook guestBook);
}
