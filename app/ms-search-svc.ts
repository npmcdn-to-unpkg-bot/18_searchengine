import {Injectable} from "@angular/core";
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// Statics
import 'rxjs/add/observable/throw';

import {MsBudget} from "./ms-budget";
import {MsCartItem} from "./ms-cart-item";

@Injectable()
export class MsSearchSvc{
    constructor (private http: Http) {}
    private svcUrl = 'http://localhost:3000/cart-items?_limit=5'; 

    getList (aBudget: MsBudget): Observable<MsCartItem[]> {
        console.log('getList: ',aBudget, JSON.stringify(aBudget));
        var headers = new Headers();
        let search: URLSearchParams = new URLSearchParams();
        search.set('budget', JSON.stringify(aBudget));
        //headers.append('x-api-key', 'ezjIkkJORt1W3kkfxbGd14hLaUdkSpmY8L3LQIvp');
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        
        // TODO: usare aBudget
        return this.http.get(this.svcUrl, { headers, search})
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        console.log("extractData:",body);
        
        return body || [];
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error('handleError:',error); // log to console instead
        return Observable.throw(errMsg);
    }

    get colNames():string[]{
        const anItem = new MsCartItem(0,'',0.0);
        var cols : string[] = [];
        for (var x in anItem) cols.push(x);
        return cols;
    }

    
}