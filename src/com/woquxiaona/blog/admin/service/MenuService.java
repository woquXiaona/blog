package com.woquxiaona.blog.admin.service;

import com.woquxiaona.blog.admin.domain.Menu;
import com.woquxiaona.blog.vo.PaginationVO;

import java.util.Map;

public interface MenuService {

    /**
     * 添加菜单
     * @param menu
     * @return
     */
    int addMenu(Menu menu);

    /**
     * 菜单列表
     * @param map
     * @return
     */
    PaginationVO<Menu> getAll(Map<String, Object> map);

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
    Map<String,Object> detail(String id);

    /**
     * 修改菜单
     * @param menu
     * @return
     */
    int modifyMenu(Menu menu);
}
