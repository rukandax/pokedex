<template>
  <div id="dashboard">
    <div id="board">
      <div id="logo">Pokedex</div>
      <Screen />
      <Keyboard />
      <div v-if="isLoadingPokemons" class="loading-status">
        Please wait, loading more data...
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Screen from './components/Screen.vue';
import Keyboard from './components/Keyboard.vue';

export default {
  components: {
    Screen,
    Keyboard,
  },
  computed: {
    ...mapState([
      'isLoadingPokemons',
    ]),
  },
  mounted() {
    document.title = 'Pokedex';
  },
};
</script>

<style lang="scss" scoped>
#logo {
  color: #fff;
  font-family: 'Pokemon';
  font-size: 64px;
  text-align: center;
  margin-bottom: 30px;
}

#board {
  background-color: #ed1c24;
  margin: 50px auto;
  padding: 50px;
  border-radius: 15px;
}

.loading-status {
  background-color: #999;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
