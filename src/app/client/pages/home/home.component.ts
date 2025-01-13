import { Component } from '@angular/core';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { CarouselImgComponent } from '../../components/carousel-img/carousel-img.component';
import { ProdItemComponent } from '../../components/prod-item/prod-item.component';
import { FooterBarComponent } from '../../components/footer-bar/footer-bar.component';
import { CategorieComponent } from '../../components/categorie/categorie/categorie.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuBarComponent, CarouselImgComponent, CategorieComponent, ProdItemComponent, FooterBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
