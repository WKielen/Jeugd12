import { Component, Input } from '@angular/core';
import { IPresence } from 'src/app/services/firebase.store.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent  {

  @Input() user: IPresence = new Object as IPresence;

}
