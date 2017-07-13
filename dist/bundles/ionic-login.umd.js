(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ionic-native/facebook'), require('@ionic-native/google-plus'), require('angularx-restful/srv/rest.service'), require('angularx-restful/classes/rest-params'), require('ionic-modal-helper/ionic-modal-helper.service'), require('ionic-angular'), require('@ionic-native/native-storage'), require('ionic-toast-helper/ionic-toast-helper.service'), require('ionic-toast-helper/toast'), require('angularx-restful')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@ionic-native/facebook', '@ionic-native/google-plus', 'angularx-restful/srv/rest.service', 'angularx-restful/classes/rest-params', 'ionic-modal-helper/ionic-modal-helper.service', 'ionic-angular', '@ionic-native/native-storage', 'ionic-toast-helper/ionic-toast-helper.service', 'ionic-toast-helper/toast', 'angularx-restful'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['ionic-login'] = global.ng['ionic-login'] || {}),global.ng.core,global._angular_common,global._ionicNative_facebook,global._ionicNative_googlePlus,global.angularxRestful_srv_rest_service,global.angularxRestful_classes_restParams,global.ionicModalHelper_ionicModalHelper_service,global.ionicAngular,global._ionicNative_nativeStorage,global.ionicToastHelper_ionicToastHelper_service,global.ionicToastHelper_toast,global.angularxRestful));
}(this, (function (exports,_angular_core,_angular_common,_ionicNative_facebook,_ionicNative_googlePlus,angularxRestful_srv_rest_service,angularxRestful_classes_restParams,ionicModalHelper_ionicModalHelper_service,ionicAngular,_ionicNative_nativeStorage,ionicToastHelper_ionicToastHelper_service,ionicToastHelper_toast,angularxRestful) { 'use strict';

var AppSettings = (function () {
    function AppSettings() {
    }
    AppSettings.API_ENDPT = 'https://life-skills-dev.appspot.com';
    return AppSettings;
}());

var Uris = (function () {
    function Uris() {
    }
    Uris.getFbProfile = 'https://graph.facebook.com/v2.8/me?fields=first_name,last_name,gender,picture.width(500).height(500),birthday,email&access_token=';
    // public static get_ggpProfile:string = ''
    Uris.genJustbeAccessToken = AppSettings.API_ENDPT + '/api/justbe/generateJusteBeToken';
    return Uris;
}());

var StabilizedProfile = (function () {
    function StabilizedProfile(firstName, lastName, image, email, id, gender) {
        this.images = new Array();
        this.emails = new Array();
        firstName ? this.firstName = firstName : null;
        lastName ? this.lastName = lastName : null;
        image ? this.images.push(image) : null;
        email ? this.emails.push(email) : null;
        id ? this.id = id : null;
        gender ? this.gender = gender : null;
    }
    return StabilizedProfile;
}());

//ssp social server part(this service is part of)
// as different social server returns theire profile in slightly different format
// ex fb has 'id' in their public profile object
// while google has 'Uid'
// so this service stabilizes the profile so that any server(ysp) can consume it
var ProfileStabilizer = (function () {
    function ProfileStabilizer() {
    }
    ProfileStabilizer.prototype.getStabilizedProfile = function (_circular, profile) {
        switch (_circular.loginType) {
            case 'facebook': return new StabilizedProfile(profile.first_name, profile.last_name, this.getFbProfileImg(profile), profile.email, profile.id, profile.gender);
            case 'google': return new StabilizedProfile(profile.givenName, profile.familyName, profile.imageUrl, profile.email, profile.userId, profile.gender);
        }
    };
    // conditions
    // profile fb
    ProfileStabilizer.prototype.getFbProfileImg = function (profile) {
        return profile.picture && profile.picture.data && profile.picture.data.url ? profile.picture.data.url : console.log('no image found for fb profile//missing from facebook only');
    };
    ProfileStabilizer.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    ProfileStabilizer.ctorParameters = function () { return []; };
    return ProfileStabilizer;
}());

//ssp social server part
// this part includes 
// request social server for getting access token //this part is already done by facebook and google cordova ionic plugins//in future can think of removing these dependency
// from that access token get user public profile
// _fb=>facebook _ggp=>googleplus
// work for improved error handling
var Ssp = (function () {
    function Ssp(_rst, _fb, _ggp, _profileStabilizer) {
        this._rst = _rst;
        this._fb = _fb;
        this._ggp = _ggp;
        this._profileStabilizer = _profileStabilizer;
    }
    Ssp.prototype.execute = function (_circular, success, error) {
        this.setLcircular(_circular, success, error);
        switch (_circular.loginType) {
            case 'facebook': return this.fbLogin();
            case 'google': return this.ggpLogin();
        }
    };
    Ssp.prototype.get_fbProfile = function (response) {
        var _this = this;
        this.lCircular.params = new angularxRestful_classes_restParams.RestParams();
        this.lCircular.params.uri = Uris.getFbProfile + response.authResponse.accessToken;
        this.getProfile(this.lCircular.params).subscribe(function (fbProfile) {
            _this.stabilizeProfile(fbProfile);
        });
    };
    Ssp.prototype.getProfile = function (restParams) {
        return this._rst.get(restParams).map(function (response) {
            return JSON.parse(response._body);
        }, function (err) {
            return err;
        });
    };
    Ssp.prototype.setLcircular = function (_circular, success, error) {
        this.lCircular = new Object();
        this.lCircular.success = success;
        this.lCircular.error = error;
        this.lCircular._circular = _circular;
    };
    // this method stabilizes profile and emit output
    Ssp.prototype.stabilizeProfile = function (profile) {
        var stabilizedProfile = this._profileStabilizer.getStabilizedProfile(this.lCircular._circular, profile);
        this.emitOutput(stabilizedProfile);
    };
    Ssp.prototype.emitOutput = function (profile) {
        // this gives profile back to its caller
        this.lCircular.success(profile);
    };
    Ssp.prototype.fbLogin = function () {
        var _this = this;
        this._fb.login(['public_profile', 'email']).then((function (authResponse) {
            _this.get_fbProfile(authResponse);
        }), function (err) {
            _this.lCircular._circular.error(err);
        });
    };
    Ssp.prototype.ggpLogin = function () {
        var _this = this;
        this._ggp.login({}).then((function (googleProfile) {
            _this.stabilizeProfile(googleProfile);
        }), function (err) {
            _this.lCircular._circular.error(err);
        });
    };
    Ssp.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    Ssp.ctorParameters = function () { return [
        { type: angularxRestful_srv_rest_service.RestService, },
        { type: _ionicNative_facebook.Facebook, },
        { type: _ionicNative_googlePlus.GooglePlus, },
        { type: ProfileStabilizer, },
    ]; };
    return Ssp;
}());

var JustbeImage = (function () {
    function JustbeImage(imageUrl, defaultImage) {
        imageUrl ? this.imageUrl = imageUrl : null;
        defaultImage ? this.defaultImage = true : this.defaultImage = false;
    }
    return JustbeImage;
}());

var JustbeProfileVo = (function () {
    function JustbeProfileVo(userVerified, firstName, lastName, emails, images, dob, gender) {
        userVerified ? this.userVerified = userVerified : null;
        firstName ? this.firstName = firstName : null;
        lastName ? this.lastName = lastName : null;
        if (firstName && lastName) {
            // this.nickName = firstName + ' ' + lastName
        }
        emails ? this.emails = emails : null;
        if (images && images[0]) {
            this._images = new Array();
            this._images.push(new JustbeImage(images[0], true));
        }
        dob ? this.dob = dob : null;
        if (gender === 'male') {
            this.gender = 0;
        }
        else if (gender === 'female') {
            this.gender = 1;
        }
    }
    return JustbeProfileVo;
}());

var JustbeProfile = (function () {
    function JustbeProfile(_circular, lCircular) {
        var vals = this.getVals(_circular);
        this.profileType = vals.profileType;
        this.openProfileId = vals.openProfileId;
        this.profileVO = new JustbeProfileVo(false, _circular.profile.firstName, _circular.profile.lastName, _circular.profile.emails, _circular.profile.images, _circular.profile.dob, _circular.profile.gender);
    }
    JustbeProfile.prototype.getVals = function (_circular) {
        switch (_circular.loginType) {
            // since the field for user id in different socialite is different 
            // for ex facebook has field name as id and google has userId
            //so we may need this id //for accessing it this different method is used
            case 'facebook': return { profileType: 'FacebookProfile', openProfileId: 'FacebookProfile#' + _circular.profile.id };
            case 'google': return { profileType: 'Google2Profile', openProfileId: 'Google2Profile#' + _circular.profile.id };
            default: return { profileType: '', openProfileId: '' };
        }
    };
    return JustbeProfile;
}());

var EmailGetterComponent = (function () {
    function EmailGetterComponent(_navParams, _ionicModalHelperSrv) {
        this._navParams = _navParams;
        this._ionicModalHelperSrv = _ionicModalHelperSrv;
        console.log(_navParams.data.afterSelectEmail);
        console.log(_navParams.data.profile);
        this.profile = _navParams.data.profile;
    }
    EmailGetterComponent.prototype.onSubmitClick = function (email) {
        if (this.basicValidateEmail(email)) {
            if (this._navParams.data && this._navParams.data.afterSelectEmail) {
                this._navParams.data.afterSelectEmail(email);
                this._ionicModalHelperSrv.closeModal();
            }
            else {
                console.error('pass callback function to component, what to do after clicking on submit');
            }
        }
        else {
            this.validationMsg = 'Invalid Email';
        }
    };
    EmailGetterComponent.prototype.basicValidateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    EmailGetterComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'email-getter',
                    template: "\n                <ion-header>\n  \n                </ion-header>\n                <ion-content padding>\n  \n                  <div style=\"text-align: center;\">\n                    <img [src]=\"profile.profileVO._images[0].imageUrl\"  style=\"width: 150px;\">\n                    <h1>{{profile.profileVO.firstName}} {{profile.profileVO.lastName}}</h1>\n                  </div>\n                  <ion-list>\n                    <ion-item>\n                      <ion-input type=\"text\" placeholder=\"enter your email\" [(ngModel)]=\"email\"></ion-input>\n                    </ion-item>\n                    <span style=\"color:red\">{{validationMsg}}</span>\n\n                  </ion-list>\n              <button ion-button (click)=\"onSubmitClick(email)\">Submit</button>\n              </ion-content>\n  "
                },] },
    ];
    /** @nocollapse */
    EmailGetterComponent.ctorParameters = function () { return [
        { type: ionicAngular.NavParams, },
        { type: ionicModalHelper_ionicModalHelper_service.IonicModalHelperSrv, },
    ]; };
    return EmailGetterComponent;
}());

