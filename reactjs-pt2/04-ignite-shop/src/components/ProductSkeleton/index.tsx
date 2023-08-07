import { ComponentProps, HTMLAttributes } from "react";
import { ProductSkeletonContainer, SkeletonItem } from "./styles";

// interface ProductSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

interface ProductSkeletonProps extends ComponentProps<typeof ProductSkeletonContainer> { }

export function ProductSkeleton({ ...props }: ProductSkeletonProps) {
  return (
    <ProductSkeletonContainer {...props}>
      <SkeletonItem />
      <div>
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </ProductSkeletonContainer>
  )
}