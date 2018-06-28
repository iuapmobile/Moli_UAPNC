package com.yonyou.test;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import nc.bcmanage.bs.IBusiCenterManageService;
import nc.bcmanage.vo.BusiCenterVO;
import nc.bs.framework.common.InvocationInfoProxy;
import nc.bs.framework.common.NCLocator;
import nc.bs.framework.comn.NetStreamContext;
import nc.bs.framework.core.service.IFwLogin;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

//import com.yonyou.maportal.bs.padplugin.ctl.MPLogger;
import com.yonyou.maportal.itf.portalcore.IMultiServicesInvorker;
//import com.yonyou.maportal.ms.portalcore.iconst.PortalSetUp;
import com.yonyou.uap.um.gateway.service.GatewayServiceFactory;

public class Test {

	public static void main(String[] args) {
		
		
		 try {
		
			String url = "http://172.20.15.37:8899";
			String usercode = "mluser02";
			String pwd = "yonyou@1";
			
			NetStreamContext.resetAll();
			
			Properties props = createProps(url);
	        
			InvocationInfoProxy.getInstance().setUserCode(usercode);
			
			IBusiCenterManageService bcservice = NCLocator.getInstance(props).lookup(IBusiCenterManageService.class);
			BusiCenterVO centervo = bcservice.getBusiCenterByCode("dev");
			InvocationInfoProxy.getInstance().setUserDataSource(centervo.getDataSourceName());
			
			
//			InvocationInfoProxy.getInstance().setUserDataSource("nc65");
			
			  Object[] objlogin = new Object[3];
			  objlogin[0] = usercode;
			  objlogin[1] = pwd;
			  objlogin[2] = null;
			  
			  Class[] methodClasses = new Class[3];
		        methodClasses[0] = String.class;
		        methodClasses[1] = String.class;
		        methodClasses[2] = Map.class;
			
			Object ncobj = nclocator(props,"nc.bs.framework.core.service.IFwLogin","login",objlogin,methodClasses);
			
			byte[] token = (byte[]) ncobj;
			
			
//			IFwLogin ifw = NCLocator.getInstance(props).lookup(IFwLogin.class);
//			
//			byte[] token_ifw = ifw.login(usercode, pwd, null);
			
			
	        NetStreamContext.setToken(token);
	        
	        
	        Object[] obj = new Object[2];
	        obj[0] = usercode;
	        obj[1] = centervo.getDataSourceName();
	        
	        Class[] classes = new Class[2];
	        classes[0] = String.class;
	        classes[1] = String.class;
	        
	        Object ncobj1 = nclocator(props,"com.yonyou.maportal.itf.portalcore.IUserVOAdapter","getUserVOTran",obj,classes);
	        
	        JSONObject json = JSONObject.fromObject(ncobj1);
	        
	        String userid = json.getString("cuserid");
	        String groupid = json.getString("pk_group");

	        System.out.println(json);
	        
	        //InvocationInfoProxy.getInstance().setUserId(userid);
			//InvocationInfoProxy.getInstance().setGroupId(groupid);
	        
			
			/////////////////////////////////////////////////////////////////////////////////////////////
			
			
			
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
			
			
			IMultiServicesInvorker imsi = NCLocator.getInstance(props).lookup(IMultiServicesInvorker.class);
			
			List<String> servicenames = new ArrayList<String> ();
			servicenames.add("nc.itf.uap.pf.IPFMobileAppServiceFacade");
			
			List<List<String>> methodnames = new ArrayList<List<String>> ();
			List<String> methodname = new ArrayList<String>();
			methodname.add("getTaskList");
			methodnames.add(methodname);
			
			List<List<Class[]>> pClass = new ArrayList<List<Class[]>> ();
			List<Class[]> pClazz = new ArrayList<Class[]>();
			pClazz.add(taskClasses);
			pClass.add(pClazz);
			
			List<List<Object[]>> paramsList = new ArrayList<List<Object[]>> (); 
			List<Object[]> paramList = new ArrayList<Object[]>();
			paramList.add(taskObj);
			paramsList.add(paramList);
			
			Object results = imsi.multiServicesInvorker(servicenames, methodnames, pClass, paramsList,null);
			 JSONArray resultsJson = JSONArray.fromObject(results);
			
			
			//Object taskNcObj = nclocator(props,"nc.itf.uap.pf.IPFMobileAppServiceFacade","getTaskList",taskObj,taskClasses);
	        
			System.out.println(resultsJson);
			
	        
			
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} 
        
	}
	
	/**
	 * 
	 * @param props  
	 * @param itfname
	 * @param methodName  
	 * @param objparams   
	 * @param methodClasses
	 * @return
	 */
	public static Object nclocator(Properties props,String itfname,String methodName,Object[] objparams,Class[] methodClasses){
		
		
		Object itfObj = NCLocator.getInstance(props).lookup(itfname); //接口类必须存在
		//调用类反射机制
		Method _method = null;
		Object ncObj = null;
		
		if(objparams==null||objparams.length==0){   //不存在参数
			try{
				_method = itfObj.getClass().getMethod(methodName);
				ncObj = _method.invoke(itfObj);
			}catch(Exception e){
				//MPLogger.error(e);
			}
		}else{    //存在参数
			try{
				_method = itfObj.getClass().getMethod(methodName, methodClasses);
				ncObj = _method.invoke(itfObj, objparams);
			}catch(Exception e){
				//MPLogger.error(e);
			}
		}
		
		return ncObj;
		
	}
	
	 public static Properties createProps(String url)
	    {
	        Properties props = new Properties();
	        props.setProperty("SERVICEDISPATCH_URL", url + "/ServiceDispatcherServlet");
	        return props;
	    }
}
