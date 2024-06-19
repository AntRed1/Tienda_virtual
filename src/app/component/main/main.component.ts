import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGallery();
    }
  }

  private initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const modalImage = document.getElementById('modal-image') as HTMLImageElement;
    const modalElement = document.getElementById('gallery-modal');

    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const Modal = bootstrap.Modal;
        const modalInstance = new Modal(modalElement);

        galleryItems.forEach((item) => {
          item.addEventListener('click', () => {
            const src = item.getAttribute('src');
            if (src) {
              modalImage.setAttribute('src', src);
              modalInstance.show();
            }
          });
        });
      });
    }
  }
}
