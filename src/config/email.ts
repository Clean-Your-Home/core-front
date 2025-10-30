export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.EMAIL_FROM || 'noreply@resend.dev',
  to: process.env.EMAIL_TO,
};

// TODO:Удалить при deploy
export const validateEmailConfig = () => {
  if (!emailConfig.apiKey) {
    throw new Error('Отсутствует переменная окружения RESEND_API_KEY');
  }
  return emailConfig;
};
