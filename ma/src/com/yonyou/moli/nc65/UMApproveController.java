package com.yonyou.moli.nc65;

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
import net.sf.json.JSONArray;

public class UMApproveController {
	private final String SERVICEID_getTaskList = "gct_getTaskList";// 与service.xml中的ssoLoginService保持一致

	public String GetTaskList(String args) {

		JSONObject resultJson = new JSONObject();
		try {
			JSONObject json = new JSONObject(args);

			String appid = json.getString("appid");
			String url = null;
			if (json.has("nc_url")) {
				url = json.getString("nc_url");
			} else {
				url = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getCurrentDs()
						.get(GatewayServiceUtil.PROPERTY_URL).toString().trim();
			}
			
			String strToken = json.getString("nc_token");// 获取app传递的token
			String usercode = json.getString("nc_usercode");
			String userid = json.getString("nc_userid");
			String groupid = json.getString("nc_groupid");
			String dataSource = null;
			if (json.has("nc_dataSource")) {
				dataSource = json.getString("nc_dataSource");// 客户端如果传递了，就直接使用
			}
			if (dataSource == null || dataSource.equals("")) {
				/*
				 * available code by gct IBusiCenterManageService bcservice =
				 * NCLocator.getInstance(props)
				 * .lookup(IBusiCenterManageService.class);//
				 * 根据nc的url地址获取BusiCenterManageService BusiCenterVO centervo =
				 * bcservice.getBusiCenterByCode(accountcode);//
				 * BusiCenterManageService根据账套accountcode获取BusiCenter dataSource
				 * = centervo.getDataSourceName();// BusiCenter获取DataSource
				 */
				dataSource = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getCurrentDs()
						.get(GatewayServiceUtil.PROPERTY_DATASOURCE).toString().trim();

			} else {
				throw new Exception("参数DataSource没有指定值，不传递该参数则取配置文件datasource.xml中的值");
			}

			/*
			 * String accountcode = "dev";// 默认accountcode if
			 * (json.has("nc_accountcode")) { accountcode =
			 * json.getString("nc_accountcode");// 客户端如果传递了，就直接使用 }
			 */
			// <params>groupid:String|userid:String|date:String|statuskey:String|statuscode:String|condition:String|startline:java.lang.Integer|count:java.lang.Integer</params>
			String task_Date = json.has("nc_taskDate") ? json.getString("nc_taskDate") : "2018-6-15";
			String task_statuskey = json.has("task_statuskey") ? json.getString("task_statuskey") : "ishandled";
			String task_statuscode = json.has("task_statuscode") ? json.getString("task_statuscode") : "unhandled";
			String task_condition = json.has("task_condition") ? json.getString("task_condition") : "";
			int task_startline = json.has("task_startline") ? json.getInt("task_startline") : 1;
			int task_count = json.has("task_count") ? json.getInt("task_count") : 25;

			// 1、重置context
			NetStreamContext.resetAll();

			// 2、设置nc上下文
			// 必须设置usercode
			InvocationInfoProxy.getInstance().setUserCode(usercode);

			Properties props = new Properties();
			props.setProperty("SERVICEDISPATCH_URL", url + "/ServiceDispatcherServlet");

			// 必须设置数据源，数据源可以通过NC地址url+账套accountcode获取
			if (dataSource == null || dataSource.equals("")) {
				/*
				 * IBusiCenterManageService bcservice =
				 * NCLocator.getInstance(props)
				 * .lookup(IBusiCenterManageService.class);//
				 * 根据nc的url地址获取BusiCenterManageService BusiCenterVO centervo =
				 * bcservice.getBusiCenterByCode(accountcode);//
				 * BusiCenterManageService根据账套accountcode获取BusiCenter dataSource
				 * = centervo.getDataSourceName();// BusiCenter获取DataSource
				 */
				dataSource = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getCurrentDs()
						.get(GatewayServiceUtil.PROPERTY_DATASOURCE).toString().trim();

			}
			InvocationInfoProxy.getInstance().setUserDataSource(dataSource);

			// 设置token
			byte[] token = KeyUtil.decodeToken(strToken);
			NetStreamContext.setToken(token);

			// 3、准备接口参数
			Object[] taskObj = new Object[8];
			taskObj[0] = groupid;
			taskObj[1] = userid;
			taskObj[2] = task_Date;
			taskObj[3] = task_statuskey;
			taskObj[4] = task_statuscode;
			taskObj[5] = task_condition;
			taskObj[6] = task_startline;
			taskObj[7] = task_count;

			Class[] taskClasses = new Class[8];
			taskClasses[0] = String.class;
			taskClasses[1] = String.class;
			taskClasses[2] = String.class;
			taskClasses[3] = String.class;
			taskClasses[4] = String.class;
			taskClasses[5] = String.class;
			taskClasses[6] = Integer.class;
			taskClasses[7] = Integer.class;

			List<String> servicenames = new ArrayList<String>();
			servicenames.add("nc.itf.uap.pf.IPFMobileAppServiceFacade");

			List<List<String>> methodnames = new ArrayList<List<String>>();
			List<String> methodnameList = new ArrayList<String>();
			String methodName = GatewayNodeFactory.getGatewayNode(appid).get(SERVICEID_getTaskList).getMethod().trim();
			methodnameList.add(methodName);
			methodnames.add(methodnameList);

			List<List<Class[]>> pClass = new ArrayList<List<Class[]>>();
			List<Class[]> pClazz = new ArrayList<Class[]>();
			pClazz.add(taskClasses);
			pClass.add(pClazz);

			List<List<Object[]>> paramsList = new ArrayList<List<Object[]>>();
			List<Object[]> paramList = new ArrayList<Object[]>();
			paramList.add(taskObj);
			paramsList.add(paramList);

			// Properties props = new Properties();
			// props.setProperty("SERVICEDISPATCH_URL", url +
			// "/ServiceDispatcherServlet");
			IMultiServicesInvorker imsi = NCLocator.getInstance(props).lookup(IMultiServicesInvorker.class);

			Object results = imsi.multiServicesInvorker(servicenames, methodnames, pClass, paramsList, null);
			JSONArray xxx = JSONArray.fromObject(results);

			// Object taskNcObj =
			// nclocator(props,"nc.itf.uap.pf.IPFMobileAppServiceFacade","getTaskList",taskObj,taskClasses);

			System.out.println(xxx);
			return xxx.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson.toString();
	}
}