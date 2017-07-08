import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../srvs/ionic-login.service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularxRestful } from 'angularx-restful';
import { RestService } from 'angularx-restful/srv/rest.service';
import { Ssp } from '../srvs/ssp.service';
import { Ysp } from '../srvs/ysp.service';
import { ProfileStabilizer } from '../srvs/profile-stabilizer.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { EmailGetterComponent } from '../components/email-getter/email-getter';
@NgModule({
  declarations: [EmailGetterComponent],
  entryComponents: [EmailGetterComponent],
  imports: [CommonModule,AngularxRestful],
  providers: [LoginService,Facebook,GooglePlus,RestService,Ssp,Ysp,ProfileStabilizer,NativeStorage]
})
export class IonicLogin {}