import { NavParams } from 'ionic-angular';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
export declare class EmailGetterComponent {
    _navParams: NavParams;
    private _ionicModalHelperSrv;
    validationMsg: string;
    constructor(_navParams: NavParams, _ionicModalHelperSrv: IonicModalHelperSrv);
    onSubmitClick(email: string): void;
    basicValidateEmail(email: string): boolean;
}
