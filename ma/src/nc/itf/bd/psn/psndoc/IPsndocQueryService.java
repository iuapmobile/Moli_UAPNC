package nc.itf.bd.psn.psndoc;

import nc.vo.bd.psn.PsndocVO;
import nc.vo.bd.psn.PsnjobVO;
import nc.vo.pub.BusinessException;

public abstract interface IPsndocQueryService
{
  public abstract PsndocVO[] queryPsndocVOsByCondition(String paramString)
    throws BusinessException;
  
  public abstract String[] queryPsndocVOPksByDepts(String paramString1, String[] paramArrayOfString, String paramString2, String paramString3)
    throws BusinessException;
  
  public abstract String[] queryPsndocVOPksByOrgs(String[] paramArrayOfString, String paramString1, String paramString2)
    throws BusinessException;
  
  public abstract PsndocVO[] queryPsndocVosByOrgs(String[] paramArrayOfString, String paramString1, String paramString2)
    throws BusinessException;
  
  public abstract PsnjobVO queryPsnJobVOByPsnDocPK(String paramString)
    throws BusinessException;
  
  public abstract String[] queryPsnDocByPost(String paramString)
    throws BusinessException;
  
  public abstract String[] queryPsndocByConditon(String paramString1, String paramString2)
    throws BusinessException;
  
  public abstract PsndocVO[] queryPsndocByPks(String[] paramArrayOfString1, String[] paramArrayOfString2)
    throws BusinessException;
  
  public abstract PsndocVO[] queryAllPsndocvosByGroupOrOrgOrDept(String paramString1, String paramString2, String paramString3)
    throws BusinessException;
  
  public abstract PsndocVO[] queryAllPsndocvosByGroupAndOrgOrDeptForImportBusiReportMember(String paramString1, String paramString2, String paramString3)
    throws BusinessException;
  
  public abstract boolean queryDeptHasPsndoc(String paramString)
    throws BusinessException;
  
  public abstract PsndocVO[] queryPsndocByPks(String[] paramArrayOfString)
    throws BusinessException;
  
  public abstract PsnjobVO[] getOldPsnjobVO(String paramString)
    throws BusinessException;
}

/* Location:           D:\nc65\modules\baseapp\lib\pubbaseapp_appbasedocLevel-1.jar
 * Qualified Name:     nc.itf.bd.psn.psndoc.IPsndocQueryService
 * Java Class Version: 7 (51.0)
 * JD-Core Version:    0.7.1
 */