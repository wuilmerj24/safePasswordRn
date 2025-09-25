//
//  SafePasswordBridgeMod.m
//  safePasswordRn
//
//  Created by Maria Castillo on 23/9/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SafePasswordBridgeMod,NSObject)

RCT_EXTERN_METHOD(makePassword:(NSNumber *)length
                  includeUppercase:(NSNumber *)includeUppercase
                  includeNumber:(NSNumber *)includeNumber
                  includeSymbols:(NSNumber *)includeSymbols
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

// Método para verificar fuerza
RCT_EXTERN_METHOD(checkPassword:(NSString *)password
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

@end
