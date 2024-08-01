export enum EmailTemplateEnum {
  EMAIL_VERIFICATION,
  MFA_VERIFICATION,
  PASSWORD_RESET
}

export interface SMTPData {
  host: string;
  port: number;
  username: string;
  password: string;
  sender: string;
}
