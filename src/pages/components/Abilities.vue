<template>
  <div class="abilities">
    <div
      v-for="(ability, abilityIdx) in selectedPokemon.abilities"
      :key="`pokemon-ability-${abilityIdx}`"
      class="abilities__detail"
    >
      <div class="abilities__detail__name">
        <div class="abilities__detail__name--left">
          <span class="label-name">{{ abilityName[abilityIdx] || ability.ability.name }}</span>
          <span v-if="ability.is_hidden" class="label-hidden">Hidden Ability</span>
        </div>
        <div class="abilities__detail__name--right">
          Lang :
          <select v-model="selectedLanguage">
            <option>zh-Hans</option>
            <option>ja</option>
            <option>en</option>
            <option>it</option>
            <option>es</option>
            <option>de</option>
            <option>fr</option>
            <option>zh-Hant</option>
            <option>ko</option>
            <option>ja-Hrkt</option>
          </select>
        </div>
      </div>
      <div class="abilities__detail__desc">
        {{ abilityEffect[abilityIdx] || 'Loading ability effect...' }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedLanguage: 'en',
      abilityName: [],
      abilityEffect: [],
    };
  },
  computed: {
    ...mapState([
      'selectedPokemon',
    ]),
  },
  watch: {
    selectedPokemon: {
      handler() {
        this.getAbilities();
      },
      deep: true,
      immediate: true,
    },
    selectedLanguage() {
      this.getAbilities();
    },
  },
  methods: {
    getAbilities() {
      this.abilityName = [];
      this.abilityEffect = [];

      this.selectedPokemon.abilities.forEach((ability) => {
        this.$pokedex.getAbilityByName(ability.ability.name)
          .then((res) => {
            this.abilityName.push(res.names.filter((abName) => {
              const { name } = abName.language;
              return name === this.selectedLanguage;
            })[0].name);
            this.abilityEffect.push(
              res.flavor_text_entries.filter((text) => {
                const { name } = text.language;
                return name === this.selectedLanguage;
              })[0].flavor_text,
            );
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.abilities__detail {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 5px;

  &__name {
    padding-bottom: 10px;
    border-bottom: 2px dotted #999999;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--right {
      font-size: 12px;
    }
  }

  &__desc {
    padding-top: 10px;
  }
}

.label-name {
  font-weight: bold;
}

.label-hidden {
  font-size: 12px;
  padding: 3px 5px;
  margin-left: 10px;
  background-color: #333;
  color: #fff;
  border-radius: 3px;
}
</style>
