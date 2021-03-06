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

export class AuthService extends BaseComponent {

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
              localRoles.indexOf(ROLES.TEST) === -1) return false;

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
    const token: string = localStorage.getItem('ledenapptoken') ?? '';
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
    const token: string = localStorage.getItem('ledenapptoken') ?? '';
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

  /***************************************************************************************************
  / Onderstaande code heb ik een keer gevonden toen ik met de install knop bezig was op mobile deivces.
  / Kan nog wel eens van pas komen om uit te zoeken op welk device je actief bent.
  /***************************************************************************************************/

  promptIntercepted = false;
  isStandalone = false;
  deferredPrompt:any;
  userInstalled = false;
  whereIsShare = 'bottom';

  // user agent
  isChrome = false;
  isExplorer = false;
  isExplorer_11 = false;
  isFirefox = false;
  isSafari = false;
  isOpera = false;
  isEdgeDesktop = false;
  isEdgeiOS = false;
  isEdgeAndroid = false;
  userAgent = '';

  isIOS = false;
  isMobile = false;

  // For testing debug display only
  promptSaved = false;
  customButtonClicked = false;
  deferredPromptShown = false;
  deferredPromptRejected = false;

  checkUserAgent() {
    this.userAgent = navigator.userAgent.toLowerCase();
    const uaString = this.userAgent;

    this.isChrome = /chrome/.test(uaString);
    this.isExplorer = /msie/.test(uaString);
    this.isExplorer_11 = /rv:11/.test(uaString);
    this.isFirefox = /firefox/.test(uaString);
    this.isSafari = /safari/.test(uaString);
    this.isOpera = /opr/.test(uaString);
    this.isEdgeDesktop = /edge/.test(uaString);
    this.isEdgeiOS = /edgios/.test(uaString);
    this.isEdgeAndroid = /edga/.test(uaString);

    this.isIOS = /ipad|iphone|ipod/.test(uaString);
    this.isMobile = /mobile/.test(uaString);
    if ((this.isChrome) && (this.isSafari)) { this.isSafari = false; }
    if ((this.isChrome) && ((this.isEdgeDesktop) ||
      (this.isEdgeiOS) ||
      (this.isEdgeAndroid))) { this.isChrome = false; }
    if ((this.isSafari) && ((this.isEdgeDesktop) ||
      (this.isEdgeiOS) ||
      (this.isEdgeAndroid))) { this.isSafari = false; }
    if ((this.isChrome) && (this.isOpera)) { this.isChrome = false; }

    if (/ipad/.test(uaString)) {
      this.whereIsShare = 'top';
    }
  }
  // showUserAgent() {
  //   this.userAgent = navigator.userAgent.toLowerCase();
  // }

  trackStandalone() {
    // called once from app.component
    if (this.checkStandalone()) {
      this.isStandalone = true;
      // this.gas.emitEvent('A2HS', 'Standalone', '' , 0);
    }
  }

  checkStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  trackInstalled() {
    // called from listener in app.component
    // this.gas.emitEvent('A2HS', 'Installed', '' , 0);
    console.log('setting this.userInstalled true');
    this.userInstalled = true;
  }

  addToHomeScreen() {
    // call on custom button click
    this.customButtonClicked = true;

    if (!this.deferredPrompt) {
      console.log('deferredPrompt null');
      return;
    }

    // Show the prompt
    this.deferredPrompt.prompt();
    this.deferredPromptShown = true;

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult:any) => {

        if (choiceResult.outcome === 'accepted') {
          // no matter the outcome, the prompt cannot be reused ON MOBILE
          // for 3 months or until browser cache is cleared?
        } else {
          this.deferredPromptRejected = true;
        }

      });
  }


  addToHomeScreen2() {
    // call on custom button click
    this.customButtonClicked = true;

    if (!this.deferredPrompt) {
      console.log('deferredPrompt null');
      return;
    }

    // Show the prompt
    this.deferredPrompt.prompt();
    this.deferredPromptShown = true;

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult:any) => {

        if (choiceResult.outcome === 'accepted') {
          // no matter the outcome, the prompt cannot be reused ON MOBILE
          // for 3 months or until browser cache is cleared?
        } else {
          this.deferredPromptRejected = true;
        }

      });
  }

  showHide(checkWhat: boolean) {
    if (checkWhat) {
      return 'block';
    } else {
      return 'none';
    }
  }

  browserPromptBtn() {
    if (this.promptIntercepted && !this.userInstalled) {
      return 'block';
    } else {
      return 'none';
    }
  }

  iOSSafariHow2() {
    if (this.isSafari && this.isIOS && !this.isStandalone) {
      return 'block';
    } else {
      return 'none';
    }
  }


  showHideButton_iOS() {
    if (this.isIOS && !this.userInstalled) {
      return 'block';
    } else {
      return 'none';
    }
  }

  trueOrFalse(checkWhat: boolean) {
    if (checkWhat) {
      return 'green';
    } else {
      return 'red';
    }
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
