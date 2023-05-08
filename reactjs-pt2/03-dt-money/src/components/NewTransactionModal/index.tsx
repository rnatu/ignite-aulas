import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionTypeButton, TransactionsType } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" placeholder='Descrição' required />
          <input type="number" placeholder='Preço' required />
          <input type="text" placeholder='Descrição' required />

          <TransactionsType>
            <TransactionTypeButton variant='income' type='button'>
              <ArrowCircleUp size={24} />
              Botão 1
            </TransactionTypeButton>
            <TransactionTypeButton variant='outcome' type='button'>
              <ArrowCircleDown size={24} />
              Botão 2
            </TransactionTypeButton>
          </TransactionsType>

          <button type="submit">Cadastrar</button>
        </form>

      </Content>

    </Dialog.Portal>
  )
}