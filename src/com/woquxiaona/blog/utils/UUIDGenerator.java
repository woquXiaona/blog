package com.woquxiaona.blog.utils;

import java.util.UUID;

/**
 * 生成表主键的工具类:UUID生成器
 * @author Administrator
 *
 */
public class UUIDGenerator {
	
	private UUIDGenerator(){
		
	}
	
	/**
	 * 生成UUID字符串：32位，全部小写！
	 * @return
	 */
	public static String generate(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
}
