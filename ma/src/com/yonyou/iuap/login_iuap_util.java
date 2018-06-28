package com.yonyou.iuap;

import java.io.IOException;
import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;

import com.yonyou.iuap.common.util.HttpClientUtil;
import com.yonyou.uap.um.utils.MALogger;

import nc.vo.pub.BusinessException;

public class login_iuap_util {
	
	HttpClientUtil hcu = new HttpClientUtil();
	
	/**
	 * 应用平台登录
	 * @param args
	 * @return
	 */
	public String login_iuapAP(String args) {
		
		
		JSONObject result = new JSONObject();
		try {
			JSONObject json = new JSONObject(args);
			Map<String, String> map = new HashMap<>();
			map.put("username", json.getString("username"));
			map.put("password", RSAClientUtil.getDecryptPwd(json.getString("password")));
			
			Map<String, Object> reMap = hcu.httppost(map, RSAClientUtil.getIuapLoginUrl(),null);
			Header[] header = (Header[]) reMap.get("headers");
			String body = (String) reMap.get("body");
			String Authority = "";
			for(Header h:header){
				if(h.getName().equals("Set-Cookie")){
					String[] cookieValue = h.getValue().split("; ");
					String[] cookieValue0 = cookieValue[0].split("=");
					Authority = Authority + cookieValue0[0] + "=" + cookieValue0[1] + ";";
				}
			}
			JSONObject jsonbody = new JSONObject(body);
			result.put("body", jsonbody);
			result.put("Authority", Authority);
		} catch (Exception e) {
			MALogger.error("Demonstration,login_iuap_util:"+e);
		}
		return result.toString();
	}
	
}
