import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import {
  NavigationWrapper,
  HomeContainer,
  Product,
} from "../styles/pages/home";
import "keen-slider/keen-slider.min.css";
import leftArrow from "../assets/left-arrow-icon.png";
import rightArrow from "../assets/right-arrow-icon.png";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
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

  const handlePrevSlide = (e: any) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  const handleNextSlide = (e: any) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  return (
    <NavigationWrapper className="navigation-wrapper">
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          );
        })}
      </HomeContainer>

      <div
        className="arrow"
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
      price: price.unit_amount && price.unit_amount / 100, //como foi fito o expand, e a tipagem do expand para o price, ele ira trazer todas as opções no auto complete. Obs, unit_amount é em centavos.
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2 //em segundos = 2 horas
  };
};
