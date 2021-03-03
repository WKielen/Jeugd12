import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'trainingsgroups-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <mat-card>
      <mat-card-subtitle>
        Mijn trainingstijden
      </mat-card-subtitle>
      <mat-card-content>
        <table>
          <tr>
            <td width="33%"></td>
            <td width="33%"></td>
            <td width="33%"></td>
          </tr>
          <tr *ngFor="let item of allgroups; index as i" id='id{{i}}' style="color:{{item.Color}};">
            <td>{{ item.Day }}</td>
            <td>{{ item.StartTime }}-{{ item.EndTime }}</td>
            <td>({{ item.Trainer }})</td>
          </tr>
        </table>
      </mat-card-content>
    </mat-card>
`
})

export class TrainingsgroupsComponent extends BaseComponent implements OnChanges {

  @Input('allgroups') allgroups: Array<ITrainingstijdItem> = [];
  @Input('mygroups') mygroups: Array<string> = [];

  ngOnChanges(changes: SimpleChanges) {

    this.allgroups.forEach(item => {
      let color: string = 'lightgrey';
      this.mygroups.forEach(myGroup =>{
        if (item.Code == myGroup) {
          color = "#003d33"
        }
      })
      item.Color = color;
    })
  }
}

export interface ITrainingstijdItem {
  Id: string;
  Code: string;
  Day: string;
  StartTime: string;
  EndTime: string;
  Trainer: string;
  Comment: string;
  Color?: string;
}
