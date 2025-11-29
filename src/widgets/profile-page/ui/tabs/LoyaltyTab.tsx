'use client';

import type { Order, UserProfile } from '@/entities/profile/model/types';

import { Badge } from '@/shared/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

interface LoyaltyTabProperties {
  profile: UserProfile;
  orders: readonly Order[];
}

const LOYALTY_LEVELS = [
  { name: 'Базовый', points: 0, discount: 0 },
  { name: 'Серебряный', points: 500, discount: 5 },
  { name: 'Золотой', points: 1000, discount: 10 },
  { name: 'Платиновый', points: 2000, discount: 15 },
] as const;

export function LoyaltyTab({ profile, orders }: LoyaltyTabProperties) {
  const completedOrders = orders.filter((order) => order.status === 'Выполнен');
  const currentLevelIndex =
    LOYALTY_LEVELS.findIndex((level) => profile.loyaltyPoints < level.points) -
    1;
  const currentLevel = LOYALTY_LEVELS[Math.max(0, currentLevelIndex)];
  const nextLevel = LOYALTY_LEVELS[currentLevelIndex + 1];

  const progressToNextLevel = nextLevel
    ? (profile.loyaltyPoints / nextLevel.points) * 100
    : 100;

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Программа лояльности</CardTitle>
          <CardDescription>
            Накапливайте баллы за заказы и получайте скидки
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-4 rounded-lg bg-muted p-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h3 className='text-lg font-semibold'>Ваш текущий статус</h3>
                <Badge className='mt-2 text-sm' variant='secondary'>
                  {currentLevel.name}
                </Badge>
              </div>
              <div className='text-center sm:text-right'>
                <p className='text-sm text-muted-foreground'>Ваша скидка</p>
                <p className='text-2xl font-bold'>{currentLevel.discount}%</p>
              </div>
            </div>

            {nextLevel && (
              <div className='space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span>Прогресс до {nextLevel.name}</span>
                  <span>
                    {profile.loyaltyPoints} / {nextLevel.points} баллов
                  </span>
                </div>
                <Progress className='h-2' value={progressToNextLevel} />
                <p className='text-xs text-muted-foreground'>
                  Наберите еще {nextLevel.points - profile.loyaltyPoints} баллов
                  для получения статуса &quot;{nextLevel.name}&quot; и скидки{' '}
                  {nextLevel.discount}%
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className='mb-4 text-lg font-semibold'>
              История начисления баллов
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№ заказа</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Услуга</TableHead>
                  <TableHead className='text-right'>Начислено баллов</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className='font-medium'>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell className='text-right'>{order.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {completedOrders.length === 0 && (
              <div className='py-8 text-center text-muted-foreground'>
                Нет завершенных заказов для начисления баллов
              </div>
            )}
          </div>

          <div className='space-y-4 rounded-lg border p-6'>
            <h3 className='text-lg font-semibold'>
              Как работает программа лояльности
            </h3>
            <ul className='space-y-3 text-muted-foreground'>
              {[
                'За каждые 100 ₽ в заказе вы получаете 1 балл',
                'При достижении 500 баллов вы получаете статус "Серебряный клиент" и скидку 5%',
                'При достижении 1000 баллов вы получаете статус "Золотой клиент" и скидку 10%',
                'При достижении 2000 баллов вы получаете статус "Платиновый клиент" и скидку 15%',
                'Баллы начисляются только за выполненные заказы',
                'Скидка применяется автоматически ко всем последующим заказам',
              ].map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <span className='mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
