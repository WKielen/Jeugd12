import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class FireBaseStoreService {

  constructor(
    private authServer: AuthService,
    private firebaseStore: AngularFirestore,
  ) { }

  getChat$() {
    return this.firebaseStore.collection('chats').doc('jeugd').valueChanges()
  }

  /***************************************************************************************************
  / Dit werkt maakt chats --> jeugd --> chat<Chat>  aan.
  /***************************************************************************************************/
  async create$() {
    let chat: Chat = Object();
    chat.count = 1;
    chat.messages = [];
    chat.createdAt = new Date;

    const docRef = await this.firebaseStore.collection('chats').doc('jeugd').set(chat);
  }


  createMessage(message: string): ChatMessage {
    let chatmessage = new Object() as ChatMessage;
    chatmessage.message = message;
    chatmessage.userId = this.authServer.userId;
    chatmessage.userName = this.authServer.lid?.Voornaam ?? '';
    chatmessage.timeSent = this.getTimeStamp();
    return chatmessage;
  }

  /***************************************************************************************************
  / Dit werkt maakt chats --> jeugd --> chat<Chat>  aan.
  /***************************************************************************************************/

  async sendMessage$(messages: Array<ChatMessage>) {
    const ref = this.firebaseStore.collection('chats').doc('jeugd');
    return ref.update({ messages: messages });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '-' +
      ("0" + (now.getUTCMonth() + 1)).slice(-2) + '-' +
      ("0" + now.getUTCDate()).slice(-2);
    const time = ("0" + now.getUTCHours()).slice(-2) + ':' +
      ("0" + now.getUTCMinutes()).slice(-2) + ':' +
      ("0" + now.getUTCSeconds()).slice(-2);
      ("0" + now.getUTCSeconds()).slice(-2);

    return (date + ' ' + time);
  }

}

export interface Chat {
  count: number;
  createdAt: Date;
  messages: Array<ChatMessage>;
}

export interface ChatMessage {
  userId: string;
  userName: string;
  message: string;
  timeSent: string;
}
