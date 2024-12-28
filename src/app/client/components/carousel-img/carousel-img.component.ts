import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { PhotoService } from '../../service/photoservice/photoservice.service';
//import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-carousel-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-img.component.html',
  styleUrl: './carousel-img.component.scss',
  //providers: [PhotoService]
})
export class CarouselImgComponent implements OnInit{
  backgroundUrl: String = "";
  // images: any[] | undefined;

  //   responsiveOptions: any[] = [
  //       {
  //           breakpoint: '1024px',
  //           numVisible: 5
  //       },
  //       {
  //           breakpoint: '768px',
  //           numVisible: 3
  //       },
  //       {
  //           breakpoint: '560px',
  //           numVisible: 1
  //       }
  //   ];

  //   constructor(private photoService: PhotoService) {}

    ngOnInit() {
      this.backgroundUrl="/assets/carousel/carousel-book-1.jpg";
        //this.photoService.getImages().then((images) => (this.images = images));
    }
}
