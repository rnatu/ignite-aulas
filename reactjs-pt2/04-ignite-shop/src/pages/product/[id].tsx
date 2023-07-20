import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  // const { query } = useRouter();

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados / mais essenciais 

  return {

    paths: [
      {
        params:
          //(Buscar os produtos mais vendidos / mais acessados / mais essenciais) ou deixar vazio se preferir
          { id: "prod_OH7h4NHpkhG1Nc" }  // prod_OH7h4NHpkhG1Nc (id do produto no stripe)
      }
    ],
    // fallback: false, // false -> 404
    fallback: true, // true -> executa o getStaticProps com o novo parâmetro passado (Necessita de um loader no caso)
    // fallback: "blocking", // blocking -> não carrega direciona para a página enquanto as informações estão sendo carregadas
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ?? "";

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price:
          price.unit_amount &&
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price.unit_amount / 100), //como foi feito o expand, e a tipagem do expand para o price, ele ira trazer todas as opções no auto complete. Obs, unit_amount é em centavos.
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
