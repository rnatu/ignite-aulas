import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { CloseButton, Content, Overlay, TransactionTypeButton, TransactionType } from './styles';
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

          <TransactionType>
            <TransactionTypeButton value='income' variant='income' type='button'>
              <ArrowCircleUp size={24} />
              Botão 1
            </TransactionTypeButton>
            <TransactionTypeButton value='outcome' variant='outcome' type='button'>
              <ArrowCircleDown size={24} />
              Botão 2
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">Cadastrar</button>
        </form>

      </Content>

    </Dialog.Portal>
  )
}