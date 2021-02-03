import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jeugd';

  constructor(public authServer: AuthService) {
    // A2HS - START
    authServer.checkUserAgent();
    authServer.trackStandalone();
    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      authServer.promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
      authServer.deferredPrompt = e;
      authServer.promptSaved = true;

    });
    window.addEventListener('appinstalled', (evt) => {
      authServer.trackInstalled();
      // hide the add button
      // authServer.promptIntercepted = false;
    });
    // A2HS - END

  }
}
