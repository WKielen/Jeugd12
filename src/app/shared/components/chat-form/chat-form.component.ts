import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent extends BaseComponent {

  public message: string = '';
  @Output('chatmessage') chatmessage = new EventEmitter();

  constructor() { super() }

  send(): void {
    this.chatmessage.emit(this.message);
    this.message = '';
  }

  handleSubmit(event: any): void {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
