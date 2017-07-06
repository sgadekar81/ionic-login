//ssp social server part(this service is part of)
// as different social server returns theire profile in slightly different format
// ex fb has 'id' in their public profile object
// while google has 'Uid'
// so this service stabilizes the profile so that any server(ysp) can consume it
import { Injectable } from '@angular/core';
import { StabilizedProfile } from '../classes/stabilised-profile'
@Injectable()
export class ProfileStabilizer {
    constructor(){}
    getStabilizedProfile(_circular:any,profile:any){
        switch(_circular.loginType){
            case 'facebook': return new StabilizedProfile(profile.first_name,profile.last_name,this.getFbProfileImg(profile),profile.email,profile.id,profile.gender);
            case 'google': return new StabilizedProfile(profile.givenName,profile.familyName,profile.imageUrl,profile.email,profile.userId,profile.gender);
        }
    }




    // conditions
    // profile fb
    getFbProfileImg(profile:any){
        return profile.picture && profile.picture.data && profile.picture.data.url ? profile.picture.data.url : console.log('no image found for fb profile//missing from facebook only')
    }
    

}