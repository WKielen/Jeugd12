import { Component, OnInit } from '@angular/core';
import { FireBaseAuthService } from 'src/app/services/firebase.auth.service';
import { Chat, FireBaseStoreService, ChatMessage } from 'src/app/services/firebase.store.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppError } from 'src/app/shared/error-handling/app-error';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {

  constructor(
    private firebaseAuthService: FireBaseAuthService,
    private firebaseStoreService: FireBaseStoreService,
  ) { super() }

  public messages: Array<ChatMessage> = [];


  ngOnInit(): void {
    this.registerSubscription(
      this.firebaseStoreService.getChat$()
        .subscribe((data: any) => {
          this.messages = (data as Chat).messages;
          console.log("TestComponent --> ngOnInit --> data", data);
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
    )
  }

  onLogin() {
    this.firebaseAuthService.login$('wim@kielen.nl', 'xyzxyz')
      .then(result => console.log('logon result', result))
      .catch(e => { console.log('logon error', e) })

  }
  email: string = '';
  password: string = '';
  onRegister() {
    this.firebaseAuthService.register$(this.email, this.password)
      .then(result => console.log('logon result', result))
      .catch(e => { console.log('logon error', e) })
  }

  onSendMessage(): void {
    let message: ChatMessage = this.firebaseStoreService.createMessage('via sendmessage');
    this.messages.push(message);
    this.firebaseStoreService.sendMessage$(this.messages)
      .then(result => console.log('create room result', result))
      .catch(e => { console.log('create room error', e) })
  }

  onCreateRoom(): void {
    this.firebaseStoreService.create$()
      .then(result => console.log('create room result', result))
      .catch(e => { console.log('create room error', e) })
  }

  onMessageClick($event: string): void {
    let message: ChatMessage = this.firebaseStoreService.createMessage($event);
    this.messages.push(message);
    this.firebaseStoreService.sendMessage$(this.messages)
      .then(result => console.log('create room result', result))
      .catch(e => { console.log('create room error', e) })
  }


}

