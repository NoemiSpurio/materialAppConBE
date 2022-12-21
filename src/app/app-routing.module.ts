import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AuthModule } from './core/auth/auth.module';

const routes: Routes = [
  {
    path: 'list',
    component: ListUserComponent
  },
  {
    path: 'create',
    component: DetailUserComponent
  },
  {
    path: 'detail/:id',
    component: DetailUserComponent
  },
  {
    path: 'edit/:id',
    component: DetailUserComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
