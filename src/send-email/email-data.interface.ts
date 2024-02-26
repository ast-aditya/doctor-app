export interface AttachmentJSON {
    content: string;
    filename: string;
    type?: string;
    disposition?: string;
    content_id?: string;
  }
export interface EmailData {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: AttachmentJSON[]; 
    reply_to?: string; 
    send_at?: number; 
    template_id?: string;
  }
  