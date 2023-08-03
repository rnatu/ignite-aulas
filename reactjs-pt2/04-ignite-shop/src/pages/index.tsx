import React, { MouseEvent, useState } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import Head from "next/head";
import {
  NavigationWrapper,
  HomeContainer,
  Product,
} from "../styles/pages/home";
import "keen-slider/keen-slider.min.css";
import leftArrow from "../assets/left-arrow-icon.png";
import rightArrow from "../assets/right-arrow-icon.png";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { CartButton } from "@/components/CartButton";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/contexts/CartContext";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const { addToCart, checkIfItemAlreadyExists } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    addToCart(product);
  }

  function handlePrevSlide(e: any) {
    e.stopPropagation();
    instanceRef.current?.prev();
  }

  function handleNextSlide(e: any) {
    e.stopPropagation();
    instanceRef.current?.next();
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <NavigationWrapper className="navigation-wrapper">
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map((product) => {
            return (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Product className="keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                  />

                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>
                    <CartButton
                      disabled={checkIfItemAlreadyExists(product.id)}
                      color="green"
                      size="large"
                      onClick={(e) => handleAddToCart(e, product)}
                    />
                  </footer>
                </Product>
              </Link>
            );
          })}
        </HomeContainer>

        <div
          className="arrow left"
          style={{
            visibility: currentSlide === 0 ? "hidden" : "initial",
          }}
        >
          <Image
            src={leftArrow}
            width={48}
            height={48}
            alt=""
            onClick={handlePrevSlide}
          />
        </div>

        <div
          className="arrow right"
          style={{
            visibility:
              instanceRef.current?.slides.length === currentSlide + 2
                ? "hidden"
                : "initial",
          }}
        >
          <Image
            src={rightArrow}
            width={48}
            height={48}
            alt=""
            onClick={handleNextSlide}
          />
        </div>
      </NavigationWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price:
        price.unit_amount &&
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
      //como foi feito o expand, e a tipagem do expand para o price, ele ira trazer todas as opções no auto complete. Obs, unit_amount é em centavos.
      numberPrice: price.unit_amount && price.unit_amount / 100,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //em segundos = 2 horas
  };
};
