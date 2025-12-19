import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) => {
  try {
    const { name, phone, comment } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'Обратная связь <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL!],
      subject: 'Новая заявка на обратный звонок',
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        ${comment ? `<p><strong>Комментарий:</strong> ${comment}</p>` : ''}
        <hr>
        <small>Отправлено с сайта уборки</small>
      `,
      text: `Новая заявка\nИмя: ${name}\nТелефон: ${phone}\n${comment ? `Комментарий: ${comment}` : ''}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Ошибка отправки' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    console.error('API error:');
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
};
