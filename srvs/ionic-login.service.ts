import { Injectable } from '@angular/core';
import { Options } from '../classes/ionic-login-options';
import { Ssp } from './ssp.service';
import { Ysp } from './ysp.service';
import { NativeStorage } from '@ionic-native/native-storage';
// need to work more on here like send data to this module like redirect uri
// and enable ysp for just be only
@Injectable()
export class LoginService {
    constructor(
    private _ssp:Ssp,
    private _ysp:Ysp,
    private _nativeStorage:NativeStorage){
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
        console.log('new code comming in');
        console.log(profile);
        this._ysp.execute(this.circular,this.onYspSuccess.bind(this),this.onYspError.bind(this));
    }
    onSspError(err:any){
        this.circular.error(err);
    }
    onYspSuccess(access_token:string){
        this.circular.success(access_token);
        this._nativeStorage
            .setItem('access_token', access_token)
            .then(
                () => console.log('Stored item!'),
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
}