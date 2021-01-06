import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { CustomPipesModule } from 'src/app/services/custom.pipes';
import { AgendaPageComponent } from './agenda.page';
import { AnnouncementPageComponent } from './announcement.page';
import { MatDialogHeaderComponent } from './dialog.header.detail';
import { DialogMessageBoxComponent } from './dialog.message.box';

@NgModule({
  declarations: [
    MatDialogHeaderComponent,
    DialogMessageBoxComponent,
    AnnouncementPageComponent,
    AgendaPageComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomPipesModule,
  ],
  exports: [
    MatDialogHeaderComponent,
    DialogMessageBoxComponent,
    AnnouncementPageComponent,
    AgendaPageComponent,
  ]
})
export class SharedComponentsModule { }
