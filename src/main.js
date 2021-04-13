import Vue from 'vue'
import { MdButton, MdContent, MdTabs, MdTable, MdToolbar, MdField} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'

import 'vue-material/dist/theme/default.css'
import App from './App.vue'

Vue.use(MdField)
Vue.use(MdToolbar)
Vue.use(MdTable)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
