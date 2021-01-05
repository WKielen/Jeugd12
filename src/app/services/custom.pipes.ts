import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DoelgroepValues, OrganisatieValues, TypeValues } from './agenda.service';

@Pipe({ name: 'organisatie' })
export class OrganisatiePipe implements PipeTransform {
  transform(input: string): string {
    return OrganisatieValues.GetLabel(input);
  }
}

@Pipe({ name: 'doelgroep' })
export class DoelgroepPipe implements PipeTransform {
  transform(input: string): string {
    return DoelgroepValues.GetLabel(input);
  }
}
@Pipe({ name: 'evenementtype' })
export class EvenementTypePipe implements PipeTransform {
  transform(input: string): string {
    return TypeValues.GetLabel(input);
  }
}

/***************************************************************************************************
/
/***************************************************************************************************/
@Pipe({ name: 'formattedamount' })
export class FormattedAmountPipe implements PipeTransform {
  transform(input: string): string {
    return '€ ' + Number(input).toLocaleString('nl', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}

/***************************************************************************************************
/
/***************************************************************************************************/
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
