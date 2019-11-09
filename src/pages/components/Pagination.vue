<template>
  <div id="pagination">
    <div
      @click="prevPokemonsPage"
      class="button prev"
      :class="{ 'disabled' : pokemonsOffset <= 0 || pokemonsOffset - pokemonsLimit < 0 }"
    >
      &larr;
    </div>

    <div
      @click="nextPokemonsPage"
      class="button next"
      :class="{ 'disabled' : pokemonsOffset + pokemonsLimit > pokemonsTotal }"
    >
      &rarr;
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'pokemonsOffset',
      'pokemonsLimit',
      'pokemonsTotal',
    ]),
  },
  watch: {
    pokemonsOffset() {
      const routeQuery = Object.assign({}, this.$route.query);
      const query = Object.assign(routeQuery, { page: this.offsetToPage(this.pokemonsOffset) });
      this.$router.push({ query });

      this.getPokemons();
    },
  },
  mounted() {
    this.updatePokemonsOffset(this.pageToOffset(this.$route.query.page) || 0);
  },
  methods: {
    ...mapMutations([
      'updatePokemonsOffset',
    ]),
    ...mapActions([
      'getPokemons',
    ]),
    offsetToPage(offset) {
      return offset / 6 + 1;
    },
    pageToOffset(page) {
      return (page - 1) * 6;
    },
    prevPokemonsPage() {
      const offset = this.pokemonsOffset - this.pokemonsLimit;

      if (this.pokemonsOffset <= 0) return;
      if (offset < 0) return;

      this.updatePokemonsOffset(offset);
    },
    nextPokemonsPage() {
      const offset = this.pokemonsOffset + this.pokemonsLimit;

      if (offset > this.pokemonsTotal) return;

      this.updatePokemonsOffset(offset);
    },
  },
};
</script>

<style lang="scss" scoped>
#pagination {
  display: flex;
  justify-content: space-between;
  border-top: 3px dashed #999;
  padding-top: 20px;
}

.button {
  width: 45%;
  background-color: #cccccc;
  cursor: pointer;
  text-align: center;
  font-size: 28px;
  border-radius: 5px;

  &:hover {
    background-color: #aaaaaa;
  }

  &.disabled {
    cursor: not-allowed !important;
    background-color: #a0a0a0 !important;
  }
}
</style>
