
#import "RNSnapcallReact.h"
#import <React/RCTConvert.h>
#import <PushKit/PushKit.h>

#define testVal(x) @try{ x }@catch(NSException * e ){printf("anErrorOccur\n");}
#define checkNsNul(x) id obj = [results objectForKey: x]; if ([obj isKindOfClass:[NSString class]])
#define checkDataNsNul(x) id obj = [results objectForKey: x]; if (obj != nil)

@implementation RNSnapcallReact
RCT_EXPORT_MODULE(RNSnapcallReact)

SCClient *snapcallClient;
RNSnapcallEventListener *snapcallListener;
NSString* tokenVoip;

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (instancetype)init
{
    SCLog.debug = @YES;
    SCLog.error = @YES;
    SCLog.verbose = @YES;
    SCLog.info = @YES;
    self = [super init];
    Snapcall.useUserInterfaceV2 = @YES;
    snapcallClient = [[SCClient alloc] init];
    snapcallListener = [[RNSnapcallEventListener alloc] init];
    if (snapcallListener != nil){
        [snapcallClient objc_setListenerWithListener:snapcallListener];
    }
    return self;
}



- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}


-(UIColor *)colorFromHexString:(NSString *)hexString {
    if (![hexString isKindOfClass: [NSString class]]) {
        return [NSNull null];
    }
    if ([hexString length] == 7) {
        hexString = [@"#FF" stringByAppendingString: [hexString substringWithRange:NSMakeRange(1, 6)]];
    }
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    int alpha = ((rgbValue & 0xFF000000) >> 24)/255.0;
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:alpha];
}

-(UIColor *)getBGColorFromObject:(NSDictionary*) object {
    if (![object isKindOfClass:[NSDictionary class]]) {
        return nil;
    }
    return [self colorFromHexString:[object valueForKey: @"background"]];
}

-(UIColor *)getColorFromObject:(NSDictionary*) object {
    if (![object isKindOfClass:[NSDictionary class]]) {
        return nil;
    }
    return [self colorFromHexString:[object valueForKey: @"color"]];
}

