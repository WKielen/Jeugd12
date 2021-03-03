import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'ladder-box',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>

    <mat-card *ngIf="ladder">
      <mat-card-subtitle>
        {{ ladder.StandPer }}
      </mat-card-subtitle>
      <mat-card-content>
      <table mat-table #table [dataSource]="ladder.LadderItems">

        <ng-container matColumnDef="Name">
          <mat-header-cell *matHeaderCellDef style="width:60%"> Naam </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.Name }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="Points">
          <mat-header-cell *matHeaderCellDef style="width:20%"> Punten </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.Points }}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="Step">
          <mat-header-cell *matHeaderCellDef style="width:20%"> Trede </mat-header-cell>
          <mat-cell *matCellDef="let element">{{ element.Step }}</mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </table>

      </mat-card-content>
    </mat-card>
`
})

export class LadderBoxComponent extends BaseComponent {

  displayedColumns: string[] = ['Name', 'Points', 'Step'];

  @Input('ladder') ladder!: ILadder;

}

export interface ILadderItem {
  Name: string;
  Points: string;
  Step: number;
}

export interface ILadder {
  StandPer: string;
  LadderItems: ILadderItem[];
}
