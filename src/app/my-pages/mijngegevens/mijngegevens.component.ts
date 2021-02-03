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
    public authServer: AuthService,
    public ledenService: LedenService,
  ) { super() }

  public lid: LedenItem = new LedenItem();
  ngOnInit(): void {
    if (this.authServer.lid)
      this.lid = this.authServer.lid;
    else
      this.readLid();
  }

  /***************************************************************************************************
  / Lees het record uit de Leden tabel
  /***************************************************************************************************/
  private readLid(): void {
    this.registerSubscription(
      this.ledenService.readLid$(this.authServer.LidNr)
        .subscribe(data => {
          this.lid = data;
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
    )
  }




}
