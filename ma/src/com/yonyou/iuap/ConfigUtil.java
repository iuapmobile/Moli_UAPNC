package com.yonyou.iuap;

import java.io.InputStream;
import java.util.Properties;

import com.yonyou.uap.um.utils.MALogger;




/**
 * 
 * Project: UMP 
 * Function Description:
 * Company: YONYOU UAP
 * Copyright: 2013 YONYOU. All rights reserved.
 * @author pujie
 * @Date 2013-11-5 上午09:56:38
 * @version
 */
public class ConfigUtil {

    private static Properties prop = new Properties();
    private static InputStream inputFile = null;

    static {
		try {
			try {
				inputFile = ConfigUtil.class.getResourceAsStream("/conf/configure/Demonstration/config.properties");
				prop.load(inputFile);
			} finally {
				if (inputFile != null) {
					inputFile.close();
				}
			}
		} catch (Exception e) {
			MALogger.error(e);
		}
    }

    public static String getString(String key) {
        return prop.getProperty(key);
    }

    public static Integer getInteger(String key) {
        String value = prop.getProperty(key);
        if (value != null) {
            return Integer.valueOf(value);
        }

        return null;
    }

    public static Long getLong(String key) {
        String value = prop.getProperty(key);
        if (value != null) {
            return Long.valueOf(value);
        }

        return null;
    }
    public static boolean getBoolean(String key)
    {
        return Boolean.parseBoolean(prop.getProperty(key));
    }

}
