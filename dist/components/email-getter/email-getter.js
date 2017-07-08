import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
var EmailGetterComponent = (function () {
    function EmailGetterComponent(_navParams, _ionicModalHelperSrv) {
        this._navParams = _navParams;
        this._ionicModalHelperSrv = _ionicModalHelperSrv;
        console.log(_navParams.data.afterSelectEmail);
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
                    templateUrl: 'email-getter.html'
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