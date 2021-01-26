import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/material.module';
import { CustomPipesModule } from 'src/app/services/custom.pipes';
import { AddComponentNameComponent } from './add.component.name';
import { AgendaPageComponent } from './agenda.page';
import { AnnouncementPageComponent } from './announcement.page';
import { MatDialogHeaderComponent } from './dialog.header.detail';
import { DialogMessageBoxComponent } from './dialog.message.box';
import { MultiChipSelectControlComponent } from './multi-chip-select-control.component';
import { PersonalDataBoxComponent } from './personal.data.box';
import { SignoffTrainingBoxComponent } from './signoff.training.box.component';
import { TrainingsgroupsComponent } from './trainingsgroups';

@NgModule({
  declarations: [
    MatDialogHeaderComponent,
    DialogMessageBoxComponent,
    AnnouncementPageComponent,
    AgendaPageComponent,
    PersonalDataBoxComponent,
    AddComponentNameComponent,
    TrainingsgroupsComponent,
    SignoffTrainingBoxComponent,
    MultiChipSelectControlComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    CustomPipesModule,
  ],
  exports: [
    MatDialogHeaderComponent,
    DialogMessageBoxComponent,
    AnnouncementPageComponent,
    AgendaPageComponent,
    PersonalDataBoxComponent,
    AddComponentNameComponent,
    TrainingsgroupsComponent,
    SignoffTrainingBoxComponent,
    MultiChipSelectControlComponent,
  ]
})
export class SharedComponentsModule { }
