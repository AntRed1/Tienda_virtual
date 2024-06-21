import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { RegisterComponent } from '../register/register.component';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      const user = this.authService.getUserByEmailAndPassword(email, password);
      if (user) {
        this.authService.setCurrentUser(user);
        Swal.fire({
          title: `¡Bienvenido/a ${user.name}!`,
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
}
