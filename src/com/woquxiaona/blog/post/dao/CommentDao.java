package com.woquxiaona.blog.post.dao;

import java.util.List;
import java.util.Map;

public interface CommentDao {

    /**
     * 评论列表
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<Map<String, Object>> listComment(Integer pageIndex, Integer pageSize);
}
