import { useCallback } from 'react'
import { getPokemons, type PokemonType } from './api'
import { useInfiniteLoading } from './hooks';
import InfiniteScrollList from './InfiniteScrollList'
import './App.css'

const LOAD_SIZE = 20;

function App() {

  const infLoading = useInfiniteLoading<PokemonType>({
    loadItems: (page) => getPokemons(LOAD_SIZE, page * LOAD_SIZE),
    getItemsData: (data) => data.results,
    getHasMore: (data) => !!data.next,
  })

  const getName = useCallback((pokemon: PokemonType) => pokemon.name, [])

  return (
    <div className="App">
      <InfiniteScrollList
        {...infLoading}
        getKey={getName}
        renderItem={getName}
      />
    </div>
  )
}

export default App
