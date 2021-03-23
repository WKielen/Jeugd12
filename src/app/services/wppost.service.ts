import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WordpressService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/wppost', http);
  }

  getLast5$() {
    return this.http.get(this.url + '/lastfive')
    .pipe(
      retry(3),
      tap( // Log the result or error
        data => console.log('Received: ', data),
        error => console.log('Oeps: ', error)
      )
    );
  }

}

export interface ISignoffRecord {
  Date:string;
  Reason: string;
}



/***************************************************************************************************
/
/***************************************************************************************************/
export class TrainingDag {
  public Id: string = '';
  public Datum: string;
  public Value: string = '';  // Must be a list of TrainingItem

  constructor(datum?: Date) {
    this.Datum = (datum?? new Date()).to_YYYY_MM_DD();
  }
}

/***************************************************************************************************
/ A item in the list of TrainingsDagen
/***************************************************************************************************/
export class TrainingItem {
  public static readonly AFWEZIG = 0;
  public static readonly AANWEZIG = 1;
  public static readonly AFGEMELD = 2;

  LidNr: number = 0;
  State?: number = 0;
  Reason?: string = '';

  constructor(){
    this.State = TrainingItem.AFWEZIG;
  }
}




