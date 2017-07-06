import { AppSettings } from '../appSettings';
var Uris = (function () {
    function Uris() {
    }
    Uris.getFbProfile = 'https://graph.facebook.com/v2.8/me?fields=first_name,last_name,gender,picture.width(500).height(500),birthday,email&access_token=';
    // public static get_ggpProfile:string = ''
    Uris.genJustbeAccessToken = AppSettings.API_ENDPT + '/api/justbe/generateJusteBeToken';
    return Uris;
}());
export { Uris };
//# sourceMappingURL=uris.js.map