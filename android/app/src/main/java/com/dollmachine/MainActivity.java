package com.dollmachine;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;

import com.reactnativecomponent.splashscreen.RCTSplashScreen;

// import com.tencent.rtmp.TXLivePusher;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DollMachine";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RCTSplashScreen.openSplashScreen(this);   //open splashscreen
        //RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
        super.onCreate(savedInstanceState);

//        int[] sdkver = TXLivePusher.getSDKVersion();
//        if (sdkver != null && sdkver.length >= 3) {
//            Log.d("rtmpsdk","rtmp sdk version is:" + sdkver[0] + "." + sdkver[1] + "." + sdkver[2]);
//        }
    }
}
