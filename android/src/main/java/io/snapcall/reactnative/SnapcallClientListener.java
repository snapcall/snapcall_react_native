package io.snapcall.reactnative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import org.json.JSONException;
import org.json.JSONObject;
import android.util.Log;
import androidx.annotation.Nullable;
import io.snapcall.snapcall_android_framework.CallError;
import io.snapcall.snapcall_android_framework.SCCall;
import io.snapcall.snapcall_android_framework.SCClientEvent;
import io.snapcall.snapcall_android_framework.SCClientListener;
import io.snapcall.snapcall_android_framework.VideoInfo;

class SnapcallClientListener implements SCClientListener {

    private static final String TAG = "SnapcallClientListener";
    private ReactContext context;

    SnapcallClientListener(ReactContext context) {

        this.context = context;
    }

    void release() {

        context = null;
    }

    private void sendEvent(String eventName, @Nullable SCClientEvent event) {
        try {
            Log.d(TAG, String.format("event Name : %s ", eventName));
            final WritableMap params = Arguments.createMap();
            params.putString("event", eventName);
            if (event != null) {
                params.putString("data", convertSCClientEventToJSONString(event));
            }
            if (context != null) {
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, params);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private void sendEvent(String eventName, @Nullable String data) {
        try {
            Log.d(TAG, String.format("event Name : %s ", eventName));
            Log.d(TAG, String.format("event Name : %s ", data));
            final WritableMap params = Arguments.createMap();
            params.putString("event", eventName);
            if (data != null) {
                params.putString("data", data);
            }
            if (context != null) {
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, params);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void onCallActivityCreate() {
        sendEvent("onCallActivityCreate", "onCallActivityCreate");
    }

    @Override
    public void onCallActivityDestroy() {
        sendEvent("onCallActivityDestroy", "onCallActivityDestroy");
    }

    @Override
    public void onConnectionReady(SCClientEvent parameter) {
        sendEvent("onConnectionReady", parameter);
    }

    @Override
    public void onCreated(SCClientEvent parameter) {
        sendEvent("onCreated", parameter);
    }

    @Override
    public void onRinging(SCClientEvent parameter) {
        sendEvent("onRinging", parameter);
    }

    @Override
    public void onUpdateUI(SCClientEvent parameter) {
        sendEvent("onUpdateUI", parameter);
    }

    @Override
    public void onAnswer(SCClientEvent parameter) {
        sendEvent("onAnswer", parameter);
    }

    @Override
    public void onInternetDown(SCClientEvent parameter) {

        sendEvent("onInternetDown", parameter);
    }

    @Override
    public void onInternetUP(SCClientEvent parameter) {

        sendEvent("onInternetUP", parameter);
    }

    @Override
    public void onHangup(SCClientEvent parameter) {

        sendEvent("onHangup", parameter);
    }

    @Override
    public void onHeld(SCClientEvent parameter) {

        sendEvent("onHeld", parameter);
    }

    @Override
    public void onUnheld(SCClientEvent parameter) {

        sendEvent("onUnheld", parameter);
    }

    @Override
    public void onTime(SCClientEvent parameter) {

        sendEvent("onTime", parameter);
    }

    @Override
    public void onRemoteVideoInfo(SCClientEvent scClientEvent) {
        sendEvent("onRemoteVideoInfo", scClientEvent);
    }

    @Override
    public void onLocalVideoInfo(SCClientEvent scClientEvent) {
        sendEvent("onLocalVideoInfo", scClientEvent);
    }

    @Override
    public void onUnhook(SCClientEvent scClientEvent) {
        sendEvent("onUnhook", scClientEvent);
    }

    @Override
    public void onError(CallError callError) {
        sendEvent("onError", callError.getDescription());
    }

    @Override
    public void onAgentConnected(String s) {
        System.out.println(s);
        sendEvent("onAgentConnected", s);
    }

    @Override
    public void onConnectionShutDown() {
        sendEvent("onConnectionShutDown", "");
    }

    @Override
    public void onMessage(String callIdentifier, String message) {
        sendEvent("onAgentConnected", message);
    }

    @Override
    public void onMessage(String callIdentifier, Integer message) {
        sendEvent("onAgentConnected", Integer.toString(message));
    }

    @Override
    public void onMessage(String callIdentifier, JSONObject message) {
        sendEvent("onMessage", message.toString());
    }

    void onSpeakerChange(SCClientEvent parameter) {
        sendEvent("onSpeakerChange", parameter);
    }

    void onMuteChange(SCClientEvent parameter) {
        sendEvent("onMuteChange", parameter);
    }



    void onUserInterfaceRequest(SCClientEvent parameter) {

        sendEvent("onUIRequest", parameter);
    }

    /**
     *  convert a SCClient Event Instance to a JSONObject in string format
     *  in order to transmit it to the RN
     *
     * @param event an Instance of SCClientEvent that represent the state of the device at this
     *  moment. Also host the state of the call and transform it.
     *
     * @return the JsonObject reprensenting the state in String format
     */
    String convertSCClientEventToJSONString(SCClientEvent event) {

        try {
            if (event != null) {
                JSONObject jsonEvent = convertSCClientEventToJSON(event);
                return jsonEvent.toString();
            }
        } catch (JSONException e){
            Log.e(TAG, "convertSCClientEventToJSONString: failed to convert to json", e);
        }
        return null;
    }

    /**
     *  convert a SCClient Event Instance to a JSONObject in order to transmit it to the RN
     *
     * @param event an Instance of SCClientEvent that represent the state of the device at this
     * moment. Also host the state of the call and transform it.
     *
     * @return the JsonObject reprensenting the state
     * @throws JSONException if an error occur in the transformation.
     */
    private JSONObject convertSCClientEventToJSON(SCClientEvent event) throws JSONException {

        JSONObject jsonEvent = new JSONObject();
        jsonEvent.accumulate("connected", event.isConnected());
        jsonEvent.accumulate("mute", event.isMute());
        jsonEvent.accumulate("speaker", event.isSpeaker());
        jsonEvent.accumulate("call", convertSCCallToJson(event.getCall()));

        return jsonEvent;
    }

    private JSONObject convertVideoInfoToJSOn(VideoInfo info) throws JSONException {
        JSONObject result = new JSONObject();
        if (info == null) {
            return null;
        }
        result.accumulate("videoType", info.getVideoType());
        result.accumulate("active", info.isActive());
        result.accumulate("setup", info.isSetup());
        return result;
    }

    /**
     *  convert a SCCall instance to a JSON Object in order to send it to the RN in Front
     *
     * @param call a SCCall instance that represent the state of the call at current moment
     * @return the SCCall as a JSONObject Instance.
     * @throws JSONException if a
     */
    private JSONObject convertSCCallToJson(SCCall call) throws JSONException {

        JSONObject jsonCall = new JSONObject();

        if (call == null)
            return null;
        jsonCall.accumulate("callIdentifier", call.getCallIdentifier());
        jsonCall.accumulate("held", call.isHeld());
        jsonCall.accumulate("agentMail", call.getAgentMail());
        jsonCall.accumulate("callID", call.getCallID());
        jsonCall.accumulate("transferred", call.isTransferred());
        jsonCall.accumulate("callState", call.getCurrentCallState());
        jsonCall.accumulate("startedDate", call.getDate());
        jsonCall.accumulate("displayBrand", call.getDisplayBrand());
        jsonCall.accumulate("displayName", call.getDisplayName());
        jsonCall.accumulate("duration", call.getDuration());
        jsonCall.accumulate("time", call.getDuration());
        jsonCall.accumulate("remoteVideoInfo", convertVideoInfoToJSOn(call.getRemoteVideoInfo()));
        jsonCall.accumulate("localVideoInfo", convertVideoInfoToJSOn(call.getLocalVideoInfo()));

        return jsonCall;
    }
}
