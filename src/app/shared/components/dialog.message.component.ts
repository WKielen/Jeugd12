import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'dialog-message-box',
  template: `
   <h2 mat-dialog-title>Melding</h2>
   <mat-dialog-content>
    <div [innerHTML]="data"></div>
   </mat-dialog-content>
   <mat-dialog-actions>
     <button mat-button mat-dialog-close>Sluit</button>
   </mat-dialog-actions>
  `,
  styles: [],
})

export class MessageDialogComponent extends BaseComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super()
  }

}

