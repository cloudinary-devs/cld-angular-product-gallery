# Cloudinary Product Gallery — Angular Demo

A minimal Angular application showing how to integrate the [Cloudinary Product Gallery Widget](https://cloudinary.com/documentation/product_gallery_reference) into an Angular project. The demo renders images, video, and 360° spin assets sourced from Cloudinary tags.

## What this demonstrates

- Loading the Cloudinary Product Gallery Widget script via `index.html`
- Wrapping the widget in a reusable, standalone Angular component (`ProductGalleryComponent`)
- Initialising the widget with `ngAfterViewInit` and targeting a native DOM element via `ViewChild`
- Cleaning up the widget with `ngOnDestroy` to avoid memory leaks
- Passing `cloudName` and `mediaAssets` into the component as `@Input()` properties

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A Cloudinary account — [sign up free](https://cloudinary.com/users/register/free)

No additional npm packages are required. The gallery widget is loaded directly from Cloudinary's CDN.

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/cloudinary-devs/cld-angular-product-gallery.git
cd cld-angular-product-gallery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set your cloud name

Open `src/app/app.ts` and replace `'demo'` with your own Cloudinary cloud name:

```typescript
readonly cloudName = 'your-cloud-name';
```

Update `mediaAssets` to reference your own tags, or keep the demo tags to see the electric car example straight away.

### 4. Run the app

```bash
npm start
```

Navigate to `http://localhost:4200/` — the gallery will render automatically.

## Project structure

```
src/
├── index.html                          # Loads the Cloudinary gallery widget script
└── app/
    ├── app.ts                          # Root component — sets cloudName & mediaAssets
    ├── app.html                        # Page layout
    ├── app.scss                        # App-level styles
    └── product-gallery/
        └── product-gallery.component.ts  # Standalone gallery component
```

## How the component works

The widget script exposes a global `cloudinary` object. `ProductGalleryComponent` calls `cloudinary.galleryWidget()` after the view is ready and destroys it when the component is torn down:

```typescript
ngAfterViewInit(): void {
  this.widget = cloudinary.galleryWidget({
    container: this.galleryContainer.nativeElement,
    cloudName: this.cloudName,
    mediaAssets: this.mediaAssets,
  });
  this.widget.render();
}

ngOnDestroy(): void {
  this.widget?.destroy();
}
```

The component accepts two inputs so it can be reused anywhere in your app:

| Input | Type | Description |
|---|---|---|
| `cloudName` | `string` | Your Cloudinary cloud name |
| `mediaAssets` | `CloudinaryMediaAsset[]` | Array of tag-based asset definitions |

Each asset entry supports `tag` (required) and an optional `mediaType` of `'image'` (default), `'video'`, or `'spin'`.

## Useful links

- [Product Gallery Widget documentation](https://cloudinary.com/documentation/product_gallery_reference)
- [Product Gallery Widget demo](https://demo.cloudinary.com/product-gallery)
- [Cloudinary Angular SDK](https://cloudinary.com/documentation/angular_integration)
- [Cloudinary sign-up](https://cloudinary.com/users/register/free)

## Building for production

```bash
npm run build
```

Output is written to the `dist/` directory, optimized for production.
