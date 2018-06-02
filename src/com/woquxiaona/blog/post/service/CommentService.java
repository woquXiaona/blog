package com.woquxiaona.blog.post.service;

import java.util.List;
import java.util.Map;

public interface CommentService {

    /**
     * 评论列表
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<Map<String, Object>> listComment(Integer pageIndex, Integer pageSize);
}
