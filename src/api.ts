const BASE_URL = "https://pokeapi.co/api/v2/";

export type PokemonType = {
  name: string;
  url: string;
};

type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
};

export function getPokemons(
  limit: number | undefined = 20,
  offset: number | undefined = 0
): Promise<PokemonResponse> {
  return fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`).then(
    (res) => res.json()
  );
}
