// resend-email.service.ts

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
  private templateId2 = environment.emailJsTemplateId2;

  constructor() {}

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

  sendEmail2(
    to: string,
    subject: string,
    message: string,
    fromName: string
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: to,
      user_subject: subject,
      user_message: message,
      from_name: fromName,
    };

    return emailjs.send(
      this.serviceId,
      this.templateId2,
      templateParams,
      this.publicKey
    );
  }

  sendCustomEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      this.serviceId,
      this.templateId2,
      templateParams,
      this.publicKey
    );
  }
}
