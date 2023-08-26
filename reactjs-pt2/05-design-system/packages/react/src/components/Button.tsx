import { ComponentProps, ElementType } from 'react'
import { styled } from '../styles'

export const Button = styled('button', {})

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}
