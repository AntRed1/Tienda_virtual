import { ContactsComponent } from './../pages/contacts/contacts.component';
import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, ContactsComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, AfterViewInit {
  articulos: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGallery();
    }
  }

  private loadArticles() {
    this.articulos = this.articleService.getArticles();
  }

  private initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const modalImage = document.getElementById(
      'modal-image'
    ) as HTMLImageElement;
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
