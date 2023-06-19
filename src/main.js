import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { directive as onClickaway } from 'vue3-click-away';
// Import one of the available themes

const app = createApp(App)
app.use(router)

// Use Pinia
const pinia = createPinia();
app.use(pinia)


app.directive('on-clickaway', onClickaway)
app.mount('#app')
