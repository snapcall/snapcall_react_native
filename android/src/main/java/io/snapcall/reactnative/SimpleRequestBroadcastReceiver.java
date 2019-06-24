package io.snapcall.reactnative;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

class SimpleRequestBroadcastReceiver extends BroadcastReceiver {

    interface onRequestReceived {

        void onRequestReceived(Intent value);
    }

    private final String action;
    private final String keyName;
    private final String keyValue;
    private Context context;

    private onRequestReceived resultListener = null;

    void addListener(onRequestReceived listener) {
        resultListener = listener;
    }

    SimpleRequestBroadcastReceiver(Context context, String action, String keyName, String keyValue) {

        this.action = action;
        this.keyName = keyName;
        this.keyValue = keyValue;
        this.context = context.getApplicationContext();
    }

    void startObeserver() {

        if (context != null) {
            IntentFilter intentFilter = new IntentFilter();
            intentFilter.addAction(action);
            context.registerReceiver(this, intentFilter);
        }
    }

    void stopObserver() {

        if (context != null) {
            context.unregisterReceiver(this);
        }
    }

    void release() {

        stopObserver();
        context = null;
        resultListener = null;
    }

    @Override
    public void onReceive(Context context, Intent intent) {

        String action = intent.getAction();
        Log.d("Brodcast Listener" , String.format("received intent form snapcall with action : %s", action));
        if (action != null && action.equals(this.action)) {
            String resgisteredKey = intent.getStringExtra(keyName);
            if (resultListener != null && resgisteredKey.equals(this.keyValue)) {
                resultListener.onRequestReceived(intent);
            }
        }
    }
}
