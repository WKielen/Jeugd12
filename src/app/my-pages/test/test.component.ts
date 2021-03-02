import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FireBaseAuthService } from 'src/app/services/firebase.auth.service';
import { Chat, FireBaseStoreService, ChatMessage } from 'src/app/services/firebase.store.service';
import { LedenItem } from 'src/app/services/leden.service';
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
    public authService: AuthService
  ) { super() }

  public messages: Array<ChatMessage> = [];

  ngOnInit(): void {
    this.authService.getLid().then( data => { console.log( data)});

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
    // this.firebaseStoreService.sendMessage$(this.messages)
    //   .then(result => console.log('create room result', result))
    //   .catch(e => { console.log('create room error', e) })
    this.firebaseStoreService.addMessage$(message)
      .then(result => console.log('create room result', result))
      .catch(e => { console.log('send message error', e) })
  }


  onCreateRoom(): void {
    this.firebaseStoreService.create$()
      .then(result => console.log('create room result', result))
      .catch(e => { console.log('create room error', e) })
  }

}

