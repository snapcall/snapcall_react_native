
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#endif
#import <PushKit/PushKit.h>
#import "Pods/Snapcall_Framework/Snapcall_Framework.framework/Headers/Snapcall_Framework-Swift.h"
#import "Pods/Snapcall_Framework/Snapcall_Framework.framework/Headers/Snapcall_Framework.h"

@interface CallListener :NSObject <Snapcall_Listener>
-(void)onTimeUpdateWithTime:(NSInteger)time;
-(void)onLeaveCallUI;
-(void)onCallEnd;
@end

@interface SnapcallEventReceiver :NSObject


@end

@interface RNSnapcallEventEmiter : RCTEventEmitter

@end

@interface RNSnapcallReact : NSObject  <RCTBridgeModule>
-(NSString*)decodePushDataWithPayload:(PKPushPayload*)payload;
-(void)receiveCallWith:(PKPushPayload*)payload parameter:(Snapcall_External_Parameter*)parameter;
-(void)launchCallWithBidId:(NSString *)bidId applicationName:(NSString*)AppName customClientIdentifier:(NSString*)customIdentifier parameter:(Snapcall_External_Parameter*)parameter;
-(void)launchCallWithBidId:(NSString *)bidId  parameter:(Snapcall_External_Parameter*)parameter;
-(void)launchCallWithBidId:(NSString *)bidId snapcallIdentifier:(NSString*)snapcallIdentifier parameter:(Snapcall_External_Parameter*)parameter;
-(void)setSnapcallStaticWithAppName:(NSString*)appName ringtone:(NSString*)ringToneSoung iconTemplate:(NSData*)icon;
-(bool)registerUserwithcredential : (PKPushCredentials*)cred identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName callback:(void(^)(NSString* string))callback;
-(bool)ActiveUserwithActive :(BOOL)active credential : (PKPushCredentials*)cred identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName callback:(void(^)(BOOL string))callback;
-(void)restorUI;
@end


  
