package com.yonyou.moli.nc65;

import java.util.Map;
import org.json.JSONObject;
import com.yonyou.uap.um.context.util.UmContextUtil;
import com.yonyou.uap.um.gateway.service.GatewayServiceFactory;
import com.yonyou.uap.um.gateway.service.IGatewayService;
import nc.bs.framework.server.util.KeyUtil;

public class IFWLoginController {
	final String SERVICEID = "ssoLoginService";//与service.xml中的ssoLoginService保持一致
	public String login(String args) {
		
		JSONObject resultJson = new JSONObject();
		try {
			JSONObject json = new JSONObject(args);
			String appid = json.getString("appid");
			
			Map<String, String> map = UmContextUtil.transJsonToMap(json);
			IGatewayService service = GatewayServiceFactory.findGatewayService(appid, SERVICEID, map);
			
			byte[] rusult = (byte[]) service.doService();
			String ss = KeyUtil.encodeToken(rusult);
			
			
			
			
			
			
			
			
			
			resultJson.put("nctoken", ss);			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson.toString();
	}
}