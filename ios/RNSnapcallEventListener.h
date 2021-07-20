//
//  RNSnapcallListener.h
//  RNSnapcallReact
//
//  Created by Noyelle on 12/06/2019.
//

#import "RNSnapcallReact.h"
#import "RNSnapcallEmitEvent.h"
#import <Foundation/Foundation.h>

@interface RNSnapcallEventListener : NSObject <SCClientListenerObjC>

- (SCClientEventObjC*)getLastCall;
- (NSDictionary *) makeJSONEventWithEvent: (SCClientEventObjC *)snapcallEvent;
- (instancetype)init;

@end
