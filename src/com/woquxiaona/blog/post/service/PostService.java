package com.woquxiaona.blog.post.service;

import com.woquxiaona.blog.post.domain.Post;
import com.woquxiaona.blog.vo.PaginationVO;

import java.util.List;
import java.util.Map;

public interface PostService {

    /**
     * 分页查询博客列表
     *
     * @param map
     * @return
     */
    PaginationVO<Post> listPost(Map<String, Object> map);

    /**
     * 点赞
     *
     * @param id
     * @param id
     * @return
     */
    Map<String, Object> addLikes(String id);

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
     * 统计阅读量
     *
     * @param id
     * @param count
     * @return
     */
    Map<String, Object> addHits(String id, Integer count);

    /**
     * 热门点击
     *
     * @param map
     * @return
     */
    PaginationVO<Post> hotHits(Map<String, Object> map);

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
    PaginationVO<Post> tuijian(Map<String, Object> map);

    /**
     * 删除单条博客
     *
     * @param id
     * @return
     */
    int removeById(String id);

    /**
     * 已删除博客列表
     *
     * @param map
     * @return
     */
    PaginationVO<Post> listRecycledPosts(Map<String, Object> map);

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
     * 批量彻底删除文章
     *
     * @param ids
     * @return
     */
    int completelyDeleteSelected(String[] ids);

    /**
     * 批量还原文章
     * @param ids
     * @return
     */
    int restoreSelected(String[] ids);

    /**
     * 文章详情
     * @param id
     * @return
     */
    Map<String, Object> detail(String id);

    /**
     * 所有文章
     * @param map
     * @return
     */
    PaginationVO<Post> listAllPosts(Map<String, Object> map);
}
