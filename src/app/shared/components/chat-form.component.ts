import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-chat-form',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small>
  <div class="chatContainer">
    <input class="chatInput" placeholder="Type je bericht" [(ngModel)]="message" (keydown)="handleSubmit($event)" autocomplete="off">
  </div>
  `,
  styles: [`
    .chatContainer {
      margin: 1rem 3rem 1rem 1rem;
    }
    .chatInput {
      /* display: inline; */
      width: 100%;
      border-radius: 1rem;
      background-color: #ffffff;
      border-width: 3px;
      border-color: #0d47a1;
      padding: 0.5rem;
      border-style: solid;
      font-size: 1.2rem;
    }
    .chatInput:focus {
      background-color:#ebf1f3;
      outline: none;
    }
  `]
})
export class ChatFormComponent extends BaseComponent {

  public message: string = '';
  @Output('chatmessage') chatmessage = new EventEmitter();

  constructor() { super() }

  send(): void {
    if (this.message) {
      this.chatmessage.emit(this.message);
      this.message = '';
    }
  }

  handleSubmit(event: any): void {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
