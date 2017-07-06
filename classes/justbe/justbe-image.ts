export class JustbeImage{
    defaultImage:boolean;
    imageUrl:string;

    constructor(imageUrl:string,defaultImage:boolean){
        imageUrl ? this.imageUrl = imageUrl : null;
        defaultImage ? this.defaultImage = true : this.defaultImage = false;
    }
}