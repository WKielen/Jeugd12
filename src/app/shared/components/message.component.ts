import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/services/firebase.store.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-message',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div class="messageLocation" [ngClass]="{'isOwnMessageLocation':isOwnMessage}">
      <div class="messageContainer" [ngClass]="{'isOwnMessageContainer':isOwnMessage}">
        <div class="messageData">
          <span class="sender" [ngClass]="{'isOwnSender':isOwnMessage}">
            {{ userName }}
          </span>
          <span class="timestamp" [ngClass]="{'isOwnTimestamp':isOwnMessage}">
            {{ timeStamp }}
          </span>
        </div>
        <div class="messageContent" [ngClass]="{'isOwnMessageContent':isOwnMessage}">
          {{ messageContent }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .messageLocation {
      display: flex;
    }
    .isOwnMessageLocation {
      flex-direction: row-reverse;
    }
    .messageContainer {
      display: inherit;
      height: auto;
      width: 70%;
      // min-width: 400px;
      border-radius: 5px;
      align-items: stretch;
      background-color: #eee;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26), 0 3px 6px rgba(0, 0, 0, 0.23);
      margin: 0.5rem 1rem;
    }
    .isOwnMessageContainer {
      flex-direction: row-reverse;
      background-color: #0d47a1;
    }
    .messageData {
      flex: 10%;
      padding: 10px;
      font-size: 0.8rem;
    }
    .sender {
      display: block;
      color: #222;
      font-weight: bold;
    }
    .isOwnSender {
      color: #e1f5fe;
    }

    .timestamp {
      color: #555;
      font-style: italic;
    }
    .isOwnTimestamp {
      color: #4fc3f7;
    }
    .messageContent {
      height: auto;
      flex: 90%;
      background-color: #fff;
      padding: 10px;
      border-radius: 0px 5px 5px 0px ;
      font-size: 1.2em;
    }
    .isOwnMessageContent {
      background-color: #ebf1f3;
      color: #01579b;
      border-radius: 5px 0px 0px 5px ;
    }
  `
  ]


})
export class MessageComponent extends BaseComponent implements OnInit {

  @Input() chatMessage: ChatMessage = new Object as ChatMessage;
  @Input() userid: string = new Object as string;
  userName: string = '';
  messageContent: string = '';
  timeStamp: string = '';
  isOwnMessage: boolean = false;

  constructor() { super() }

  ngOnInit(chatMessage = this.chatMessage) {
    this.isOwnMessage = (chatMessage.userId == this.userid);
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userName = chatMessage.userName;
  }
}
