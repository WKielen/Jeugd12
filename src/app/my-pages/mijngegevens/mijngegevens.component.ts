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
  ) { super() }

  public lid: LedenItem = new LedenItem();

  ngOnInit(): void {
    if (this.authService.lid) {
      this.lid = this.authService.lid ?? new LedenItem();
    } else {
      this.registerSubscription(
        this.authService.readLid$()
        .subscribe(data => {
          this.lid = data;
        },
          (error: AppError) => {
            console.log("error", error);
          }
        )
      );
    }
  }

  /***************************************************************************************************
  / Lees het record uit de Leden tabel
  /***************************************************************************************************/
  private readLid(): void {
    this.registerSubscription(
      this.ledenService.readLid$(this.authService.LidNr)
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
