import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { ROLES } from './website.service';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { LedenItem, LedenService } from './leden.service';
import { AppError } from '../shared/error-handling/app-error';
import { BaseComponent } from '../shared/base.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseComponent{

  constructor(
    private http: HttpClient,
    public ledenService: LedenService
  ) {
    super();
  }

  jwtHelper: JwtHelperService = new JwtHelperService();
  public lid?: LedenItem;
// KeepSignIn wordt door het backend geregeld door een x tijd op te tellen bij de expdate

  login$(credentials: ICredentials): Observable<boolean> {
    credentials.password = <string>Md5.hashStr(credentials.password);
    return this.http.post<string>(environment.loginUrl, credentials)
      .pipe(
        map((response: unknown) => {
          let localData = response as IToken;

          if (localData && localData.Token) {
            // We kunnen alleen inloggen als er een rol is. Ingebouwd omdat ik andere rollen wil gebruiken voor de jeugdapp.
            const localRoles = this.jwtHelper.decodeToken(localData.Token).role;
            if (localRoles.indexOf(ROLES.BESTUUR) === -1 && localRoles.indexOf(ROLES.JC) === -1 && localRoles.indexOf(ROLES.TRAINER) === -1 &&
            localRoles.indexOf(ROLES.JEUGD) === -1 && localRoles.indexOf(ROLES.SENIOR) === -1 && localRoles.indexOf(ROLES.ADMIN) === -1 &&
            localRoles.indexOf(ROLES.TEST) === -1 ) return false;

            localStorage.removeItem('ledenapptoken');
            localStorage.setItem('ledenapptoken', localData.Token);

            return true;
          }
          return false;
        })
      );
  }

  /***************************************************************************************************
  / Lees het record uit de Leden tabel
  /***************************************************************************************************/
  // private readLid(): Subscription {
  //     return this.ledenService.readLid$(this.LidNr)
  //       .subscribe(data => {
  //       },
  //         (error: AppError) => {
  //           console.log("error", error);
  //         }
  //       )
  // }

  logOff() {
    localStorage.removeItem('ledenapptoken');
  }

  isLoggedIn() {
    const token = localStorage.getItem('ledenapptoken');
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  get userId() {
    const token:string = localStorage.getItem('ledenapptoken') ?? '';
    if (!this.token) {
      return false;
    }
    const jsonToken = this.jwtHelper.decodeToken(token);
    return jsonToken.userid;
  }

  get LidNr() {
    const token = localStorage.getItem('ledenapptoken') ?? '';
    if (!this.token) {
      return false;
    }
    const jsonToken = this.jwtHelper.decodeToken(token);
    return jsonToken.lidnr;
  }

  get fullName() {
    const token:string = localStorage.getItem('ledenapptoken') ?? '';
    if (!this.token) {
      return false;
    }
    const jsonToken = this.jwtHelper.decodeToken(token);

    let name = jsonToken.firstname;
    if (jsonToken.prefix) {
      name += ' ' + jsonToken.prefix;
    }
    name += ' ' + jsonToken.lastname;
    return name;
  }

  get firstname() {
    const token = localStorage.getItem('ledenapptoken') ?? '';
    if (!this.token) {
      return false;
    }
    const jsonToken = this.jwtHelper.decodeToken(token);
    return jsonToken.firstname;
  }

  // property roles
  get roles() {
    const token = localStorage.getItem('ledenapptoken') ?? '';
    if (!this.token) {
      return '';
    }
    const jsonToken = this.jwtHelper.decodeToken(token);
    return jsonToken.role;
  }

  isRole(role: string): boolean {
    return this.roles.indexOf(role) !== -1
  }

  get token() {
    return localStorage.getItem('ledenapptoken');
  }

}

export interface ICredentials {
  userid: string;
  password: string;
  database: string;
  keepsignedin: string;
}

export interface IToken {
  Token: string;
}
