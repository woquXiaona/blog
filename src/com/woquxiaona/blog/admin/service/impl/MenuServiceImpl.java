package com.woquxiaona.blog.admin.service.impl;

import com.woquxiaona.blog.admin.dao.MenuDao;
import com.woquxiaona.blog.admin.domain.Menu;
import com.woquxiaona.blog.admin.service.MenuService;
import com.woquxiaona.blog.post.dao.CategoryDao;
import com.woquxiaona.blog.post.domain.Category;
import com.woquxiaona.blog.utils.SqlSessionUtil;
import com.woquxiaona.blog.vo.PaginationVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: blog
 * @description: 菜单
 * @author: Mr.Wang
 * @create: 2018-05-29 20:17
 */
public class MenuServiceImpl implements MenuService{

    MenuDao menuDao = SqlSessionUtil.getCurrentSqlSession().getMapper(MenuDao.class);
    CategoryDao categoryDao = SqlSessionUtil.getCurrentSqlSession().getMapper(CategoryDao.class);

    /**
     * 添加菜单
     * @param menu
     * @return
     */
    @Override
    public int addMenu(Menu menu) {

        //获取最大排序号
        List<Menu> menuList = menuDao.getMaxOrderNo();
        if (menuList.size()!=0){
            for (Menu menu1 : menuList) {
                int orderNo = Integer.valueOf(menu1.getOrderNo());
                menu.setOrderNo(String.valueOf(orderNo+1));
            }
        }else {
            menu.setOrderNo("1");
        }
        return menuDao.addMenu(menu);
    }

    /**
     * 菜单列表
     * @param map
     * @return
     */
    @Override
    public PaginationVO<Menu> getAll(Map<String, Object> map) {
        PaginationVO<Menu> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(menuDao.getTotal());
        paginationVO.setList(menuDao.getList(map));
        return paginationVO;
    }

    /**
     * 删除菜单
     * @param id
     * @return
     */
    @Override
    public int deleteById(String id) {
        return menuDao.deleteById(id);
    }

    /**
     * 菜单详情
     * @param id
     * @return
     */
    @Override
    public Map<String, Object> detail(String id) {
        List<Category> categoryList = categoryDao.listAllCategory();
        Menu menu = menuDao.detail(id);
        Map<String,Object> map = new HashMap<>(2);
        map.put("menu",menu);
        map.put("categoryList",categoryList);
        return map;
    }

    /**
     * 修改菜单
     * @param menu
     * @return
     */
    @Override
    public int modifyMenu(Menu menu) {
        return menuDao.modifyMenu(menu);
    }
}
