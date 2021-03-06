import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserItem, UserService } from 'src/app/services/user.service';
import { MailItem, MailService } from 'src/app/services/mail.service';
import { passwordMatchValidator } from './passwordValidator';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password.reset.dialog.html',
  styles: ['mat-form-field {width: 100%; }',
    `.internalcard { border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 2px 5px 5px lightgrey;
                margin: 15px; border-radius: 5px; }`,
    '.internalcardcontent { margin: 10px 10px 10px 20px; }'
  ],
  providers: [{ provide: 'param', useValue: 'progress' }]
})

// De provider is om door een param door te geven aan de MailService.
// Dit lukt nog niet.

export class ResetPasswordDialogComponent extends BaseComponent implements OnInit {

  showPw: boolean = false;
  responseText: string = '';
  error: boolean = false;

  registerForm = new FormGroup({
    userid: new FormControl(
      '',
      [Validators.required]
    ),
    password1: new FormControl(
      '',
      [Validators.required, Validators.minLength(6)]
    ),
    password2: new FormControl(
      '',
      [Validators.required]
    )
  }, { validators: passwordMatchValidator }
  );

  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) { super() }

  ngOnInit() {
    this.userid?.setValue('');
    this.password1?.setValue('');
    this.password2?.setValue('');
  }

  onChangePassword() {
    let user = new UserItem();
    user.Userid = this.userid?.value;
    user.ProposedPassword = this.password1?.value;
    user.ChangePasswordToken = this.makeRandom(30);
    this.registerSubscription(
      this.userService.storeNewPassword$(user)
        .subscribe({
          next: (data) => {
            this.error = false;
            this.sendMail(user);
            this.responseText = "Je ontvangt een mail met een link. Als je op deze link klikt dan wordt je nieuwe password geactiveerd."
          },
          error: (error: AppError) => {
            this.error = true;
            if (error instanceof NoChangesMadeError) {
              this.responseText = "Je hebt dit verzoek al een keer gestuurd."
            } else if (error instanceof NotFoundError) {
              this.responseText = "Gebruikersnaam is onbekend."
            } else {
              throw error;
            }
          }
        })
    );
  }

  sendMail(credentials: UserItem) {
    let sub = this.userService.readUserData$(credentials.Userid)
      .subscribe({
        next: (data) => {
          let mailItems: Array<MailItem> = [];
          let mailItem: MailItem = new MailItem();
          let response = data as UserItem;
          mailItem.To = response.Email;
          mailItem.ToName = response.FirstName;
          mailItem.Subject = "Reset password TTVN app";
          mailItem.Message = 'Beste ' + mailItem.ToName + `,<br><br>
        Je hebt op de TTVN site een nieuw password aangevraagd. Klik op onderstaande link om je
        nieuwe password te activeren. Na de activatie wordt je naar de login pagina van de app
        geleidt. \nAls je geen nieuw password hebt aangevraagd, moet je deze mail negeren.<br>
        <a href="https://www.ttvn.nl/api/user/reset?Id=` + credentials.ChangePasswordToken + `">Klik deze link om je nieuwe password te activeren</a><br>
        <br>
        Met vriendelijke groet,<br>
        Webmaster TTVN`;

          mailItems.push(mailItem);
          this.mailService.mail$(mailItems)
            .subscribe({
              error: (error: AppError) => {
                console.log("error", error);
              }
            })
        },
        error: (error: AppError) => {
          console.log("error", error);
        }
      })
    this.registerSubscription(sub);
  }

  /***************************************************************************************************
  / Check passwords are equal
  /***************************************************************************************************/
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch'))
      this.password2?.setErrors([{ 'passwordMismatch': true }]);
    else
      this.password2?.setErrors(null);
  }

  /***************************************************************************************************
  /
  /***************************************************************************************************/
  makeRandom(lengthOfCode: number, possible?: string): string {
    if (!possible)
      // possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~";
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/

  get userid() {
    return this.registerForm.get('userid');
  }
  get password1() {
    return this.registerForm.get('password1');
  }
  get password2() {
    return this.registerForm.get('password2');
  }
}
