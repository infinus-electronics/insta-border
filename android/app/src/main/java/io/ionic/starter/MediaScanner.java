package io.ionic.starter;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MediaScanner")
public class MediaScanner extends Plugin{
    private static final String TAG = "MediaScannerPlugin";
    @PluginMethod
    public boolean mediaScan (PluginCall call){
        try {

                String fileUri = call.getString("fileUri");
                if(fileUri!=null && !fileUri.equals("")) {
                    Uri contentUri = Uri.parse(fileUri);

                    Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
                    mediaScanIntent.setData(contentUri);
                    bridge.getActivity().sendBroadcast(mediaScanIntent);

                    return true;
            }
                else {
                    Log.w(TAG, "Something went wrong "+fileUri);

                    return false;
                }
        } catch (RuntimeException e) {
            e.printStackTrace();
            return false;
        }
    }
    }

