import { Component } from '@angular/core';
import { Product } from '../../../domain/Product';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prod-item',
  standalone: true,
  imports: [DataViewModule, TagModule, RatingModule, ButtonModule, CommonModule,],
  templateUrl: './prod-item.component.html',
  styleUrl: './prod-item.component.scss'
  // providers: [ProductService]
})
export class ProdItemComponent {
  layoutch: 'list' | 'grid' = 'grid';


  products!: Product[];

  // constructor(private productService: ProductService) {}

  ngOnInit() {
      // this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
  }
  getSeverity(product: Product) : "success" | "warning" | "danger" | undefined {
      switch (product.marque) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return undefined;
      }
  };
}
