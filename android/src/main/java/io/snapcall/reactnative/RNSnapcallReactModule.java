
package io.snapcall.reactnative;

import android.content.Context;
import android.content.Intent;
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
import com.facebook.react.views.image.ReactImageManager;

import org.json.JSONObject;

import java.util.Map;
import java.util.Random;
import io.snapcall.snapcall_android_framework.SCClient;
import io.snapcall.snapcall_android_framework.SCClientEvent;
import io.snapcall.snapcall_android_framework.SCLogger;
import io.snapcall.snapcall_android_framework.Snapcall;
import io.snapcall.snapcall_android_framework.Snapcall_External_Parameter;

public class RNSnapcallReactModule extends ReactContextBaseJavaModule implements SimpleRequestBroadcastReceiver.onRequestReceived {

    private static final String TAG = "RNSnapcallReactModule";

    private ReactApplicationContext reactContext = null;
    private Intent restorInterfaceIntent;
    private final String interfaceRequestedAction = "io.snapcall.snapcall_framework.requestUserInterface";
    private static final String intentKey = generateUUID();
    private SCClient snapcallClient;
    private SimpleRequestBroadcastReceiver snapcallIntentListener;
    private SnapcallClientListener snapcallClientListener;
    private static Intent customRestorInterfaceIntent = null;


    public static void setCustomReloadIntent(Intent intent) {

        customRestorInterfaceIntent = intent;
    }

  private Snapcall_External_Parameter SEPFromJson(String json) {

      Snapcall_External_Parameter ret = new Snapcall_External_Parameter();
      JsonWrapper obj;

      try {
          obj = new JsonWrapper(json);
          ret.displayBrand = obj.getString("displayBrand", null);
          ret.displayName = obj.getString("displayName", null);
          ret.callTitle = obj.getString("callTitle", null);
          ret.AssetPathImage = obj.getString("android_AssetPathImage", null);
          ret.AssetPathFont = obj.getString("android_AssetPathFont", null);
          ret.notificationTittle = obj.getString("notificationTittle", null);
          ret.notificationBody = obj.getString("notificationBody",  null);
          ret.urlImage = obj.getString("urlImage",  null);
          ret.showBackButton = obj.getBoolean("showBackButton", false);
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
          ret.externalContext = obj.getJsonObject("externalContext", null);
          ret.shouldReturn = obj.getBoolean("shouldReturn", true);
          String resImage = obj.getString("androidResimage", null);
          if (resImage != null)
            ret.setResImage(resImage, reactContext.getApplicationContext().getPackageName()) ;
      } catch (Exception e) {
          Log.e(TAG, "SEPFromJson failed converting to JSON", e);
      }
      return ret;
  }

   RNSnapcallReactModule(ReactApplicationContext reactContext) {

      super(reactContext);

       SCLogger.debug = true;
       SCLogger.error = true;
       SCLogger.verbose = true;
       SCLogger.info = true;
      this.reactContext = reactContext;

      restorInterfaceIntent =  new Intent();
      restorInterfaceIntent.setAction(interfaceRequestedAction);
      restorInterfaceIntent.putExtra("staticApplicationKey", intentKey);
      Snapcall.getInstance().setLoadUIIntent(restorInterfaceIntent);

      snapcallIntentListener = new SimpleRequestBroadcastReceiver(reactContext, interfaceRequestedAction, "staticApplicationKey" ,intentKey);
      snapcallIntentListener.addListener(this);
      snapcallIntentListener.startObeserver();

      snapcallClientListener = new SnapcallClientListener(reactContext);
      snapcallClient = new SCClient(reactContext);
      snapcallClient.setListener(snapcallClientListener);
      snapcallClient.connect();
  }

    @Override
    protected void finalize() throws Throwable {

        releaseSnapcallInternal();
        reactContext = null;
        super.finalize();
    }

    @ReactMethod
    public void hangup(final Promise promise) {

      try {
          snapcallClient.hangup();
          promise.resolve(null);
      } catch (Exception e) {
          promise.reject(e);
      }
    }

    @ReactMethod
    public void setSpeaker(final Promise promise) {

        try {
            promise.resolve(snapcallClient.setSpeaker());
            snapcallClientListener.onSpeakerChange(snapcallClient.getCurrentState());
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void mute(final Promise promise) {

        try {
            promise.resolve(snapcallClient.mute());
            snapcallClientListener.onMuteChange(snapcallClient.getCurrentState());
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void activeDefaultInterface(boolean active) {
        Snapcall.getInstance().setStartActivityOnReady(false);
        Snapcall.getInstance().setUseDefaultInterface(active);
    }

    @ReactMethod
    public void launchCallWithbidId(String bidId, String Snapcall_external_asJson, final Promise promise) {
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
    public void getCurrentState(final Promise promise) {
      try {

          SCClientEvent ev = snapcallClient.getCurrentState();
          String eventString = snapcallClientListener.convertSCClientEventToJSONString(ev);
          promise.resolve(eventString);
      } catch (Exception e) {
          promise.reject("snapcall not running", e);
      }
    }


    @ReactMethod
    public void rateLastCall(int rate, final Promise promise){
      Snapcall.getInstance().rateLastCall(reactContext, rate, new Snapcall.RequestResult() {
          @Override
          public void onSuccess(String s) {
              promise.resolve(null);
          }

          @Override
          public void onError(String s, Throwable throwable) {
              promise.reject(throwable);
          }
      });
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
    public void receiveCall(String JsonMessage , @Nullable Snapcall_External_Parameter parameter, final Promise promise) throws Exception {
        try {

            JsonWrapper obj;
            obj = new JsonWrapper(JsonMessage);
            Snapcall.getInstance().receiveCall(reactContext, obj,parameter);
            promise.resolve(null);
        } catch(Exception e){
            promise.reject(e);

        }
    }

    private void releaseSnapcallInternal() {

        Snapcall.getInstance().removeAllEventListener(reactContext);
        Snapcall.releaseInstance();
        snapcallIntentListener.release();
        snapcallClientListener.release();
        snapcallClient.disconnect();
        snapcallClient.release();
    }

    @ReactMethod
    public void releaseSnapcall(final Promise promise) {

        try {
            releaseSnapcallInternal();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @Override
    public void onRequestReceived(Intent value) {

        snapcallClientListener.onUserInterfaceRequest(snapcallClient.getCurrentState());
        if (customRestorInterfaceIntent != null)
            reactContext.startActivity(customRestorInterfaceIntent);
    }

    @Override
    public String getName() {

        return "RNSnapcallReact";
    }

    static String generateUUID() {

        final String mod = "0123456789abcdefghijklmnopqrstuvwxyzABSCDEFGHIJKLMNOPQRSTUVWXYZ";
        char[] ret = new char[36];
        Random random = new Random();
        for (int i = 0; i < 36; i++) {
            int rand = random.nextInt() % (mod.length());
            if (rand < 0)
                rand = -rand;
            if (i == 8 || i == 13 || i == 18 || i == 23)
                ret[i] = '-';
            else
                ret[i] = mod.charAt(rand);
        }
        return new String(ret);
    }
}
