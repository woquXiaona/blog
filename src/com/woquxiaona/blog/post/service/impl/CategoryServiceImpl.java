package com.woquxiaona.blog.post.service.impl;

import com.woquxiaona.blog.post.dao.CategoryDao;
import com.woquxiaona.blog.post.domain.Category;
import com.woquxiaona.blog.post.service.CategoryService;
import com.woquxiaona.blog.utils.SqlSessionUtil;

import java.util.List;

/**
 * @program: blog
 * @description: 分类
 * @author: Mr.Wang
 * @create: 2018-05-25 17:43
 */
public class CategoryServiceImpl implements CategoryService {

    CategoryDao categoryDao = SqlSessionUtil.getCurrentSqlSession().getMapper(CategoryDao.class);

    /**
     * 查询除"未分类"之外的其他分类
     *
     * @return
     */
    @Override
    public List<Category> listCategory() {
        return categoryDao.listCategory();
    }

    /**
     * 查询所有分类
     *
     * @return
     */
    @Override
    public List<Category> listAllCategory() {
        return categoryDao.listAllCategory();
    }

    /**
     * 添加分类
     *
     * @param category
     * @return
     */
    @Override
    public int addClassify(Category category) {

        //获得当前最大排序号
        List<Category> categories = categoryDao.getMaxOrderNo();
        for (Category category1 : categories) {
            int orderNo = Integer.valueOf(category1.getOrderNo()) + 1;
            category.setOrderNo(String.valueOf(orderNo));
        }
        return categoryDao.addClassify(category);
    }

    /**
     * 根据id获取分类详情
     *
     * @param id
     * @return
     */
    @Override
    public Category getById(String id) {
        return categoryDao.getById(id);
    }

    /**
     * 保存修改分类
     *
     * @param category
     * @return
     */
    @Override
    public int modifyClassify(Category category) {
        return categoryDao.modifyClassify(category);
    }

    /**
     * 根据id删除分类
     * @param id
     * @return
     */
    @Override
    public int deleteClassifyById(String id) {
        return categoryDao.deleteClassifyById(id);
    }
}
