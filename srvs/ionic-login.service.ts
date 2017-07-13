import { Injectable } from '@angular/core';
import { Options } from '../classes/ionic-login-options';
import { Ssp } from './ssp.service';
import { Ysp } from './ysp.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicToastHelperSrv } from 'ionic-toast-helper/ionic-toast-helper.service';
import { Toast } from 'ionic-toast-helper/toast'
// need to work more on here like send data to this module like redirect uri
// and enable ysp for just be only
@Injectable()
export class LoginService {
    constructor(
    private _ssp:Ssp,
    private _ysp:Ysp,
    private _nativeStorage:NativeStorage,
    private _ionicToastHelperSrv:IonicToastHelperSrv){
        this.onInit();
    }
    onInit(){}
    options:Options;
    private circular:any;
    login(loginType:string,success:Function,error:Function){
        this.setCircular(loginType,success,error);
        this._ssp.execute(this.circular,this.onSspSuccess.bind(this),this.onSspError.bind(this));
    }
    onSspSuccess(profile:any){
        this.circular.profile = profile;
        this._ysp.execute(this.circular,this.onYspSuccess.bind(this),this.onYspError.bind(this));
    }
    onSspError(err:any){
        this.circular.error(err);
    }
    onYspSuccess(access_token:string){
        this.circular.success(access_token);
        this.raiseToast();
        this._nativeStorage
            .setItem('access_token', access_token)
            .then(() => {console.info('token stored')},
                error => console.error('Error storing item', error)
            );
    }
    onYspError(err:any){
        this.circular.error(err);
    }
    setCircular(loginType:string,success:Function,error:Function){
        this.circular = new Object();
        this.circular.loginType = loginType;
        this.circular.success = success;
        this.circular.error = error;
    }
    private raiseToast(){
        let toast = new Toast();
        toast.message = 'Login Successful';
        toast.position = 'bottom';
        this._ionicToastHelperSrv.raiseToast(toast,()=>{});
    }
}