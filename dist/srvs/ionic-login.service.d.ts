import { Options } from '../classes/ionic-login-options';
import { Ssp } from './ssp.service';
import { Ysp } from './ysp.service';
import { NativeStorage } from '@ionic-native/native-storage';
export declare class LoginService {
    private _ssp;
    private _ysp;
    private _nativeStorage;
    constructor(_ssp: Ssp, _ysp: Ysp, _nativeStorage: NativeStorage);
    onInit(): void;
    options: Options;
    private circular;
    login(loginType: string, success: Function, error: Function): void;
    onSspSuccess(profile: any): void;
    onSspError(err: any): void;
    onYspSuccess(access_token: string): void;
    onYspError(err: any): void;
    setCircular(loginType: string, success: Function, error: Function): void;
}
