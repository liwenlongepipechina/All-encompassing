package com.project;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import com.arcsoft.face.FaceEngine;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.project.arcface.activity.RegisterAndRecognizeActivity;
import com.project.arcface.common.Constants;

import static android.content.Context.MODE_PRIVATE;


public class ArcfaceModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static final String TAG = "ArcfaceModule";


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
    public void checkrecognize(Callback errorCallback, Callback successCallback){
        SharedPreferences sharedPreferences = reactContext.getSharedPreferences("name",MODE_PRIVATE);
        Log.d(TAG, "checkrecognize: "+sharedPreferences.getBoolean("recognize",false));
        try {
            Boolean isRecognize = sharedPreferences.getBoolean("recognize",false);
            successCallback.invoke(isRecognize);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void checkregister(Callback errorCallback, Callback successCallback){
        SharedPreferences sharedPreferences = reactContext.getSharedPreferences("name",MODE_PRIVATE);
        try {
            Boolean isRegister = sharedPreferences.getBoolean("register",false);
            successCallback.invoke(isRegister);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }


}
