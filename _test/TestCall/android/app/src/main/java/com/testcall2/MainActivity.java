package com.testcall2;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import io.snapcall.reactnative.RNSnapcallReactModule;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;
import static android.content.Intent.FLAG_ACTIVITY_NO_HISTORY;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TestCall2";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


    }

    @Override
    protected void onPause() {
        super.onPause();
        Intent restor = new Intent(getApplicationContext(), MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        RNSnapcallReactModule.setCustomReloadIntent(restor);
    }

    @Override
    protected void onResume() {
        super.onResume();
        RNSnapcallReactModule.setCustomReloadIntent(null);
//        RNSnapcallReactModule.test(this, "bd3e707053c511ea9431cd36a3c89c98");
    }
}
