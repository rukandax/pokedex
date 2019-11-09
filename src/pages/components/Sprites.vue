<template>
  <div class="sprites">
    <div class="sprites__image">
      <img :src="pokemonImage" width="96" height="96">
      <div @click="toggleImagePosition" class="sprites__image__side">
        <img src="@/assets/images/flip.png">
        {{ imagePosition.toUpperCase() }}
      </div>
    </div>
    <select class="sprites__type" v-model="imageType">
      <option v-if="isImageAvailable('default')" value="default">Default Type</option>
      <option v-if="isImageAvailable('female')" value="female">Female Type</option>
      <option v-if="isImageAvailable('shiny')" value="shiny">Shiny Type</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      imagePosition: 'front',
      imageType: 'default',
    };
  },
  computed: {
    ...mapState([
      'selectedPokemon',
    ]),
    pokemonImage() {
      if (this.selectedPokemon && this.selectedPokemon.sprites && this.selectedPokemon.sprites[`${this.imagePosition}_${this.imageType}`]) {
        return this.selectedPokemon.sprites[`${this.imagePosition}_${this.imageType}`];
      }

      return '';
    },
  },
  watch: {
    selectedPokemon: {
      handler() {
        this.imagePosition = 'front';
        this.imageType = 'default';
      },
      deep: true,
    },
  },
  methods: {
    isImageAvailable(type) {
      if (this.selectedPokemon && this.selectedPokemon.sprites && this.selectedPokemon.sprites[`${this.imagePosition}_${type}`]) {
        return !!this.selectedPokemon.sprites[`${this.imagePosition}_${type}`].length;
      }

      return false;
    },
    toggleImagePosition() {
      if (this.imagePosition === 'front') {
        this.imagePosition = 'back';
      } else {
        this.imagePosition = 'front';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sprites {
  float: left;

  &__image {
    padding: 30px;
    background-color: #232323;
    border-radius: 10px;

    &__side {
      margin-top: 10px;
      background-color: #dddddd;
      border-radius: 5px;
      padding: 5px;
      font-size: 12px;
      text-align: center;
      cursor: pointer;

      img {
        height: 12px;
        margin-right: 5px;
      }
    }
  }

  &__type {
    margin-top: 10px;
    width: 100%;
    border-radius: 5px;
    background-color: #999999;
    padding: 3px;
  }
}
</style>
