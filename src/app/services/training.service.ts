import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class TrainingService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/training', http);
  }

  public signOff$(TrainingDate: string): Observable<any> {
    return this.http.post(environment.baseUrl + '/training/signoff', {'Date': TrainingDate} )
    .pipe(
      retry(1),
      map(data => {

        return data;
      }),
      tap( // Log the result or error
        data => console.log('Received: ', data),
        error => console.log('Oeps: ', error)
      ),
   );
  }

}



