export interface CustomerDataType {
    name: string;
    image: string;
    orderId: string;
    date: string;
    status: string;
  }
  export const oderData: CustomerDataType[] = [
    {
      name: 'John Doe',
      image: '/assets/img/topvendor.png',
      orderId: 'ORD123456',
      date: '2025-02-01',
      status: 'completed'
    },
    {
      name: 'Jane Smith',
      image: '/assets/img/topvendor.png',
      orderId: 'ORD789101',
      date: '2025-01-30',
      status: 'processing'
    },
    {
      name: 'Alice Johnson',
      image: '/assets/img/topvendor.png',
      orderId: 'ORD112233',
      date: '2025-01-28',
      status: 'pending'
    }
  ];