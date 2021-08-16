//
//  RNSnapcallEmitEvent.m
//  RNSnapcallReact
//
//  Created by Noyelle on 13/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNSnapcallEmitEvent.h"

@implementation RNSnapcallEmitEvent

RCT_EXPORT_MODULE(RNSnapcallEmitEvent);

static RNSnapcallEmitEvent *instance = nil;

+(id)allocWithZone:(NSZone *)zone {
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
        
        instance = [super allocWithZone:zone];
        
    });
    return instance;
}

+ (RNSnapcallEmitEvent *)getInstance {
    return instance;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSArray<NSString *> *)supportedEvents{
    return @[@"onConnectionReady",
             @"onCreated",
             @"onUIRequest",
             @"onRinging",
             @"onAnswer",
             @"onInternetDown",
             @"onInternetUP",
             @"onHangup",
             @"onHeld",
             @"onUnheld",
             @"onMuteChange",
             @"onSpeakerChange",
             @"onTime",
             @"onConnectionShutDown",
             @"onError",
             @"onUpdateUI",
             @"onAgentConnected",
             @"onRemoteVideoInfo",
             @"onMessage",
             @"onUnhook",
             @"onLocalVideoInfo",
             @"onCallActivityDestroy",
             @"onCallActivityCreate",
             @"onVoipToken"];
}

- (id) preventNilForValue: (id) value {
    
    if (value != nil) {
        return value;
    }
    return [NSNull null];
}

- (void) sendEventWithName:(NSString *)name parameter:(NSDictionary * _Nonnull)parameter {
    [self sendEventWithName:name body:parameter];
}

@end
