package com.woquxiaona.blog.utils;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OutJson {
	
	private OutJson(){
		
	}
	
	/**
	 * 负责响应JSON
	 * @param request 请求
	 * @param response 响应
	 * @param jsonMap 被转换为json字符串的javabean
	 */
	public static void print(HttpServletRequest request , HttpServletResponse response , Object retMap){
		try {
			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(retMap);
			request.setAttribute("data", json);
			request.getRequestDispatcher("/data.jsp").forward(request, response);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ServletException e) {
			e.printStackTrace();
		}
	}
}
