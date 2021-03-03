import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FireBaseAuthService{

  constructor(http: HttpClient, private firebaseAuth: AngularFireAuth) {}

  login$(userid: string, pw: string) {
    return from(this.firebaseAuth.signInWithEmailAndPassword(userid, pw));
  }

  async register$(userid: string, pw: string): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.createUserWithEmailAndPassword(userid, pw);
  }

}
