import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'announcement-page',
  template: `

    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div *ngIf="announcements.length > 0">
      <div class="internalcard" *ngFor="let announcement of announcements; index as i" id='id{{i}}'>
        <div id="evenementnaam">{{ announcement.Header }}</div>
          <div class="internalcardcontent"[innerHTML]="announcement.Text"></div>
      </div>
    </div>
    <div *ngIf="announcements.length == 0">
      <h1>Geen mededelingen</h1>
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

export class AnnouncementPageComponent extends BaseComponent  {

  @Input('announcements') announcements: Array<IWebsiteText> = [];

}

export interface IWebsiteText {
  Header: string;
  Text: string;
  StartDate: string;
  EndDate: string;
}
