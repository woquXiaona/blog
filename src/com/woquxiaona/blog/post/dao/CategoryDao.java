package com.woquxiaona.blog.post.dao;

import com.woquxiaona.blog.post.domain.Category;

import java.util.List;

public interface CategoryDao {

    /**
     * 获取博客总数量
     * @param map
     * @return
     */
    //Long getTotal(Map<String, Object> map);

    /**
     * 分页查询博客列表
     * @param map
     * @return
     */
    //List<Post> getListPost(Map<String, Object> map);

    /**
     * 获取当前点赞数
     *
     * @param id
     * @return
     */
    //int getLikesById(String id);

    /**
     * 点赞
     *
     * @param id
     * @param likes
     * @return
     */
    //int addLikes(String id, int likes);

    /**
     * 博客详情
     * @param id
     * @return
     */
    //Post view(String id);

    /**
     * 模糊查询
     * @param title
     * @return
     */
    //List<Post> queryByCondition(String title);

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
     * 获得当前最大排序号
     *
     * @return
     */
    List<Category> getMaxOrderNo();

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
