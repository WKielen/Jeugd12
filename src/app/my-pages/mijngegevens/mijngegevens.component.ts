import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LedenItem, LedenService } from 'src/app/services/leden.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppError } from 'src/app/shared/error-handling/app-error';

@Component({
  selector: 'app-mijngegevens',
  templateUrl: './mijngegevens.component.html',
  styleUrls: ['./mijngegevens.component.scss']
})
export class MijnGegevensComponent extends BaseComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public ledenService: LedenService,
  ) { super()
  }

  public lid: LedenItem = new LedenItem();

  ngOnInit(): void {
    this.authService.getLid().then( data => { this.lid = data});
  }


}
