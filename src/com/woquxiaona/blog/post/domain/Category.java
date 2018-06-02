package com.woquxiaona.blog.post.domain;

/**
 * @program: blog
 * @description: 分类
 * @author: Mr.Wang
 * @create: 2018-05-25 17:42
 */
public class Category {
    private String id;
    private String name;
    private String url;
    private String orderNo;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
}
