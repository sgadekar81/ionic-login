import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EmailGetterComponent } from './email-getter';

@NgModule({
  declarations: [
    EmailGetterComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    EmailGetterComponent
  ]
})
export class EmailGetterComponentModule {}
