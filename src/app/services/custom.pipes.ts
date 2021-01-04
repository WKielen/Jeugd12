import { NgModule } from '@angular/core';
import { DoelgroepPipe, EvenementTypePipe, FormattedAmountPipe, OrganisatiePipe } from 'src/app/services/agenda.service';

@NgModule({
  declarations: [
    OrganisatiePipe,
    DoelgroepPipe,
    EvenementTypePipe,
    FormattedAmountPipe,
  ],
  imports: [

  ],
  exports: [
    OrganisatiePipe,
    DoelgroepPipe,
    EvenementTypePipe,
    FormattedAmountPipe,
  ]
})
export class CustomPipesModule { }
