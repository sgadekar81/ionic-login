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
@Injectable()
export class Ysp {
    constructor(private _rst:RestService,
    private _ionicModalHelperSrv:IonicModalHelperSrv
    ){}
    lCircular:any;
    execute(_circular:any,success:Function, error:Function){
        this.setLcircular(_circular,success, error);

        // profile iamge related
        // this section is all related to what to do after i got profile
        // so social sites gives images of account in profile that we got from ssp
        // so we need to upload that image to our server and after successfull upload server responds us with image url which is on our server
        // so this image url i have to give in json of just be profile
        // but whenever user logs in this cycle repeats means with every login we are uploading a image which is ideally not good

        // do here image related stuff
        
        // this._imageMan.execute(success,error);

        this.lCircular.justbeProfile = new JustbeProfile(_circular,this.lCircular);
        if(this.validation(this.lCircular.justbeProfile)){
            this.getJustbeAccessToken(this.lCircular.params)
            .subscribe((justbeAccessToken:any)=>{
                this.lCircular.success(justbeAccessToken);
            })
        }else{
            this._ionicModalHelperSrv.raiseModal(EmailGetterComponent,{afterSelectEmail:this.afterEmailSelect.bind(this)})
        }
    }
    private setLcircular(_circular:any,success:Function, error:Function){
        this.lCircular = new Array();
        this.lCircular.success = success;
        this.lCircular.error = error;
        this.lCircular._circular = _circular;
        this.lCircular.params = new RestParams();
        this.lCircular.params.uri = Uris.genJustbeAccessToken;
    }
    private getJustbeAccessToken(restParams:RestParams){
        restParams.payload = this.lCircular.justbeProfile;
        return this._rst.post(restParams).map((res:any)=>{
            return JSON.parse(res._body);
        },(err:any)=>{
            this.lCircular._circular.error(err);
        })
    }
    private validation(justbeProfile:JustbeProfile){
        return justbeProfile.profileVO.emails.length>0 ? true : false
    }
    private afterEmailSelect(email:string){
        this.lCircular.params.payload.justbeProfile.profileVO.emails.push(email);
        this.getJustbeAccessToken(this.lCircular.params)
            .subscribe((justbeAccessToken:any)=>{
                this.lCircular.success(justbeAccessToken);
            })
    }
    
}