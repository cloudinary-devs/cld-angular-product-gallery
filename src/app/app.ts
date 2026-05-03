import { Component } from '@angular/core';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';

@Component({
  selector: 'app-root',
  imports: [ProductGalleryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly cloudName = 'demo';

  readonly mediaAssets = [
    { tag: 'electric_car_product_gallery_demo' },
    { tag: 'electric_car_product_gallery_demo', mediaType: 'video' as const },
    { tag: 'electric_car_360_product_gallery_demo', mediaType: 'spin' as const },
  ];
}
