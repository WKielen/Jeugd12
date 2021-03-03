import { Component, ViewChild, ElementRef, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage, IPresence } from 'src/app/services/firebase.store.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-chatroom',
  template: `
    <div class="mainChatRoomContent">
      <div class="userListWrapper">
        <app-user-list [presenceList]='presenceList'></app-user-list>
      </div>
      <div class="feedColumnWrapper">
        <div #scroller class="feedWrapper">
          <app-chat-feed [chatMessages]='chatMessages' [userid]='userid'></app-chat-feed>
        </div>
        <app-chat-form class="app-chat" (chatmessage)="onMessageClick($event)"></app-chat-form>
      </div>
    </div>
  `,
  styles: [
    '.mainChatRoomContent{ display: flex; height: 100%; } ',
    '.userListWrapper { flex: 15%; background-color: #808080; display: flex; padding:20px 0px 40px 30px; border-right: 1px solid #222; }',
    '.feedColumnWrapper { display: flex; height: 100%; flex-direction: column; flex: 85%; }',
    '.feedWrapper { height: 100%; flex-direction: column; //background: linear-gradient(181deg, rgba(100,200,255,0.6), rgba(0, 0, 0, 0.9)); overflow-y: scroll; }'
  ]
})
export class ChatroomComponent extends BaseComponent implements AfterViewChecked {

  @ViewChild('scroller') private feedContainer: ElementRef = new Object() as ElementRef;

  @Input() chatMessages: Array<ChatMessage> = [];
  @Input() presenceList: Array<IPresence> = [];
  @Input() userid: string = new Object as string;
  @Output('chatmessage') chatmessage = new EventEmitter();

  constructor() { super() }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onMessageClick($event: string): void {
    this.chatmessage.emit($event);
  }
}
