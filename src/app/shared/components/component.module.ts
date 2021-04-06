import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/material.module';
import { CustomPipesModule } from 'src/app/services/custom.pipes';
import { AddComponentNameComponent } from './add.component.name';
import { AgendaPageComponent } from './agenda.page';
import { AnnouncementPageComponent } from './announcement.page';
import { ChatFormComponent } from './chat-form.component';
import { ChatroomComponent } from './chatroom.component';
import { MatDialogHeaderComponent } from './dialog.header.detail';
import { DialogMessageBoxComponent } from './dialog.message.box';
import { MessageDialogComponent } from './dialog.message.component';
import { FeedComponent } from './feed.component';
import { LadderBoxComponent } from './ladder.box.component';
import { MessageComponent } from './message.component';
import { MultiChipSelectControlComponent } from './multi-chip-select-control.component';
import { PersonalDataBoxComponent } from './personal.data.box';
import { SignoffTrainingBoxComponent } from './signoff.training.box.component';
import { TrainingsgroupsComponent } from './trainingsgroups';
import { UserItemComponent } from './user-item.component';
import { UserListComponent } from './user-list.component';

const componentList = [
  MatDialogHeaderComponent,
  DialogMessageBoxComponent,
  AnnouncementPageComponent,
  AgendaPageComponent,
  PersonalDataBoxComponent,
  AddComponentNameComponent,
  TrainingsgroupsComponent,
  SignoffTrainingBoxComponent,
  MultiChipSelectControlComponent,
  MessageDialogComponent,
  LadderBoxComponent,
  ChatFormComponent,
  MessageComponent,
  ChatroomComponent,
  FeedComponent,
  UserItemComponent,
  UserListComponent,
]
@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    CustomPipesModule,
    FormsModule,
  ],
  declarations: [
    ...componentList
  ],
  exports: [
    ...componentList
  ]
})
export class SharedComponentsModule { }
