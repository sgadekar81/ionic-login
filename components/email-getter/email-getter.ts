import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
@Component({
  selector: 'email-getter',
  template: `
                <ion-header>
  
                </ion-header>
                <ion-content padding>
  
                  <div style="text-align: center;">
                    <img [src]="profile.profileVO._images[0].imageUrl"  style="width: 150px;">
                    <h1>{{profile.profileVO.firstName}} {{profile.profileVO.lastName}}</h1>
                  </div>
                  <ion-list>
                    <ion-item>
                      <ion-input type="text" placeholder="enter your email" [(ngModel)]="email"></ion-input>
                    </ion-item>
                    <span style="color:red">{{validationMsg}}</span>

                  </ion-list>
              <button ion-button (click)="onSubmitClick(email)">Submit</button>
              </ion-content>
  `
})
export class EmailGetterComponent {

  validationMsg: string;
  profile:any
  constructor(public _navParams: NavParams,private _ionicModalHelperSrv:IonicModalHelperSrv) {
    console.log(_navParams.data.afterSelectEmail);
    console.log(_navParams.data.profile);
    this.profile = _navParams.data.profile
  }
  onSubmitClick(email:string){
    if(this.basicValidateEmail(email)){
      if(this._navParams.data && this._navParams.data.afterSelectEmail){
        this._navParams.data.afterSelectEmail(email);
        this._ionicModalHelperSrv.closeModal();
      }else{
        console.error('pass callback function to component, what to do after clicking on submit');
      }
    }else{
      this.validationMsg = 'Invalid Email';
    }
  }
  basicValidateEmail(email:string){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
