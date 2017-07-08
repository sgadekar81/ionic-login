import { RestService } from 'angularx-restful/srv/rest.service';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
export declare class Ysp {
    private _rst;
    private _ionicModalHelperSrv;
    constructor(_rst: RestService, _ionicModalHelperSrv: IonicModalHelperSrv);
    lCircular: any;
    execute(_circular: any, success: Function, error: Function): void;
    private setLcircular(_circular, success, error);
    private getJustbeAccessToken(restParams);
    private validation(justbeProfile);
    private afterEmailSelect(email);
}
