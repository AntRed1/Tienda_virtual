import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ArticleService } from '../../services/article.service';
import { ResendEmailService } from '../../services/resend-email.service';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Article } from '../../models/article.model';
import Swal from 'sweetalert2';
import { ContactsComponent } from '../pages/contacts/contacts.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    FooterComponent,
    ContactsComponent,
    CommonModule,
    HeaderComponent,
    FormsModule,
  ],
})
export class MainComponent implements OnInit, AfterViewInit {
  articulos: Article[] = [];
  selectedArticle: Article | null = null;
  quantities: number[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articleService: ArticleService,
    private resendEmailService: ResendEmailService,
    protected cartService: CartService
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
    this.quantities = this.articulos[0].quantities;
  }
  updateCartItem(item: any) {
    this.cartService.updateCartItem(item);
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
              this.selectedArticle =
                this.articulos.find((articulo) =>
                  articulo.images.includes(src)
                ) || null;
              if (this.selectedArticle) {
                modalImage.setAttribute('src', src);
                modalInstance.show();
              }
            }
          });
        });
      });
    }
  }

  openModal(articulo: Article, image: string) {
    this.selectedArticle = articulo;
    const modalImage = document.getElementById(
      'modal-image'
    ) as HTMLImageElement;
    modalImage.setAttribute('src', image);
  }

  addToCart() {
    const quantityInput = document.getElementById(
      'quantity'
    ) as HTMLInputElement;
    const quantity = parseInt(quantityInput.value, 10);

    if (this.selectedArticle && quantity > 0) {
      const item: CartItem = {
        ...this.selectedArticle,
        quantity,
      };

      Swal.fire({
        title: '¿Agregar este artículo al carrito?',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartService.addItem(item);
          Swal.fire(
            '¡Agregado!',
            'El artículo ha sido agregado al carrito.',
            'success'
          );
        }
      });
    }
  }

  trackByArticuloId(index: number, articulo: Article): number {
    return articulo.id;
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
      },
      (error) => {
        console.error('Failed to send email:', error);
      }
    );
  }
}
