import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE } from 'src/app/services/website.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
  ) { }

  routeToSignin(): void {
    this.router.navigate([ROUTE.signInPageRoute as string]);
  }
}
