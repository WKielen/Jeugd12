import { Component, Input } from '@angular/core';
import { FireBaseStoreService, IPresence } from 'src/app/services/firebase.store.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input() presenceList: Array<IPresence> = [];

  constructor() {}
}
