import {ExtraOptions, provideRouter, Router, Routes, withRouterConfig} from '@angular/router';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, OktaAuthGuard
} from '@okta/okta-angular';

import {importProvidersFrom, Injector} from '@angular/core';

import {OktaAuth} from '@okta/okta-auth-js';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app.component';

import {StudentDetailsComponent} from './Admin/admin-pages/components/student-details/student-details.component';
import {StudentsListComponent} from './Admin/admin-pages/components/students-list/students-list.component';
import {RoomDetailsComponent} from './Admin/admin-pages/components/room-details/room-details.component';
import {RoomsListComponent} from './Admin/admin-pages/components/rooms-list/rooms-list.component';
import {LoginComponent} from './Uthentication/login/login.component';
import {EmployeesComponent} from './Admin/admin-pages/components/employees/employees.component';
import {DashboardComponent} from './Admin/admin-pages/components/dashboard/dashboard.component';
import {HomeComponent} from './Student/student-pages/home/home.component';
import {StudentHolidaysComponent} from './Student/student-pages/student-holidays/student-holidays.component';
import {ChatComponent} from './Student/student-pages/chat/chat.component';
import {RoomComponent} from './Student/student-pages/room/room.component';
import {StudentProfileComponent} from './Student/student-pages/student-profile/student-profile.component';
import {StudentSetingsComponent} from './Student/student-pages/student-setings/student-setings.component';
import {StudentFormComponent} from './Student/student-pages/student-form/student-form.component';
import {RegisterComponent} from './Uthentication/register/register.component';
import {authGuard} from './guards/auth.guard';
import {adminGuard} from './guards/admin.guard';
import {StudentsRequestsComponent} from './Admin/admin-pages/components/students-requests/students-requests.component';
import {SettingsComponent} from './Admin/admin-pages/components/settings/settings.component';
import {FoodComponent} from './Admin/admin-pages/components/food/food.component';


export const routes: Routes = [
  {path: "student/home", component: HomeComponent},
  {path: 'student/profile', component: StudentProfileComponent, canActivate: [authGuard]},
  {path: 'student/settings', component: StudentSetingsComponent, canActivate: [authGuard]},
  {path: 'student/studentForm', component: StudentFormComponent, canActivate: [authGuard]},
  {path: 'student/holidays', component: StudentHolidaysComponent, canActivate: [authGuard]},
  {path: 'student/room', component: RoomComponent,canActivate: [authGuard]},

  //admin routes
  {path: 'admin/dashboard', component: DashboardComponent,canActivate:[adminGuard]},
  {path: 'admin/studentsList', component: StudentsListComponent,canActivate:[adminGuard]},
  {path: 'admin/roomDetails/:id/:roomNumber/:buildingName', component: RoomDetailsComponent,canActivate:[adminGuard]},
  {path: 'admin/studentDetails/:id', component: StudentDetailsComponent,canActivate:[adminGuard]},
  {path: 'admin/rooms', component: RoomsListComponent,canActivate:[adminGuard]},
  {path: 'admin/employees', component: EmployeesComponent,canActivate:[adminGuard]},
  {path:'admin/studentRequest',component:StudentsRequestsComponent,canActivate:[adminGuard]},
  {path:'admin/settings',component:SettingsComponent,canActivate:[adminGuard]},
  {path:'admin/food',component:FoodComponent,canActivate:[adminGuard]},




  {path: 'api/auth/authenticate', component: LoginComponent},
  {path: "api/auth/register", component: RegisterComponent},
  {path: 'student/chat', component: ChatComponent},


  {path: '', redirectTo: '/student/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/student/home', pathMatch: 'full'},
];

const routerConfig:ExtraOptions={
  scrollPositionRestoration:'top',
  anchorScrolling:'enabled',
  scrollOffset:[0,0]
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes,withRouterConfig(routerConfig)), importProvidersFrom(OktaAuthModule),]
});
