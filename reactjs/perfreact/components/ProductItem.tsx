import { memo } from 'react';

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>Add to wishlist</button>
    </div>
  )
}

// shallow compare => comparação rasa
// {} === {} // false
// igualdade referencial

// se não for passada a função de segundo parâmetro, o memo irá fazer uma comparação rasa, utilizando ===
// e com objetos, essa comparação sempre retornará false, pois é realizada a igualdade referencial
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product) //se retornar true, não sera renderizado novamente
})
