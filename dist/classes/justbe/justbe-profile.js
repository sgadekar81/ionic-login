import { JustbeProfileVo } from './justbe-profile-vo';
var JustbeProfile = (function () {
    function JustbeProfile(_circular, lCircular) {
        var vals = this.getVals(_circular);
        this.profileType = vals.profileType;
        this.openProfileId = vals.openProfileId;
        this.profileVO = new JustbeProfileVo(false, _circular.profile.firstName, _circular.profile.lastName, _circular.profile.emails, _circular.profile.images, _circular.profile.dob, _circular.profile.gender);
    }
    JustbeProfile.prototype.getVals = function (_circular) {
        switch (_circular.loginType) {
            // since the field for user id in different socialite is different 
            // for ex facebook has field name as id and google has userId
            //so we may need this id //for accessing it this different method is used
            case 'facebook': return { profileType: 'FacebookProfile', openProfileId: 'FacebookProfile#' + _circular.profile.id };
            case 'google': return { profileType: 'Google2Profile', openProfileId: 'Google2Profile#' + _circular.profile.id };
            default: return { profileType: '', openProfileId: '' };
        }
    };
    return JustbeProfile;
}());
export { JustbeProfile };
//# sourceMappingURL=justbe-profile.js.map