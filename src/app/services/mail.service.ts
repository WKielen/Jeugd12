import { environment } from '../../environments/environment';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { retry, tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
// import { ParamService } from './param.service';
import { AppError } from '../shared/error-handling/app-error';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class MailService extends DataService {

  public mailBoxParam = new MailBoxParam();

  constructor(
    http: HttpClient,
    protected authService: AuthService,
    // De inject is om door een param door te geven aan de MailService vanuit een component
    // Dit lukt nog niet.
    @Inject('param') @Optional() public useServerSideParams: string
    ) {
    super(environment.baseUrl + '/param', http);
  }

  /***************************************************************************************************
  / Send a mail
  /***************************************************************************************************/
  mail$(mailItems: MailItem[] ): Observable<Object> {
    let externalRecord = new ExternalMailApiRecord();
    externalRecord.UserId = this.mailBoxParam.UserId;
    externalRecord.Password = this.mailBoxParam.Password;
    externalRecord.From = this.mailBoxParam.UserId;
    externalRecord.FromName = this.mailBoxParam.Name;
    externalRecord.MailItems = mailItems;

    return this.http.post(environment.baseUrl + '/mail/sendmail', JSON.stringify(externalRecord))
      .pipe(
        retry(1),
        tap({
          next: data => console.log('Received: ', data),
          error: error => console.log('Oeps: ', error)
        }),
        catchError(this.errorHandler)
      );
  }
}

/***************************************************************************************************
/ This record is sent to the mail API
/***************************************************************************************************/
export class ExternalMailApiRecord {
  UserId: string = '';
  Password: string = '';
  From: string = '';
  FromName: string = '';
  MailItems: MailItem[] = [];
}

/***************************************************************************************************
/ An email
/***************************************************************************************************/
export class MailItem {
  To: string = '';
  ToName: string = '';
  // CC: string = '';
  // BCC: string = '';
  Subject: string = '';
  Message: string = '';
}

/***************************************************************************************************
/ This record is stored in the Param table as value of a param record
/***************************************************************************************************/
export class MailBoxParam {
  UserId: string = '';
  Password: string = '';
  Name: string = '';
}
