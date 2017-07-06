import { JustbeImage } from './justbe-image';
var JustbeProfileVo = (function () {
    function JustbeProfileVo(userVerified, firstName, lastName, emails, images, dob, gender) {
        userVerified ? this.userVerified = userVerified : null;
        firstName ? this.firstName = firstName : null;
        lastName ? this.lastName = lastName : null;
        if (firstName && lastName) {
            // this.nickName = firstName + ' ' + lastName
        }
        emails ? this.emails = emails : null;
        if (images && images[0]) {
            this._images = new Array();
            this._images.push(new JustbeImage(images[0], true));
        }
        dob ? this.dob = dob : null;
        if (gender === 'male') {
            this.gender = 0;
        }
        else if (gender === 'female') {
            this.gender = 1;
        }
    }
    return JustbeProfileVo;
}());
export { JustbeProfileVo };
//# sourceMappingURL=justbe-profile-vo.js.map