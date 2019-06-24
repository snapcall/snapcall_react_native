//
//  RNSnapcallEmitEvent.h
//  RNSnapcallReact
//
//  Created by Noyelle on 13/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNSnapcallReact.h"
#import <Foundation/Foundation.h>

@interface RNSnapcallEmitEvent : RCTEventEmitter

+ (RNSnapcallEmitEvent *)getInstance;

- (void) sendEventWithName:(NSString *)name parameter:(NSDictionary * _Nonnull)parameter;

@end

