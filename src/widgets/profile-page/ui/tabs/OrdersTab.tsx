'use client';

import type { Order } from '@/entities/profile/model/types';

import { STATUS_VARIANTS } from '@/entities/profile/model/types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { useOrders } from '../../lib/useOrders';
import { OrderDetailsModal } from '../modals';

interface OrdersTabProperties {
  orders: readonly Order[];
}

export function OrdersTab({ orders }: OrdersTabProperties) {
  const {
    selectedOrder,
    isOrderDetailsOpen,
    setIsOrderDetailsOpen,
    handleOrderDetails,
  } = useOrders(orders);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>История заказов</CardTitle>
          <CardDescription>Все ваши заказы и их текущий статус</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>№ заказа</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Стоимость</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className='font-medium'>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className='max-w-[200px] truncate'>
                    {order.service}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANTS[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleOrderDetails(order)}
                      >
                        Детали
                      </Button>
                      {order.status === 'Выполнен' && !order.reviewed && (
                        <Button size='sm'>Оставить отзыв</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {orders.length === 0 && (
            <div className='py-8 text-center text-muted-foreground'>
              У вас пока нет заказов
            </div>
          )}
        </CardContent>
      </Card>

      <OrderDetailsModal
        isOpen={isOrderDetailsOpen}
        order={selectedOrder}
        onClose={() => setIsOrderDetailsOpen(false)}
      />
    </>
  );
}
