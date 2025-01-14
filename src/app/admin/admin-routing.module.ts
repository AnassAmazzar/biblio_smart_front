import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientDemoComponent } from './pages/client-demo/client-demo.component';
import { ProductDemoComponent } from './pages/product-demo/product-demo.component';
import { CrudVenteComponent } from './components/crud-vente/crud-vente.component';
import { VenteDemoComponent } from './pages/vente-demo/vente-demo.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'crud-client', component: ClientDemoComponent},
  {path: 'crud-product', component: ProductDemoComponent},
  {path: 'crud-vente', component: VenteDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
