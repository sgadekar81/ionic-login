import { RestService } from 'angularx-restful/srv/rest.service';
export declare class Ysp {
    private _rst;
    constructor(_rst: RestService);
    lCircular: any;
    execute(_circular: any, success: Function, error: Function): void;
    private setLcircular(_circular, success, error);
    private getJustbeAccessToken(restParams);
}
