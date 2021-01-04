import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyPagesModule } from './my-pages/my-pages.module';
import { AppNavModule } from './app-nav/app-nav.module';
import { CustomMaterialModule } from './material.module';
import { ParentComponent } from './shared/parent.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ErrorHandler, LOCALE_ID } from '@angular/core';
import { AppErrorHandler } from './shared/error-handling/app-error-handler';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


// import { AuthService } from './services/auth.service';
// import { AuthGuard } from './services/auth.guard';
// import { AdminAuthGuard } from './services/admin-auth-guard.service';
// import { LedenService } from './services/leden.service';
// import { ReadTextFileService } from './services/readtextfile.service';
// import { AgendaService } from './services/agenda.service';
// import { ParamService } from './services/param.service';
// import { MailService } from './services/mail.service';
// import { TrainingService } from './services/training.service';
// import { NotificationService } from './services/notification.service';
// import { UserService } from './services/user.service';
// // Onderstaande 3 om bedragen in NL vorm weer te geven via pipe
// import { registerLocaleData, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
// import localeNl from '@angular/common/locales/nl';
// // Material Date Locale hieronder toegevoegd voor Angular 9 conversie
// import { BaseComponent } from './shared/base.component';
// import { WebsiteService } from './services/website.service';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    AppComponent
  ],
  imports: [
    AppNavModule,
    MyPagesModule,
    CustomMaterialModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },

    {
      provide: LOCALE_ID,
      useValue: 'nl'
    },
    // Material Date Locale hieronder toegevoegd voor Angular 9 conversie
    { provide: MAT_DATE_LOCALE, useValue: 'nl-NL' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
