import {provideRouter, Router, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, OktaAuthGuard
} from '@okta/okta-angular';
import {LoginComponent} from './components/login/login.component';
import {importProvidersFrom, Injector} from '@angular/core';

import {OktaAuth} from '@okta/okta-auth-js';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {RoomsListComponent} from './components/rooms-list/rooms-list.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {StudentsListComponent} from './components/students-list/students-list.component';
import {StudentDetailsComponent} from './components/student-details/student-details.component';

function sendToLoginPage(oktaAuth: OktaAuth,injector:Injector) {
  const  router=injector.get(Router);
  router.navigate(['/login'])
}

export const routes: Routes = [
  {path:'studentDetails',component:StudentDetailsComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'studentsList',component:StudentsListComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'roomDetails',component:RoomDetailsComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'rooms',component:RoomsListComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
   {path:'login/callback',component:OktaCallbackComponent},
  {path:'login',component:LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:'employees',component:EmployeesComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),importProvidersFrom(OktaAuthModule),]
});
