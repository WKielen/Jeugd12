import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './app-nav/default/default.component';
import { LoginComponent } from './app-nav/login/login.component';
import { NotallowedComponent } from './app-nav/notallowed/notallowed.component';
import { OfflineComponent } from './app-nav/offline/offline.component';
import { MainComponent } from './my-pages/main/main.component';
import { AuthGuard } from './services/auth.guard';
import { ROUTE } from './services/website.service';

const routes: Routes = [
  { path: ROUTE.loginPageRoute, component: LoginComponent },
  { path: ROUTE.offlinePageRoute, component: OfflineComponent },
  {
    path: '', component: DefaultComponent, canActivate: [AuthGuard],
    children: [
      { path: ROUTE.notAllowedPageRoute, component: NotallowedComponent  },
  //     { path: ROUTE.komendeweekPageRoute, component: KomendeWeekComponent, canActivate: [AuthGuard] },
      { path: ROUTE.mainPageRoute, component: MainComponent, canActivate: [AuthGuard] },
  //     { path: ROUTE.ledenPageRoute, component: LedenComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.ledenPageRoles } },
  //     { path: ROUTE.ledenmanagerPageRoute, component: LedenManagerComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.ledenmanagerPageRoles } },
  //     { path: ROUTE.agendaPageRoute, component: AgendaComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.agendaPageRoles } },
  //     { path: ROUTE.websitePageRoute, component: WebsiteComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.websitePageRoles } },
  //     { path: ROUTE.multiupdatePageRoute, component: MultiUpdateComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.multiupdatePageRoles } },
  //     { path: ROUTE.downloadPageRoute, component: DownloadComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.downloadPageRoles } },
  //     { path: ROUTE.oudledenPageRoute, component: OudLedenComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.oudledenPageRoles } },
  //     { path: ROUTE.contrbedragenPageRoute, component: ContrBedragenComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.contrbedragenPageRoles } },
  //     { path: ROUTE.ladderPageRoute, component: LadderComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.ladderPageRoles } },
  //     { path: ROUTE.syncnttbPageRoute, component: SyncNttbComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.syncnttbPageRoles } },
  //     { path: ROUTE.trainingdeelnamePageRoute, component: TrainingDeelnameComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.trainingdeelnamePageRoles } },
  //     { path: ROUTE.trainingoverzichtPageRoute, component: TrainingOverzichtComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.trainingdeelnamePageRoles } },
  //     { path: ROUTE.masterzPageRoute, component: MasterzComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.masterzPageRoles } },
  //     { path: ROUTE.todolistPageRoute, component: TodolistComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.todolistPageRoles } },
  //     { path: ROUTE.registrationPageRoute, component: RegistrationComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.registrationPageRoles } },
  //     { path: ROUTE.mailPageRoute, loadChildren: () => import('./my-pages/mail/module').then(m => m.Module), canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.mailPageRoles } },
  //     { path: ROUTE.testPageRoute, loadChildren: () => import('./my-pages/test/module').then(m => m.Module), canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.testPageRoles } },
  //     { path: ROUTE.compadminPageRoute, loadChildren: () => import('./my-pages/comp-admin/module').then(m => m.Module), canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.testPageRoles } },
       { path: '**', component: MainComponent }//, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
