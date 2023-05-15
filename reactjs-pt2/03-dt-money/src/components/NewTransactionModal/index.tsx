import * as Dialog from '@radix-ui/react-dialog';
import * as z from 'zod'
import { CloseButton, Content, Overlay, TransactionTypeButton, TransactionType } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }


  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder='Descrição'
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder='Preço'
            required
            {...register('price', {
              valueAsNumber: true,
            })}
          />

          <input
            type="text"
            placeholder='Categoria'
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name='type'
            render={({ field }) => {
              //  console.log(field.value)
              return (
                <TransactionType
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >

                  <TransactionTypeButton
                    value='income'
                    variant='income'
                    type='button'
                  >
                    <ArrowCircleUp size={24} />
                    Botão 1
                  </TransactionTypeButton>
                  <TransactionTypeButton
                    value='outcome'
                    variant='outcome'
                    type='button'
                  >
                    <ArrowCircleDown size={24} />
                    Botão 2
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </button>
        </form>
      </Content>

    </Dialog.Portal>
  )
}