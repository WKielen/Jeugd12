import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})

export class FireBaseAuthService {

  constructor(
    private http: HttpClient,
    private firebaseAuth: AngularFireAuth,
    ) {}

  async login$(userid: string, pw: string)  {
    return this.firebaseAuth.signInWithEmailAndPassword(userid, pw);
  }
  async register$(userid: string, pw: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(userid, pw)
  }

}
