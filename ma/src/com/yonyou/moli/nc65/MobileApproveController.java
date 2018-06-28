package com.yonyou.moli.nc65;

import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import com.yonyou.uap.um.context.util.UmContextUtil;
import com.yonyou.uap.um.gateway.service.GatewayServiceFactory;
import com.yonyou.uap.um.gateway.service.IGatewayService;

public class MobileApproveController {
	public String getTaskList(String args) throws Exception{
		JSONObject resultJson = new JSONObject();
		Map<String, Object> result = null;
		JSONObject json = new JSONObject(args);
		String appid = json.optString("appid");
		json.put("startline", new Integer(json.optString("startline")));
		json.put("count", new Integer(json.optString("count")));		
		Map map = UmContextUtil.transJsonToMap(json);
		try {
			IGatewayService service = GatewayServiceFactory.findGatewayService(appid, "getTaskList", map);
			result = (Map)service.doService();
			JSONObject jsontemp = UmContextUtil.transMapToJson(result);
			resultJson.put("result", jsontemp.optJSONArray("taskstructlist"));
		} catch (JSONException e) {
			e.printStackTrace();
			return resultJson.toString();
		}
		return resultJson.toString();
	}

}
