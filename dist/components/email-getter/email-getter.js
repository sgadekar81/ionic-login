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
                    template: "\n                <ion-header>\n  \n                </ion-header>\n                <ion-content padding>\n  \n                  <div style=\"text-align: center;\">\n                    <img [src]=\"profile.profileVO._images[0].imageUrl\"  style=\"width: 150px;\">\n                    <h1>{{profile.profileVO.firstName}} {{profile.profileVO.lastName}}</h1>\n                  </div>\n                  <ion-list>\n                    <ion-item>\n                      <ion-input type=\"text\" placeholder=\"enter your email\" [(ngModel)]=\"email\"></ion-input>\n                    </ion-item>\n                    <span style=\"color:red\">{{validationMsg}}</span>\n\n                  </ion-list>\n              <button ion-button (click)=\"onSubmitClick(email)\">Submit</button>\n              </ion-content>\n  "
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