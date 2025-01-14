import { Component } from '@angular/core';
import { TopBarComponent } from "../../components/top-bar/top-bar.component";
import { CrudVenteComponent } from "../../components/crud-vente/crud-vente.component";

@Component({
  selector: 'app-vente-demo',
  standalone: true,
  imports: [TopBarComponent, CrudVenteComponent],
  templateUrl: './vente-demo.component.html',
  styleUrl: './vente-demo.component.scss'
})
export class VenteDemoComponent {

}
