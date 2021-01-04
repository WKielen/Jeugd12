import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './main/home.component';

@NgModule({
  declarations: [
    // DashboardComponent,
    // LedenComponent,
    // LedenManagerComponent,
    // AgendaComponent,
    // AgendaDialogComponent,
    // AgendaDetailDialogComponent,
    // WebsiteComponent,
    // LadderComponent,
    // MultiUpdateComponent,
    // DownloadComponent,
    // ContrBedragenComponent,
    // OudLedenComponent,
    // UsersComponent,
    // SyncNttbComponent,
    // TrainingDeelnameComponent,
    // TrainingOverzichtComponent,

    // LedenDialogComponent,
    // LedenDeleteDialogComponent,
    // MailDialogComponent,
    // SingleMailDialogComponent,
    // TrainingOverzichtDialogComponent,
    // WebsiteDialogComponent,
    // DecisionDialogComponent,

    // MasterzComponent,
    // KomendeWeekComponent,
    // TodolistComponent,
    // TodoListDetailDialogComponent,
    // TodoListDialogComponent,
  HomeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,

    // BrowserAnimationsModule,
    // LayoutModule,
    // HttpClientModule,
    // HighGraphsModule,
    // FullCalendarModule,
    // AngularEditorModule,
    // HoldableModule,
    // AngularIbanModule,
    // SharedComponentsModule,

  ],
})
export class MyPagesModule { }
