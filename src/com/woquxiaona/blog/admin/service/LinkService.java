package com.woquxiaona.blog.admin.service;

import com.woquxiaona.blog.admin.domain.Link;

import java.util.List;


public interface LinkService {

    /**
     * 添加友情链接
     */
    int addLinks(Link link);

    /**
     * 获取友情链接列表
     * @return
     */
    List<Link> getAll();

    /**
     * 启用链接
     * @param id
     * @return
     */
    int enableLink(String id);

    /**
     * 禁用链接
     * @param id
     * @return
     */
    int disableLink(String id);

    /**
     * 删除链接
     * @param id
     * @return
     */
    int deleteById(String id);

    /**
     * 获取链接详情
     * @param id
     * @return
     */
    Link detail(String id);

    /**
     * 修改链接
     * @param link
     * @return
     */
    int modifyLink(Link link);
}

