//
//  RNSnapcallEventListener.m
//  RNSnapcallReact
//
//  Created by Noyelle on 12/06/2019.
//

#import <Foundation/Foundation.h>
#import "RNSnapcallEventListener.h"

@implementation RNSnapcallEventListener

objc_SCClientEvent *lastCall = nil;
NSString *STATE_CREATED = @"STATE_CREATED";
NSString *STATE_CONNECTED = @"STATE_CONNECTED";
NSString *STATE_RECONNECT = @"STATE_RECONNECT";
NSString *STATE_TERMINATED = @"STATE_TERMINATED";

- (instancetype)init {

    self = [super init];
    return self;
}

- (objc_SCClientEvent*)getLastCall {

    return lastCall;
}

- (NSArray<NSString *> *)supportedEvents{
    return @[@"onConnectionReady", @"onCreated", @"onUIRequest", @"onRinging" , @"onAnswer", @"onInternetDown", @"onInternetUP", @"onHangup",
                       @"onHeld", @"onUnheld", @"onMuteChange", @"onSpeakerChange", @"onTime", @"onConnectionShutDown"];
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

- (NSDictionary *) makeJSONEventWithEvent: (objc_SCClientEvent *)snapcallEvent {
    NSDictionary *ret = nil;

    if (snapcallEvent != nil) {
        NSDictionary *callParameter = nil;
        objc_SCCall *call = [snapcallEvent getCall];



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
            callParameter = @{
                            @"transferred": [call isTransferred] ? @YES : @NO,
                            @"displayName": [self preventNilForValue:[call getDisplayName]],
                            @"displayBrand": [self preventNilForValue:[call getDisplayBrand]],
                            @"callState": state,
                            @"time": [NSNumber numberWithLong:[call getTime]],
                            @"startedDate": [self preventNilForValue:[call getStartedData]],
                            @"duration": [NSNumber numberWithLong:[call getDuration]],
                            @"held": [call isHeld] ? @YES : @NO,
                            @"agentMail": [self preventNilForValue:[call getAgentMail]]
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
    printf("make Event ended");
    return @{@"data":[self preventNilForValue: ret]};
}

- (void) sendEventWithName:(NSString *)name parameter:(objc_SCClientEvent * _Nonnull)parameter {

    [[RNSnapcallEmitEvent getInstance] sendEventWithName:name body:[self makeJSONEventWithEvent:parameter]];
}

- (void)onAnswer:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onAnswer" parameter: parameter];
}

- (void)onConnectionReady:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onConnectionReady" parameter: parameter];
}

- (void)onConnectionShutDown {
    [[RNSnapcallEmitEvent getInstance] sendEventWithName:@"onConnectionShutDown" body:nil];
}

- (void)onCreated:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onCreated" parameter: parameter];
}

- (void)onHangup:(objc_SCClientEvent * _Nonnull)parameter {
    lastCall = parameter;
    [self sendEventWithName:@"onHangup" parameter: parameter];
}

- (void)onHeld:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onHeld" parameter: parameter];
}

- (void)onInternetDown:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onInternetDown" parameter: parameter];
}

- (void)onInternetUP:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onInternetUP" parameter: parameter];
}

- (void)onMessageWithCallID:(NSString * _Nonnull)callID message:(id _Nonnull)message {

}

- (void)onMuteChange:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onMuteChange" parameter: parameter];
}

- (void)onRinging:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onRinging" parameter: parameter];
}

- (void)onSpeakerChange:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onSpeakerChange" parameter: parameter];
}

- (void)onTime:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onTime" parameter: parameter];
}

- (void)onUIRequest:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onUIRequest" parameter: parameter];
}

- (void)onUnheld:(objc_SCClientEvent * _Nonnull)parameter {
    [self sendEventWithName:@"onUnheld" parameter: parameter];
}

@end
