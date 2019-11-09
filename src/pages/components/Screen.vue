<template>
  <div id="screen">
    <div class="name">
      <div v-if="selectedPokemon && selectedPokemon.stats" class="name__text">
        {{ selectedPokemon.name }}
      </div>
      <div v-else class="name__text">
        Not Found
      </div>
    </div>
    <div class="information">
      <div v-if="selectedPokemon && selectedPokemon.stats" class="information__summary">
        <Sprites />
        <BasicInfo />
      </div>
      <div v-if="selectedPokemon && selectedPokemon.abilities" class="information__abilities">
        Abilities
        <Abilities />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Sprites from './Sprites.vue';
import BasicInfo from './BasicInfo.vue';
import Abilities from './Abilities.vue';

export default {
  components: {
    Sprites,
    BasicInfo,
    Abilities,
  },
  computed: {
    ...mapState([
      'selectedPokemon',
    ]),
  },
};
</script>

<style lang="scss" scoped>
#screen {
  margin-bottom: 30px;
}

.name {
  border-bottom: 70px solid #84ddf5;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  height: 0;
  width: 80%;
  margin: auto;
  position: relative;
  text-align: center;

  &__text {
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 38px;
  }
}

.information {
  background-color: #aadfed;
  border-radius: 5px;
  padding: 40px;
  overflow: auto scroll;
  height: 350px;

  &__abilities {
    margin: 40px auto;
    background-color: #e1e1e1;
    padding: 15px;
    border-radius: 5px;
  }
}
</style>
