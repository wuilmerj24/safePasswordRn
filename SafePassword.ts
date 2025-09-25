import {NativeModules,Platform} from 'react-native';

const {SafePasswordBridgeMod} = NativeModules; // iOS
const {SafePassword} = NativeModules; //Android

export type PasswordStrength = 'WEAK' | 'MODERATE' | 'STRONG';

export async function generatePassword(
    length:number,
    includeUppercase:boolean,
    includeNumbers:boolean,
    includeSymbols:boolean
):Promise<string> {
    if(Platform.OS == "android"){
        return await SafePassword.generatePassword(length,includeUppercase,includeNumbers,includeSymbols);
    }else if(Platform.OS=="ios"){
        return await SafePasswordBridgeMod.makePassword(
            length,
            includeUppercase ? 1:0,
            includeNumbers ? 1:0,
            includeSymbols ? 1:0,
        );
    }
    throw new Error("Platforms not supported");
}

export async function checkPassword(password:string) {
    if(Platform.OS==='android'){
        return await SafePassword.checkStrength(password);
    }else if(Platform.OS==='ios'){
        return await SafePasswordBridgeMod.checkPassword(password);
    }
    throw new Error('Platform not supported');
    
}