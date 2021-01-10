import { Component, Input, OnChanges } from '@angular/core';
import { BaseComponent } from '../base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signofftraining-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <form [formGroup]="afzegForm" novalidate>
      <div class="internalcard flexcontainer">
        <div id="evenementnaam">Afzeggen training</div>
        <mat-form-field style="width: 40%; ;margin-left:10px">
          <input matInput placeholder="Kies datum waarop je niet kan" [matDatepicker]="startpicker" formControlName="startdate" required>
          <mat-datepicker-toggle matSuffix [for]="startpicker"></mat-datepicker-toggle>
          <mat-datepicker #startpicker touchUi="true"></mat-datepicker>
          <mat-error *ngIf="startdate.hasError('required')">
            Veld is verplicht
          </mat-error>
        </mat-form-field>

        <mat-form-field class="mat-form-max-width color-primary-bold" appearance="outline">
          <textarea matInput type="text" placeholder="Reden van afzegging" formControlName="reasontext"
            [matTextareaAutosize]=true [matAutosizeMinRows]=5 required></textarea>
            <mat-error *ngIf="reasontext.hasError('required')">
              Veld is verplicht
            </mat-error>
        </mat-form-field>
        <button color='primary' mat-raised-button [disabled]='!afzegForm.valid' (click)="onSubmit()">Verstuur</button>
      </div>
    </form>
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

export class SignoffTrainingBoxComponent extends BaseComponent {

  @Input('allgroups') allgroups: Array<ITrainingstijdItem> = [];
  @Input('mygroups') mygroups: Array<string> = [];

  constructor() {
    super();
  }


  afzegForm = new FormGroup({
    reasontext: new FormControl(
      '',
      [Validators.required]
    ),
    startdate: new FormControl(
      '',
      [Validators.required]
    ),
  });


  get reasontext(): any {
    return this.afzegForm.get('reasontext');
  }

  get startdate():any {
    return this.afzegForm.get('startdate');
  }

  onSubmit() { }
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
