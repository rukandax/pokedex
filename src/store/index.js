import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoadingPokemons: false,
    pokemonsLimit: 6,
    pokemonsOffset: 0,
    pokemonsTotal: 0,
    selectedPokemon: null,
    pokemons: [],
    pokemonsDetail: [],
  },
  mutations: {
    updatePokemonsOffset(state, offset) {
      state.pokemonsOffset = parseInt(offset, 10);
    },
    selectPokemon(state, pokemonName) {
      let selected = {};
      const pokemon = state.pokemonsDetail.filter(detail => detail.name === pokemonName);

      if (pokemon[0]) {
        [selected] = pokemon;
      }

      state.selectedPokemon = selected;
    },
  },
  actions: {
    getMorePokemons({ state }) {
      state.isLoadingPokemons = true;

      const params = {
        limit: state.pokemonsLimit,
        offset: state.pokemonsOffset,
      };

      this._vm.$pokedex.getPokemonsList(params)
        .then(({ count, results }) => {
          state.pokemonsTotal = count;
          state.pokemons = state.pokemons.concat(results);

          results.forEach((result) => {
            this._vm.$pokedex.getPokemonByName(result.name)
              .then((res) => {
                if (!state.selectedPokemon) {
                  state.selectedPokemon = res;
                }

                state.pokemonsDetail.push(res);
              });
          });
        })
        .finally(() => {
          state.pokemonsOffset += state.pokemonsLimit;
          state.isLoadingPokemons = false;
        });
    },
    getSelectedPokemon({ state }, pokemonName) {
      state.selectedPokemon = {
        name: pokemonName,
        abilities: null,
      };

      this._vm.$pokedex.getPokemonByName(pokemonName)
        .then((res) => {
          state.selectedPokemon = res;
        });
    },
  },
});
