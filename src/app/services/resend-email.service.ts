import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ResendEmailService {
  private serviceId = environment.emailJsServiceId;
  private templateId = environment.emailJsTemplateId;
  private publicKey = environment.emailJsPublicKey;

  sendEmail(
    to: string,
    subject: string,
    message: string
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: to,
      user_subject: subject,
      user_message: message,
    };

    return emailjs.send(
      this.serviceId,
      this.templateId,
      templateParams,
      this.publicKey
    );
  }
}
