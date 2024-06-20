import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, FooterComponent, RouterLink],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.getUserIP()
        .then((ip) => {
          const hashedPassword = bcrypt.hashSync(
            registerForm.value.password,
            10
          );
          const formData = {
            name: registerForm.value.name,
            lastName: registerForm.value.lastName,
            telephone: registerForm.value.telephone,
            email: registerForm.value.email,
            password: hashedPassword,
            address: registerForm.value.address,
            ip: ip,
          };
          this.authService.saveUserData(formData);
          Swal.fire({
            title: '¡Buen trabajo!',
            text: 'Registro exitoso',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/login']);
          });
          registerForm.reset();
        })
        .catch((_error) => {
          const hashedPassword = bcrypt.hashSync(
            registerForm.value.password,
            10
          );
          const formData = {
            name: registerForm.value.name,
            lastName: registerForm.value.lastName,
            telephone: registerForm.value.telephone,
            email: registerForm.value.email,
            password: hashedPassword,
            address: registerForm.value.address,
            ip: null,
          };
          this.authService.saveUserData(formData);
          Swal.fire({
            title: '¡Buen trabajo!',
            text: 'Registro exitoso',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/login']);
          });
          registerForm.reset();
        });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos correctamente',
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
