import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from '../srv/rest.service';
var AngularxRestful = (function () {
    function AngularxRestful() {
    }
    AngularxRestful.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    providers: [RestService]
                },] },
    ];
    /** @nocollapse */
    AngularxRestful.ctorParameters = function () { return []; };
    return AngularxRestful;
}());
export { AngularxRestful };
//# sourceMappingURL=angularx-restful.module.js.map