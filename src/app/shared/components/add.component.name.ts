import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { forwardRef, Optional, SkipSelf } from '@angular/core';

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
      // this.me = parent.constructor.name;
      this.developmentMode = !environment.production;
    }
  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('TODO lees changes uit')
  }
}









