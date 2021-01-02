import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ICredentials } from 'src/app/services/auth.service';
import { ROUTE } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  showPw = false;
  responseText: string = '';


  loginForm = new FormGroup({
    userid: new FormControl(
      '',
      [Validators.required] //, Validators.minLength(7), Validators.maxLength(7)]
    ),
    password: new FormControl(
      '',
      [Validators.required, Validators.minLength(6)]
    ),
  });


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userid?.setValue('3198048');
    this.password?.setValue('TTVN4all');
  }


  onLogin() {
    // database: "ttest"
    // keepsignedin: "false"
    // password: "3e84930f9e2769d6d71df43be7923c20"
    // userid: "3198048"
    const credentials: ICredentials = {
      'userid': this.loginForm.value['userid'], 'password': this.loginForm.value['password'],
      'database': environment.databaseName, 'keepsignedin': 'true'
    };
    this.authService.login$(credentials)
      .subscribe(result => {
        if (result) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || ROUTE.mainPageRoute]);
        } else {
          this.responseText = "De combinatie van Userid en Wachtwoord bestaat niet";
        }
      },
        err => {
          this.responseText = "De combinatie van Userid en Wachtwoord bestaat niet";
        });

  }







  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/
  get userid() {
    return this.loginForm.get('userid');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
