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
import { CustomPipesModule } from './services/custom.pipes';
import { AuthService } from './services/auth.service';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
  ],
  imports: [
    AppNavModule,
    MyPagesModule,
    CustomMaterialModule,
    CustomPipesModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    BrowserAnimationsModule,

  ],
  providers: [
    AuthService,  // belangrijk omdat hierdoor hetzelfde object van deze service in alle componenten beschikbaar is.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    {
      provide: LocationStrategy,      // set de # hash in het path. In principe alleen voor oudere browser maar
      useClass: HashLocationStrategy  // voor ons handig omdat ze vanuit een path werken in de wordpress omgeving
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
