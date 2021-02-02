import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'personal-data-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <mat-card>
      <mat-card-subtitle>
        Mijn gegevens
      </mat-card-subtitle>
      <mat-card-content>
      <table id="table">
          <tr>
            <td width="30%"></td>
            <td width="70%"></td>
          </tr>
          <tr *ngIf="volledigenaam">
            <td>Naam:</td>
            <td>{{ volledigenaam }}</td>
          </tr>
          <tr *ngIf="lid.Adres">
            <td>Adres:</td>
            <td>{{ lid.Adres }}</td>
          </tr>
          <tr *ngIf="lid.Postcode">
            <td>Postcode:</td>
            <td>{{ lid.Postcode }}</td>
          </tr>
          <tr *ngIf="lid.Woonplaats">
            <td>Woonplaats:</td>
            <td>{{ lid.Woonplaats }}</td>
          </tr>
          <tr *ngIf="lid.Mobiel">
            <td>Mobiel:</td>
            <td>{{ lid.Mobiel }}</td>
          </tr>
          <tr *ngIf="lid.Telefoon">
            <td>Telefoon:</td>
            <td>{{ lid.Telefoon }}</td>
          </tr>
          <tr *ngIf="lid.BondsNr">
            <td>BondsNr:</td>
            <td>{{ lid.BondsNr }}</td>
          </tr>
          <tr *ngIf="lid.GeboorteDatum">
            <td>Geboortedatum:</td>
            <td>{{ lid.GeboorteDatum }}</td>
          </tr>
          <tr *ngIf="lid.Email1">
            <td>Email:</td>
            <td>{{ lid.Email1 }}</td>
          </tr>
          <tr *ngIf="lid.Email2">
            <td>2e Email:</td>
            <td>{{ lid.Email2 }}</td>
          </tr>
          <tr *ngIf="lid.LidVanaf">
            <td>Lid vanaf:</td>
            <td>{{ lid.LidVanaf }}</td>
          </tr>
          <tr *ngIf="lid.Ouder1_Email1">
            <td>Email ouders:</td>
            <td>{{ lid.Ouder1_Email1 }}</td>
          </tr>
          <tr *ngIf="lid.Ouder1_Email2">
            <td>2e Email ouders:</td>
            <td>{{ lid.Ouder1_Email2 }}</td>
          </tr>
          <tr *ngIf="lid.Ouder1_Mobiel">
            <td>Mobiel ouders:</td>
            <td>{{ lid.Ouder1_Mobiel }}</td>
          </tr>
          <tr *ngIf="lid.Ouder1_Telefoon">
            <td>Telefoon ouders:</td>
            <td>{{ lid.Ouder1_Telefoon }}</td>
          </tr>
          <tr *ngIf="lid.MagNietOpFoto  == '1'">
            <td>Fotografie:</td>
            <td>Niet op foto's</td>
          </tr>
        </table>
      </mat-card-content>
    </mat-card>
    `,
  styles: [
    `.internalcard {border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 2px 5px 5px lightgrey;
             background: white; margin: 5px; border-radius: 5px;
             `,
    '.internalcardcontent { margin: 10px 10px 10px 10px;',
    '#evenementnaam { font-size: 16px; font-weight: bolder; padding: 5px 10px 0px 10px; }',
    '#table { width: 100%; tr { td { text-align: left; vertical-align: top; } } }'
  ],
})

export class PersonalDataBoxComponent extends BaseComponent implements OnChanges {

  @Input('lid') lid: ILedenItem = {};
  public volledigenaam: string = 'x';


  ngOnChanges(changes: SimpleChanges) {
    this.volledigenaam = this.getFullNameVtA(this.lid.Voornaam, this.lid.Tussenvoegsel, this.lid.Achternaam)
  }

  /***************************************************************************************************
  / VOORNAAM TUSSENVOEGSEL ACHTERNAAM
  /***************************************************************************************************/
  public getFullNameVtA(Voornaam?: string, Tussenvoegsel?: string, Achternaam?: string): string {
    let name = Voornaam;
    if (Tussenvoegsel) {
      name += ' ' + Tussenvoegsel;
    }
    name += ' ' + Achternaam;
    return name ?? '';
  }
}

export interface ILedenItem {
  LidNr?: number;
  Voornaam?: string;
  Achternaam?: string;
  Tussenvoegsel?: string;
  Adres?: string;
  Woonplaats?: string;
  Postcode?: string;
  Mobiel?: string;
  Telefoon?: string;
  BondsNr?: string;
  GeboorteDatum?: Date;
  Email1?: string;
  Email2?: string;
  LidVanaf?: string;
  Ouder1_Email1?: string;
  Ouder1_Email2?: string;
  Ouder1_Mobiel?: string;
  Ouder1_Telefoon?: string;
  MagNietOpFoto?: string;
}
