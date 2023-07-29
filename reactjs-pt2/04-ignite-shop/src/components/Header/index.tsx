import logoImg from "@/assets/logo.svg";
import Image from "next/image";
import { HeaderContainer } from "./styles";
import Link from "next/link";
import { Cart } from "../Cart";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <Cart />
    </HeaderContainer>
  );
}
