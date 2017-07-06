import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { RestParams } from '../classes/rest-params';
export declare class RestService {
    private http;
    constructor(http: Http);
    get(params: RestParams): Observable<any>;
    post(params: RestParams): Observable<any>;
    put(params: RestParams): Observable<any>;
    delete(params: RestParams): Observable<any>;
    private extractData(res);
    private handleError(error);
}
