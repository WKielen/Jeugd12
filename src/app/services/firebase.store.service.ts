import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, Query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class FireBaseStoreService {

  constructor(
    private authService: AuthService,
    private firebaseStore: AngularFirestore,
  ) { }

  /***************************************************************************************************
  / Letop: Veel voorbeelden op internet zijn JS. Je ziet ze dan "collection(path: 'jeugdchat')" typen
  / Met angularfire werkt dit anders. https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
  /***************************************************************************************************/
  getChat$() {
    return this.firebaseStore.collection('jeugdchat', ref => ref.orderBy('timeSent', "asc").limitToLast(50)).valueChanges()
    // return this.firebaseStore.collection('jeugdchat', ref => ref.where('message', '==', '123')).valueChanges()
  }

  // /***************************************************************************************************
  // / Dit werkt maakt chats --> jeugd --> chat<Chat>  aan.
  // /***************************************************************************************************/
  // async create$() {
  //   let chat: Chat = Object();
  //   chat.count = 1;
  //   chat.messages = [];
  //   chat.createdAt = new Date;

  //   const docRef = await this.firebaseStore.collection('jeugdchat').doc('jeugd').set(chat);
  // }


  createMessage(message: string): ChatMessage {
    let chatmessage = new Object() as ChatMessage;
    chatmessage.message = message;
    chatmessage.userId = this.authService.userId;
    chatmessage.userName = this.authService.lid?.Voornaam ?? '';
    chatmessage.timeSent = this.getTimeStamp();
    return chatmessage;
  }

  createPresence(status: string): IPresence {
    let presence = new Object() as IPresence;
    presence.userId = this.authService.userId;
    presence.userName = this.authService.lid?.Voornaam ?? '';
    presence.lastlogin = this.getTimeStamp();
    presence.status = status;
    return presence;
  }



  /***************************************************************************************************
  / Dit werkt maakt chats --> jeugd --> chat<Chat>  aan.
  /***************************************************************************************************/
  addMessage$(message: ChatMessage): Promise<void> {
    // const uid = this.firebaseStore.createId();
    const uid = message.userId + '|' + message.timeSent
    return this.firebaseStore.collection('jeugdchat').doc(uid).set(message);
  }

  registerChat$(status: string ): Observable<void> {
    let presence = this.createPresence(status);
    return from(this.firebaseStore.collection('chatpresence').doc(presence.userId).set(presence));
  }

  getPresence$() {
    return this.firebaseStore.collection('chatpresence', ref => ref.orderBy('status', "desc").limitToLast(50)).valueChanges()
    // return this.firebaseStore.collection('jeugdchat', ref => ref.where('message', '==', '123')).valueChanges()
  }


  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '-' +
      ("0" + (now.getMonth() + 1)).slice(-2) + '-' +
      ("0" + now.getDate()).slice(-2);
    const time = ("0" + now.getHours()).slice(-2) + ':' +
      ("0" + now.getMinutes()).slice(-2) + ':' +
      ("0" + now.getSeconds()).slice(-2);
    ("0" + now.getSeconds()).slice(-2);

    return (date + ' ' + time);
  }

}

// export interface Chat {
//   count: number;
//   createdAt: Date;
//   messages: Array<ChatMessage>;
// }

export interface IPresence {
  userId: string;
  userName: string;
  status: string;
  lastlogin: string;
}
export interface ChatMessage {
  userId: string;
  userName: string;
  message: string;
  timeSent: string;
}
