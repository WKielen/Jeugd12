import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LogonData } from 'src/app/shared/classes/LogonData';
import { ROUTE } from 'src/app/services/website.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  logonData: LogonData = new LogonData;

  constructor(
    private router: Router,
  ) {}

  // Toggle de sidebar via de DOM.
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onSignOff(): void {
    this.router.navigate([ROUTE.loginPageRoute]);
    this.logonData.IsLoggedOn = false;
    this.logonData.ShouldDisplayMenu = false;
  }
}
