import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SharedComponentsModule } from '../shared/components/component.module';
import { MijnGegevensComponent } from './mijngegevens/mijngegevens.component';
import { LadderComponent } from './ladder/ladder.component';
import { TestComponent } from './test/test.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    HomeComponent,
    MijnGegevensComponent,
    LadderComponent,
    TestComponent,
    ChatComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SharedComponentsModule,
  ],
})
export class MyPagesModule { }
