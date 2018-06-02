package com.woquxiaona.blog.admin.service.impl;

import com.woquxiaona.blog.admin.dao.UserDao;
import com.woquxiaona.blog.admin.domain.User;
import com.woquxiaona.blog.admin.service.UserService;
import com.woquxiaona.blog.exceptions.LoginException;
import com.woquxiaona.blog.utils.DateUtil;
import com.woquxiaona.blog.utils.SqlSessionUtil;
import com.woquxiaona.blog.vo.PaginationVO;

import java.util.Map;

/**
 * @program: blog
 * @description:
 * @author: Mr.Wang
 * @create: 2018-05-21 22:12
 */
public class UserServiceImpl implements UserService {

    private UserDao userDao = SqlSessionUtil.getCurrentSqlSession().getMapper(UserDao.class);

    /**
     * 登录后台
     *
     * @param username
     * @param pwd
     * @return
     */
    @Override
    public User login(String username, String pwd,String ip) throws LoginException {
        User user = userDao.login(username, pwd);
        if (user == null) {
            throw new LoginException("用户名或密码错误!");
        }
        if (user.getUser_status() != null && "0".equals(user.getUser_status())) {
            throw new LoginException("该账号被封禁!");
        }
        userDao.record(user.getId(), DateUtil.getSysTime(),ip);
        return user;
    }

    /**
     * 获取博主信息,显示我的名片
     *
     * @return
     */
    @Override
    public User getBloggerInfo() {
        return userDao.getBloggerInfo();
    }

    /**
     * 修改密码
     *
     * @param map
     * @return
     */
    @Override
    public User changePassword(Map<String, Object> map) {
        //查询原密码是否正确
        User user = userDao.getByUser_LoginAndOld_User_Pass(map);
        User user1 = null;
        if (user != null) {
            //修改密码
            user1 = userDao.changePassword(map);
        }
        return user1;
    }

    /**
     * 判断用户名是否已存在
     *
     * @param username
     * @return
     */
    @Override
    public User checkUser(String username) {
        return userDao.checkUser(username);
    }

    /**
     * 用户注册
     *
     * @return
     */
    @Override
    public int save(User user) {
        return userDao.save(user);
    }

    /**
     * 获取用户列表
     *
     * @param map
     * @return
     */
    @Override
    public PaginationVO<User> listUserByCondition(Map<String, Object> map) {
        PaginationVO<User> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(userDao.getTotal());
        paginationVO.setList(userDao.getList(map));
        return paginationVO;
    }

    /**
     * 启用账户
     * @param id
     * @return
     */
    @Override
    public int enable(String id) {
        return userDao.enable(id);
    }

    /**
     * 封禁账户
     * @param id
     * @return
     */
    @Override
    public int disable(String id) {
        return userDao.disable(id);
    }

    /**
     * 降级
     * @param user_type
     * @return
     */
    @Override
    public int downgrade(String id,Integer user_type) {
        return userDao.downgrade(id,user_type);
    }

    /**
     * 升级
     * @param id
     * @param user_type
     * @return
     */
    @Override
    public int upgrade(String id, Integer user_type) {
        return userDao.upgrade(id,user_type);
    }

    /**
     * 根据id获取用户信息
     * @param id
     * @return
     */
    @Override
    public User getById(String id) {
        return userDao.getById(id);
    }

    /**
     * 修改用户信息
     * @param user
     * @return
     */
    @Override
    public int modifyUser(User user) {
        return userDao.modifyUser(user);
    }
}
