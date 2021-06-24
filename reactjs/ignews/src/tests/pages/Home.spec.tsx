import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";

import Home, { getStaticProps } from "../../pages/";
// utilizado na função mocked(stripe.prices.retrieve)
import { stripe } from '../../services/stripe'

// mockado o useSession por conta do subscribe button que é utilizado na home
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})

//utilizado pela função mockResolvedValueOnce
jest.mock('../../services/stripe')

describe("Home page", () => {
  it("renders correctly", () => {
    render(
      <Home
        product={{
          priceId: "fake-price-id",
          amount: "$10,00",
        }}
      />
    );

    /*foi utilizada expressão regular, pois dentro do span que contem o texto procurado
    não contem somente "$10,00" e sim "for $10,00 month" */
    expect(screen.getByText(/\$10,00/i)).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    //mockando uso da importação
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

    //mockando retorno da importação
    //utilizado mockResolvedValueOnce pois a função retorna uma promise
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000, //1000 * 100 = $10,00

      //utilizado as any para não precisar preencher os outros dados de retorno que não são utilizados
    } as any)

    const response = await getStaticProps({})

    // console.log(response)

    expect(response).toEqual(
      /*objectContaining verifica se contem os valores informados, se houverem mais valores, o teste passa normalmente, então não é necessário informar valores adicionais
      como o valor revalidate neste caso */
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
});
