import { Component, Input } from '@angular/core';
import { IPresence } from 'src/app/services/firebase.store.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-user-item',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div>
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
      margin: 10px 12px 0px 10px;
    }
    `,
    `.userName { color: #e1f5fe; }`
  ]
})
export class UserItemComponent extends BaseComponent  {

  @Input() user: IPresence = new Object as IPresence;

}
