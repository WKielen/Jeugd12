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

@NgModule({
  declarations: [
    HomeComponent,
    MijnGegevensComponent,
    LadderComponent],
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
