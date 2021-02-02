import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/website', http);
  }


  getPages() {
    let pages: Array<Page> = [];
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Home', 'DisplayOnRoles': '*', 'Url': ROUTE.homePageRoute });
    pages.push({ 'Id': '1', 'MenuDisplayValue': 'Gegevens', 'DisplayOnRoles': '*', 'Url': ROUTE.gegevensPageRoute });
    pages.push({ 'Id': '1', 'MenuDisplayValue': 'Ladder', 'DisplayOnRoles': 'BS,JC,TR,AD,TE,JE', 'Url': ROUTE.ladderPageRoute });

    return pages;
  }
}
export class Role {
  Id: string = '';
  DisplayValue: string = '';
  Code: string = '';
}

export class Page {
  Id: string = '';
  MenuDisplayValue: string = '';
  DisplayOnRoles: string = '';
  Url: string = '';
}

export const ROLES = {
  BESTUUR: 'BS',
  JC: 'JC',
  TRAINER: 'TR',
  ADMIN: 'AD',
  TEST: 'TE',
  SENIOR: 'SE',
  JEUGD: 'JE',
};

export const ROUTE = {
  homePageRoute: 'home',
  gegevensPageRoute: 'gegevens',
  ladderPageRoute: 'ladder',
  offlinePageRoute: 'offline',
  notAllowedPageRoute: 'notallowed',
  loginPageRoute: 'login',
  signInPageRoute: 'signin',
};
