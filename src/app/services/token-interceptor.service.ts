import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router
    ) { }

  intercept (req: any, next: any) {

    if (!navigator.onLine) {
      this.router.navigate(['/offline']);
      return [];
    }

    let token = localStorage.getItem('token');
    if (token) {
      let  jwtHelper: JwtHelperService = new JwtHelperService();
      token = jwtHelper.isTokenExpired(token) ? null : token;
    }

    let tokenizedReq;
    if (token) {
      tokenizedReq = req.clone({
        // setHeaders: {
        //   'Authorization': 'Bearer ' + this.authService.token
        // , 'Content-Type' : 'application/json'
        // , 'Accept': 'application/json'
        // }
        headers: req.headers.set('Authorization', 'Bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
      });
    } else { // Als we niet ingelogd zijn dan ook het token niet meesturen.
      tokenizedReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
                            .set('Database', environment.databaseName)
      });
    }
    return next.handle(tokenizedReq);
  }
}
