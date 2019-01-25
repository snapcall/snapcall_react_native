
#import "RNSnapcallReact.h"
#import <PushKit/PushKit.h>


@implementation CallListener

RCT_EXPORT_MODULE(CallListener);
bool active = false;

-(instancetype)init{

    self = [super init];
    [[Snapcall getSnapcall] removeAllEventListener];
    [[Snapcall getSnapcall] addEventListenerWithListener:self];
    return (self);
}


+ (BOOL)requiresMainQueueSetup
{
    return YES;
}


-(NSArray<NSString *> *)supportedEvents{
     return @[@"onTime", @"onUIEnd", @"onCallEnd" , @"onUIStart", @"onError", @"onCallStart", @"onStart", @"onEnd"];
}
-(void)onTimeWithTime:(NSInteger)time{

    NSString * t = [NSString stringWithFormat:@"%ld", (long)time];

    [self sendEventWithName:@"onTime" body:(id)t];
}

-(void)onUIEnd{

    [self sendEventWithName:@"onUIEnd" body:@"onUIEnd"];
}

-(void)onCallEnd{

    [self sendEventWithName:@"onCallEnd" body:@"onCallEnd"];
}

-(void)onUIStart{

    [self sendEventWithName:@"onUIStart" body:@"onUIStart"];
}

- (void)onErrorWithError:(NSString *)error{

    [self sendEventWithName:@"onError" body:error];
}

-(void)onCallStart{

[self sendEventWithName:@"onCallStart" body:@"onCallStart"];
}

-(void)onStart{

    [self sendEventWithName:@"onStart" body:@"onStart"];
}

-(void)onEnd{

    [self sendEventWithName:@"onEnd" body:@"onEnd"];
}

- (void)startObserving{

    active = true;
    [super startObserving];
}

- (void)stopObserving{

    active = false;
    [super stopObserving];
}

- (void)sendEventWithName:(NSString *)name body:(id)body{

    if (active){
        [super sendEventWithName:name body:body];
    }
}
//
@end

#define testVal(x) @try{ x }@catch(NSException * e ){printf("anErrorOccur\n");}
#define checkNsNul(x) id obj = [results objectForKey: x]; if ([obj isKindOfClass:[NSString class]])
#define checkDataNsNul(x) id obj = [results objectForKey: x]; if (obj != nil)

@implementation RNSnapcallReact
RCT_EXPORT_MODULE(RNSnapcallReact)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (instancetype)init
{
    self = [super init];
    return self;
}



- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}


-(Snapcall_External_Parameter *)SnapcallParamFromJSON:(NSString*)JsonString
{
    Snapcall_External_Parameter * param = [[Snapcall_External_Parameter alloc] init];
     @try {
    NSError *error = nil;
    id object = [NSJSONSerialization JSONObjectWithData:[JsonString dataUsingEncoding: NSUTF8StringEncoding] options:0 error:&error];

    if (error != nil){

        return nil;
    }
    if([object isKindOfClass:[NSDictionary class]])
    {

        NSDictionary *results = object;


        testVal(
                checkNsNul(@"callTitle"){
                    param.callTitle = obj;
                })

        testVal(
                checkNsNul(@"displayName"){
                    param.displayName = obj;
                })

        testVal(
                checkNsNul(@"displayBrand"){
                    param.displayBrand = obj;
                })

        testVal(
                checkNsNul(@"senderName"){
                    param.senderName = obj;
                })

        testVal(
                checkNsNul(@"senderBrand"){
                    param.senderBrand = obj;
                })

        testVal(
                checkNsNul(@"iOS_AssetPathImage"){
                    param.nameImage = obj;
                })
        testVal(
                checkNsNul(@"urlImage"){
                    param.urlImage = obj;
                }
        )


        testVal(
        id objfontname = [results objectForKey: @"iOS_AssetPathFont"];
        if ([objfontname isKindOfClass:[NSString class]])
        {
            NSString* fontname = objfontname;
            if (fontname!= nil)
            {
                UIFont *font = [UIFont fontWithName:fontname size: 36];
                param.fontDescriptor = font.fontDescriptor;
            }

        }
        )

       testVal(
               id obj = [results objectForKey: @"textColor"];
               if ([obj isKindOfClass:[NSString class]]){
                   NSString* NScolor = obj;
        if (NScolor != nil) {
        unsigned result = 0;
        NSScanner *scanner = [NSScanner scannerWithString:NScolor];
        [scanner setScanLocation:1];
        [scanner scanHexInt:&result];

            int color = result;
            param.textColor = [UIColor colorWithRed:((float)((color & 0xFF0000) >> 16))/255.0 \
                                             green:((float)((color & 0x00FF00) >>  8))/255.0 \
                                              blue:((float)((color & 0x0000FF) >>  0))/255.0 \
                                             alpha:1.0];
        }}
               )
        testVal(
                id obj = [results objectForKey: @"backgroundColor"];
                if ([obj isKindOfClass:[NSString class]]){
                  NSString* NScolor = obj;
                  if (NScolor != nil) {
                    unsigned result = 0;
                    NSScanner *scanner = [NSScanner scannerWithString:NScolor];
                    [scanner setScanLocation:1];
                    [scanner scanHexInt:&result];

                    int color = result;
                    param.backgroundColor = [UIColor colorWithRed:((float)((color & 0xFF0000) >> 16))/255.0 \
                                                     green:((float)((color & 0x00FF00) >>  8))/255.0 \
                                                      blue:((float)((color & 0x0000FF) >>  0))/255.0 \
                                                     alpha:1.0];
                }}
                  )

        testVal(
                checkNsNul(@"androidNotificatiobBody"){
                    param.androidNotificatiobBody = obj;
                })

        testVal(
                checkNsNul(@"androidNotificationTitle"){
                    param.androidNotificationTitle = obj;
                })

        testVal(
                checkDataNsNul(@"externalContext"){
                  NSDictionary *dic = obj;
                  NSMutableDictionary * parsedData  = [dic mutableCopy];
                  param.externalContext = parsedData;
                })

        testVal(
                checkNsNul(@"pushTransfertData"){
                    param.pushTransfertData = obj;
                })

        testVal(
                BOOL shouldReturn = [[results valueForKey: @"shouldReturn"] compare:(@"true")] == NSOrderedSame ? true : false;
                param.shouldReturn = shouldReturn;)
        testVal(
                BOOL hideCart = [[results valueForKey: @"hideCart"] compare:(@"true")] == NSOrderedSame ? true : false;
                param.hideCart = hideCart;)

    }
     }@catch(NSException * e){
         printf("error\n");
         printf("%s\n", e.description);

         return param;
     }
    return param;
}
RCT_REMAP_METHOD(bidIsClosed,bid: (NSString *)bidID resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    @try {
        [[Snapcall getSnapcall] buttonIsClosedWithBid_id: bidID snapcallCallBack:^(BOOL res) {
            resolve((res?@YES:@NO));
        }];
    }@catch(NSException *e){
        reject(e.reason, e.description, nil);
    }
}

