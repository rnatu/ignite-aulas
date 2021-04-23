import Icon from "@chakra-ui/icon";
import { Link, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/layout";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
  <Link display="flex" align="center" {...rest}>
    <Icon as={icon} fontSize="20" />
    <Text ml="4" fontWeight="medium">
      {children}
    </Text>
  </Link>
  );
}