-(void)snapcallPropsFromDictionnary:(NSDictionary *)object {
    CallViewProperties * props = [[Snapcall getSnapcall] getCallViewProperties];
    UIColor *color = [self colorFromHexString:[object valueForKey: @"backgroundColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setBackgroundColor: color];
    }
    color = [self getColorFromObject:[object valueForKey: @"iconColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setIconColorWithColor: color];
    }
    
    color = [self getBGColorFromObject:[object valueForKey: @"iconColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setIconBGColor: color];
    }
    color = [self getBGColorFromObject:[object valueForKey: @"iconColorInactive"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setIconBGColorInactive: color];
    }
    color = [self getColorFromObject:[object valueForKey: @"iconColorInactive"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setIconColorInactiveWithColor: color];
    }
    color = [self colorFromHexString:[object valueForKey: @"actionBarColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setActionBarBackgroundColor: color];
    }
    color = [self getBGColorFromObject:[object valueForKey: @"hangup"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setHangupBackgroundColorWithColor: color];
    }
    color = [self getColorFromObject:[object valueForKey: @"hangup"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setHangupIconColorWithColor: color];
    }
    color = [self colorFromHexString:[object valueForKey: @"boldTextColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setTextColor: color];
    }
    
    color =[self colorFromHexString:[object valueForKey: @"colorTextState"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setTextColorState: color];
    }
    color = [self colorFromHexString:[object valueForKey: @"appPortraitBackgroundColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setUserImageBGColor: color];
    }
    color = [self getBGColorFromObject:[object valueForKey: @"iosHideButtonColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setHideBGColorWithColor: color];
    }
    color = [self getColorFromObject:[object valueForKey: @"iosHideButtonColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setHideColorWithColor: color];
    }
    color = [self getBGColorFromObject:[object valueForKey: @"iosBackButtonColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setBackBGColorWithColor: color];
    }
    color = [self getColorFromObject:[object valueForKey: @"iosBackButtonColor"]];
    if ([color isKindOfClass:[UIColor class]]) {
        props = [props setBackColorWithColor: color];
    }
    NSString *name = [object valueForKey: @"nameLabelText"];
    if ([name isKindOfClass:[NSString class]]) {
        props = [props setCallName: name];
    }

    NSString *brand = [object valueForKey: @"appLabelText"];
    if ([brand isKindOfClass:[NSString class]]) {
        props = [props setAppLabel: brand];
    }
    if ([object valueForKey: @"shouldBackIOS"] != [NSNull null]) {
        props = [props setShouldBackWithShouldBack: [[object valueForKey: @"shouldBackIOS"] boolValue]];
    }
    if ([object valueForKey: @"useBlurIOS"] != [NSNull null]) {
        props = [props setBackgroundBlur: [[object valueForKey: @"useBlurIOS"] boolValue]];
    }
    testVal(
    NSDictionary * userPortraitIOS = [object valueForKey: @"userPortraitIOS"];
    if ([userPortraitIOS isKindOfClass:[NSDictionary class]]) {
        if ([[userPortraitIOS valueForKey: @"url"] isKindOfClass:[NSString class]]) {
            NSURL *url = [NSURL URLWithString:[userPortraitIOS valueForKey: @"url"]];
            NSData *data = [NSData dataWithContentsOfURL:url];
            UIImage *image = [UIImage imageWithData:data];
            props = [props setUserImage: image];
        } else {
            props = [props setUserImage:[RCTConvert UIImage: userPortraitIOS]];
        }
    }
    )
    testVal(
    NSDictionary * brandImage = [object valueForKey: @"appLogoIOS"];
    if ([brandImage isKindOfClass:[NSDictionary class]]) {
        if ([[brandImage valueForKey: @"url"] isKindOfClass:[NSString class]]) {
            NSURL *url = [NSURL URLWithString:[brandImage valueForKey: @"url"]];
            NSData *data = [NSData dataWithContentsOfURL:url];
            UIImage *image = [UIImage imageWithData:data];
            props = [props setBrandImage: image];
        } else {
            props = [props setBrandImage:[RCTConvert UIImage: brandImage]];
        }
    }
    )
}

-(SnapcallExternalParameter *)snapcallParamFromDictionnary:(NSDictionary *)object {
    SnapcallExternalParameter * param = [[SnapcallExternalParameter alloc] init];
        if([object isKindOfClass:[NSDictionary class]]) {
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
                param.shouldReturn = [[results valueForKey: @"shouldReturn"] boolValue];
                )
        testVal(
                param.useVideo = [[results valueForKey: @"video"] boolValue];
                )
        testVal(
                param.hideCart = [[results valueForKey: @"hideCart"] boolValue];
                )
        testVal(
                [self snapcallPropsFromDictionnary:[results valueForKey: @"userInterfaceProperty"]];
                )
    }
    
    return param;
}

RCT_REMAP_METHOD(setSpeaker, setSpeakerWithResolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    NSError *error;

    [snapcallClient setSpeakerAndReturnError: &error];
    if (error != nil){
        reject(@"-1", @"failed to call hangup", error);
        return ;
    }
    resolve(@YES);
}

RCT_REMAP_METHOD(mute, muteWithResolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    NSError *error;

    [snapcallClient muteAndReturnError: &error];
    if (error != nil){
        reject(@"-1", @"failed to call hangup", error);
        return ;
    }
    resolve(@YES);
}

RCT_REMAP_METHOD(hangup, hangupWithResolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject ) {
    NSError *error;

    [snapcallClient hangupAndReturnError: &error ];
    if (error != nil){
        reject(@"-1", @"failed to call hangup", error);
        return ;
    }
    resolve(@YES);
}

RCT_REMAP_METHOD(activeDefaultInterface, active: (BOOL)value resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    Snapcall.defaultUserInterfaceOff = !value;
    resolve(@YES);
}

RCT_REMAP_METHOD(bidIsClosed,bid: (NSString *)bidID resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    @try {
        bool res = [[Snapcall getSnapcall] buttonIsClosedWithBid_id: bidID snapcallCallBack:^(BOOL res) {
            resolve((res?@YES:@NO));
        }];
        if (!res){
            reject(@"-1", @"bad format", nil);
        }

    }@catch(NSException *e){
        reject(e.reason, e.description, nil);
    }
}

RCT_REMAP_METHOD(launchCallWithbidId ,launchCallWithbidId:(NSString*)bidId parameter:(NSDictionary*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
       [self launchCallWithBidId:bidId parameter:[self snapcallParamFromDictionnary:parameter]];
        resolve(@YES);
    }@catch(NSException * e){

        reject(e.reason, e.description, nil);
    }
}
//
RCT_REMAP_METHOD(launchCallWithIdentifier,launchCallWithbidId:(NSString*)bidId SnapcallIdentifier:(NSString*)SnapCallIdentifier parameter:(NSDictionary*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [self launchCallWithBidId:bidId snapcallIdentifier:SnapCallIdentifier parameter:[self snapcallParamFromDictionnary:parameter]];
        resolve(@YES);
    }@catch(NSException * e){

        reject(e.reason, e.description, nil);
    }
}

RCT_REMAP_METHOD(launchCallWithCustomIdentifier, launchCallWithbidId:(NSString*)bidId customIdentifier:(NSString*)customIdentifier appName:(NSString*)AppName parameter:(NSDictionary*)parameter resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
   @try {
       [self launchCallWithBidId:bidId applicationName:AppName customClientIdentifier:customIdentifier parameter:[self snapcallParamFromDictionnary:parameter]];
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
    @try {
        [[Snapcall  getSnapcall] requestPermissionWithCallback:^(BOOL ret ) {
            if (ret) {
                resolve(@"granted");
            }
            else {
                resolve(@"denied");
            }
        }];
    } @catch(NSException *e){
        reject(e.reason, e.description, nil);
    }
}

RCT_REMAP_METHOD(releaseSnapcall, releaseWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    [Snapcall releaseSnapcall];

}

RCT_REMAP_METHOD(getCurrentState, getCurrentStateWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSError *err;
    SCClientEventObjC *currentState = [snapcallClient objc_getCurrentClientEventAndReturnError:(&err)];
    if (err != nil) {
        reject(@"-1", @"not connected", err);
    }else {
        resolve([snapcallListener makeJSONEventWithEvent:currentState]);
    }
}


RCT_REMAP_METHOD(rateLastCall, rateLastCallWithRate: (NSInteger)rate  Promise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    SCClientEventObjC *call = [snapcallListener getLastCall];

    [[Snapcall getSnapcall] rateCallWithCall:[call getCall] rate:rate requestCallBack:^(NSError *err, BOOL res) {
        if (err != nil) {
            reject(@"-1", @"bad paramter", err);
        }
        else if (res == false){
            reject(@"-1", @"request failed", err);
        }
        else {
            resolve(@YES);
        }
    }
      ];
}

RCT_REMAP_METHOD(startVideo, startvideoWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    @try {
        [snapcallClient startSendingVideo];
        resolve(@YES);
    }@catch(NSError * e) {
        reject(@"-1", @"startVideo error", e);
        printf("error: %s\n", [e.description UTF8String]);
    }
}

RCT_REMAP_METHOD(pauseVideo, stopVideoWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    @try {
        [snapcallClient stopSendingVideo];
        resolve(@YES);
    } @catch(NSError * e) {
        reject(@"-1", @"startVideo error", e);
        printf("error: %s\n",[e.description UTF8String]);
    }
}

RCT_REMAP_METHOD(switchCamera, witchCameraWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    @try {
        [snapcallClient switchCamera];
        resolve(@YES);
    }@catch(NSError * e) {
        reject(@"-1", @"startVideo error", e);
        printf("error: %s\n", [e.description UTF8String]);
    }
}

RCT_REMAP_METHOD(updateUI, props: (NSDictionary *)props Promise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    [self snapcallPropsFromDictionnary:props];
    [snapcallClient updateUI];
    resolve(@YES);
}

RCT_REMAP_METHOD(setNameLabelText, name: (NSString*) name) {
}

RCT_REMAP_METHOD(disconnect,  Promise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSError *error;
    [snapcallClient hangupAndReturnError:&error];
    if (error == nil) {
        resolve(@YES);
    } else {
        reject(@"-1", @"startVideo error", error);
        printf("error: %s\n", [error.description UTF8String]);
    }
}

RCT_REMAP_METHOD(sendPartnerCallInvitationWithToken, partnerID:(int)partnerID token: (NSString*)token chatID: (NSString*)chatID param: (NSDictionary*)param customParameter: (NSDictionary*) customParameter Promise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    [[Snapcall getSnapcall] sendPartnerCallInvitationWithPartnerID:partnerID token:token chatID:chatID customParameter: customParameter :^(NSError * error) {
        if (error != nil) {
            reject([@(error.code) stringValue], [@(error.code) stringValue], error);
            return;
        }
        resolve(@YES);
    }];
}

RCT_REMAP_METHOD(connectSendPartnerCallInvitationWithToken, partnerID:(int)partnerID agent: (NSString*)agent token: (NSString*)token chatID: (NSString*)chatID param: (NSDictionary*)param customParameter: (NSDictionary*) customParameter  Promise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    printf("testing connect partner\n");
    
    [[Snapcall getSnapcall] sendPartnerCallInvitationWithPartnerID:partnerID agent:agent token:token chatID: chatID customParameter: customParameter parameter:[self snapcallParamFromDictionnary:param] : ^(NSError * error, Agent* agent) {
        if (error != nil) {
            NSLog(@"on error %s", error.description);
            reject([@(error.code) stringValue], [@(error.code) stringValue], error);
            return;
        }
        NSLog(@"succes");
        resolve(@YES);
    }];
}

RCT_REMAP_METHOD(getToken, getTokenWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(tokenVoip);
}

RCT_REMAP_METHOD(setApiCredentials, apiKey:(NSString *)apiKey  Promise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [[Snapcall getSnapcall] setAPIkeyWithApiKey:apiKey];
    resolve(@YES);
}

RCT_REMAP_METHOD(getConnectedAgent, getConnectedAgentWithPromise:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    @try {
        NSError * e;
        
        SCClientEventObjC *event = [snapcallClient objc_getCurrentClientEventAndReturnError: &e];
        SCCallObjC *call = [event getCall];
        if (call != nil) {
            resolve([call getAgentMail]);
            return;
        }
        resolve(nil);
    }@catch(NSError * e) {
        reject(@"-1", @"startVideo error", e);
        printf("error: %s\n", [e.description UTF8String]);
    }
}

-(void)restorUI
{
   [[Snapcall getSnapcall] restorCallUI];
}

-(void)receiveCallWith:(PKPushPayload*)payload parameter:(SnapcallExternalParameter*)parameter
{
   [[Snapcall getSnapcall]receiveCallWithPushKitPayload:payload parameter:parameter];

}

-(void)launchCallWithBidId:(NSString *)bidId applicationName:(NSString*)AppName customClientIdentifier:(NSString*)customIdentifier parameter:(SnapcallExternalParameter*)parameter{
   [[Snapcall   getSnapcall]launchCallWithBidId:bidId applicationName:AppName customClientIdentifier:customIdentifier parameter:parameter];
}

-(void)launchCallWithBidId:(NSString *)bidId  parameter:(SnapcallExternalParameter*)parameter{
    [[Snapcall   getSnapcall]launchCallWithBidId: bidId parameter:parameter];
}

-(void)launchCallWithBidId:(NSString *)bidId snapcallIdentifier:(NSString*)snapcallIdentifier parameter:(SnapcallExternalParameter*)parameter{

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

+(void)reportVoipToken:(NSString *)token {
    tokenVoip = token;
}

+(void)receiveCallWith:(PKPushPayload*)payload parameter:(SnapcallExternalParameter*)parameter {
    NSError *e;
    [[Snapcall getSnapcall] receivePushCallWithData:payload param:parameter error:&e];
}

@end
