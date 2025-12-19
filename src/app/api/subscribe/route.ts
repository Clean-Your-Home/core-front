import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Введите корректный email' },
        { status: 400 },
      );
    }

    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      if (
        error.message?.includes('already exists') ||
        error.statusCode === 422
      ) {
        return NextResponse.json({ message: 'Вы уже подписаны!' });
      }

      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Ошибка добавления в рассылку' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Вы успешно подписаны!',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
};
