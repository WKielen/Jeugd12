import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'agenda-page',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small>
  <div class="flexcontainer">
    <div *ngIf="agenda.length > 0">
      <div *ngFor="let item of agenda; index as i" id='id{{i}}'>
        <mat-card style="width:90%!important">
          <mat-card-subtitle>
           {{ item.EvenementNaam }}
          </mat-card-subtitle>
          <mat-card-content>
          <table>
            <tr>
              <td width="25%"></td>
              <td width="75%"></td>
            </tr>
            <tr *ngIf="item.Datum">
              <td>Datum:</td>
              <td>{{ item.Datum }}</td>
            </tr>
            <tr *ngIf="item.Type">
              <td>Type:</td>
              <td>{{ item.Type | evenementtype }}</td>
            </tr>
            <tr *ngIf="item.Extra1">
              <td>Organisatie:</td>
              <td>{{ item.Extra1 | organisatie}}</td>
            </tr>
            <tr *ngIf="item.DoelGroep">
              <td>DoelGroep:</td>
              <td>{{ item.DoelGroep | doelgroep}}</td>
            </tr>
            <tr *ngIf="item.Toelichting">
              <td>Toelichting:</td>
              <td>
                <div [innerHTML]="item.Toelichting"></div>
              </td>
            </tr>
            <tr *ngIf="item.Tijd && item.Tijd != '?' && item.Tijd != 'n.t.b.'">
              <td>Tijd:</td>
              <td>{{ item.Tijd }}</td>
            </tr>
            <tr *ngIf="item.Lokatie">
              <td>Lokatie:</td>
              <td>{{ item.Lokatie }}</td>
            </tr>
            <tr *ngIf="item.Inschrijven">
              <td>Inschrijven:</td>
              <td>{{ item.Inschrijven }}</td>
            </tr>
            <tr *ngIf="item.Inschrijfgeld != '0'">
              <td>Inschrijfgeld:</td>
              <td>{{ item.Inschrijfgeld | formattedamount}}</td>
            </tr>
            <tr *ngIf="item.BetaalMethode">
              <td>BetaalMethode:</td>
              <td>{{ item.BetaalMethode }}</td>
            </tr>
            <tr *ngIf="item.ContactPersoon">
              <td>ContactPersoon:</td>
              <td>{{ item.ContactPersoon }}</td>
            </tr>
            <tr *ngIf="item.Vervoer">
              <td>Vervoer:</td>
              <td>{{ item.Vervoer }}</td>
            </tr>
            <tr *ngIf="item.VerzamelAfspraak">
              <td>VerzamelAfspraak:</td>
              <td>{{ item.VerzamelAfspraak }}</td>
            </tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
  <div *ngIf="agenda.length == 0">
    <h1>Niets op de agenda</h1>
  </div>
</div>
  `,
  styles: [],
})

export class AgendaPageComponent extends BaseComponent {

  @Input('agenda') agenda: Array<IAgendaItem> = [];

}

export interface IAgendaItem {
  Id: string;
  Datum: string;
  Tijd: string;
  EvenementNaam: string;
  Lokatie: string;
  Type: string;
  DoelGroep: string;
  Toelichting: string;
  Inschrijven: string;
  Inschrijfgeld: string;
  BetaalMethode: string;
  ContactPersoon: string;
  Vervoer: string;
  VerzamelAfspraak: string;
  Extra1: string;
  Extra2: string;
}
