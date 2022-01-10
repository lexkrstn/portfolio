interface MailWithoutMessage {
  /**
   * The e-mail address of the sender.
   * All e-mail addresses can be plain 'sender@server.com' or formatted
   * 'Sender Name <sender@server.com>'
   */
  from: string;
  /**
   * Comma separated list or an array of recipients e-mail addresses that will
   * appear on the To: field
   */
  to: string;
  /**
   * The subject of the e-mail
   */
  subject: string;
}

export interface TextMail extends MailWithoutMessage {
  /**
   * The plaintext version of the message.
   */
  text: string;
}

export interface HtmlMail extends MailWithoutMessage {
  /**
   * The HTML version of the message.
   */
  html: string;
}

export type Mail = TextMail | HtmlMail;
