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
import { ResendEmailService } from '../../services/resend-email.service';

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
    private articleService: ArticleService,
    private resendEmailService: ResendEmailService
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

  sendEmail(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const to = (form.querySelector('#recipientEmail') as HTMLInputElement)
      ?.value;
    const subject = (form.querySelector('#emailSubject') as HTMLInputElement)
      ?.value;
    const message = (form.querySelector('#emailMessage') as HTMLTextAreaElement)
      ?.value;

    this.resendEmailService.sendEmail(to, subject, message).then(
      () => {
        console.log('Email sent successfully!');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      (error) => {
        console.error('Failed to send email:', error);
        // Aquí puedes manejar el error, mostrar mensajes de error, etc.
      }
    );
  }
}
