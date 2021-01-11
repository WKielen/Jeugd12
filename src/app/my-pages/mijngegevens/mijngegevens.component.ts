import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-mijngegevens',
  templateUrl: './mijngegevens.component.html',
  styleUrls: ['./mijngegevens.component.scss']
})
export class MijnGegevensComponent extends BaseComponent implements OnInit {

  constructor(
    public authServer: AuthService,
  ) {  super() }

  ngOnInit(): void {
  }

}
