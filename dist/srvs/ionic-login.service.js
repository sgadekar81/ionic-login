import { Injectable } from '@angular/core';
import { Ssp } from './ssp.service';
import { Ysp } from './ysp.service';
import { NativeStorage } from '@ionic-native/native-storage';
// need to work more on here like send data to this module like redirect uri
// and enable ysp for just be only
var LoginService = (function () {
    function LoginService(_ssp, _ysp, _nativeStorage) {
        this._ssp = _ssp;
        this._ysp = _ysp;
        this._nativeStorage = _nativeStorage;
        this.onInit();
    }
    LoginService.prototype.onInit = function () { };
    LoginService.prototype.login = function (loginType, success, error) {
        this.setCircular(loginType, success, error);
        this._ssp.execute(this.circular, this.onSspSuccess.bind(this), this.onSspError.bind(this));
    };
    LoginService.prototype.onSspSuccess = function (profile) {
        this.circular.profile = profile;
        console.log('new code comming in');
        console.log(profile);
        this._ysp.execute(this.circular, this.onYspSuccess.bind(this), this.onYspError.bind(this));
    };
    LoginService.prototype.onSspError = function (err) {
        this.circular.error(err);
    };
    LoginService.prototype.onYspSuccess = function (access_token) {
        this.circular.success(access_token);
        this._nativeStorage
            .setItem('access_token', access_token)
            .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
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
    LoginService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LoginService.ctorParameters = function () { return [
        { type: Ssp, },
        { type: Ysp, },
        { type: NativeStorage, },
    ]; };
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=ionic-login.service.js.map