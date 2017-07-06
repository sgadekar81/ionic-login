export class StabilizedProfile{
    firstName:string;
    lastName:string;
    images:string[];
    emails:string[];
    id:string;
    gender:string;
    constructor( firstName?:string,lastName?:string,image?:string,email?:string,id?:string,gender?:string){
        this.images = new Array();
        this.emails = new Array();
        firstName ? this.firstName = firstName: null;
        lastName ? this.lastName  = lastName: null;
        image ? this.images.push(image): null;
        email ? this.emails.push(email) :null;
        id ? this.id = id: null;
        gender ? this.gender = gender : null;
    }
}