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

  constructor(private resendEmailService: ResendEmailService) {}

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
