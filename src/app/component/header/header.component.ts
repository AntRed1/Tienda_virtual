import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Tienda Virtual';
  isLoggedIn = false;
  name = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const currentUser = this.authService.getCurrentUser();
      this.name = currentUser ? currentUser.name : '';
    }
  }

  login() {
    if (this.isLoggedIn) {
      alert('Ya has iniciado sesión');
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.clearUserData();
    this.isLoggedIn = false;
    this.name = '';
    this.router.navigate(['/']);
  }
}
