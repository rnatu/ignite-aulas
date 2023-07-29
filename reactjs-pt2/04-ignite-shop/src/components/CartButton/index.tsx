import { Handbag } from "@phosphor-icons/react";
import { CartButtonContainer } from "./styles";
import { ButtonHTMLAttributes, ComponentProps } from "react";

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function CartButton({ ...rest }: CartButtonProps) {
  return (
    <CartButtonContainer {...rest}>
      <Handbag weight="bold" />
    </CartButtonContainer>
  )
}