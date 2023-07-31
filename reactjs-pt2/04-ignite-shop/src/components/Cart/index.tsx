import * as Dialog from '@radix-ui/react-dialog';
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';
import { X } from '@phosphor-icons/react'
import Image from 'next/image';

export function Cart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight='bold' />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {/* <p>Parece que seu carrinho está vazio : (</p> */}

            <CartProduct>
              <CartProductImage>
                <Image width={100} height={93} alt="" src="https://s3-alpha-sig.figma.com/img/387d/13ce/de131bd1ccf9bbe6b2331e88d3df20cd?Expires=1691971200&Signature=WwV3XHLg2RqdNTzI-3p5PhqFduQ6gvnU5fagtNi5FHzjzUM2eJ8afzQ9C~RsQlEP0QpxCssAHJ9iemB3yi3~DWpkSGqCS8iU1SaG6~tE33i82xOcB3cdAB-A6izptNUW0xLgvuwOP~oFQ6VEwXSww83v0UEwKV2GrFM7-FgEiDQSji3BZemEwyDlHDZ1MPnJKQl2nP8Jrm2~zOzaiMphPj1oLw05YKkidVw4W0d4GWvWruWxNEqUux35O5onktt4nMhde-42mSn~t4RlgZ6kDxxBJuWs3ej0yMXdKWsF5x~5gmWXPjMGQ5-23OQh~up7f0OhK3rRg7KriO7hOYWhvA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
              </CartProductImage>

              <CartProductDetails>
                <p>Product 1</p>
                <strong>R$ 50.00</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>

          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>2 itens</p>
              </div>
              <div>
                <span>Valor total</span>
                <p>R$ 100.00</p>
              </div>
            </FinalizationDetails>
            <button>Finalizar Compra</button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}