import { Component } from '@angular/core';

@Component({
  selector: 'app-notallowed',
  template: `
  <br>
  <mat-card>
    <mat-card-header>
      <mat-card-title>Sorry</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      Niet toegestaan
    </mat-card-content>
  </mat-card>
  `,
  styles: [`
      @use "src/mixins.scss" as s;
      mat-card {
        text-align: center;
        @include s.desktop {
            width: 50%;
            display: block;
            margin-left: auto;
            margin-right: auto;
            text-align: left;
        }
      }
  `]
})
export class NotallowedComponent {}
