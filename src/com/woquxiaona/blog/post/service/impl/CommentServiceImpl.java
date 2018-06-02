package com.woquxiaona.blog.post.service.impl;

import com.woquxiaona.blog.post.dao.CommentDao;
import com.woquxiaona.blog.post.service.CommentService;
import com.woquxiaona.blog.utils.SqlSessionUtil;

import java.util.List;
import java.util.Map;

/**
 * @program: blog
 * @description: 评论
 * @author: Mr.Wang
 * @create: 2018-05-24 14:44
 */
public class CommentServiceImpl implements CommentService {

    CommentDao commentDao = SqlSessionUtil.getCurrentSqlSession().getMapper(CommentDao.class);

    /**
     * 评论列表
     *
     * @param pageIndex
     * @param pageSize
     * @return
     */
    @Override
    public List<Map<String, Object>> listComment(Integer pageIndex, Integer pageSize) {
        return commentDao.listComment(pageIndex, pageSize);
    }
}
