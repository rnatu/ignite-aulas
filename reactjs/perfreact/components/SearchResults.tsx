import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h1>Preço total</h1>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return <ProductItem key={product.id} product={product} />;
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
  1 - Cálculos pesados
  2 - Igualdade referencial (quando a gente repassa aquela informação 
    a um componente filho )
*/
