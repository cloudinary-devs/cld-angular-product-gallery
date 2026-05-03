import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';

declare const cloudinary: {
  galleryWidget: (config: CloudinaryGalleryConfig) => CloudinaryGalleryWidget;
};

interface CloudinaryMediaAsset {
  tag: string;
  mediaType?: 'image' | 'video' | 'spin';
}

interface CloudinaryGalleryConfig {
  container: string | HTMLElement;
  cloudName: string;
  mediaAssets: CloudinaryMediaAsset[];
  displayProps?: { mode?: string; columns?: number };
  aspectRatio?: string;
  imageBreakpoint?: number;
  carouselStyle?: string;
  carouselLocation?: string;
  borderColor?: string;
  borderWidth?: number;
  transition?: string;
  zoom?: boolean;
}

interface CloudinaryGalleryWidget {
  render: () => void;
  destroy: () => void;
}

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  template: `<div #galleryContainer class="gallery-container"></div>`,
  styles: [
    `
      .gallery-container {
        width: 100%;
        min-height: 500px;
      }
    `,
  ],
})
export class ProductGalleryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('galleryContainer', { static: true })
  galleryContainer!: ElementRef<HTMLDivElement>;

  @Input() cloudName = 'demo';
  @Input() mediaAssets: CloudinaryMediaAsset[] = [
    { tag: 'electric_car_product_gallery_demo' },
    { tag: 'electric_car_product_gallery_demo', mediaType: 'video' },
    { tag: 'electric_car_360_product_gallery_demo', mediaType: 'spin' },
  ];

  private widget: CloudinaryGalleryWidget | null = null;

  ngAfterViewInit(): void {
    this.initGallery();
  }

  ngOnDestroy(): void {
    this.widget?.destroy();
  }

  private initGallery(): void {
    if (typeof cloudinary === 'undefined') {
      console.error(
        'Cloudinary gallery widget script not loaded. Make sure the script tag is present in index.html.',
      );
      return;
    }

    this.widget = cloudinary.galleryWidget({
      container: this.galleryContainer.nativeElement,
      cloudName: this.cloudName,
      mediaAssets: this.mediaAssets,
    });

    this.widget.render();
  }
}
