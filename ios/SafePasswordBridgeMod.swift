//
//  SafePasswordBridgeMod.swift
//  safePasswordRn
//
//  Created by Maria Castillo on 23/9/25.
//

import Foundation
import SafePasswordiOSLib
import React

@objcMembers
@objc(SafePasswordBridgeMod)
public class SafePasswordBridgeMod: NSObject {
  private let safePassword: SafePasswordW = SafePasswordW()
  
  @objc
  public func makePassword(_ length:NSNumber,includeUppercase:NSNumber,includeNumber:NSNumber,includeSymbols:NSNumber, resolver:@escaping RCTPromiseResolveBlock,rejecter:@escaping RCTPromiseRejectBlock){
    do {
      let password = try self.safePassword.makePassword(length: length, includeUppercase: includeUppercase, includeNumbers: includeNumber, includeSymbols: includeSymbols)
      resolver(password)
    }catch{
      rejecter("Error", "Error generating password", error)
    }
  }
  
  @objc
  public func checkPassword(_ password:NSString,resolver:@escaping RCTPromiseResolveBlock,rejecter:@escaping RCTPromiseRejectBlock){
    do{
      let res = try self.safePassword.checkPassword(password: password)
      let f:String
      switch res{
      case .weak:
        f = "WEAK"
      case .moderate:
        f = "MODERATE"
      case .strong:
        f = "STRONG"
      }
      resolver(f)
    }catch {
      rejecter("Error", "Error checking password", error)
    }
  }
}
