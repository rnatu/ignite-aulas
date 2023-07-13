import { HomeContainer, Product, ArrowContainer } from "../styles/pages/home";
import Image from "next/image";
import camiseta1 from "../assets/camisetas/1.png";
import camiseta2 from "../assets/camisetas/2.png";
import camiseta3 from "../assets/camisetas/3.png";
import leftArrow from "../assets/left-arrow-icon.png";
import rightArrow from "../assets/right-arrow-icon.png";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

export default function Home() {
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

  console.log(instanceRef.current?.slides.length === currentSlide + 2);

  return (
    <HomeContainer ref={sliderRef} className="keen-slider navigation-wrapper">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <ArrowContainer>
        <Arrow
          left
          visible={currentSlide !== 0}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
        />

        <Arrow
          visible={instanceRef.current?.slides.length !== currentSlide + 2}
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
        />
      </ArrowContainer>
    </HomeContainer>
  );
}

function Arrow(props: {
  left?: boolean;
  visible: boolean;
  onClick?: (e: any) => void;
}) {
  return (
    <div style={{ visibility: props.visible ? undefined : "hidden" }}>
      {props.left ? (
        <Image
          src={leftArrow}
          width={48}
          height={48}
          alt=""
          onClick={props.onClick}
        />
      ) : (
        <Image
          src={rightArrow}
          width={48}
          height={48}
          alt=""
          onClick={props.onClick}
        />
      )}
    </div>
  );
}
