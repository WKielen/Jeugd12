import { Component } from '@angular/core';

@Component({
  selector: 'app-offline',
  template: `
    <br>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Offline</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        Je bent offline! Deze app werkt alleen als je online bent via 3G, 4G of Wifi.
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
export class OfflineComponent {}
