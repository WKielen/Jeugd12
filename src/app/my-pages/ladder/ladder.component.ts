import { Component, OnInit } from '@angular/core';
import { ParamService } from 'src/app/services/param.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { Ladder } from 'src/app/shared/classes/JeugdLadder';
import { ILadder } from 'src/app/shared/components/ladder.box.component';
import { AppError } from 'src/app/shared/error-handling/app-error';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styleUrls: ['./ladder.component.scss']
})

export class LadderComponent extends BaseComponent implements OnInit {

  constructor(
    private paramService: ParamService,
  ) { super ()  }

  public ladder!: ILadder;
  ngOnInit(): void {
    this.readLadderItem();
  }


  /***************************************************************************************************
  / Lees het record uit de Param tabel
  /***************************************************************************************************/
  readLadderItem(): void {
    this.registerSubscription(
      this.paramService.readParamData$("ladderstand")
      .subscribe(data => {
        this.ladder = JSON.parse(data);
      },
        (error: AppError) => {
          console.log("error", error);
        }
      )
    );
  }

}
