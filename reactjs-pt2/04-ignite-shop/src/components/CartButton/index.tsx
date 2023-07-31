import { Handbag } from "@phosphor-icons/react";
import { CartButtonContainer } from "./styles";
import { ButtonHTMLAttributes } from "react";

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "gray" | "green";
  size?: "medium" | "large";
}

export function CartButton({ ...rest }: CartButtonProps) {
  return (
    <CartButtonContainer {...rest}>
      <Handbag weight="bold" />
    </CartButtonContainer>
  )
}