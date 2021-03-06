// ysp your server part
// this part includes 
// request your server for access token
// by using this token u do calls on your server like getProfile/profileId and that token in request header that implies requesting user is autherized
// /api/justbe/generateJusteBeToken
import { Injectable } from '@angular/core';
import { Uris } from '../classes/uris';
import { JustbeProfile } from '../classes/justbe/justbe-profile';
import { RestService } from 'angularx-restful/srv/rest.service';
import { RestParams } from 'angularx-restful/classes/rest-params';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
import { EmailGetterComponent } from '../components/email-getter/email-getter';
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
        this.lCircular.params = new RestParams();
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
        { type: Injectable },
    ];
    /** @nocollapse */
    Ysp.ctorParameters = function () { return [
        { type: RestService, },
        { type: IonicModalHelperSrv, },
    ]; };
    return Ysp;
}());
export { Ysp };
//# sourceMappingURL=ysp.service.js.map