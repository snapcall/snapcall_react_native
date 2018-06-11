
#import "RNSnapcallReact.h"
#import "Pods/Snapcall_Framework/Snapcall_Framework.framework/Headers/Snapcall_Framework-Swift.h"
#import "Pods/Snapcall_Framework/Snapcall_Framework.framework/Headers/Snapcall_Framework.h"
#import <PushKit/PushKit.h>


@implementation CallListener

RNSnapcallEventEmiter * listener;

-(instancetype)init{
    
    self = [super init];
    listener = [RNSnapcallEventEmiter init];
    return (self);
    
}
-(void)sendEventWithEvent:(NSString*) event body : (id)body
{
    
    [listener sendEventWithName:event body:body];
}
-(void)onTimeUpdateWithTime:(NSInteger)time{
    NSString * t = [NSString stringWithFormat:@"%ld", (long)time];
    
    [self sendEventWithEvent:@"SnapcallTime" body:(id)t];
}

-(void)onLeaveCallUI{
    [self sendEventWithEvent:@"LeaveCallUI" body:nil];
}

-(void)onCallEnd{
    [self sendEventWithEvent:@"SnapcallCallEnd" body:nil];
    
}

@end
    

@implementation RNSnapcallReact 

CallListener * callevent;

- (instancetype)init
{
    self = [super init];
    if (self) {
        callevent = [CallListener init];
    }
    return self;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(@"RNSnapcallReact")

-(Snapcall_External_Parameter *)SnapcallParamFromJSON:(NSString*)JsonString
{
    Snapcall_External_Parameter * param = [Snapcall_External_Parameter init];
     @try {
    NSError *error = nil;
    id object = [NSJSONSerialization JSONObjectWithData:[JsonString dataUsingEncoding: NSUTF8StringEncoding] options:0 error:&error];
    
    if (error != nil){
        
        return nil;
    }
    if([object isKindOfClass:[NSDictionary class]])
    {
        
        NSDictionary *results = object;
        param.callTitle = [results objectForKey: @"callTitle"];
        param.displayName = [results objectForKey: @"displayName"];
        param.displayBrand = [results objectForKey: @"displayBrand"];
        param.senderName = [results objectForKey: @"senderName"];
        param.senderBrand = [results objectForKey: @"senderBrand"];
        param.nameImage = [results objectForKey: @"nameImage"];
        param.urlImage = [results objectForKey: @"urlImage"];
        NSString* fontname = [results objectForKey: @"fontname"];
        UIFont *font = [UIFont fontWithName:fontname size: 36];
        param.fontDescriptor = font.fontDescriptor;
        NSNumber* NScolor = [results valueForKey: @"textColorint"];
        if (NScolor != nil) {
            int color = [NScolor intValue];
            param.textColor = [UIColor colorWithRed:((float)((color & 0xFF0000) >> 16))/255.0 \
                                             green:((float)((color & 0x00FF00) >>  8))/255.0 \
                                              blue:((float)((color & 0x0000FF) >>  0))/255.0 \
                                             alpha:1.0];
        }
        param.nameImage = [results objectForKey: @"nameImage"];
        param.androidNotificatiobBody = [results objectForKey: @"androidNotificatiobBody"];
        param.androidNotificationTitle = [results objectForKey: @"androidNotificationTitle"];
        param.externalContext = [results objectForKey: @"externalContext"];
        param.pushTransfertData = [results objectForKey: @"pushTransfertData"];
        param.shouldReturn = [results objectForKey: @"shouldReturn"];
        param.SnapcallListener = callevent;
        
    }
     }@catch(NSException * e){
         return param;
     }
    return param;
}

RCT_EXPORT_METHOD(isRunning:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    
}

RCT_EXPORT_METHOD(isAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    
    
    if (true) {
        resolve(@(YES));
    } else {
        resolve(@(NO));
    }
    [[Snapcall   getSnapcall]launchCallWithBidId: @"ZKRbTQdPt0D8hemA" parameter:nil];
}

RCT_REMAP_METHOD(launchCallWithbidId:(NSString*)bidId parameter:(NSString*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        
        [self launchCallWithBidId:bidId parameter:[self SnapcallParamFromJSON:parameter]];
        resolve(@YES);
    }@catch(NSException * e){
        
        reject(e.reason, e.description, nil);
    }
}

RCT_EXPORT_METHOD(launchCallWithbidId:(NSString*)bidId SnapcallIdentifier:(NSString*)SnapCallIdentifier parameter:(NSString*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [self launchCallWithBidId:bidId snapcallIdentifier:SnapCallIdentifier parameter:[self SnapcallParamFromJSON:parameter]];
        resolve(@YES);
    }@catch(NSException * e){
        
        reject(e.reason, e.description, nil);
    }
}

RCT_EXPORT_METHOD(launchCallWithbidId:(NSString*)bidId customIdentifier:(NSString*)customIdentifier appName:(NSString*)AppName parameter:(NSString*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [self launchCallWithBidId:bidId applicationName:AppName customClientIdentifier:customIdentifier parameter:[self SnapcallParamFromJSON:parameter]];
        resolve(@YES);
    }@catch(NSException * e){
        
        reject(e.reason, e.description, nil);
    }
}

RCT_EXPORT_METHOD(registerUserwithcredential : (NSString*)credToken identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName  resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    
    @try {
        [[Snapcall getSnapcall] registerUserWithToken:credToken identifier:identifier customClientIdentifier:customId applicationName:appName snapcallIdentifierCallBack: ^(NSString *snapId) {
            resolve(snapId);
        }];
        
    }@catch(NSException *e){
        reject(e.reason, e.description, nil);
    }
}

RCT_EXPORT_METHOD(ActiveUserwithActive :(BOOL)active credtoken : (NSString*)token identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ){
    @try{
        [[Snapcall getSnapcall] setUserActiveWithActive:active token:token identifier:identifier customClientIdentifier:customId applicationName:appName snapcallCallBack:^(BOOL res) {
            resolve((res?@YES:@NO));
        }];
        
    }@catch(NSException *e){
        reject(e.reason, e.description, nil);
    }
    
}
 RCT_EXPORT_METHOD(restorUI:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    [[Snapcall getSnapcall] restorCallUI];
    resolve(@YES);
}
-(void)restorUI
{
    [[Snapcall getSnapcall] restorCallUI];
}

-(NSString*)decodePushDataWithPayload:(PKPushPayload*)payload
{
    return([[Snapcall getSnapcall] decodePushDataWithPushKitPayload:payload]);
}

-(void)receiveCallWith:(PKPushPayload*)payload parameter:(Snapcall_External_Parameter*)parameter
{
    [[Snapcall getSnapcall]receiveCallWithPushKitPayload:payload parameter:parameter];
    
}




-(void)launchCallWithBidId:(NSString *)bidId applicationName:(NSString*)AppName customClientIdentifier:(NSString*)customIdentifier parameter:(Snapcall_External_Parameter*)parameter{
    [[Snapcall   getSnapcall]launchCallWithBidId:bidId applicationName:AppName customClientIdentifier:customIdentifier parameter:parameter];
}

-(void)launchCallWithBidId:(NSString *)bidId  parameter:(Snapcall_External_Parameter*)parameter{
    [[Snapcall   getSnapcall]launchCallWithBidId: bidId parameter:parameter];
}

-(void)launchCallWithBidId:(NSString *)bidId snapcallIdentifier:(NSString*)snapcallIdentifier parameter:(Snapcall_External_Parameter*)parameter{
    
    [[Snapcall   getSnapcall]launchCallWithBidId: bidId snapcallIdentifier:snapcallIdentifier parameter:parameter];
    
}


-(void)setSnapcallStaticWithAppName:(NSString*)appName ringtone:(NSString*)ringToneSoung iconTemplate:(NSData*)icon
{
    Snapcall.AppName = appName;
    Snapcall.callIconTemplate = icon;
    Snapcall.ringtoneSound = ringToneSoung;
}



-(bool)registerUserwithcredential : (PKPushCredentials*)cred identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName callback:(void(^)(NSString* string))callback
{
    return [[Snapcall getSnapcall] registerUserWithCredential:cred identifier:identifier customClientIdentifier:customId applicationName:appName snapcallIdentifierCallBack: callback];
}

-(bool)ActiveUserwithActive :(BOOL)active credential : (PKPushCredentials*)cred identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName callback:(void(^)(BOOL string))callback
{
    return ([[Snapcall getSnapcall] setUserActiveWithActive:active credential:cred identifier:identifier customClientIdentifier:customId applicationName:appName snapcallCallBack:callback]);
    
}

@end
