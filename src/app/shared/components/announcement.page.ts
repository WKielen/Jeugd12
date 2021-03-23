import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'announcement-page',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div style="width:100%" *ngIf="announcements.length > 0">
      <div *ngFor="let announcement of announcements; index as i" id='id{{i}}'>
        <mat-card>
        <img *ngIf="announcement.ImageUrl" class="image" [src]="announcement.ImageUrl"/>
          <mat-card-subtitle>
          {{ announcement.Header }}
          </mat-card-subtitle>
          <mat-card-content>
              <div [innerHTML]="announcement.Text"></div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    <div *ngIf="announcements.length == 0">
      <h1>Geen mededelingen</h1>
    </div>
  `,
  styles: ['.image {width: 100%; border-radius: 5px; margin-bottom: 1rem;}'],
})

export class AnnouncementPageComponent extends BaseComponent  {

  @Input('announcements') announcements: Array<IWebsiteText> = [];

}

export interface IWebsiteText {
  Header: string;
  Text: string;
  StartDate: string;
  EndDate: string;
  ImageUrl: string;
}
