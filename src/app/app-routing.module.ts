import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import {SignupComponent} from './signup/signup.component';
import {RouterGuardService} from './service/router-guard.service';
import {MembersListComponent} from './members-list/members-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'signup',component:SignupComponent},
  {
    path: 'cms',
    component: FullComponent,

    children: [
      {
        path: '',
        redirectTo: '/cms/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'members',
       component:MembersListComponent,
        canActivate:[RouterGuardService],
        data:{
          expectedRole:['admin']
        }
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        canActivate:[RouterGuardService],
        data:{
          expectedRole:['admin','user']
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[RouterGuardService],
        data:{
          expectedRole:['admin','user']
        }
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
