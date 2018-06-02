package com.woquxiaona.blog.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * mybatis工具类
 * @author Administrator
 *
 */
public class SqlSessionUtil {
	
	private SqlSessionUtil(){
		
	}
	
	private static SqlSessionFactory factory;
	
	private static ThreadLocal<SqlSession> loc = new ThreadLocal<>();
	
	/**
	 * 类加载的时候通过mybatis-config.xml构建SqlSessionFactory对象
	 */
	static{
		try {
			factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 从当前线程中获取SqlSession对象
	 * @return sqlsession
	 */
	public static SqlSession getCurrentSqlSession(){
		SqlSession sqlSession = loc.get();
		if(sqlSession == null){
			sqlSession = factory.openSession();
			loc.set(sqlSession);
		}
		return sqlSession;
	}
	
	/**
	 * 关闭当前线程中的sqlSession对象，并解除sqlSession对象与当前线程的关系
	 * @param sqlSession
	 */
	public static void close(SqlSession sqlSession){
		if(sqlSession != null){
			sqlSession.close();
			loc.remove();
		}
	}
	
	/**
	 * 回滚事务
	 * @param sqlSession
	 */
	public static void rollback(SqlSession sqlSession){
		if(sqlSession != null){
			sqlSession.rollback();
		}
	}
}





















