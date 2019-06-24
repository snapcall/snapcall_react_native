package io.snapcall.reactnative;

import org.json.JSONException;
import org.json.JSONObject;

public class JsonWrapper extends JSONObject {

    public JsonWrapper(String json) throws JSONException
    {
        super(json);
    }


    public boolean getBoolean(String name, Boolean defaultVal)  {
        try {
            return super.getBoolean(name);
        }catch (Exception e){
            return  defaultVal;
        }
    }

    public int getInt(String name, int defaultVal)  {
        try {
            return super.getInt(name);
        }catch (Exception e){
            return  defaultVal;
        }
    }

    public String getString(String name, String defaultVal)  {
        try {
            String ret = super.getString(name);
            if (ret.equals("null") || ret.equals("undefined"))
                ret = defaultVal;
            return ret;
        }catch (Exception e){
            return  defaultVal;
        }
    }

    public JsonWrapper getJsonObject(String name, JsonWrapper defaultVal)  {
        try {
            return new JsonWrapper(super.getJSONObject(name).toString());
        }catch (Exception e){
            return  defaultVal;
        }
    }

}
