//
//  RNSnapcallEventListener.m
//  RNSnapcallReact
//
//  Created by Noyelle on 12/06/2019.
//

#import <Foundation/Foundation.h>
#import "RNSnapcallEventListener.h"

@implementation RNSnapcallEventListener

SCClientEventObjC *lastCall = nil;
NSString *STATE_CREATED = @"STATE_CREATED";
NSString *STATE_CONNECTED = @"STATE_CONNECTED";
NSString *STATE_RECONNECT = @"STATE_RECONNECT";
NSString *STATE_TERMINATED = @"STATE_TERMINATED";

- (instancetype)init {

    self = [super init];
    return self;
}

- (SCClientEventObjC*)getLastCall {

    return lastCall;
}


- (NSArray<NSString *> *) supportedEvents {
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
             @"onError",
             @"onUpdateUI",
             @"onAgentConnected",
             @"onRemoteVideoInfo",
             @"onMessage",
             @"onUnhook",
             @"onLocalVideoInfo",
             @"onCallActivityDestroy",
             @"onCallActivityCreate",
             @"onConnectionShutDown"];
}

- (id) preventNilForValue: (id) value {

    if (value != nil) {
        return value;
    }
    return [NSNull null];
}
// Created" ` | the call has been created
// `let DISCONNECTED: String = "Disconnected"` | an error has occurred we try to reconnect
// `let RINGING: String = "RINGING"` | sound start, waiting for answer
// `let CONNECTED: String = "connected"` | the call is running
// `let ENDED: String = "Ended"` | the call hangup

- (NSDictionary *) makeJSONEventWithEvent: (SCClientEventObjC *)snapcallEvent {
    NSDictionary *ret = nil;

    if (snapcallEvent != nil) {
        NSDictionary *callParameter = nil;
        SCCallObjC *call = [snapcallEvent getCall];
        if (call != nil) {
            NSString *iosState = [call getCurrentCallState];
            NSString *state = [NSNull null];
            if (iosState != nil) {
                if ([iosState isEqualToString:@"Disconnected"])
                    state = STATE_RECONNECT;
                else if ([iosState isEqualToString:@"connected"])
                    state = STATE_CONNECTED;
                else if ([iosState isEqualToString:@"Ended"])
                    state = STATE_TERMINATED;
                else
                    state = STATE_CREATED;
            }
            NSDate *date = [call getStartedData];
            NSNumber *startedTime = [[NSNumber alloc] initWithInt: -1];
            if (date != nil) {
                startedTime = [[NSNumber alloc] initWithInt:date.timeIntervalSince1970];
            }
            callParameter = @{
                @"callID":[call getCallID],
                @"transferred": [call isTransferred] ? @YES : @NO,
                @"displayName": [self preventNilForValue:[call getDisplayName]],
                @"displayBrand": [self preventNilForValue:[call getDisplayBrand]],
                @"callState": state,
                @"time": [NSNumber numberWithLong:[call getTime]],
                @"startedDate": startedTime,
                @"duration": [NSNumber numberWithLong:[call getDuration]],
                @"held": [call isHeld] ? @YES : @NO,
                @"agentMail": [self preventNilForValue:[call getAgentMail]],
                @"remoteVideoInfo": @{
                    @"active": [[call getRemoteVideoInfo] isActive] ? @YES : @NO,
                    @"setup": [[call getRemoteVideoInfo] isSetup] ? @YES : @NO,
                    @"videoType": [[call getLocalVideoInfo] getVideoTypeValue]
                },
                @"localVideoInfo": @{
                    @"active": [[call getLocalVideoInfo] isActive] ? @YES : @NO,
                    @"setup": [[call getLocalVideoInfo] isSetup] ? @YES : @NO,
                    @"videoType": [[call getLocalVideoInfo] getVideoTypeValue]
                },
            };
        }

        NSDictionary *event = @{
                                @"speaker": [snapcallEvent isSpeaker] ? @YES : @NO,
                                @"mute": [snapcallEvent isMute] ? @YES : @NO,
                                @"connected": [snapcallEvent isConnected] ? @YES : @NO,
                                @"call": [self preventNilForValue: callParameter]
                            };
        ret = event;
    }
    return @{@"data":[self preventNilForValue: ret]};
}

- (void) sendEventWithName:(NSString *)name parameter:(SCClientEventObjC * _Nonnull)parameter {
    [[RNSnapcallEmitEvent getInstance] sendEventWithName:name body:[self makeJSONEventWithEvent:parameter]];
}

- (void) sendEventWithString:(NSString *)name parameter:(NSString*)parameter {

    [[RNSnapcallEmitEvent getInstance] sendEventWithName:name body:parameter];
}

- (void)onAnswer:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onAnswer" parameter: parameter];
}

- (void)onConnectionReady:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onConnectionReady" parameter: parameter];
}

- (void)onConnectionShutDown {
    [[RNSnapcallEmitEvent getInstance] sendEventWithName:@"onConnectionShutDown" body:nil];
}

- (void)onCreated:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onCreated" parameter: parameter];
}

- (void)onHangup:(SCClientEventObjC * _Nonnull)parameter {
    lastCall = parameter;
    [self sendEventWithName:@"onHangup" parameter: parameter];
}

- (void)onHeld:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onHeld" parameter: parameter];
}

- (void)onInternetDown:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onInternetDown" parameter: parameter];
}

- (void)onInternetUP:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onInternetUP" parameter: parameter];
}

- (void)onMessageWithCallID:(NSString * _Nonnull)callID message:(id _Nonnull)message {

}

- (void)onMuteChange:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onMuteChange" parameter: parameter];
}

- (void)onRinging:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onRinging" parameter: parameter];
}

- (void)onSpeakerChange:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onSpeakerChange" parameter: parameter];
}

- (void)onTime:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onTime" parameter: parameter];
}

- (void)onUIRequest:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onUIRequest" parameter: parameter];
}

- (void)onUnheld:(SCClientEventObjC * _Nonnull)parameter {
    [self sendEventWithName:@"onUnheld" parameter: parameter];
}

- (void) onLocalVideoInfo:(SCClientEventObjC *)parameter {
    [self sendEventWithName:@"onLocalVideoInfo" parameter: parameter];
}

- (void) onRemoteVideoInfo:(SCClientEventObjC *)parameter {
    [self sendEventWithName:@"onRemoteVideoInfo" parameter: parameter];
}

- (void) onUpdateUI:(SCClientEventObjC *)parameter {
    [self sendEventWithName:@"onUnheld" parameter: parameter];
}

- (void) onAgentConnected {

}

- (void) onViewDidAppear :(SCClientEventObjC *)parameter {
    [self sendEventWithName:@"onCallActivityCreate" parameter: parameter];
}

- (void) onViewDismiss :(SCClientEventObjC *)parameter {
    [self sendEventWithName:@"onCallActivityDestroy" parameter: parameter];
}

- (void) onErrorWithError:(CallError *)error {
    [self sendEventWithString:@"onError" parameter:error.description];
}


@end
