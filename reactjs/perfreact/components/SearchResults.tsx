import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ totalPrice, results, onAddToWishlist }: SearchResultsProps) {

  return (
    <div>
      <h1>Preço total</h1>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return (
        <ProductItem 
          key={product.id} 
          product={product}
          onAddToWishlist={onAddToWishlist}
        />
        )
      })}
    </div>
  );
}

/*
  Fluxo
  1 - Criar uma nova versão do componente
  2 - comparar com a versão anterior
  3 - se houverem alterações, vai atualizar o que alterou
*/

/*
  Principais situações para utilização do memo
  1 - Pure Functional Components
  2 - Components Renders too often
  3 - Components Re-renders with same props
  4 - Components medium to big size
*/

/*
  Principais situações para utilização do useMemo
  Utilizado para "memorizar" um valor

  1 - Cálculos pesados
  2 - Igualdade referencial (quando a gente repassa aquela informação 
    a um componente filho )
*/

/*
  Principais situações para utilização do useCallback
  Utilizado para "memorizar" uma função
  Adequando a igualdade referencial, que é o algorítimo utilizado pelo react para comparação

  1 - Quando a função é passada para outros componentes, seja por prop drilling ou contexto
*/