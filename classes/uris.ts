import { AppSettings } from '../appSettings';
export class Uris{
    public static getFbProfile:string = 'https://graph.facebook.com/v2.8/me?fields=first_name,last_name,gender,picture.width(500).height(500),birthday,email&access_token=';
    // public static get_ggpProfile:string = ''
    public static genJustbeAccessToken:string = AppSettings.API_ENDPT+ '/api/justbe/generateJusteBeToken';
}