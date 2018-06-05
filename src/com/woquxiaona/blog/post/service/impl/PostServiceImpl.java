package com.woquxiaona.blog.post.service.impl;

import com.woquxiaona.blog.post.dao.PostDao;
import com.woquxiaona.blog.post.domain.Category;
import com.woquxiaona.blog.post.domain.Post;
import com.woquxiaona.blog.post.service.PostService;
import com.woquxiaona.blog.utils.SqlSessionUtil;
import com.woquxiaona.blog.vo.PaginationVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: post
 * @description: post业务层实现类
 * @author: Mr.Wang
 * @create: 2018-05-19 09:04
 */
public class PostServiceImpl implements PostService {

    private PostDao postDao = SqlSessionUtil.getCurrentSqlSession().getMapper(PostDao.class);

    /**
     * 分页查询博客列表
     *
     * @param map
     * @return
     */
    @Override
    public PaginationVO<Post> listPost(Map<String, Object> map) {
        PaginationVO<Post> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(postDao.getTotal(map));
        paginationVO.setList(postDao.getListPost(map));
        return paginationVO;
    }

    /**
     * 点赞
     *
     * @param id
     * @return
     */
    @Override
    public Map<String, Object> addLikes(String id) {
        int likes = postDao.getLikesById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("count", postDao.addLikes(id, likes + 1));
        map.put("likes", likes + 1);
        return map;
    }

    /**
     * 博客详情
     *
     * @param id
     * @return
     */
    @Override
    public Post view(String id) {
        return postDao.view(id);
    }

    /**
     * 模糊查询
     *
     * @param title
     * @return
     */
    @Override
    public List<Post> queryByCondition(String title) {
        return postDao.queryByCondition(title);
    }

    /**
     * 统计阅读量
     *
     * @param id
     * @param count
     * @return
     */
    @Override
    public Map<String, Object> addHits(String id, Integer count) {
        int hits = postDao.getHitsById(id);
        hits = hits + 1;
        int resultcount = postDao.addHits(id, hits);
        Map<String, Object> map = new HashMap<>();
        map.put("count", resultcount);
        map.put("hits", hits);
        return map;
    }

    /**
     * 热门点击
     *
     * @param map
     * @return
     */
    @Override
    public PaginationVO<Post> hotHits(Map<String, Object> map) {
        PaginationVO<Post> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(8L);
        paginationVO.setList(postDao.getHotListPost(map));
        return paginationVO;
    }

    /**
     * 写文章
     *
     * @param post
     * @return
     */
    @Override
    public int save(Post post) {
        //查询未分类的id,如果没选择分类,默认为未分类
        String categoryId = postDao.queryCategoryByOrderNo(0);
        if (post.getPost_type() == null) {
            post.setPost_type(categoryId);
        }
        return postDao.save(post);
    }

    /**
     * 推荐文章列表
     *
     * @param map
     * @return
     */
    @Override
    public PaginationVO<Post> tuijian(Map<String, Object> map) {
        PaginationVO<Post> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(9L);
        paginationVO.setList(postDao.getTuijianListPost(map));
        return paginationVO;
    }

    /**
     * 删除单条博客
     *
     * @param id
     * @return
     */
    @Override
    public int removeById(String id) {
        return postDao.removeById(id);
    }

    /**
     * 已删除博客列表
     *
     * @param map
     * @return
     */
    @Override
    public PaginationVO<Post> listRecycledPosts(Map<String, Object> map) {
        PaginationVO<Post> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(postDao.getRecycledTotal(map));
        paginationVO.setList(postDao.listRecycledPosts(map));
        return paginationVO;
    }

    /**
     * 还原文章
     *
     * @param id
     * @return
     */
    @Override
    public int restore(String id) {
        return postDao.restore(id);
    }

    /**
     * 彻底删除文章
     *
     * @param id
     * @return
     */
    @Override
    public int completelyDelete(String id) {
        return postDao.completelyDelete(id);
    }

    /**
     * 批量彻底删除文章
     *
     * @param ids
     * @return
     */
    @Override
    public int completelyDeleteSelected(String[] ids) {
        return postDao.completelyDeleteSelected(ids);
    }

    /**
     * 批量还原文章
     *
     * @param ids
     * @return
     */
    @Override
    public int restoreSelected(String[] ids) {
        return postDao.restoreSelected(ids);
    }

    /**
     * 文章详情
     *
     * @param id
     * @return
     */
    @Override
    public Map<String, Object> detail(String id) {
        Post post = postDao.detail(id);
        List<Category> categories = postDao.getCategories();
        Map<String, Object> map = new HashMap<>();
        map.put("post", post);
        map.put("categories", categories);
        return map;
    }

    /**
     * 所有文章
     *
     * @param map
     * @return
     */
    @Override
    public PaginationVO<Post> listAllPosts(Map<String, Object> map) {
        PaginationVO<Post> paginationVO = new PaginationVO<>();
        paginationVO.setTotal(postDao.getAllTotal(map));
        paginationVO.setList(postDao.listAllPosts(map));
        return paginationVO;
    }

    /**
     * 编辑文章
     * @param post
     * @return
     */
    @Override
    public int rewrite(Post post) {
        return postDao.rewrite(post);
    }
}
