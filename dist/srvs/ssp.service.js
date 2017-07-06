//ssp social server part
// this part includes 
// request social server for getting access token //this part is already done by facebook and google cordova ionic plugins//in future can think of removing these dependency
// from that access token get user public profile
// _fb=>facebook _ggp=>googleplus
// work for improved error handling
import { Injectable } from '@angular/core';
import { Uris } from '../classes/uris';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { RestService } from 'angularx-restful/srv/rest.service';
import { RestParams } from 'angularx-restful/classes/rest-params';
import { ProfileStabilizer } from './profile-stabilizer.service';
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
        this.lCircular.params = new RestParams();
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
        { type: Injectable },
    ];
    /** @nocollapse */
    Ssp.ctorParameters = function () { return [
        { type: RestService, },
        { type: Facebook, },
        { type: GooglePlus, },
        { type: ProfileStabilizer, },
    ]; };
    return Ssp;
}());
export { Ssp };
//# sourceMappingURL=ssp.service.js.map