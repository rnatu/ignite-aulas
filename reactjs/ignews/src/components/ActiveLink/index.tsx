import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router';
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href
    ? activeClassName
    : '';

    console.log(className)

  return (
    <Link {...rest}>
      {/* clonando o elemento e adicionando atributos ao mesmo */}
      {cloneElement(children, {
        class: className,
      })}
    </Link>
  )
}
