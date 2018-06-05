package com.woquxiaona.blog.post.dao;

import com.woquxiaona.blog.post.domain.Category;
import com.woquxiaona.blog.post.domain.Post;

import java.util.List;
import java.util.Map;

public interface PostDao {

    /**
     * 获取博客总数量
     *
     * @param map
     * @return
     */
    Long getTotal(Map<String, Object> map);

    /**
     * 分页查询博客列表
     *
     * @param map
     * @return
     */
    List<Post> getListPost(Map<String, Object> map);

    /**
     * 获取当前点赞数
     *
     * @param id
     * @return
     */
    int getLikesById(String id);

    /**
     * 点赞
     *
     * @param id
     * @param likes
     * @return
     */
    int addLikes(String id, int likes);

    /**
     * 博客详情
     *
     * @param id
     * @return
     */
    Post view(String id);

    /**
     * 模糊查询
     *
     * @param title
     * @return
     */
    List<Post> queryByCondition(String title);

    /**
     * 获取当前阅读量
     *
     * @param id
     * @return
     */
    int getHitsById(String id);

    /**
     * 增加点击量
     *
     * @param id
     * @param hits
     * @return
     */
    int addHits(String id, int hits);

    /**
     * 热门点击
     *
     * @param map
     * @return
     */

    List<Post> getHotListPost(Map<String, Object> map);

    /**
     * 写文章
     *
     * @param post
     * @return
     */
    int save(Post post);

    /**
     * 推荐文章列表
     *
     * @param map
     * @return
     */
    List<Post> getTuijianListPost(Map<String, Object> map);

    /**
     * 删除单条博客
     *
     * @param id
     * @return
     */
    int removeById(String id);

    /**
     * 获取已删除博客总数量
     *
     * @param map
     * @return
     */
    Long getRecycledTotal(Map<String, Object> map);

    /**
     * 已删除博客列表
     *
     * @param map
     * @return
     */
    List<Post> listRecycledPosts(Map<String, Object> map);

    /**
     * 还原文章
     *
     * @param id
     * @return
     */
    int restore(String id);

    /**
     * 彻底删除文章
     *
     * @param id
     * @return
     */
    int completelyDelete(String id);

    /**
     * 查询未分类的id,如果没选择分类,默认为未分类
     *
     * @param i
     * @return
     */
    String queryCategoryByOrderNo(int i);

    /**
     * 批量彻底删除文章
     *
     * @param ids
     * @return
     */
    int completelyDeleteSelected(String[] ids);

    /**
     * 批量还原文章
     *
     * @param ids
     * @return
     */
    int restoreSelected(String[] ids);

    /**
     * 文章详情
     *
     * @param id
     * @return
     */
    Post detail(String id);

    /**
     * 获取分类列表
     *
     * @return
     */
    List<Category> getCategories();

    /**
     * 查询未删除的博客总数量
     *
     * @param map
     * @return
     */
    Long getAllTotal(Map<String, Object> map);

    /**
     * 所有文章
     *
     * @param map
     * @return
     */
    List<Post> listAllPosts(Map<String, Object> map);

    /**
     * 编辑文章
     * @param post
     * @return
     */
    int rewrite(Post post);
}
