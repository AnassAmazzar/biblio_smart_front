import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './client/pages/home/home.component';


export const routes: Routes = [
  { path: '',
    loadChildren: ()=> import('./client/client.module').then(m => m.ClientModule)
    //component: HomeComponent
  },
  { path: 'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)
    //component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
