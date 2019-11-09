<template>
  <div
    id="keyboard"
    v-infinite-scroll="loadMorePokemons"
    infinite-scroll-disabled="disableLoadMorePokemons"
  >
    <template v-if="!pokemons.length">
      <div v-for="dummy in 6" :key="`dummy-${dummy}`" class="button">
        <img width="96" height="96">
        Loading
      </div>
    </template>

    <div
      @click="selectPokemon(pokemon.name)"
      v-for="(pokemon, pokemonIdx) in pokemons"
      :key="`pokemon-${pokemonIdx}`"
      class="button"
      :class="{ 'selected' : isSelected(pokemon.name) }"
    >
      <img :src="getImageFrontDefault(pokemon.name)" width="96" height="96">
      <div class="button__name">
        {{ pokemon.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import InfiniteScroll from 'vue-infinite-scroll';

export default {
  computed: {
    ...mapState([
      'isLoadingPokemons',
      'pokemons',
      'pokemonsDetail',
      'selectedPokemon',
      'pokemonsOffset',
      'pokemonsLimit',
      'pokemonsTotal',
    ]),
    disableLoadMorePokemons() {
      return this.isLoadingPokemons;
    },
  },
  directives: {
    InfiniteScroll,
  },
  watch: {
    selectedPokemon: {
      handler() {
        if (this.selectedPokemon.name !== this.$route.query.pokemon) {
          const routeQuery = Object.assign({}, this.$route.query);
          const query = Object.assign(routeQuery, { pokemon: this.selectedPokemon.name });
          this.$router.push({ query });
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getPokemons();

    if (this.$route.query.pokemon) {
      this.getSelectedPokemon(this.$route.query.pokemon);
    }
  },
  methods: {
    ...mapMutations([
      'updatePokemonsOffset',
      'updateSelectedPokemon',
      'selectPokemon',
    ]),
    ...mapActions([
      'getPokemons',
      'getMorePokemons',
      'getSelectedPokemon',
    ]),
    loadMorePokemons() {
      if (this.disableLoadMorePokemons) return;
      this.getMorePokemons();
    },
    isSelected(pokemonName) {
      return this.selectedPokemon && this.selectedPokemon.name === pokemonName;
    },
    getImageFrontDefault(pokemonName) {
      const pokemon = this.pokemonsDetail.filter(detail => detail.name === pokemonName);

      if (pokemon[0] && pokemon[0].sprites && pokemon[0].sprites.front_default) {
        return pokemon[0].sprites.front_default;
      }

      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
#keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.button {
  width: 30%;
  padding: 20px;
  background-color: #3c3c3c;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 25px;
  cursor: pointer;

  &:hover {
    background-color: #555555;
  }

  &.selected {
    background-color: #000000;
  }
}
</style>
