//
//  VideoContainer.m
//  react-native-snapcall
//
//  Created by noyelle pierre on 16/08/2021.
//


#import "VideoContainer.h"
// RNTMapManager.m

@implementation VideoView
UIView *video;
CGRect currentFrame;

- (void)reactSetFrame:(CGRect)frame {
    [super reactSetFrame: frame];
    currentFrame = frame;
    if (video != nil) {
        [video setFrame:CGRectMake(0, 0, currentFrame.size.width, currentFrame.size.height)];
    }
}
- (void)setVideoWith:(UIView *) videoView {
    video = videoView;
    NSLog(@"%f  , %f", currentFrame.size.width, currentFrame.size.height);
    [video setFrame:CGRectMake(0, 0, currentFrame.size.width, currentFrame.size.height)];
    [self addSubview: video];
}

@end

@implementation VideoContainer
RCT_EXPORT_MODULE(VideoContainer)

SCClient * client;
//UIView * video;

- (instancetype) init {
    NSLog(@"VideoContainer init");
    self = [super init];
    client = [[SCClient alloc] init];
    return  self;
}

- (UIView *)view {
    NSLog(@"VideoContainer create View");
    UIView *uiEle = [[VideoView alloc] init];
//    [uiEle setBackgroundColor:UIColor.cyanColor];
    return uiEle;
}


RCT_CUSTOM_VIEW_PROPERTY(videosrc, (NSString *), VideoView) {
    NSLog(@"videoproperty");
    UIView * video;
    if ([json isEqualToString: @"local"]) {
        NSLog(@"get local video");
        video = [client getLocalVideoRenderer];
    } else if ([json isEqualToString: @"remote"]) {
        NSLog(@"get remote video");
        video = [client getRemoteVideoRenderer];
    }
    [view setVideoWith: video];
}


@end
