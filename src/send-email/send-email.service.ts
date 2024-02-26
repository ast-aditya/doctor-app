import { Injectable } from '@nestjs/common';
import { EmailData } from './email-data.interface';

@Injectable()
export abstract class EmailService {
  abstract sendEmail(data: EmailData): Promise<void>;
}
