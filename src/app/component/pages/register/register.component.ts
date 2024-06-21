import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, FooterComponent, RouterLink],
})
export class RegisterComponent {
  title = 'Registrarse';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.getUserIP()
        .then((ip) => {
          const formData = {
            name: registerForm.value.name,
            lastName: registerForm.value.lastName,
            telephone: registerForm.value.telephone,
            email: registerForm.value.email,
            password: registerForm.value.password, // Guardamos la contraseña en texto plano
            address: registerForm.value.address,
            ip: ip,
          };
          this.authService.saveUserData(formData);
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Ahora puedes iniciar sesión con tu cuenta.',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/login']);
          });
          registerForm.resetForm();
        })
        .catch((error) => {
          console.error('Error al obtener la IP:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar registrar. Por favor, intenta nuevamente más tarde.',
            icon: 'error',
          });
        });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error',
      });
    }
  }

  getUserIP(): Promise<string> {
    return fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => data.ip)
      .catch(() => {
        return null;
      });
  }
}
