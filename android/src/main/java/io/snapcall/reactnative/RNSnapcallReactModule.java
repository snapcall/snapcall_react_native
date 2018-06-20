
package io.snapcall.reactnative;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
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
          try {
              ret.textColor = Color.parseColor(obj.getString("textColor", null));
          }catch (Exception e) {
              e.printStackTrace();
          }
          ret.pushTransfertData = obj.getString("pushTransfertData", null);
          ret.senderBrand = obj.getString("senderBrand", null);
          ret.senderName = obj.getString("senderName", null);
          ret.hideCart = obj.getBoolean("hideCart",true);


      } catch (Exception e) {
          e.printStackTrace();
      }
      return ret;

  }

  public RNSnapcallReactModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    activateSnapcallListener();

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


    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
      try {
          reactContext
                  .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                  .emit(eventName, params);
      }catch(Exception e){
          e.printStackTrace();
      }
    }


    private void activateSnapcallListener() {
        final WritableMap params = Arguments.createMap();

        Snapcall.Snapcall_Call_Event ev = new Snapcall.Snapcall_Call_Event() {

            @Override
            public void ontimeUpdate(int i) {

            }

            @Override
            public void onSnapcallStart() {

                final WritableMap params = Arguments.createMap();
                params.putString("Snapev", "SnapcallStart");
                sendEvent(reactContext, "SnapcallStart", params);
            }

            @Override
            public void onCallStart() {

                final WritableMap params = Arguments.createMap();
                params.putString("Snapev", "SnapcallCallStart");
                sendEvent(reactContext, "SnapcallCallStart", params);
            }

            @Override
            public void onCallEnd() {

                final WritableMap params = Arguments.createMap();
                params.putString("Snapev", "SnapcallCallEnd");
                sendEvent(reactContext, "SnapcallCallEnd", params);
            }

            @Override
            public void onSnapcallStop() {

                final WritableMap params = Arguments.createMap();
                params.putString("Snapev", "SnapcallUIEnd");
                sendEvent(reactContext, "SnapcallUIEnd", params);
            }

            @Override
            public void onUIStart() {

                final WritableMap params = Arguments.createMap();
                params.putString("Snapev", "SnapcallUIStart");
                sendEvent(reactContext, "SnapcallUIStart", params);
            }

            @Override
            public void onCallRing() {

                final WritableMap params = Arguments.createMap();
                sendEvent(reactContext, "onCallRing", params);
            }

            @Override
            public void onError() {
                params.putString("Snapev", "onCallError");
                final WritableMap params = Arguments.createMap();
                sendEvent(reactContext, "onCallError", params);
            }
        };

        try {
            Snapcall.getInstance().registerCallback(reactContext, ev);

        }catch (Exception e)
        {

        }
    }


    public void desactivateSnapcallListener(){
      try {
          Snapcall.getInstance().unregisterCallback(reactContext);


      }catch(Exception e)
      {

      }

    }
    @ReactMethod
    public void releaseSnapcall(final Promise promise){
      try {
          Snapcall.getInstance().unregisterCallback(reactContext);
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