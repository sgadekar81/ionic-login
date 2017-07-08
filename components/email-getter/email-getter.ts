import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { IonicModalHelperSrv } from 'ionic-modal-helper/ionic-modal-helper.service';
@Component({
  selector: 'email-getter',
  templateUrl: 'email-getter.html'
})
export class EmailGetterComponent {

  validationMsg: string;

  constructor(public _navParams: NavParams,private _ionicModalHelperSrv:IonicModalHelperSrv) {
    console.log(_navParams.data.afterSelectEmail);
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
