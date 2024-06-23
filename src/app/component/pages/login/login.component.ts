import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { RegisterComponent } from '../register/register.component';
import { ResendEmailService } from '../../../services/resend-email.service';
import { UserStateService } from '../../../services/user-state.service'; // Importar el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    HeaderComponent,
    RegisterComponent,
    FooterComponent,
    RouterLink,
  ],
})
export class LoginComponent {
  title = 'Iniciar Sesión';

  constructor(
    private authService: AuthService,
    private router: Router,
    private resendEmailService: ResendEmailService,
    private userStateService: UserStateService // Inyectar el servicio
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      const user = this.authService.getUserByEmailAndPassword(email, password);
      if (user) {
        // Guardar datos del usuario en local storage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Actualizar el estado global del usuario
        this.userStateService.setCurrentUser(user);

        // Enviar correo electrónico después de iniciar sesión
        this.sendEmail2(user.name, user.email);

        Swal.fire({
          title: `¡Bienvenido/a ${user.name}!`,
          text: "Se envio una notificacion a su correo ✅!",
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        Swal.fire({
          title: 'Credenciales inválidas',
          text: 'El email o la contraseña proporcionados son incorrectos.',
          icon: 'error',
        });
      }
      loginForm.resetForm();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error',
      });
    }
  }

  sendEmail2(name: string, email: string): void {
    const subject = 'Inicio de sesión exitoso';
    const message = `Hola ${name}, has iniciado sesión correctamente en nuestra tienda virtual.`;

    this.resendEmailService
      .sendEmail2(email, subject, message, name)
      .then((response) => {
        console.log('Correo enviado correctamente:', response);
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
  }
}