RCT_REMAP_METHOD(launchCallWithbidId ,launchCallWithbidId:(NSString*)bidId parameter:(NSString*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {

       [self launchCallWithBidId:bidId parameter:[self SnapcallParamFromJSON:parameter]];
        resolve(@YES);
    }@catch(NSException * e){

        reject(e.reason, e.description, nil);
    }
}
//
RCT_REMAP_METHOD(launchCallWithIdentifier,launchCallWithbidId:(NSString*)bidId SnapcallIdentifier:(NSString*)SnapCallIdentifier parameter:(NSString*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [self launchCallWithBidId:bidId snapcallIdentifier:SnapCallIdentifier parameter:[self SnapcallParamFromJSON:parameter]];
        resolve(@YES);
    }@catch(NSException * e){

        reject(e.reason, e.description, nil);
    }
}

RCT_REMAP_METHOD(launchCallWithCustomIdentifier, launchCallWithbidId:(NSString*)bidId customIdentifier:(NSString*)customIdentifier appName:(NSString*)AppName parameter:(NSString*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
   @try {
       [self launchCallWithBidId:bidId applicationName:AppName customClientIdentifier:customIdentifier parameter:[self SnapcallParamFromJSON:parameter]];
       resolve(@YES);
   }@catch(NSException * e){

       reject(e.reason, e.description, nil);
   }
}

RCT_REMAP_METHOD(registerUser,registerUserwithcredential : (NSString*)credToken identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName  resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){

   @try {
       [[Snapcall getSnapcall] registerUserWithToken:credToken identifier:identifier customClientIdentifier:customId applicationName:appName snapcallIdentifierCallBack: ^(NSString *snapId) {
           resolve(snapId);
       }];

   }@catch(NSException *e){
       reject(e.reason, e.description, nil);
   }
}

RCT_REMAP_METHOD(activeUser,ActiveUserwithActive :(BOOL)active credtoken : (NSString*)token identifier:(NSString*)identifier customClientIdentifier:(NSString*)customId applicationName :(NSString*)appName resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ){
   @try{
       [[Snapcall getSnapcall] setUserActiveWithActive:active token:token identifier:identifier customClientIdentifier:customId applicationName:appName snapcallCallBack:^(BOOL res) {
           resolve((res?@YES:@NO));
       }];

   }@catch(NSException *e){
       reject(e.reason, e.description, nil);
   }

}
RCT_REMAP_METHOD(restorUI,restor:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
   [[Snapcall getSnapcall] restorCallUI];
   resolve(@YES);
}

RCT_REMAP_METHOD(askPermission,permission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try{
   if ([[Snapcall getSnapcall] requestPermission]){
    resolve(@YES);
  }else{
    resolve(@NO);
  }
}@catch(NSException *e){
    reject(e.reason, e.description, nil);
}

}

RCT_REMAP_METHOD(releaseSnapcall, releaseWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    [Snapcall releaseSnapcall];

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
