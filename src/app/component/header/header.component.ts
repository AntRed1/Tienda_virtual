import { Component } from '@angular/core';
import { ResendEmailService } from '../../services/resend-email.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Tienda Virtual';

  
}
