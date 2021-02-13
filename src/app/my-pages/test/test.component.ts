import { Component, OnInit } from '@angular/core';
import { FireBaseAuthService } from 'src/app/services/firebase.auth.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  extends BaseComponent implements OnInit {

  constructor(
    private firebaseAuthService: FireBaseAuthService,
  ) { super() }

  ngOnInit(): void {
  }
  onSubmit() {
    this.firebaseAuthService.login$('wim@kielen.nl', 'xyzxyz')
    .then(result => console.log('logon result', result))
    .catch(e => {console.log('logon error', e) })

  }
  email: string = '';
  password: string = '';
  onRegister() {
    this.firebaseAuthService.register$(this.email, this.password)
    .then(result => console.log('logon result', result))
    .catch(e => {console.log('logon error', e) })
  }
}
