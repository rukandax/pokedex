import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

const Pokedex = require('pokeapi-js-wrapper');

Vue.use((vue) => {
  const options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 5 * 1000,
  };

  const pokedex = new Pokedex.Pokedex(options);
  vue.prototype.$pokedex = pokedex; // eslint-disable-line
});

require('./assets/scss/globals.scss');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
