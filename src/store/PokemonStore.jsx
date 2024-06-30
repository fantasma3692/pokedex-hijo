import { create } from "zustand";

export const usePokemonStore = create((set, get) => ({
  pokemons: [],
  pokemonCount: 0,
  addPokemons: (newPokemons) => {
    set((state) => ({
      pokemons: [...state.pokemons, ...newPokemons],
      pokemonCount: state.pokemons.length + newPokemons.length,
    }));
  },
  clearPokemons: () => set({ pokemons: [], pokemonCount: 0 }),
  fetchPokemons: async ({ pageParam = 0 }) => {
    const { fetchPokemonDetails,addPokemons } = get();
    const limit = 10;
    const offset = pageParam * limit;

    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(endpoint);

    const data = await response.json();
    const pokemonDetailsPromises = data.results.map(async (pokemon) => {
      const details = await fetchPokemonDetails(pokemon.url);
      return {
        ...pokemon,
        details,
      };
    });
    const detailedPokemons = await Promise.all(pokemonDetailsPromises);
    // set({ pokemons: detailedPokemons });
    addPokemons(detailedPokemons)
    return {
      results: detailedPokemons,
      nextPage: pageParam + 1,
      hasNextPage: detailedPokemons.length === limit,
    };
    //1000...1010
    //1010...1013
  },
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),
  pokemonBuscado: [],
  fetchPokemonDetails: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const { typesColors } = get();
    let numero3decimales = data.id;
    if (numero3decimales < 10) {
      numero3decimales = "0" + numero3decimales;
    }
    if (numero3decimales < 100) {
      numero3decimales = "0" + numero3decimales;
    }
    const urlimgApi = "https://www.serebii.net/pokemongo/pokemon/";
    // const urlimgApi =
    //   "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
    const urlimage = `${urlimgApi}${numero3decimales}.png`;
    return {
      numero: numero3decimales,
      color: typesColors[data.types[0].type.name],
      tipo: data.types[0].type.name,
      imageUrl: urlimage,
      id: data.id,
      animacion:
        data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
          ?.front_default,
    };
  },
  typesColors: {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
  },

  buscarPokemon: async (buscador) => {
    const { fetchPokemonDetails } = get();

    const endpoint = `https://pokeapi.co/api/v2/pokemon/${buscador.toLowerCase()}`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Pokemon no encontrado");
      }
      const data = await response.json();
      const details = await fetchPokemonDetails(endpoint);

      set({ pokemonBuscado: { ...data, ...details } });

      return { ...data, ...details };
    } catch (error) {
      set({ pokemonBuscado: null });
    }
  },
}));
