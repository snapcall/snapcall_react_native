
package com.shellmonger.reactnative;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONObject;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import io.snapcall.snapcall_android_framework.Snapcall;
import io.snapcall.snapcall_android_framework.Snapcall_External_Parameter;

public class RNSnapcallReactModule extends ReactContextBaseJavaModule {

  private  ReactApplicationContext reactContext = null;



  private Snapcall_External_Parameter SEPFromJson(String json){
      Snapcall_External_Parameter ret = new Snapcall_External_Parameter();
      try {
          JsonWrapper obj;
          obj = new JsonWrapper(json);

          ret.displayBrand = obj.getString("displayBrand", null);
          ret.displayName = obj.getString("displayName", null);
          ret.callTitle = obj.getString("callTitle", null);
          ret.AssetPathImage = obj.getString("AssetPathImage", null);
          ret.AssetPathFont = obj.getString("AssetPathFont", null);
          ret.notificationTittle = obj.getString("notificationTittle", null);
          ret.notificationBody = obj.getString("notificationBody",  null);
          ret.externalContext = obj.getString("externalContext", null);
          ret.urlImage = obj.getString("urlImage",  null);
          ret.textColor = obj.getInt("textColor", 0);
          ret.pushTransfertData = obj.getString("pushTransfertData", null);
          ret.senderBrand = obj.getString("senderBrand", null);
          ret.senderName = obj.getString("senderName", null);


      } catch (Exception e) {
          e.printStackTrace();
      }
      return ret;

  }

  public RNSnapcallReactModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

  }

    @ReactMethod
    public void launchCall( String bidId, String Snapcall_external_asJson, final Promise promise) {
        try {
            Snapcall.getInstance().launchCall(reactContext, bidId, SEPFromJson(Snapcall_external_asJson));
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }

    }

    @ReactMethod
    public void launchCall(String bidId, String snapcallID, String Snapcall_external_asJson, final Promise promise) {
        try {
            Snapcall.getInstance().launchCall(reactContext, bidId, snapcallID , SEPFromJson(Snapcall_external_asJson));
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }

    }

    @ReactMethod
    public void launchCall( String bidId, String appName, String customIdentifier, String Snapcall_external_asJson, final Promise promise) {
        try {
            Snapcall.getInstance().launchCall(reactContext, bidId, appName, customIdentifier, SEPFromJson(Snapcall_external_asJson));
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }

    }
    @ReactMethod
    public void  registerUser( String token,  String identifier,  String customClientIdentifier,  String applicationName, final Promise promise)
    {
        if (token == null || applicationName == null){
            promise.reject("null value", "token or applicationName null");
            return;
        }
        Snapcall.getInstance().registerUser(token, identifier, customClientIdentifier, applicationName, new Snapcall.Snapcall_Listener() {
            @Override
            public void snapcallIdentifierCallBack(String s) {
                promise.resolve(s);
            }
        });

    }

    @ReactMethod
    public void  activeUser(Boolean active, String token,  String identifier,  String customClientIdentifier,  String applicationName, final Promise promise)
    {
        if (token == null || applicationName == null){
            promise.reject("null value", "token or applicationName null");
            return;
        }
        Snapcall.getInstance().setUserActive(active, token, identifier, customClientIdentifier, applicationName, new Snapcall.activate() {
            @Override
            public void callback(boolean b) {
                promise.resolve(b);
            }
        });

    }

    @ReactMethod
    public void  buttonIsOpen(String bid_id, final Promise promise)
    {
        if (bid_id == null ){
            promise.reject("null value", "token or applicationName null");
            return;
        }
        Snapcall.getInstance().buttonIsClosed(bid_id,  new Snapcall.activate() {
            @Override
            public void callback(boolean b) {
                promise.resolve(b);
            }
        });

    }

    @ReactMethod
    public void isSnapcallRunning(final Promise promise) {

      try {
          promise.resolve(Snapcall.getInstance().isSnapcallRunning(reactContext));
      }catch(Exception e){
          promise.reject(e);
      }
    }

    @ReactMethod
    public void  permissionStatus(final Promise promise){
      try {
          promise.resolve(Snapcall.getInstance().permissionStatus(reactContext));
      }catch (Exception e){
          promise.reject(e);
      }
    }

    @ReactMethod
    public void  restorUI(final Promise promise){
      try {
          Snapcall.getInstance().restorCallUi(reactContext);
          promise.resolve(null);
      } catch (Exception e){
          promise.reject(e);
      }

    }

    public void receiveCall(@NonNull Context context, Map message , @Nullable Snapcall_External_Parameter parameter) throws Exception {
      try {
          Snapcall.getInstance().receiveCall(context, message,parameter);
      } catch(Exception e){
          throw e;
      }
    }

    @ReactMethod
    public void receiveCall( String JsonMessage , @Nullable Snapcall_External_Parameter parameter) throws Exception {
        try {

            JsonWrapper obj;
            obj = new JsonWrapper(JsonMessage);
            Snapcall.getInstance().receiveCall(reactContext, obj,parameter);
        } catch(Exception e){
            throw e;
        }
    }


    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void activateSnapcallListener(final Promise  promise) {
        final WritableMap params = Arguments.createMap();
        Snapcall.Snapcall_Call_Event ev = new Snapcall.Snapcall_Call_Event() {
            @Override
            public void onSnapcallStart() {
                sendEvent(reactContext, "onSnapcallStart", params);
            }

            @Override
            public void onCallStart() {
                sendEvent(reactContext, "onCallStart", params);
            }

            @Override
            public void onCallEnd() {
                sendEvent(reactContext, "onCallEnd", params);
            }

            @Override
            public void onSnapcallStop() {
                sendEvent(reactContext, "onSnapcallStop", params);
            }

            @Override
            public void onUIStart() {
                sendEvent(reactContext, "onUIStart", params);
            }

            @Override
            public void onCallRing() {
                sendEvent(reactContext, "onCallRing", params);
            }

            @Override
            public void onError() {
                sendEvent(reactContext, "onCallError", params);
            }
        };

        try {
            Snapcall.getInstance().registerCallback(reactContext, ev);
            promise.resolve(null);
        }catch (Exception e)
        {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void desactivateSnapcallListener(final Promise promise){
      try {
          Snapcall.getInstance().unregisterCallback(reactContext);
          promise.resolve(null);

      }catch(Exception e)
      {
          promise.reject(e);
      }

    }




  @Override
  public String getName() {
    return "RNSnapcallReact";
  }
}