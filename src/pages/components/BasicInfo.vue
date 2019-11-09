<template>
  <div class="basic-info">
    <div class="basic-info__type">
      <div
        class="basic-info__type__item"
        :class="`basic-info__type__item--${type.type.name}`"
        v-for="(type, typeIdx) in selectedPokemon.types"
        :key="`pokemon-type-${typeIdx}`"
      >
        {{ type.type.name.toUpperCase() }}
      </div>
    </div>
    <div class="basic-info__stat">
      <table>
        <tr>
          <td>
            Speed
          </td>
          <td>
            Special Defense
          </td>
          <td>
            Special Attack
          </td>
        </tr>
        <tr class="poin">
          <td>
            {{ selectedPokemon.stats[0].base_stat }}
          </td>
          <td>
            {{ selectedPokemon.stats[1].base_stat }}
          </td>
          <td>
            {{ selectedPokemon.stats[2].base_stat }}
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            Defense
          </td>
          <td>
            Attack
          </td>
          <td>
            Hp
          </td>
        </tr>
        <tr class="poin">
          <td>
            {{ selectedPokemon.stats[3].base_stat }}
          </td>
          <td>
            {{ selectedPokemon.stats[4].base_stat }}
          </td>
          <td>
            {{ selectedPokemon.stats[5].base_stat }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'selectedPokemon',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.basic-info {
  margin-left: 190px;

  &__type {
    display: flex;
    flex-wrap: wrap;

    &__item {
      font-size: 14px;
      border-radius: 5px;
      padding: 5px 10px;
      margin-right: 15px;
      margin-bottom: 15px;

      &--normal {
        background-color: #333333;
        color: #fff;
      }

      &--water {
        background-color: #1cbced;
      }

      &--ice {
        background-color: #00c3ff;
      }

      &--bug {
        background-color: #a25959;
      }

      &--flying {
        background-color: #ffffff;
      }

      &--fire {
        background-color: #ff5050;
      }

      &--grass {
        background-color: #72ce6a;
      }

      &--poison {
        background-color: #888888;
      }

      &--ghost {
        background-color: #626262;
        color: #ffffff;
      }

      &--electric {
        background-color: #fbee2a;
      }

      &--ground {
        background-color: #423030;
        color: #fff;
      }

      &--rock {
        background-color: #441919;
        color: #fff;
      }

      &--fairy {
        background-color: #f55d8f;
      }

      &--fighting {
        background-color: #bbbbbb;
      }

      &--psychic {
        background-color: #8183d5;
      }

      &--steel {
        background-color: #eaeaea;
      }
    }
  }

  &__stat {
    table {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 25px;
      border: 2px solid #000000;
      border-radius: 3px;
    }

    .poin td {
      font-size: 16px;
      font-weight: bold;
    }

    td {
      border-radius: 3px;
      border: 2px dashed #000000;
      padding: 5px;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
