import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'agenda-page',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div *ngIf="agenda.length > 0">
      <div class="internalcard" *ngFor="let item of agenda; index as i" id='id{{i}}'>
        <div id="evenementnaam">{{ item.EvenementNaam }}</div>
          <div class="internalcardcontent"[innerHTML]="item.Toelichting"></div>
      </div>
    </div>
    <div *ngIf="agenda.length == 0">
      <h1>Niets op de agenda</h1>
    </div>
  `,
  styles: [
    `.internalcard {border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 2px 5px 5px lightgrey;
             background: white; margin: 5px; border-radius: 5px;
             `,
    '.internalcardcontent { margin: 10px 10px 10px 10px;',
    '#evenementnaam { font-size: 16px; font-weight: bolder; padding: 5px 10px 0px 10px; }'
  ],
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
