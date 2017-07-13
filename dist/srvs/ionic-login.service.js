import { Injectable } from '@angular/core';
import { Ssp } from './ssp.service';
import { Ysp } from './ysp.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicToastHelperSrv } from 'ionic-toast-helper/ionic-toast-helper.service';
import { Toast } from 'ionic-toast-helper/toast';
// need to work more on here like send data to this module like redirect uri
// and enable ysp for just be only
var LoginService = (function () {
    function LoginService(_ssp, _ysp, _nativeStorage, _ionicToastHelperSrv) {
        this._ssp = _ssp;
        this._ysp = _ysp;
        this._nativeStorage = _nativeStorage;
        this._ionicToastHelperSrv = _ionicToastHelperSrv;
        this.onInit();
    }
    LoginService.prototype.onInit = function () { };
    LoginService.prototype.login = function (loginType, success, error) {
        this.setCircular(loginType, success, error);
        this._ssp.execute(this.circular, this.onSspSuccess.bind(this), this.onSspError.bind(this));
    };
    LoginService.prototype.onSspSuccess = function (profile) {
        this.circular.profile = profile;
        this._ysp.execute(this.circular, this.onYspSuccess.bind(this), this.onYspError.bind(this));
    };
    LoginService.prototype.onSspError = function (err) {
        this.circular.error(err);
    };
    LoginService.prototype.onYspSuccess = function (access_token) {
        this.circular.success(access_token);
        this.raiseToast();
        this._nativeStorage
            .setItem('access_token', access_token)
            .then(function () { console.info('token stored'); }, function (error) { return console.error('Error storing item', error); });
    };
    LoginService.prototype.onYspError = function (err) {
        this.circular.error(err);
    };
    LoginService.prototype.setCircular = function (loginType, success, error) {
        this.circular = new Object();
        this.circular.loginType = loginType;
        this.circular.success = success;
        this.circular.error = error;
    };
    LoginService.prototype.raiseToast = function () {
        var toast = new Toast();
        toast.message = 'Login Successful';
        toast.position = 'bottom';
        this._ionicToastHelperSrv.raiseToast(toast, function () { });
    };
    LoginService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LoginService.ctorParameters = function () { return [
        { type: Ssp, },
        { type: Ysp, },
        { type: NativeStorage, },
        { type: IonicToastHelperSrv, },
    ]; };
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=ionic-login.service.js.map