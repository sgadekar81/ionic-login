import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { RestService } from 'angularx-restful/srv/rest.service';
import { ProfileStabilizer } from './profile-stabilizer.service';
export declare class Ssp {
    private _rst;
    private _fb;
    private _ggp;
    private _profileStabilizer;
    constructor(_rst: RestService, _fb: Facebook, _ggp: GooglePlus, _profileStabilizer: ProfileStabilizer);
    lCircular: any;
    execute(_circular: any, success: Function, error: Function): void;
    private get_fbProfile(response);
    private getProfile(restParams);
    private setLcircular(_circular, success, error);
    stabilizeProfile(profile: any): void;
    private emitOutput(profile);
    fbLogin(): void;
    ggpLogin(): void;
}
