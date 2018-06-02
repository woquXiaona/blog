package com.woquxiaona.blog.admin.dao;

import com.woquxiaona.blog.admin.domain.User;

import java.util.List;
import java.util.Map;

public interface UserDao {

    /**
     * 登录后台
     * @param username
     * @param pwd
     * @return
     */
    User login(String username, String pwd);

    /**
     * 获取博主信息,显示我的名片
     * @return
     */
    User getBloggerInfo();

    /**
     * 查询原密码是否正确
     * @param map
     * @return
     */
    User getByUser_LoginAndOld_User_Pass(Map<String, Object> map);

    /**
     * 修改密码
     * @param map
     * @return
     */
    User changePassword(Map<String, Object> map);

    /**
     * 判断用户名是否已存在
     * @param username
     * @return
     */
    User checkUser(String username);

    /**
     * 用户注册
     * @param user
     * @return
     */
    int save(User user);

    /**
     * 获取用户数量
     * @return
     */
    Long getTotal();

    /**
     * 获取用户列表
     * @param map
     * @return
     */
    List<User> getList(Map<String, Object> map);

    /**
     * 记录登录信息
     * @param id
     */
    void record(String id, String time, String ip);

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
}
