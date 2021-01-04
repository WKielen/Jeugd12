import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { A2hsComponent } from './a2hs/a2hs.component';
import { AgendaPageComponent } from './agenda.page';
import { AnnouncementPageComponent } from './announcement.page';
import { MatDialogHeaderComponent } from './dialog.header.detail';
import { DialogMessageBoxComponent } from './dialog.message.box';

@NgModule({
  declarations: [
    A2hsComponent,
    MatDialogHeaderComponent,
    DialogMessageBoxComponent,
    AnnouncementPageComponent,
    AgendaPageComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,

  ],
  exports: [
    A2hsComponent,
    MatDialogHeaderComponent,
    DialogMessageBoxComponent,
    AnnouncementPageComponent,
    AgendaPageComponent,
  ]
})
export class SharedComponentsModule { }
