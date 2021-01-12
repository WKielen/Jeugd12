import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'signofftraining-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <form [formGroup]="afzegForm" novalidate>
      <div class="internalcard flexcontainer">
        <div id="evenementnaam">Afzeggen training</div>

        <mat-chip-list multiple>
          <mat-chip *ngFor="let chip of chips; index as i" [selected]="chip.selected" (click)="chip.selected=!chip.selected">{{chip.name}}</mat-chip>
        </mat-chip-list>

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

export class SignoffTrainingBoxComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('mygroups') mygroups: Array<string> = [];
  @Output('signoff') signoff = new EventEmitter();

  constructor() {
    super();
  }

  // Hier vul ik een tabel met alle dagen voor de komende twee weken.
  next2weeks: any = [];
  ngOnInit() {
    const todayMoment = moment();
    for (let i = 0; i < 14; i++) {
      todayMoment.add(1, 'day');
      console.log(todayMoment);
      let daynaam = moment(todayMoment).locale('NL-nl').format('dd DD MMM');
      let date = moment(todayMoment).format('yyyy-MM-dd');
      this.next2weeks.push({ name: daynaam, selected: false, datum: date });
    }
  }

  // Hier heb je de dagen ontvangen waarop het lid traint. Nu selecteer ik alle dagen
  // van de komende twee weken die overeen komen ze de dagen van het lid.
  // het resultaat is dat er een chip is voor de dagen waarop het lid traint de komende 2 weken.
  chips:any = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('mygroups')) {
      if (this.mygroups.length == 0) return;

      this.next2weeks.forEach((aday:any) => {
        this.mygroups.forEach((agroup: string) => {
          if (aday.name.substring(0,2) == agroup.substring(0,2).toLowerCase()) {
            this.chips.push(aday);
          }
        })
      })

    }
  }

  afzegForm = new FormGroup({
    reasontext: new FormControl(
      '',
      [Validators.required]
    ),
  });


  get reasontext(): any {
    return this.afzegForm.get('reasontext');
  }

  get startdate(): any {
    return this.afzegForm.get('startdate');
  }

  onSubmit() {
    this.chips.forEach((chip: any) => {
      console.log('onSubmit', chip.selected)
    })


    this.signoff.emit({ 'datum': FormValueToDutchDateString(this.startdate.value), 'reasontext': this.reasontext.value });
  }
}


export function FormValueToDutchDateString(value: any): string {
  return moment(value).format('YYYY-MM-DD');
}
