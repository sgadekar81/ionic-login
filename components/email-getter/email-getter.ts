import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
@Component({
  selector: 'email-getter',
  template: `


  <ion-header>
    <ion-title>Enter Email</ion-title>
  </ion-header>

<ion-content class="app-bg-color">
  <ion-grid>
    <ion-row text-center>
      <ion-col text-center col-12 class="profilesetting-img">
        <img [src]="profile.profileVO._images[0].imageUrl">
        <h1>{{profile.profileVO.firstName}} {{profile.profileVO.lastName}}</h1>
      </ion-col>
    </ion-row>
  </ion-grid>
  <ion-card padding>
    
      <ion-list margin-bottom>
        <ion-item>
          <ion-input type="text" placeholder="enter your email" [(ngModel)]="email"></ion-input>
          <span style="color:red">{{validationMsg}}</span>
        </ion-item>
      </ion-list>
      <button  block ion-button  small item-end icon-left  color="primary" (click)="onSubmitClick(email)">
        Submit
      </button>  
    
  </ion-card>     
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
