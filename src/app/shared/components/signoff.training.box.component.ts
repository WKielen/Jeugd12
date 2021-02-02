import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IMultiChipSelect } from './multi-chip-select-control.component';

@Component({
  selector: 'signofftraining-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <mat-card>
      <mat-card-subtitle>
        Afzeggen training
      </mat-card-subtitle>
      <mat-card-content>
        <form [formGroup]="afzegForm" novalidate>
            <mat-form-field id="chiplist" class="mat-form-max-width">
              <app-multi-chip-select-control [value]='chips' [required]='true' placeholder='Kies datum(s) ...' [formControl]="chipscontrol">
              </app-multi-chip-select-control>
              <mat-error *ngIf="chipscontrol.hasError('required')">
                Veld is verplicht
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="mat-form-max-width">
            <mat-label>Reden van afzegging</mat-label>
              <textarea matInput type="text" formControlName="reasontext"
                [matTextareaAutosize]=true [matAutosizeMinRows]=2 required></textarea>
                <mat-error *ngIf="reasontext.hasError('required')">
                  Veld is verplicht
                </mat-error>
            </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button color='primary' class="mat-form-max-width" mat-raised-button [disabled]='!afzegForm.valid' (click)="onSubmit()">Verstuur</button>
      </mat-card-actions>
    </mat-card>

`,
  styles: [
    '::ng-deep #chiplist .mat-form-field-underline { display: none; }'
  ],
})

export class SignoffTrainingBoxComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('mygroups') mygroups: Array<string> = [];
  @Output('signoff') signoff = new EventEmitter();

  constructor() {
    super();
  }

  afzegForm = new FormGroup({
    chipscontrol: new FormControl(),
    reasontext: new FormControl(
      '',
      [Validators.required]
    ),
  });

  // Hier vul ik een tabel met alle dagen voor de komende twee weken.
  next2weeks: Array<IMultiChipSelect> = [];
  ngOnInit() {
    const todayMoment = moment();
    for (let i = 0; i < 14; i++) {
      let daynaam = moment(todayMoment).locale('NL-nl').format('dd DD MMM');
      let date = moment(todayMoment).format('yyyy-MM-DD');
      this.next2weeks.push({ displayName: daynaam, selected: false, id: date });
      todayMoment.add(1, 'day');
    }
    this.chipscontrol.setValue(this.chips);
  }

  // Hier heb je de dagen ontvangen waarop het lid traint. Nu selecteer ik alle dagen
  // van de komende twee weken die overeen komen ze de dagen van het lid.
  // het resultaat is dat er een chip is voor de dagen waarop het lid traint de komende 2 weken.
  chips: Array<IMultiChipSelect> = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('mygroups')) {
      if (this.mygroups.length == 0) return;
      this.next2weeks.forEach((aday: IMultiChipSelect) => {
        this.mygroups.forEach((agroup: string) => {
          if (aday.displayName.substring(0, 2) == agroup.substring(0, 2).toLowerCase()) {
            this.chips.push(aday);
          }
        })
      })
    }
  }

  get reasontext(): any {
    return this.afzegForm.get('reasontext');
  }

  get chipscontrol(): any {
    return this.afzegForm.get('chipscontrol');
  }

  onSubmit(): void {
    let dateList: Array<string> = [];
    this.chips.forEach((chip: IMultiChipSelect) => {
      if (chip.selected) {
        dateList.push(chip.id);
      }
    })
    this.signoff.emit({ 'dates': dateList, 'reasontext': this.reasontext.value });
  }
}
