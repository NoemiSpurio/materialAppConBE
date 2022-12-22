import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: ListUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: DetailUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: DetailUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: DetailUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
