import { Routes, RouterModule } from '@angular/router';
import { inject, NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/publicGuard.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthenService } from './service/Authen/authen.service';

export const routes: Routes = [
  { path: '',
    loadChildren: ()=> import('./client/client.module').then(m => m.ClientModule)
    //component: HomeComponent
  },
  { path: 'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)
    //component: DashboardComponent
  },
  { path: 'connexion', component: LoginComponent},
  { path: 'inscription', component: RegisterComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},

  { path: '**', redirectTo: 'connexion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
