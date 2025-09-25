package com.safepasswordrn;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import upinn.tech.safepasswordlib.PasswordStrength;
import upinn.tech.safepasswordlib.SafePassword;

public class SafePasswordModule extends ReactContextBaseJavaModule {
    private SafePassword safePassword;
    public SafePasswordModule(ReactApplicationContext reactApplicationContext){
        super(reactApplicationContext);
        safePassword = new SafePassword();
    }

    @Override
    public String getName(){
        return "SafePassword";
    }

    @ReactMethod
    public void generatePassword(int length, boolean upper, boolean number, boolean symbols, Promise promise){
        try {
            String psw = safePassword.makePassword(length,upper,number,symbols);
            promise.resolve(psw);
        } catch (Exception e) {
            promise.reject("Error",e);
        }
    }

    @ReactMethod
    public void checkStrength(String password,Promise promise){
        try{
            PasswordStrength strength = safePassword.checkPassword(password);
            promise.resolve(strength.name());
        } catch (Exception e) {
            promise.reject("ERROR",e);
        }
    }
}
