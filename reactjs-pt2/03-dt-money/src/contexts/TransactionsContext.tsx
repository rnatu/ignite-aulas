import { ReactNode, useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionData {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  isLoading: boolean;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = useCallback(async (query?: string) => {
    // % */ usando fetch
    // const url = new URL('http://localhost:3333/transactions')
    // if (query) {
    //   url.searchParams.append('q', query);
    // }
    // const response = await fetch(url)
    // const data = await response.json()
    setIsLoading(true);

    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setIsLoading(false);
    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    const { description, price, category, type } = data;

    setIsLoading(true);
    const response = await api.post('/transactions', {
      // o id o JSON Server cria automaticamente
      description,
      price,
      category,
      type,
      // em um backend o createdAt seria criado pelo backend
      createdAt: new Date(),
    });

    setIsLoading(false);
    setTransactions((oldState) => [...oldState, response.data]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
