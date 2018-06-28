package nc.itf.uap.pf;

import java.util.List;
import java.util.Map;
import nc.vo.pub.BusinessException;

public abstract interface IPFMobileAppService
{
  public abstract Map<String, Object> getTaskButtonList(String paramString)
    throws BusinessException;
  
  public abstract Map<String, Object> getTaskList(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6, Integer paramInteger1, Integer paramInteger2)
    throws BusinessException;
  
  public abstract Map<String, Object> getTaskBill(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> getTaskAction(String paramString1, String paramString2, String paramString3, String paramString4)
    throws BusinessException;
  
  public abstract Map<String, Object> doAgree(String paramString1, String paramString2, String paramString3, String paramString4, List<String> paramList)
    throws BusinessException;
  
  public abstract Map<String, Object> doDisAgree(String paramString1, String paramString2, String paramString3, String paramString4, List<String> paramList)
    throws BusinessException;
  
  public abstract Map<String, Object> doAddApprover(String paramString1, String paramString2, String paramString3, String paramString4, List<String> paramList)
    throws BusinessException;
  
  public abstract Map<String, Object> doReject(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> doReassign(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> getUserList(String paramString1, String paramString2, String paramString3, int paramInt1, int paramInt2, String paramString4)
    throws BusinessException;
  
  public abstract Map<String, Object> getRejectNodeList(String paramString1, String paramString2, String paramString3, int paramInt1, int paramInt2, String paramString4)
    throws BusinessException;
  
  public abstract Map<String, Object> getAssignPsnList(String paramString1, String paramString2, String paramString3, String paramString4, int paramInt1, int paramInt2, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> getApprovedDetail(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, int paramInt1, int paramInt2)
    throws BusinessException;
  
  public abstract Map<String, Object> getPsnDetail(String paramString1, String paramString2, String paramString3)
    throws BusinessException;
  
  public abstract Map<String, Object> getMessageAttachmentList(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> getMessageAttachment(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> getConditionDescription(String paramString1, String paramString2)
    throws BusinessException;
  
  public abstract Map<String, Object> getTaskStatusList(String paramString1, String paramString2)
    throws BusinessException;
  
  public abstract Map<String, Object> getDefaultValueOfAction(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6)
    throws BusinessException;
  
  public abstract Map<String, Object> doAction(String paramString1, String paramString2, List<Map<String, Object>> paramList)
    throws BusinessException;
  
  public abstract Map<String, Object> uploadFile(String paramString1, String paramString2, String paramString3, String paramString4, List<Map<String, Object>> paramList)
    throws BusinessException;
  
  public abstract Map<String, Object> getPushNumber(String paramString1, List<String> paramList, String paramString2)
    throws BusinessException;
  
  public abstract Map<String, Object> getTaskBillContent(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5)
    throws BusinessException;
  
  public abstract Map<String, Object> getTaskFlowChart(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6, String paramString7, String paramString8)
    throws BusinessException;
}