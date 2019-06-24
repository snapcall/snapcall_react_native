//
//  RNSnapcallListener.h
//  RNSnapcallReact
//
//  Created by Noyelle on 12/06/2019.
//

#import "RNSnapcallReact.h"
#import "RNSnapcallEmitEvent.h"
#import <Foundation/Foundation.h>

@interface RNSnapcallEventListener : NSObject <objc_SCClientListener>

- (objc_SCClientEvent*)getLastCall;
- (NSDictionary *) makeJSONEventWithEvent: (objc_SCClientEvent *)snapcallEvent;
- (instancetype)init;

@end
