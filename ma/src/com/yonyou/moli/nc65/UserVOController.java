package com.yonyou.moli.nc65;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.json.JSONObject;

import com.yonyou.maportal.itf.portalcore.IMultiServicesInvorker;
import com.yonyou.uap.um.context.util.UmContextUtil;
import com.yonyou.uap.um.gateway.service.GatewayServiceFactory;
import com.yonyou.uap.um.gateway.service.GatewayServiceUtil;
import com.yonyou.uap.um.gateway.service.IGatewayService;
import com.yonyou.uap.um.gateway.xml.GatewayNodeFactory;

import nc.bcmanage.bs.IBusiCenterManageService;
import nc.bcmanage.vo.BusiCenterVO;
import nc.bs.framework.common.InvocationInfoProxy;
import nc.bs.framework.common.NCLocator;
import nc.bs.framework.comn.NetStreamContext;
import nc.bs.framework.server.util.KeyUtil;

public class UserVOController {

	public String GetUserVOTran(String args) {
		final String SERVICEID_getTaskList = "gct_getTaskList";// 与service.xml中的ssoLoginService保持一致
		JSONObject resultJson = new JSONObject();
		try {
			JSONObject json = new JSONObject(args);
			String appid = json.getString("appid");
			String strToken = json.getString("nctoken");// 获取app传递的token
			String usercode = json.getString("usercode");

			String url = null;
			if (json.has("ncurl")) {
				url = json.getString("ncurl");
			} else {
				url = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getCurrentDs()
						.get(GatewayServiceUtil.PROPERTY_URL).toString().trim();
			}

			NetStreamContext.setToken(KeyUtil.decodeToken(strToken));

			 String dataSource = null;
			if (json.has("nc_dataSource")) {
				dataSource = json.getString("nc_dataSource");// 客户端如果传递了，就直接使用
			}
			//从datasource.xml中获取datasource的值
			if (dataSource == null || dataSource.equals("")) {
				dataSource = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getCurrentDs()
						.get(GatewayServiceUtil.PROPERTY_DATASOURCE).toString().trim();

			} else {
				throw new Exception("参数DataSource没有指定值，不传递该参数则取配置文件datasource.xml中的值");
			}
			
			
			InvocationInfoProxy.getInstance().setUserDataSource(dataSource);

			Object[] params = new Object[2];
			params[0] = usercode;
			params[1] = dataSource;

			Class[] paramclasses = new Class[2];
			paramclasses[0] = String.class;
			paramclasses[1] = String.class;

			Properties props = new Properties();
			props.setProperty("SERVICEDISPATCH_URL", url + "/ServiceDispatcherServlet");
			Object objResult = nclocator(props, "com.yonyou.maportal.itf.portalcore.IUserVOAdapter", "getUserVOTran",
					params, paramclasses);

			net.sf.json.JSONObject jsonResult = net.sf.json.JSONObject.fromObject(objResult);

			String userid = jsonResult.getString("cuserid");
			String groupid = jsonResult.getString("pk_group");

			//System.out.println(jsonResult);

			return jsonResult.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson.toString();
	}

	public String GetUserVOTran2(String args) {
		final String SERVICEID_getTaskList = "gct_getTaskList";// 与service.xml中的ssoLoginService保持一致
		JSONObject resultJson = new JSONObject();
		try {
			JSONObject json = new JSONObject(args);
			String appid = json.getString("appid");
			String strToken = json.getString("nctoken");// 获取app传递的token
			String usercode = json.getString("usercode");
			String accountcode = json.getString("accountcode");

			String url = null;
			if (json.has("ncurl")) {
				url = json.getString("ncurl");
			} else {
				url = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getCurrentDs()
						.get(GatewayServiceUtil.PROPERTY_URL).toString().trim();
			}

			NetStreamContext.setToken(KeyUtil.decodeToken(strToken));
			Properties props = new Properties();
			props.setProperty("SERVICEDISPATCH_URL", url + "/ServiceDispatcherServlet");
			IBusiCenterManageService bcservice = NCLocator.getInstance(props).lookup(IBusiCenterManageService.class);
			BusiCenterVO centervo = bcservice.getBusiCenterByCode(accountcode);
			InvocationInfoProxy.getInstance().setUserDataSource(centervo.getDataSourceName());

			Object[] params = new Object[2];
			params[0] = usercode;
			params[1] = centervo.getDataSourceName();

			Class[] paramclasses = new Class[2];
			paramclasses[0] = String.class;
			paramclasses[1] = String.class;

			Object objResult = nclocator(props, "com.yonyou.maportal.itf.portalcore.IUserVOAdapter", "getUserVOTran",
					params, paramclasses);

			net.sf.json.JSONObject jsonResult = net.sf.json.JSONObject.fromObject(objResult);

			String userid = jsonResult.getString("cuserid");
			String groupid = jsonResult.getString("pk_group");

			System.out.println(jsonResult);

			return jsonResult.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson.toString();
	}

	public static Object nclocator(Properties props, String itfname, String methodName, Object[] objparams,
			Class[] methodClasses) {

		Object itfObj = NCLocator.getInstance(props).lookup(itfname); // 接口类必须存在
		// 调用类反射机制
		Method _method = null;
		Object ncObj = null;

		if (objparams == null || objparams.length == 0) { // 不存在参数
			try {
				_method = itfObj.getClass().getMethod(methodName);
				ncObj = _method.invoke(itfObj);
			} catch (Exception e) {
				// MPLogger.error(e);
			}
		} else { // 存在参数
			try {
				_method = itfObj.getClass().getMethod(methodName, methodClasses);
				ncObj = _method.invoke(itfObj, objparams);
			} catch (Exception e) {
				// MPLogger.error(e);
			}
		}

		return ncObj;

	}
}