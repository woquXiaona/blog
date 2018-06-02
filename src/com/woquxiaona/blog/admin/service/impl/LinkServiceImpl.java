package com.woquxiaona.blog.admin.service.impl;

import com.woquxiaona.blog.admin.dao.LinkDao;
import com.woquxiaona.blog.admin.domain.Link;
import com.woquxiaona.blog.admin.service.LinkService;
import com.woquxiaona.blog.utils.SqlSessionUtil;

import java.util.List;

/**
 * @program: blog
 * @description: 友情链接
 * @author: Mr.Wang
 * @create: 2018-05-29 15:47
 */
public class LinkServiceImpl implements LinkService {

    LinkDao linkDao = SqlSessionUtil.getCurrentSqlSession().getMapper(LinkDao.class);

    /**
     * 添加友情链接
     *
     * @param link
     * @return
     */
    @Override
    public int addLinks(Link link) {

        //获取当前最大排序号
        List<Link> linkList = linkDao.getMaxOrderNo();
        if (linkList.size()!=0) {
            for (Link link1 : linkList) {
                System.out.println(link1.getOrderNo());
                int orderNo = Integer.valueOf(link1.getOrderNo());
                orderNo += 1;
                System.out.println(orderNo);
                link.setOrderNo(String.valueOf(orderNo));
            }
        }else {
            link.setOrderNo("1");
        }
        return linkDao.addLinks(link);
    }

    /**
     * 获取友情链接列表
     * @return
     */
    @Override
    public List<Link> getAll() {
        return linkDao.getAll();
    }

    /**
     * 启用链接
     * @param id
     * @return
     */
    @Override
    public int enableLink(String id) {
        return linkDao.enableLink(id);
    }

    /**
     * 禁用链接
     * @param id
     * @return
     */
    @Override
    public int disableLink(String id) {
        return linkDao.disableLink(id);
    }

    /**
     * 删除链接
     * @param id
     * @return
     */
    @Override
    public int deleteById(String id) {
        return linkDao.deleteById(id);
    }

    /**
     * 获取链接详情
     * @param id
     * @return
     */
    @Override
    public Link detail(String id) {
        return linkDao.detail(id);
    }

    /**
     * 修改链接
     * @param link
     * @return
     */
    @Override
    public int modifyLink(Link link) {
        return linkDao.modifyLink(link);
    }
}
