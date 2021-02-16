import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-chat-form',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small>
  <div class="container">
    <input  placeholder="Type je bericht" [(ngModel)]="message" (keydown)="handleSubmit($event)" autocomplete="off">
  </div>
  `,
  styles: [
    `.container { display: block; margin-left: 1rem; margin-right: 1rem; border: none; }`,
    `input { width: 100%; border-radius: 1rem; background-color: #ffffff; border-width: 3px; border-color: #000000; padding: 0.5rem; }`,
    `input:focus { background-color: #E4F1FE; outline: none; } `
  ]
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
