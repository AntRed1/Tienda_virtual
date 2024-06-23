import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ResendEmailService } from '../../services/resend-email.service';
import { ArticleService } from '../../services/article.service';
import { UserStateService } from '../../services/user-state.service'; // Importar el servicio

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Tienda Virtual';
  isLoggedIn = false;
  name = '';
  cartItemCount: number = 0;
  quantities: number[] = [];

  constructor(
    private resendEmailService: ResendEmailService,
    private authService: AuthService,
    protected cartService: CartService,
    private router: Router,
    private articleService: ArticleService,
    private userStateService: UserStateService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const currentUser = this.userStateService.getCurrentUser(); // Obtener el usuario desde el servicio de estado
      this.name = currentUser ? currentUser.name : '';
    }

    this.cartItemCount = this.cartService.getTotalItems();
    this.cartService.cartItemsChanged.subscribe(() => {
      this.cartItemCount = this.cartService.getTotalItems();
    });

    this.quantities = this.articleService.getArticles()[0].quantities;

    // Suscribirse a los cambios en el usuario actual
    this.userStateService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.name = user ? user.name : '';
    });
  }

  async procesarCompra() {
    const { value: accept } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas procesar la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, procesar compra',
    });

    if (accept) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.email) {
        const cartItems = this.cartService.getCart();
        const resumenHTML = this.generateResumenHTML(cartItems);

        this.resendEmailService
          .sendEmail(currentUser.email, 'Resumen de Compra', resumenHTML)
          .then(
            () => {
              Swal.fire(
                '¡Compra Procesada!',
                'Se ha enviado un resumen de la compra a tu correo electrónico.',
                'success'
              );
              console.log('Email enviado correctamente.');
              localStorage.setItem('cartItems', JSON.stringify(cartItems));
            },
            (error: any) => {
              console.error('Error al enviar el correo:', error);
              Swal.fire(
                'Error',
                'No se pudo enviar el correo electrónico.',
                'error'
              );
              console.error('Error al enviar el correo:', error);
            }
          );

        this.cartService.clearCart();
        this.cartItemCount = 0;
      }
    }
  }

  generateResumenHTML(cartItems: any[]): string {
    let html = '<div style="font-family: Arial, sans-serif;">';
    html += '<h3>Resumen de Compra</h3>';
    html += '<ul>';
    cartItems.forEach((item) => {
      html += `<li>${item.name} - Cantidad: ${item.quantity}</li>`;
    });
    html += '</ul>';
    html += '</div>';
    return html;
  }

  login() {
    if (this.isLoggedIn) {
      alert('Ya has iniciado sesión');
    } else {
      this.router.navigate(['/login']);
    }
  }

  confirmLogout() {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión',
      denyButtonText: `No cerrar sesión`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
        Swal.fire('Sesión cerrada', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Continuas en sesión', '', 'info');
      }
    });
  }
  logout() {
    this.authService.clearUserData();
    this.isLoggedIn = false;
    this.name = '';
    this.router.navigate(['/']);
  }

  updateCartItem(item: any) {
    this.cartService.updateCartItem(item);
  }

  confirmDelete(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que deseas eliminar "${item.name}" del carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeCartItem(item);
        Swal.fire(
          'Eliminado',
          `"${item.name}" ha sido eliminado del carrito`,
          'success'
        );
      }
    });
  }

  updateSelectedQuantity(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.quantities = Array.from(
      { length: parseInt(target.value, 10) },
      (_, i) => i + 1
    );
  }
}
