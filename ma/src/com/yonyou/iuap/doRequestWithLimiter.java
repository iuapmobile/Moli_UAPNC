package com.yonyou.iuap;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.yonyou.iuap.RSAClientUtil;
import com.yonyou.iuap.common.util.HttpClientUtil;
import com.yonyou.uap.um.utils.MALogger;

public class doRequestWithLimiter {

	HttpClientUtil hcu = new HttpClientUtil();
	
	/**
	 * 调用测试应用平台接口
	 * @param args
	 * @return
	 */
	public String doRequestWithLimiter(String args){
		JSONObject json = null;
		Map<String, String> headMap = null;
		try {
			json = new JSONObject(args);
			headMap = new HashMap<String, String>();
			headMap.put("Authority", json.getString("Authority"));
		} catch (JSONException e) {
			MALogger.error("json转换出错！", e);
			return "";
		}
		Map<String, Object> reMap = hcu.HttpGet(RSAClientUtil.getTestUrl(), headMap);
		String body = (String) reMap.get("data");
		return body;
	}
}
