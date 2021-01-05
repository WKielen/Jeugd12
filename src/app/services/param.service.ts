import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class ParamService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/param', http);
  }

  /***************************************************************************************************
  / Read the Parameter.
  /***************************************************************************************************/
  readParamData$(Id: string): Observable<string>{
    return this.http.get(environment.baseUrl + "/param/get?Id='" + Id + "'")
      .pipe(
        map(response => {
          return atob((response as IParamItem).Value);      // atob  = decrypt
        }),
        tap(
          data => console.log('Received: ', data),
          error => {
            console.log('Not found: ', error)
          }
        ),

        catchError(this.errorHandler)
      );
  }

  /***************************************************************************************************
  / Create a Parameter in the database
  /***************************************************************************************************/
  // createParamData$(Id: string, Value: any, Description: string): Observable<Object> {
  //   let paramItem = new ParamItem();
  //   paramItem.Id = Id;

  //   paramItem.Value = btoa(Value ? Value : '');     // btoa = encrypt
  //   paramItem.Description = Description ? Description : '';

  //   return this.create$(paramItem);
  // }

  /***************************************************************************************************
  / The Update statement of a param
  /***************************************************************************************************/
  // saveParamData$(Id: string, Value: any, Description: string): Observable<Object> {
  //   let paramItem = new ParamItem();
  //   paramItem.Id = Id;
  //   paramItem.Value = btoa(Value);
  //   paramItem.Description = Description ? Description : '';

  //   return super.update$(paramItem);
  // }
}

/***************************************************************************************************
/ Record for the database
/***************************************************************************************************/
export interface IParamItem {
  Id: string;
  Value: string;
  Description: string;
}

export interface IWebsiteText {
  Header: string;
  Text: string;
  StartDate: string;
  EndDate: string;
}