import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IType } from './type';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

@Injectable()
export class TypeService {
  private baseUrl = 'api/types';
  constructor(private _http: HttpClient) { }

  obtenirTypes(): Observable<IType[]> {
    return this._http.get<IType[]>(this.baseUrl).do(data => console.log('obtenirTypes: ' + JSON.stringify(data))).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse){
    console.error(err.error);
    return Observable.throw(err.message);
  }

}
