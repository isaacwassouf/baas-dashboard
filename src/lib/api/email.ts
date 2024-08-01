import { API } from '$lib/api';
import type { EmailTemplate, EmailTemplateEnum, SMTPData } from '$lib/types/email';

export const getSMTPConfig = async (): Promise<SMTPData> => {
  try {
    const response = await API.get<SMTPData>(`/api/emails/smtp`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch SMTP config');
  }
};

export const setSMTPConfig = async (data: SMTPData): Promise<void> => {
  try {
    const response = await API.post(`/api/emails/smtp`, data);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Failed to set SMTP config');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch logs');
  }
};

export const getEmailTemplate = async (emailType: EmailTemplateEnum): Promise<EmailTemplate> => {
  try {
    const response = await API.get<EmailTemplate>(`/api/emails/templates/${emailType}`);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get email template');
  }
};

export const setEmailTemplate = async (
  emailType: EmailTemplateEnum,
  data: EmailTemplate
): Promise<void> => {
  try {
    const response = await API.put(`/api/emails/templates/${emailType}`, data);

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Failed to set SMTP config');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch logs');
  }
};