// ysp your server part
// this part includes 
// request your server for access token
// by using this token u do calls on your server like getProfile/profileId and that token in request header that implies requesting user is autherized
// /api/justbe/generateJusteBeToken
var Ysp = (function () {
    function Ysp(_rst, _ionicModalHelperSrv) {
        this._rst = _rst;
        this._ionicModalHelperSrv = _ionicModalHelperSrv;
    }
    Ysp.prototype.execute = function (_circular, success, error) {
        var _this = this;
        this.setLcircular(_circular, success, error);
        // profile iamge related
        // this section is all related to what to do after i got profile
        // so social sites gives images of account in profile that we got from ssp
        // so we need to upload that image to our server and after successfull upload server responds us with image url which is on our server
        // so this image url i have to give in json of just be profile
        // but whenever user logs in this cycle repeats means with every login we are uploading a image which is ideally not good
        // do here image related stuff
        // this._imageMan.execute(success,error);
        this.lCircular.justbeProfile = new JustbeProfile(_circular, this.lCircular);
        if (this.validation(this.lCircular.justbeProfile)) {
            this.getJustbeAccessToken(this.lCircular.params)
                .subscribe(function (justbeAccessToken) {
                _this.lCircular.success(justbeAccessToken);
            });
        }
        else {
            this._ionicModalHelperSrv.raiseModal(EmailGetterComponent, { afterSelectEmail: this.afterEmailSelect.bind(this), profile: this.lCircular.justbeProfile });
        }
    };
    Ysp.prototype.setLcircular = function (_circular, success, error) {
        this.lCircular = new Array();
        this.lCircular.success = success;
        this.lCircular.error = error;
        this.lCircular._circular = _circular;
        this.lCircular.params = new angularxRestful_classes_restParams.RestParams();
        this.lCircular.params.uri = Uris.genJustbeAccessToken;
    };
    Ysp.prototype.getJustbeAccessToken = function (restParams) {
        var _this = this;
        restParams.payload = this.lCircular.justbeProfile;
        return this._rst.post(restParams).map(function (res) {
            return JSON.parse(res._body);
        }, function (err) {
            _this.lCircular._circular.error(err);
        });
    };
    Ysp.prototype.validation = function (justbeProfile) {
        return justbeProfile.profileVO.emails.length > 0 ? true : false;
    };
    Ysp.prototype.afterEmailSelect = function (email) {
        var _this = this;
        this.lCircular.params.payload = this.lCircular.justbeProfile;
        this.lCircular.params.payload.profileVO.emails.push(email);
        this.getJustbeAccessToken(this.lCircular.params)
            .subscribe(function (justbeAccessToken) {
            _this.lCircular.success(justbeAccessToken);
        });
    };
    Ysp.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    Ysp.ctorParameters = function () { return [
        { type: angularxRestful_srv_rest_service.RestService, },
        { type: ionicModalHelper_ionicModalHelper_service.IonicModalHelperSrv, },
    ]; };
    return Ysp;
}());

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
        var toast = new ionicToastHelper_toast.Toast();
        toast.message = 'Login Successful';
        toast.position = 'bottom';
        this._ionicToastHelperSrv.raiseToast(toast, function () { });
    };
    LoginService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    LoginService.ctorParameters = function () { return [
        { type: Ssp, },
        { type: Ysp, },
        { type: _ionicNative_nativeStorage.NativeStorage, },
        { type: ionicToastHelper_ionicToastHelper_service.IonicToastHelperSrv, },
    ]; };
    return LoginService;
}());

var EmailGetterComponentModule = (function () {
    function EmailGetterComponentModule() {
    }
    EmailGetterComponentModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: [
                        EmailGetterComponent,
                    ],
                    imports: [
                        ionicAngular.IonicModule,
                    ],
                    exports: [
                        EmailGetterComponent
                    ],
                    entryComponents: [EmailGetterComponent]
                },] },
    ];
    /** @nocollapse */
    EmailGetterComponentModule.ctorParameters = function () { return []; };
    return EmailGetterComponentModule;
}());

var IonicLogin = (function () {
    function IonicLogin() {
    }
    IonicLogin.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule, angularxRestful.AngularxRestful, EmailGetterComponentModule],
                    providers: [LoginService, _ionicNative_facebook.Facebook, _ionicNative_googlePlus.GooglePlus, angularxRestful_srv_rest_service.RestService, Ssp, Ysp, ProfileStabilizer, _ionicNative_nativeStorage.NativeStorage]
                },] },
    ];
    /** @nocollapse */
    IonicLogin.ctorParameters = function () { return []; };
    return IonicLogin;
}());

exports.IonicLogin = IonicLogin;
exports.EmailGetterComponent = EmailGetterComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
