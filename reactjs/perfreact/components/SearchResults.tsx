import { ProductItem } from "./ProductItem";

import { List, ListRowRenderer } from 'react-virtualized'
import { memo } from "react";

import lodash from 'lodash';

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

export function SearchResultsComponent({ totalPrice, results, onAddToWishlist }: SearchResultsProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        {/* o style control se o elemento esta visível ou não */}
        <ProductItem 
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
      />
      </div>
    )
  }

  return (
    <div>
      <h1>Preço total</h1>
      <h2>{totalPrice}</h2>

      <List
        height={300} //300px -> utilizar o AutoSizer em situações onde não se tem idéia do tamanho
        rowHeight={30} //30px -> altura da linha
        width={600} //900px -> utilizar o AutoSizer em situações onde não se tem idéia do tamanho
        overscanRowCount={5} //quantos itens deixar pré carregado fora da area de visualização
        rowCount={results.length} //quantos itens tem na lista
        rowRenderer={rowRenderer}
      />
    </div>
  );
}

export const SearchResults = memo(SearchResultsComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.results, nextProps.results)
})

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