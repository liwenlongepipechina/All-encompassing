package com.project;

import android.app.Activity;
import android.content.Intent;

import com.arcsoft.face.FaceEngine;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.project.arcface.activity.RegisterAndRecognizeActivity;
import com.project.arcface.common.Constants;


public class ArcfaceModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public ArcfaceModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName(){
        return "Arcface";
    }

    @ReactMethod
    public void goArcfaceScreen(){
        Activity currentActivity = getCurrentActivity();
        FaceEngine.activeOnline(currentActivity, Constants.APP_ID, Constants.SDK_KEY);
        Intent intent = new Intent(currentActivity, RegisterAndRecognizeActivity.class);
        currentActivity.startActivity(intent);
    }

    @ReactMethod
    public void getFaceInfo() {
        
    }

}
