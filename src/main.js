
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.filter('two_digits', function (value) {
  console.log(value)
  if(value.toString().length <= 1)
  {
    return "0"+value.toString();
  }
  return value.toString();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
