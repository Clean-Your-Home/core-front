import type { Order } from '@/entities/profile/model/types';

import { useState } from 'react';

export function useOrders(orders: readonly Order[]) {
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const handleOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  return {
    orders,
    selectedOrder,
    isOrderDetailsOpen,
    setIsOrderDetailsOpen,
    handleOrderDetails,
  };
}
