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
    chatmessage.timeSent = new Date;
    return chatmessage;
  }

  /***************************************************************************************************
  / Dit werkt maakt chats --> jeugd --> chat<Chat>  aan.
  /***************************************************************************************************/

  async sendMessage$(messages: Array<ChatMessage>) {
    const ref = this.firebaseStore.collection('chats').doc('jeugd');
    return ref.update({ messages: messages });
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
  timeSent: Date;
}
