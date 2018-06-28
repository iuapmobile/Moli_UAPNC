package com.yonyou.iuap;

import java.io.IOException;
import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Map;

import org.apache.commons.httpclient.HttpException;
import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;

import com.yonyou.iuap.common.util.HttpClientUtil;
import com.yonyou.iuap.common.util.RSAUtils;
import com.yonyou.uap.um.utils.MALogger;

public class RSAClientUtil {

	
	private final static String IUAP_LOGIN_URL = "/wbalone/maaccount/login";
	private final static String IUAP_PUBKEY_URL = "/wbalone/open/getEncryptParam";
	private final static String TEST_URL = "/example/ygdemo_yw_info/doRequestWithLimiter";
	private final static String IUAP_URL = ConfigUtil.getString("iuap_login_url");
	
	
	
	public static String getIuapLoginUrl(){
		return IUAP_URL+IUAP_LOGIN_URL;
	}
	
	public static String getIuapPubkeyUrl(){
		return IUAP_URL+IUAP_PUBKEY_URL;
	}
	
	public static String getTestUrl(){
		return IUAP_URL+TEST_URL;
	}
	
	
	/**
	 * 加签公钥和密码
	 * @param pwd
	 * @return
	 * @throws HttpException
	 * @throws IOException
	 */
	public static String getDecryptPwd(String pwd) throws HttpException, IOException {
		pwd = StringUtils.reverse(pwd);
		PublicKey pubkey = null;
		try {
			pubkey = getPublicKey();
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			MALogger.error("获取iuap平台公钥时出错！", e);
			return "";
		}
		return RSAUtils.encryptString(pubkey, pwd);
	}
	
	/**
	 * 获取应用平台公钥
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeySpecException
	 * @throws HttpException
	 * @throws IOException
	 */
	private static PublicKey getPublicKey() throws NoSuchAlgorithmException, InvalidKeySpecException, HttpException, IOException {
		String modulus = "";
		String publicExponent = "";
		HttpClientUtil hcu = new HttpClientUtil();
		
		try {
			Map<String, String> map = hcu.HttpGet(getIuapPubkeyUrl(), null);
			String mapDataJson = map.get("data");
			JSONObject json = new JSONObject(mapDataJson);
			JSONObject dataObject = json.getJSONObject("data");
			modulus =dataObject.getString("modulus");
			publicExponent = dataObject.getString("exponent");
		} catch (Exception e) {
			
		}
		BigInteger bigIntModulus = new BigInteger(modulus, 16);
		BigInteger bigIntPrivateExponent = new BigInteger(publicExponent, 16);
		RSAPublicKeySpec keySpec = new RSAPublicKeySpec(bigIntModulus, bigIntPrivateExponent);
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		PublicKey publicKey = keyFactory.generatePublic(keySpec);
		return publicKey;
	}
}
