import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/services/firebase.store.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage = new Object as ChatMessage;
  userName: string = '';
  messageContent: string = '';
  timeStamp: string = '';
  isOwnMessage: boolean = false;

  constructor() {
  }

  ngOnInit(chatMessage = this.chatMessage) {
    console.log("MessageComponent --> ngOnInit --> chatMessage", chatMessage);
    console.log("type:", typeof chatMessage.timeSent)
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userName = chatMessage.userName;
  }
}
