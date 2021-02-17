import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChatMessage } from 'src/app/services/firebase.store.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-chat-feed',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div class="feed" *ngFor="let message of chatMessages;">
      <app-message [chatMessage]='message' [userid]='userid'></app-message>
    </div>
  `
})

export class FeedComponent extends BaseComponent  {
  @Input() chatMessages: Array<ChatMessage> = [];
  @Input() userid: string = new Object as string;
  constructor() { super() }
}
