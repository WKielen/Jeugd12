import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './app-nav/default/default.component';
import { LoginComponent } from './app-nav/login/login.component';
import { NotallowedComponent } from './app-nav/notallowed/notallowed.component';
import { OfflineComponent } from './app-nav/offline/offline.component';
import { HomeComponent } from './my-pages/home/home.component';
import { LadderComponent } from './my-pages/ladder/ladder.component';
import { MijnGegevensComponent } from './my-pages/mijngegevens/mijngegevens.component';
import { TestComponent } from './my-pages/test/test.component';
import { AuthGuard } from './services/auth.guard';
import { ROUTE } from './services/website.service';

const routes: Routes = [
  { path: ROUTE.loginPageRoute, component: LoginComponent },
  { path: ROUTE.offlinePageRoute, component: OfflineComponent },
  {
    path: '', component: DefaultComponent, canActivate: [AuthGuard],
    children: [
      { path: ROUTE.notAllowedPageRoute, component: NotallowedComponent },
      { path: ROUTE.homePageRoute, component: HomeComponent, canActivate: [AuthGuard] },
      { path: ROUTE.gegevensPageRoute, component: MijnGegevensComponent, canActivate: [AuthGuard] },
      { path: ROUTE.ladderPageRoute, component: LadderComponent, canActivate: [AuthGuard] },
      { path: ROUTE.testPageRoute, component: TestComponent, canActivate: [AuthGuard] },
      { path: '**', component: HomeComponent }//, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
