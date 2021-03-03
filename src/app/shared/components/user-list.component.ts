import { Component, Input } from '@angular/core';
import { IPresence } from 'src/app/services/firebase.store.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-user-list',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <app-user-item [user]=user *ngFor="let user of presenceList"></app-user-item>`
})
export class UserListComponent extends BaseComponent{
  @Input() presenceList: Array<IPresence> = [];
}
