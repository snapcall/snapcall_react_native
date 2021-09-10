package io.snapcall.reactnative;

import android.content.Context;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import org.json.JSONObject;

import io.snapcall.snapcall_android_framework.CallError;
import io.snapcall.snapcall_android_framework.SCCall;
import io.snapcall.snapcall_android_framework.SCClient;
import io.snapcall.snapcall_android_framework.SCClientEvent;
import io.snapcall.snapcall_android_framework.SCClientListener;
import io.snapcall.snapcall_android_framework.VideoView;

public class VideoContainerManager extends SimpleViewManager<VideoContainer> {
    static VideoContainerManager instance;
    public static final String REACT_CLASS = "VideoContainer";
    ReactApplicationContext mCallerContext;
    static VideoContainer local;
    static VideoContainer remote;
    SCClient client;
    String type = "FILL";


    public static VideoContainerManager getInstance(ReactApplicationContext reactContext) {
        if (instance != null) {
            return instance;
        }
        return new VideoContainerManager(reactContext);
    }

    public VideoContainerManager(ReactApplicationContext reactContext)  {
        Log.d("VideoContainerManager", "constuctor");
        instance = this;
        client = new SCClient(reactContext);
        client.connect();
        mCallerContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }
    @Override
    public VideoContainer createViewInstance(ThemedReactContext context) {
        return new VideoContainer(context);
    }

    @ReactProp(name = "displayType")
    public void setVideoType(VideoContainer view, String type) {
        this.type = type;
    }

    @ReactProp(name = "videosrc")
    public void setVideoSrc(VideoContainer view, @Nullable String videoSrc) {
        this.mCallerContext.runOnUiQueueThread(() -> {
        if ("local".equals(videoSrc)) {
            Log.i("setVideosrc", "local");
            if (local != null && local.videoView != null){
                local.removeView(local.videoView);
            }
            local = view;
            local.setVideoView(client.getLocalVideoRenderer(mCallerContext));
        } else  if ("remote".equals(videoSrc)) {
            Log.i("setVideosrc", "remote");
            if (remote != null && remote.videoView != null) {
                remote.removeView(remote.videoView);
            }
            int videoType = "full".equals(type) ? SCClient.VideoType.FULL : SCClient.VideoType.FILL;
            remote = view;
            remote.setVideoView(client.getRemoteVideoRenderer(mCallerContext, videoType));
        }
        });
    }

}
