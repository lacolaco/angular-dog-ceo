import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ImageItem = {
  src: string;
  alt: string;
};

@Component({
  selector: 'app-images-viewer',
  standalone: true,
  templateUrl: './images-viewer.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesViewerComponent {
  readonly images = input.required<ImageItem[]>();
}
