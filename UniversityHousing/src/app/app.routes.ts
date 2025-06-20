import {provideRouter, Router, Routes} from '@angular/router';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, OktaAuthGuard
} from '@okta/okta-angular';

import {importProvidersFrom, Injector} from '@angular/core';

import {OktaAuth} from '@okta/okta-auth-js';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app.component';

import {InsertDataComponent} from './Student/insert-data/insert-data.component';
import {StudentDetailsComponent} from './Admin/admin-pages/components/student-details/student-details.component';
import {StudentsListComponent} from './Admin/admin-pages/components/students-list/students-list.component';
import {RoomDetailsComponent} from './Admin/admin-pages/components/room-details/room-details.component';
import {RoomsListComponent} from './Admin/admin-pages/components/rooms-list/rooms-list.component';
import {LoginComponent} from './Admin/admin-pages/components/login/login.component';
import {EmployeesComponent} from './Admin/admin-pages/components/employees/employees.component';
import {DashboardComponent} from './Admin/admin-pages/components/dashboard/dashboard.component';

function sendToLoginPage(oktaAuth: OktaAuth,injector:Injector) {
  const  router=injector.get(Router);
  router.navigate(['/login'])
}

export const routes: Routes = [
  {path:'studentDetails/:id',component:StudentDetailsComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'studentsList',component:StudentsListComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'roomDetails/:id',component:RoomDetailsComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'rooms',component:RoomsListComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
   {path:'login/callback',component:OktaCallbackComponent},
  {path:'login',component:LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'employees',component:EmployeesComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'insertData',component:InsertDataComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),importProvidersFrom(OktaAuthModule),]
});
