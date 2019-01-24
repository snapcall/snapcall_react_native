
package io.snapcall.reactnative;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.Map;


import io.snapcall.snapcall_android_framework.Snapcall;
import io.snapcall.snapcall_android_framework.Snapcall_External_Parameter;

public class RNSnapcallReactModule extends ReactContextBaseJavaModule {

  private  ReactApplicationContext reactContext = null;
//  private  static RNSnapcallReactModule instance = null;

  private Snapcall_External_Parameter SEPFromJson(String json){
      Snapcall_External_Parameter ret = new Snapcall_External_Parameter();
      try {
          JsonWrapper obj;
          obj = new JsonWrapper(json);

          ret.displayBrand = obj.getString("displayBrand", null);
          ret.displayName = obj.getString("displayName", null);
          ret.callTitle = obj.getString("callTitle", null);
          ret.AssetPathImage = obj.getString("android_AssetPathImage", null);
          ret.AssetPathFont = obj.getString("android_AssetPathFont", null);
          ret.notificationTittle = obj.getString("notificationTittle", null);
          ret.notificationBody = obj.getString("notificationBody",  null);
          ret.urlImage = obj.getString("urlImage",  null);
          try {
              ret.textColor = Color.parseColor(obj.getString("textColor", null));
          }catch (Exception e) {
              Log.i("RNSnapcallReact", e.getMessage());
          }
          try {
               ret.backgroundColor = Color.parseColor(obj.getString("backgroundColor", null));
           }catch (Exception e) {
               Log.i("RNSnapcallReact", e.getMessage());
           }
          ret.pushTransfertData = obj.getString("pushTransfertData", null);
          ret.senderBrand = obj.getString("senderBrand", null);
          ret.senderName = obj.getString("senderName", null);
          ret.hideCart = obj.getBoolean("hideCart",true);
          ret.externalContext = obj.getJSONObject("externalContext");

      } catch (Exception e) {
          e.printStackTrace();
      }
      return ret;

  }

  public RNSnapcallReactModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    activateSnapcallListener();
//    RNSnapcallReactModule.instance = this;

  }

    @Override
    protected void finalize() throws Throwable {

        Snapcall.releaseInstance();
        super.finalize();
    }

    @ReactMethod
    public void launchCallWithbidId( String bidId, String Snapcall_external_asJson, final Promise promise) {
        try {
            Snapcall.getInstance().launchCall(reactContext, bidId, SEPFromJson(Snapcall_external_asJson));
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }

    }

    @ReactMethod
    public void launchCallWithIdentifier(String bidId, String snapcallID, String Snapcall_external_asJson, final Promise promise) {
        try {
            Snapcall.getInstance().launchCall(reactContext, bidId, snapcallID , SEPFromJson(Snapcall_external_asJson));
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }

    }

    @ReactMethod
    public void launchCallWithCustomIdentifier( String bidId, String appName, String customIdentifier, String Snapcall_external_asJson, final Promise promise) {
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
    public void  bidIsClosed(String bid_id, final Promise promise)
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
    public void receiveCall( String JsonMessage , @Nullable Snapcall_External_Parameter parameter, final Promise promise) throws Exception {
        try {

            JsonWrapper obj;
            obj = new JsonWrapper(JsonMessage);
            Snapcall.getInstance().receiveCall(reactContext, obj,parameter);
            promise.resolve(null);
        } catch(Exception e){
            promise.reject(e);

        }
    }


    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
      try {
          reactContext
                  .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                  .emit(eventName, params);
      }catch(Exception e){
          e.printStackTrace();
      }
    }


    private void activateSnapcallListener() {
        System.out.println("ActiveteListener");
        final WritableMap params = Arguments.createMap();
        Snapcall.Snapcall_Call_Event ev = new Snapcall.Snapcall_Call_Event() {

            @Override
            public void onTime(int i) {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onTime");
                params.putInt("time", i);
                sendEvent(reactContext, "onTime", params);
            }

            @Override
            public void onStart() {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onStart");
                sendEvent(reactContext, "onStart", params);
            }

            @Override
            public void onCallStart() {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onCallStart");
                sendEvent(reactContext, "onCallStart", params);
            }

            @Override
            public void onCallEnd() {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onCallEnd");
                sendEvent(reactContext, "onCallEnd", params);
            }

            @Override
            public void onEnd() {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onEnd");
                sendEvent(reactContext, "onEnd", params);
            }

            @Override
            public void onUIStart() {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onUIStart");
                sendEvent(reactContext, "onUIStart", params);
            }

            @Override
            public void onUIEnd() {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onUIEnd");
                sendEvent(reactContext, "onUIEnd", params);
            }


            @Override
            public void onCallRing() {
                final WritableMap params = Arguments.createMap();
                sendEvent(reactContext, "onCallRing", params);
            }

            @Override
            public void onError(String error) {
                final WritableMap params = Arguments.createMap();
                params.putString("event_name", "onError");
                params.putString("error", error);
                sendEvent(reactContext, "onError", params);
            }
        };

        try {
            Snapcall.getInstance().addEventListener(reactContext, ev);

        }catch (Exception e)
        {

        }
    }


    public void desactivateSnapcallListener(){
      try {
          Snapcall.getInstance().removeAllEventListener(reactContext);


      }catch(Exception e)
      {

      }

    }
    @ReactMethod
    public void releaseSnapcall(final Promise promise){
      try {
          Snapcall.getInstance().removeAllEventListener(reactContext);
          Snapcall.releaseInstance();
          promise.resolve(null);
      }catch (Exception e){
          promise.reject(e);
      }
    }




  @Override
  public String getName() {
    return "RNSnapcallReact";
  }
}
