package com.woquxiaona.blog.admin.dao;

import com.woquxiaona.blog.admin.domain.Menu;

import java.util.List;
import java.util.Map;

public interface MenuDao {

    /**
     * 获取最大排序号
     * @return
     */
    List<Menu> getMaxOrderNo();

    /**
     * 添加菜单
     * @param menu
     * @return
     */
    int addMenu(Menu menu);

    /**
     * 获取菜单总数量
     * @return
     */
    Long getTotal();

    /**
     * 获取菜单列表
     * @param map
     * @return
     */
    List<Menu> getList(Map<String, Object> map);

    /**
     * 删除菜单
     * @param id
     * @return
     */
    int deleteById(String id);

    /**
     * 菜单详情
     * @param id
     * @return
     */
    Menu detail(String id);

    /**
     * 修改菜单
     * @param menu
     * @return
     */
    int modifyMenu(Menu menu);
}
