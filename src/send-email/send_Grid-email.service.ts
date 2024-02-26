import { Injectable } from '@nestjs/common';
import { EmailData } from './email-data.interface';
import * as SendGrid from '@sendgrid/mail';
import { EmailService } from './send-email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendgridEmailService extends EmailService {
  constructor(private readonly configService: ConfigService) {
    super();
    SendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
  }

  async sendEmail(data: EmailData): Promise<void> {
    const msg = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
      attachments: data.attachments, 
      reply_to: data.reply_to,
      send_at: data.send_at, 
      template_id: data.template_id,
    };
    await SendGrid.send(msg);
    console.log(`E-Mail sent to ${data.to}`);
  }
}
