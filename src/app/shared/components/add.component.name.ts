import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'add-component-name',
  template: `
  -->{{ parent }}<--
    <small class="development" *ngIf="developmentMode">{{ parent}}</small>
    `,
  styles: ['.development { color: lightgrey; }'],
})

export class AddComponentNameComponent {

  @Input('parent') parent: any = {};
  public me: string = '';
  public developmentMode: boolean = false;

  constructor() {
    this.developmentMode = !environment.production;
  }
}
