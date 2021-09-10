package io.snapcall.reactnative;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import io.snapcall.snapcall_android_framework.PeerConnection.VideoDisplay.VideoDisplay;

public class VideoContainer extends RelativeLayout {
    VideoDisplay videoView;

    VideoContainer(Context context) {
        super(context);
        Log.d("VideoContainer", "add VideoContainer ");
        GradientDrawable gdDefault = new GradientDrawable();
        gdDefault.setColor(Color.BLACK);
        gdDefault.setStroke(5, Color.BLACK);
        gdDefault.setCornerRadii(new float[] { 10, 10, 0, 0, 0, 0,
                10, 10 });
        setBackground(gdDefault);
        this.setBackgroundColor(Color.YELLOW);
    }

    public void setVideoView(VideoDisplay videoView) {
        Log.d("VideoContainer", "add video view");
        if (this.videoView != null) {
            this.removeView(videoView);
            this.videoView = null;
        }
        this.videoView = videoView;
        this.videoView.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.videoView.setX(0);
        this.videoView.setY(0);
        this.addView(videoView);
        this.setBackgroundColor(Color.BLUE);

    }
}
