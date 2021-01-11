import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'trainingsgroups-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <div class="internalcard">
      <div class="internalcardcontent">
        <div id="evenementnaam">Mijn trainingstijden</div>
        <div *ngIf="allgroups.length > 0">
          <table id="table">
            <tr>
              <td width="25%"></td>
              <td width="30%"></td>
              <td width="45%"></td>
            </tr>
            <tr *ngFor="let item of allgroups; index as i" id='id{{i}}' style="color:{{item.Color}};">
              <td>{{ item.Day }}</td>
              <td>{{ item.StartTime }}-{{ item.EndTime }}</td>
              <td>({{ item.Trainer }})</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    `,
  styles: [
    `.internalcard {border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 2px 5px 5px lightgrey;
             background: white; margin: 5px; border-radius: 5px;
             `,
    '.internalcardcontent { margin: 10px 10px 10px 10px;',
    '#evenementnaam { font-size: 16px; font-weight: bolder; padding: 5px 10px 0px 10px; }',
    '#table { width: 100%; tr { td { text-align: left; vertical-align: top; } } }'
  ],
})

export class TrainingsgroupsComponent extends BaseComponent implements OnChanges {

  @Input('allgroups') allgroups: Array<ITrainingstijdItem> = [];
  @Input('mygroups') mygroups: Array<string> = [];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('TODO lees changes uit')

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
