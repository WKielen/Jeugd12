import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input, OnInit, Optional, ViewChild, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface IMultiChipSelect {
  displayName: string,
  selected: boolean,
  id: string
}

/***************************************************************************************************
/ HTML
/***************************************************************************************************
<mat-form-field id='chip'>
  <app-multi-chip-select-control [required]='true' placeholder='Mijn chips' [formControl]="MyChips">
  </app-multi-chip-select-control>
  <mat-error *ngIf="MyChips.hasError('required')">
    Veld is verplicht
  </mat-error>
</mat-form-field>

/***************************************************************************************************
/ SCSS als je geen underline wil hebben
/***************************************************************************************************
::ng-deep #chip .mat-form-field-underline {
  display: none;
}

/***************************************************************************************************
/ TS
/***************************************************************************************************
MyChips: new FormControl({value: '', disabled: true}),

Voor disabling en enable is emitEvent nodig. Anders komt de code in een lus.
this.MyChips.disable({ emitEvent: false });

/***************************************************************************************************
/
/***************************************************************************************************/

@Component({
  selector: 'app-multi-chip-select-control',
  template: `
  <mat-chip-list #chiplist [disabled]="disabled" [placeholder]="placeholder" multiple>
    <mat-chip id="date-chip"
      *ngFor="let chip of value; index as i"
      [selected]="chip.selected"
      (click)="onClick(i)">
      {{chip.displayName}}
    </mat-chip>
  </mat-chip-list>
  `,
  styles: [`mat-chip-list { outline: none }`,
    'mat-chip { justify-content: center}',
  ],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: MultiChipSelectControlComponent
  }]
})
export class MultiChipSelectControlComponent implements OnInit, MatFormFieldControl<Array<IMultiChipSelect>>, ControlValueAccessor {

  constructor(
    private focusMonitor: FocusMonitor,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  chipwidth: number = 25;

  /***************************************************************************************************
  / Implementatie van ControlValueAccessor
  /***************************************************************************************************/
  writeValue(obj: Array<IMultiChipSelect>): void {
    this.value = obj;
  }

  OnChange!: (value: Array<IMultiChipSelect>) => {};
  registerOnChange(fn: any): void {
    this.OnChange = fn;
  }

  OnTouched!: () => void;
  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // console.log('setDisabledState', isDisabled);
    this.disabled = isDisabled;

    if (!isDisabled && this.isNoneSelected) { // als de control enabled wordt moeten we kijken of de control valid is.
      this.ngControl.control?.setErrors({});  // we maken de control invalid
    }

    this.ngControl.control?.markAsUntouched();
    this.stateChanges.next();  // run change detection
  }
  /***************************************************************************************************
  / Einde implementatie van ControlValueAccessor
  /***************************************************************************************************/


  /***************************************************************************************************
  / Implementatie van MatFormFieldControl
  /***************************************************************************************************/
  static nextId = 0;
  @ViewChild('chiplist', { read: ElementRef, static: true })
  input!: ElementRef;

  /***************************************************************************************************
  / @Input value
  /***************************************************************************************************/
  @Input()
  set value(value: Array<IMultiChipSelect>) {
    this._value = value;
    this.stateChanges.next();
  }
  get value() {
    return this._value;
  }
  private _value: Array<IMultiChipSelect> = [];

  stateChanges = new Subject<void>();

  /***************************************************************************************************
  / Id van de component
  /***************************************************************************************************/
  @HostBinding()
  id = `multi-chip-select-id-${MultiChipSelectControlComponent.nextId++}`;

  /**************************************************************************************************
  / @Input placeholder
  /***************************************************************************************************/
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder: string = '';


  /**************************************************************************************************
  / Focus monitor
  /***************************************************************************************************/
  focused: boolean = false;

  /***************************************************************************************************
  / Empty
  /***************************************************************************************************/
  get empty(): boolean {
    return !!this._value;
  }

  /***************************************************************************************************
  / Floated: ik laat het label altijd bovenin anders komt de tekst over een chip
  /***************************************************************************************************/
  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true; // this.focused || !this.empty;
  }

  /***************************************************************************************************
  / Required
  /***************************************************************************************************/
  @Input()
  set required(value: boolean) {
    this._required = value;
  }
  get required(): boolean {
    return this._required;
  }
  private _required: boolean = true;

  /***************************************************************************************************
  / @Input() Disabled. (let op wordt alleen bij opstarten hier gezet.) is nutteloos voor je stack probleem
  /***************************************************************************************************/
  @Input()
  disabled: boolean = false;

  /***************************************************************************************************
  / Error state: (Wordt de placeholder rood)
  /***************************************************************************************************/
  get errorState(): boolean {
    if (!this.ngControl) return true;
    const valid = this.ngControl.valid ?? true;
    const touched = this.ngControl.touched ?? false;
    return !valid && touched;
  }

  /***************************************************************************************************
  / Name of the control
  /***************************************************************************************************/
  controlType: string = 'multi-chip-select-form-field';

  /***************************************************************************************************
  / Autofill is not relevant: Optional!
  /***************************************************************************************************/
  autofilled: boolean = false;

  @HostBinding('attr.aria-describedby') describedBy = '';
  userAriaDescribedBy: string = '';

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
    this.focusMonitor.focusVia(this.input, 'program')
  }

  /***************************************************************************************************
  / Einde implementatie van MatFormFieldControl
  /***************************************************************************************************/


  /***************************************************************************************************
  / On Init
  /***************************************************************************************************/
  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.input)
      .subscribe({
        next: (focused) => {
          this.focused = !!focused;
          this.stateChanges.next();
        }
      });
    this.focusMonitor
      .monitor(this.input)
      .pipe(take(1))
      .subscribe({
        next: () => { this.OnTouched() }
      });
    this.valueChangesSubscription = this.ngControl.control?.valueChanges
      .subscribe({
        next: value => this.OnChange(value)
      });

    // We komen de control binnen. Als er geen chips geselecteerd zijn dan maak ik de control
    // invalid. De control wordt nog niet rood omdat ik het zo heb gemaakt dat Touched true moet zijn.
    if (this.isNoneSelected()) {
      this.ngControl.control?.setErrors({});  // we maken de control invalid
    }
  }
  private valueChangesSubscription: any;

  /***************************************************************************************************
  / on Click: er is op een chip geklikt
  /***************************************************************************************************/
  onClick(index: number) {
    if (this.disabled) return;
    this.value[index].selected = !this.value[index].selected;

    // Als er geen chips zijn geselecteerd dan wordt het control invalid. De 'required' wordt in HTML
    // gebruikt om error-tekst onder de control te zetten
    if (this.isNoneSelected()) {
      this.ngControl.control?.setErrors({ 'required': true });
    } else {
      this.ngControl.control?.setErrors(null);
    }
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
    this.valueChangesSubscription.unsubscribe();
  }

  /***************************************************************************************************
  / Bepaal of 1 of meer van de chips geselecteerd is.
  /***************************************************************************************************/
  isNoneSelected(): boolean {
    let count: number = 0;
    this.value.forEach(chip => { if (chip.selected) count++ });
    return count === 0;
  }

}

// Mijn inspiratie:
// https://www.youtube.com/watch?v=8ThVof0Rz64
// https://www.youtube.com/watch?v=AZsw2nRxkBk&t=671s
