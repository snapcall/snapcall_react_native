
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

#import <PushKit/PushKit.h>
#import <Snapcall_Framework/Snapcall_Framework-Swift.h>
#import "RNSnapcallEventListener.h"

@interface RNSnapcallReact : NSObject  <RCTBridgeModule>

-(NSString*)decodePushDataWithPayload:(PKPushPayload*)payload;

-(void)receiveCallWith:(PKPushPayload*)payload parameter:(SnapcallExternalParameter*)parameter;

-(void)launchCallWithBidId:(NSString *)bidId applicationName:(NSString*)AppName customClientIdentifier:(NSString*)customIdentifier parameter:(SnapcallExternalParameter*)parameter;

-(void)launchCallWithBidId:(NSString *)bidId  parameter:(SnapcallExternalParameter*)parameter;

-(void)launchCallWithBidId:(NSString *)bidId snapcallIdentifier:(NSString*)snapcallIdentifier parameter:(SnapcallExternalParameter*)parameter;

-(void)setSnapcallStaticWithAppName:(NSString*)appName ringtone:(NSString*)ringToneSoung iconTemplate:(NSData*)icon;

-(bool)registerUserwithcredential : (PKPushCredentials*)cred identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName callback:(void(^)(NSString* string))callback;

-(bool)ActiveUserwithActive :(BOOL)active credential : (PKPushCredentials*)cred identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName callback:(void(^)(BOOL string))callback;

-(void)restorUI;

@end

