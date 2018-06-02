package com.woquxiaona.blog.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 获取系统当前时间
 * @author Administrator
 */
public class DateUtil {
	
	/**
	 * 日期格式化对象
	 */
	private static SimpleDateFormat allDateFormat = new SimpleDateFormat(Const.ALL_DATE_FORMAT);
	
	/**
	 * 获取系统当前时间，全日期格式
	 * @return 2010-10-10 10:10:10
	 */
	public static String getSysTime(){
		return allDateFormat.format(new Date());
	}
}
