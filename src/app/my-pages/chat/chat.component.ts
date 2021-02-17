import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FireBaseStoreService, Chat, ChatMessage } from 'src/app/services/firebase.store.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppError } from 'src/app/shared/error-handling/app-error';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends BaseComponent implements OnInit {

  constructor(
    private firebaseStoreService: FireBaseStoreService,
    public authService: AuthService
  ) { super() }

  public messages: Array<ChatMessage> = [];

  ngOnInit(): void {
    if (!this.authService.lid)
      this.authService.readLidintoMemory();

    this.registerSubscription(
      this.firebaseStoreService.getChat$()
        .subscribe((data: any) => {
          this.messages = (data as Chat).messages;
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
    );
  }

  onMessageClick($event: string): void {
    let message: ChatMessage = this.firebaseStoreService.createMessage($event);
    this.messages.push(message);
    this.firebaseStoreService.sendMessage$(this.messages)
      .catch(e => { console.log('send message error', e) })
  }

}
