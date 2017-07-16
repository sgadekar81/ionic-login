import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
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
        { type: Component, args: [{
                    selector: 'email-getter',
                    template: "\n  <ion-header>\n    <ion-title>Enter Email</ion-title>\n  </ion-header>\n<ion-content class=\"app-bg-color\">\n  <ion-grid>\n    <ion-row text-center>\n      <ion-col text-center col-12 class=\"profilesetting-img\">\n        <img [src]=\"profile.profileVO._images[0].imageUrl\">\n        <h1>{{profile.profileVO.firstName}} {{profile.profileVO.lastName}}</h1>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-card padding>\n      <ion-list margin-bottom>\n        <ion-item>\n          <ion-input type=\"text\" placeholder=\"enter your email\" [(ngModel)]=\"email\"></ion-input>\n          <span style=\"color:red\">{{validationMsg}}</span>\n        </ion-item>\n      </ion-list>\n      <button  block ion-button  small item-end icon-left  color=\"primary\" (click)=\"onSubmitClick(email)\">\n        Submit\n      </button>  \n  </ion-card>     \n</ion-content>\n  "
                },] },
    ];
    /** @nocollapse */
    EmailGetterComponent.ctorParameters = function () { return [
        { type: NavParams, },
        { type: IonicModalHelperSrv, },
    ]; };
    return EmailGetterComponent;
}());
export { EmailGetterComponent };
//# sourceMappingURL=email-getter.js.map