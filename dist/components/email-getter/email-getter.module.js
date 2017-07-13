import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EmailGetterComponent } from './email-getter';
var EmailGetterComponentModule = (function () {
    function EmailGetterComponentModule() {
    }
    EmailGetterComponentModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        EmailGetterComponent,
                    ],
                    imports: [
                        IonicModule,
                    ],
                    exports: [
                        EmailGetterComponent
                    ],
                    entryComponents: [EmailGetterComponent]
                },] },
    ];
    /** @nocollapse */
    EmailGetterComponentModule.ctorParameters = function () { return []; };
    return EmailGetterComponentModule;
}());
export { EmailGetterComponentModule };
//# sourceMappingURL=email-getter.module.js.map