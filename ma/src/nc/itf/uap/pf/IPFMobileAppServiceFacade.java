package nc.itf.uap.pf;

import java.util.List;
import java.util.Map;
import nc.vo.pub.BusinessException;

public interface IPFMobileAppServiceFacade {
   List<Map<String, Object>> getTaskButtonList(String arg0) throws BusinessException;

   List<Map<String, Object>> getTaskList(String arg0, String arg1, String arg2, String arg3, String arg4, Integer arg5, Integer arg6) throws BusinessException;

   List<Map<String, Object>> getTaskBill(String arg0, String arg1, String arg2, String arg3, String arg4) throws BusinessException;

   List<Map<String, Object>> getTaskAction(String arg0, String arg1, String arg2, String arg3) throws BusinessException;

   List<Map<String, Object>> doAgree(String arg0, String arg1, String arg2, String arg3, List<String> arg4) throws BusinessException;

   List<Map<String, Object>> doDisAgree(String arg0, String arg1, String arg2, String arg3, List<String> arg4) throws BusinessException;

   List<Map<String, Object>> doAddApprover(String arg0, String arg1, String arg2, String arg3, List<String> arg4) throws BusinessException;

   List<Map<String, Object>> doReject(String arg0, String arg1, String arg2, String arg3, String arg4) throws BusinessException;

   List<Map<String, Object>> doReassign(String arg0, String arg1, String arg2, String arg3, String arg4) throws BusinessException;

   List<Map<String, Object>> getUserList(String arg0, String arg1, String arg2, int arg3, int arg4, String arg5) throws BusinessException;

   List<Map<String, Object>> getRejectNodeList(String arg0, String arg1, String arg2, int arg3, int arg4, String arg5) throws BusinessException;

   List<Map<String, Object>> getAssignPsnList(String arg0, String arg1, String arg2, String arg3, int arg4, int arg5, String arg6) throws BusinessException;

   List<Map<String, Object>> getApprovedDetail(String arg0, String arg1, String arg2, String arg3, String arg4, int arg5, int arg6) throws BusinessException;

   List<Map<String, Object>> getPsnDetail(String arg0, String arg1, String arg2) throws BusinessException;

   List<Map<String, Object>> getMessageAttachmentList(String arg0, String arg1, String arg2, String arg3, String arg4) throws BusinessException;

   List<Map<String, Object>> getMessageAttachment(String arg0, String arg1, String arg2, String arg3, String arg4) throws BusinessException;

   List<Map<String, Object>> getConditionDescription(String arg0, String arg1) throws BusinessException;

   List<Map<String, Object>> getTaskStatusList(String arg0, String arg1) throws BusinessException;

   List<Map<String, Object>> getDefaultValueOfAction(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5) throws BusinessException;

   List<Map<String, Object>> doAction(String arg0, String arg1, List<Map<String, Object>> arg2) throws BusinessException;

   List<Map<String, Object>> uploadFile(String arg0, String arg1, String arg2, String arg3, List<Map<String, Object>> arg4) throws BusinessException;
}