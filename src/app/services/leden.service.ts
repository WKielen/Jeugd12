import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class LedenService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/lid', http);
  }

  /***************************************************************************************************
  / Read the Parameter.
  /***************************************************************************************************/
  readLid$(Id: string): Observable<LedenItem>{
    return this.http.get(environment.baseUrl + "/lid/get")
      .pipe(
        map(response => {
          return (response as LedenItem);
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
}

/***************************************************************************************************
/ De methods zijn static omdat the methods via een interface niet worden doorgegeven
/***************************************************************************************************/
export class LedenItem {
  // de properties moeten worden geinitaliseerd anders krijg je een fout bij het wegschrijven.
  LidNr: number = 0;
  Voornaam?: string = '';
  Achternaam?: string = '';
  Tussenvoegsel?: string = '';
  Adres?: string = '';
  Woonplaats?: string = '';
  Postcode?: string = '';
  Mobiel?: string = '';
  Telefoon?: string = '';
  BondsNr?: string = '';
  Geslacht?: string = '';
  GeboorteDatum?: Date = new Date();
  Email1?: string = '';
  Email2?: string = '';
  IBAN?: string = '';
  BIC?: string = '';
  BetaalWijze?: string = '';
  LidBond?: string = '';
  CompGerechtigd?: string = '';
  LidType?: string = '';
  LidVanaf?: string = '';
  Opgezegd?: string = '';
  LidTot?: string = '';
  U_PasNr?: string = '';
  VastBedrag: number = 0;
  Korting?: number = 0;
  Medisch?: string = '';
  Ouder1_Naam?: string = '';
  Ouder1_Email1?: string = '';
  Ouder1_Email2?: string = '';
  Ouder1_Mobiel?: string = '';
  Ouder1_Telefoon?: string = '';
  Geincasseerd?: string = '';
  Rating?: number = 0;
  LicentieJun?: string = '';
  VrijwillgersToelichting?: string = '';
  LicentieSen?: string = '';
  MagNietOpFoto?: string = '';
  VrijwilligersKorting?: string = '';
  Rol?: string = '';
  ToegangsCode?: string = '';
  ExtraA?: string = '';
}
