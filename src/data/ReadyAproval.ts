export interface TransactionDataType  {
    id: string;
    type: 'income' | 'expense' | 'transfer';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    date: string;
  }
  
  export const transactions: TransactionDataType[] = [
    {
      id: '1',
      type: 'income',
      amount: 500,
      status: 'completed',
      date: '2025-02-01',
    },
    {
      id: '2',
      type: 'expense',
      amount: 200,
      status: 'pending',
      date: '2025-02-02',
    },
    {
      id: '3',
      type: 'transfer',
      amount: 100,
      status: 'failed',
      date: '2025-02-03',
    },
    {
        id: '4',
        type: 'transfer',
        amount: 100,
        status: 'failed',
        date: '2025-02-03',
      },
      {
        id: '5',
        type: 'transfer',
        amount: 100,
        status: 'failed',
        date: '2025-02-03',
      },
  ];