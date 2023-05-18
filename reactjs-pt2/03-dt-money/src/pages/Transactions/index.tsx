import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Summary } from '../../components/Summary';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { useContextSelector } from 'use-context-selector';

export function Transactions() {
  const { transactions, isLoading } = useContextSelector(
    TransactionsContext,
    ({ transactions, isLoading }) => {
      return {
        transactions,
        isLoading,
      };
    },
  );

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        {isLoading ? (
          <Loader />
        ) : (
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        )}
      </TransactionsContainer>
    </div>
  );
}
