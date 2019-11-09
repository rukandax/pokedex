<template>
  <div id="dashboard">
    <div id="board">
      <div id="logo">Pokedex</div>
      <Screen />
      <Keyboard />
      <Pagination />
    </div>
  </div>
</template>

<script>
import Screen from './components/Screen.vue';
import Keyboard from './components/Keyboard.vue';
import Pagination from './components/Pagination.vue';

export default {
  components: {
    Screen,
    Keyboard,
    Pagination,
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
</style>
