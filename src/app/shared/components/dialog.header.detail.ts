import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'mat-dialog-header-detail',
  template: `
  <h2 mat-dialog-title>{{ title }}
    <div id="left">
      <button *ngIf="showButtons" mat-icon-button color="white" blur='true' (click)="onClickModify($event)">
        <mat-icon>edit</mat-icon>
      </button>
      <button *ngIf="showButtons" mat-icon-button color="white" (click)="onClickCopy($event)">
        <mat-icon>content_copy</mat-icon>
      </button>
      <button *ngIf="showButtons" mat-icon-button color="warn" (click)="onClickDelete($event)">
        <mat-icon>delete</mat-icon>
      </button>
      <button mat-icon-button color="white" cdkFocusInitial mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </h2>
  <small class="development" *ngIf="developmentMode">{{ me }}</small>
  `,
  styles: [
    'h2 { margin: 0px; }',
    '#left { display: flex; justify-content: flex-end; }'
  ]
})

export class MatDialogHeaderComponent extends BaseComponent{

  @Input('title') title: string = '';
  @Input('showButtons') showButtons: boolean = true;

  @Output('onClickModify') modify = new EventEmitter();
  @Output('onClickCopy') copy = new EventEmitter();
  @Output('onClickDelete') delete = new EventEmitter();



  onClickModify($event: any) {
    if ($event instanceof MouseEvent) return;
    this.modify.emit($event);
  }
  onClickCopy($event: any) {
    if ($event instanceof MouseEvent) return;
    this.copy.emit($event);
  }
  onClickDelete($event: any) {
    if ($event instanceof MouseEvent) return;
    this.delete.emit($event);
  }
}
