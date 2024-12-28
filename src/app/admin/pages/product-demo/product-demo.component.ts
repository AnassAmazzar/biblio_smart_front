import { Component } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { CrudProductComponent } from '../../components/crud-product/crud-product.component';

@Component({
  selector: 'app-product-demo',
  standalone: true,
  imports: [TopBarComponent, CrudProductComponent],
  templateUrl: './product-demo.component.html',
  styleUrl: './product-demo.component.scss'
})
export class ProductDemoComponent {

}
