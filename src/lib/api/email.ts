import { API } from '$lib/api';
import type { SMTPData } from '$lib/types/email';

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
