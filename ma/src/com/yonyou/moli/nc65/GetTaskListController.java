package com.yonyou.moli.nc65;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.json.JSONObject;

import com.yonyou.maportal.itf.portalcore.IMultiServicesInvorker;
import com.yonyou.uap.um.context.util.UmContextUtil;
import com.yonyou.uap.um.gateway.service.GatewayServiceFactory;
import com.yonyou.uap.um.gateway.service.IGatewayService;

import nc.bcmanage.bs.IBusiCenterManageService;
import nc.bcmanage.vo.BusiCenterVO;
import nc.bs.framework.common.InvocationInfoProxy;
import nc.bs.framework.common.NCLocator;
import nc.bs.framework.comn.NetStreamContext;
import nc.bs.framework.server.util.KeyUtil;
import net.sf.json.JSONArray;

public class GetTaskListController {
	final String SERVICEID = "getTaskList";//与service.xml中的ssoLoginService保持一致
	
	public String GetTaskList(String args) {
		
		JSONObject resultJson = new JSONObject();
		try {
			JSONObject json = new JSONObject(args);
			String url = json.getString("ncurl");
			String strToken = json.getString("nctoken");//获取app传递的token
			String usercode = json.getString("nc_usercode");
			String userid = json.getString("nc_userid");
	        String groupid = json.getString("nc_groupid");
	        
	        
	        //1、重置context
	        NetStreamContext.resetAll();
	        
	        
	        //2、设置nc上下文
	        //必须设置usercode
			InvocationInfoProxy.getInstance().setUserCode(usercode);
			
			Properties props = new Properties();
	        props.setProperty("SERVICEDISPATCH_URL", url + "/ServiceDispatcherServlet");
	        
	        
	        //必须设置数据源
			IBusiCenterManageService bcservice = NCLocator.getInstance(props).lookup(IBusiCenterManageService.class);
			BusiCenterVO centervo = bcservice.getBusiCenterByCode("dev");
			InvocationInfoProxy.getInstance().setUserDataSource(centervo.getDataSourceName());
			
	        	        
	        //设置token
			byte[] token = KeyUtil.decodeToken(strToken);			
			NetStreamContext.setToken(token);
	        
			
			

	        
			//3、准备接口参数
			Object[] taskObj = new Object[8];
			taskObj[0] = groupid;
			taskObj[1] = userid;
			taskObj[2] = "2018-6-15";
			taskObj[3] = "ishandled";
			taskObj[4] = "unhandled";
			taskObj[5] = "";
			taskObj[6] = 1;
			taskObj[7] = 25;
						
			Class[] taskClasses = new Class[8];
			taskClasses[0] = String.class;
			taskClasses[1] = String.class;
			taskClasses[2] = String.class;
			taskClasses[3] = String.class;
			taskClasses[4] = String.class;
			taskClasses[5] = String.class;
			taskClasses[6] = Integer.class;
			taskClasses[7] = Integer.class;
			
			
			
			
			
			
			List<String> servicenames = new ArrayList<String> ();
			servicenames.add("nc.itf.uap.pf.IPFMobileAppServiceFacade");
			
			List<List<String>> methodnames = new ArrayList<List<String>> ();
			List<String> methodnameList = new ArrayList<String>();
			methodnameList.add(this.SERVICEID);
			methodnames.add(methodnameList);
			
			List<List<Class[]>> pClass = new ArrayList<List<Class[]>> ();
			List<Class[]> pClazz = new ArrayList<Class[]>();
			pClazz.add(taskClasses);
			pClass.add(pClazz);
			
			List<List<Object[]>> paramsList = new ArrayList<List<Object[]>> (); 
			List<Object[]> paramList = new ArrayList<Object[]>();
			paramList.add(taskObj);
			paramsList.add(paramList);
			
			
//			Properties props = new Properties();
//	        props.setProperty("SERVICEDISPATCH_URL", url + "/ServiceDispatcherServlet");
			IMultiServicesInvorker imsi = NCLocator.getInstance(props).lookup(IMultiServicesInvorker.class);
			
			Object results = imsi.multiServicesInvorker(servicenames, methodnames, pClass, paramsList,null);
			 JSONArray xxx = JSONArray.fromObject(results);
			
			
			//Object taskNcObj = nclocator(props,"nc.itf.uap.pf.IPFMobileAppServiceFacade","getTaskList",taskObj,taskClasses);
	        
			System.out.println(xxx);
			return xxx.toString();
			
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson.toString();
	}
}