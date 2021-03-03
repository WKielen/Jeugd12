import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FireBaseAuthService } from 'src/app/services/firebase.auth.service';
import { FireBaseStoreService, ChatMessage, IPresence } from 'src/app/services/firebase.store.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppError } from 'src/app/shared/error-handling/app-error';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    private firebaseStoreService: FireBaseStoreService,
    private firebaseAuthService: FireBaseAuthService,
    public authService: AuthService
  ) { super() }

  public messages: Array<ChatMessage> = [];
  public presenceList: Array<IPresence> = [];

  ngOnInit(): void {
    this.authService.getLid().then();
    this.registerSubscription(
      this.firebaseAuthService.login$('chat@ttvn.nl', 'Qweryty!_01$')
        .subscribe(() => {
          this.firebaseStoreService.registerChat$('online').subscribe();
          this.firebaseStoreService.getChat$()
            .subscribe((data: any) => {
              this.messages = data as Array<ChatMessage>;
            },
              (error: AppError) => {
                console.log("error", error);
              }
            )
            this.firebaseStoreService.getPresence$()
            .subscribe((data: any) => {
              this.presenceList = data as Array<IPresence>;
            })
          })
    );
  }

  onMessageClick($event: string): void {
    const message: ChatMessage = this.firebaseStoreService.createMessage($event);
    this.firebaseStoreService.addMessage$(message)
      .then(result => console.log('message sent result: ', result))
      .catch(e => { console.log('send message error', e) })
  }

  ngOnDestroy(): void {
    this.firebaseStoreService.registerChat$('offline').subscribe();
  }

}
