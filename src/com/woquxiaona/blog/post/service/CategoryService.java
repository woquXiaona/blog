package com.woquxiaona.blog.post.service;

import com.woquxiaona.blog.post.domain.Category;

import java.util.List;

public interface CategoryService {

    /**
     * 查询除"未分类"之外的其他分类
     *
     * @return
     */
    List<Category> listCategory();

    /**
     * 查询所有分类
     *
     * @return
     */
    List<Category> listAllCategory();

    /**
     * 添加分类
     *
     * @param category
     * @return
     */
    int addClassify(Category category);

    /**
     * 根据id获取分类详情
     *
     * @param id
     * @return
     */
    Category getById(String id);

    /**
     * 保存修改分类
     *
     * @param category
     * @return
     */
    int modifyClassify(Category category);

    /**
     * 根据id删除分类
     *
     * @param id
     * @return
     */
    int deleteClassifyById(String id);
}
