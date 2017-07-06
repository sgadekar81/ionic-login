import { JustbeImage } from './justbe-image'
export class JustbeProfileVo{
    userVerified:boolean;
    firstName:string;
    lastName:string;
    nickName:string;
    emails:string[];
    _images:JustbeImage[];
    dob:Date;
    gender:number;

    constructor(userVerified?:boolean,
        firstName?:string,
        lastName?:string,
        emails?:string[],
        images?:string[],
        dob?:Date,
        gender?:string){

            userVerified ? this.userVerified = userVerified : null;
            firstName ? this.firstName = firstName : null;
            lastName ? this.lastName = lastName : null;
            if(firstName && lastName){
                // this.nickName = firstName + ' ' + lastName
            }
            emails ? this.emails = emails :null;
            if(images && images[0]){
                this._images = new Array()
                this._images.push(new JustbeImage(images[0],true));
            }
            dob ? this.dob = dob : null;
            if(gender === 'male'){
                this.gender = 0;
            }else if(gender === 'female'){
                this.gender = 1;
            }
            
        }
}