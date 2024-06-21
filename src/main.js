import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import HttpGeneric from '@/services/generic.service'
import endpoints from '@/common/endpoints'
import GenericMixin from '@/mixins/GenericMixin'
import VueToast from 'vue-toast-notification'
import VueTheMask from 'vue-the-mask'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.config.productionTip = false

Vue.prototype.$endpoints = endpoints
Vue.$api = HttpGeneric
Object.defineProperty(Vue.prototype, '$api', {
  get () { return HttpGeneric }
})

Vue.use(VueToast)
Vue.use(VueTheMask)
Vue.mixin(GenericMixin)

Vue.directive('permission', {
  inserted: function (el, binding) {
    const user = JSON.parse(localStorage.getItem('condomob@user'))
    const permissions = Array.isArray(binding.value) ? binding.value : [binding.value];
    const hasPermission = user.is_superuser || permissions.some(permission => user.roles.includes(permission));

    if (!hasPermission) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

