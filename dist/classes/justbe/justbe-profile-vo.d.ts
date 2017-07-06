import { JustbeImage } from './justbe-image';
export declare class JustbeProfileVo {
    userVerified: boolean;
    firstName: string;
    lastName: string;
    nickName: string;
    emails: string[];
    _images: JustbeImage[];
    dob: Date;
    gender: number;
    constructor(userVerified?: boolean, firstName?: string, lastName?: string, emails?: string[], images?: string[], dob?: Date, gender?: string);
}
