package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MediaScanner.class);
        super.onCreate(savedInstanceState);
    }
}
