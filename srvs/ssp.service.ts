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

@Injectable()
export class Ssp {
    constructor(private _rst:RestService,private _fb:Facebook,private _ggp:GooglePlus,private _profileStabilizer:ProfileStabilizer){}
    lCircular:any;
    execute(_circular:any,success:Function, error:Function){
        this.setLcircular(_circular,success, error);
        switch(_circular.loginType){
            case 'facebook': return this.fbLogin();
            case 'google': return this.ggpLogin();
        }
    }
    private get_fbProfile(response:any){
        this.lCircular.params = new RestParams();
        this.lCircular.params.uri = Uris.getFbProfile+response.authResponse.accessToken
        this.getProfile(this.lCircular.params).subscribe((fbProfile)=>{
            this.stabilizeProfile(fbProfile)
        })
    }
    private getProfile(restParams:RestParams){
        return this._rst.get(restParams).map((response)=>{
            return JSON.parse(response._body);
        },(err:any)=>{
            return err;
        })
    }
    
    private setLcircular(_circular:any,success:Function, error:Function){
        this.lCircular = new Object();
        this.lCircular.success = success;
        this.lCircular.error = error;
        this.lCircular._circular = _circular;
    }
    // this method stabilizes profile and emit output
    stabilizeProfile(profile:any){
        let stabilizedProfile = this._profileStabilizer.getStabilizedProfile(this.lCircular._circular, profile);
        this.emitOutput(stabilizedProfile);
    }
    private emitOutput(profile:any){
        // this gives profile back to its caller
        this.lCircular.success(profile);
    }
    fbLogin(){
        this._fb.login(['public_profile', 'email']).then((authResponse=>{
            this.get_fbProfile(authResponse)
        }),(err)=>{
            this.lCircular._circular.error(err);
        });
    }
    ggpLogin(){
        this._ggp.login({}).then((googleProfile=>{
            this.stabilizeProfile(googleProfile);
        }),(err)=>{
            this.lCircular._circular.error(err);
        });
    }

}