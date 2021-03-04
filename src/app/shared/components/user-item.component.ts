import { Component, Input } from '@angular/core';
import { IPresence } from 'src/app/services/firebase.store.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-user-item',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div class='userItem'>
      <span class="status" [ngClass]=(user.status)></span>
      <span class="userName">{{user.userName}}</span>
    </div>
  `,
  styles: [
    `.online{ background-color: #66ff33; }`,
    `.offline{ background-color: #666666; }`,
    `.status{
      display: inline-block;
      min-width: 15px;
      min-height: 15px;
      border-radius: 50%;
      margin-top: 2px;
      margin-right: 1rem;
    }
    `,
    `.userName { color: #e1f5fe; }`,
    `.userItem {
      /* height: auto; */
      padding: 10px;
      /* width: 90%; */
      margin-top: 10px;
      /* align-items:flex-start; */
      background-color: #0d47a1;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      color: #A098A5;
      border-radius: 5px;
    }
    `,
  ]
})
export class UserItemComponent extends BaseComponent  {

  @Input() user: IPresence = new Object as IPresence;

}
