import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
// import '@assets/index.css'
import store from './store'
import '@/interceptors/axios'
import "bootstrap/dist/js/bootstrap.bundle.js";

// console.log('process.env', process.env)

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')


// import "bootstrap/dist/css/bootstrap.css"
// import { createApp } from 'vue'
// import App from '@/App.vue'
// import routes from './routes'
// import '@assets/index.css'
// import store from './store'
// import '@/interceptors/axios'

// import "bootstrap/dist/js/bootstrap.bundle.js";

// // createApp(App).use(store).use(router).mount('#app');

// // import "bootstrap/dist/js/bootstrap.bundle.js";

// // import { createApp } from 'vue'
// // import App from '@/App.vue'
// // import routes from './routes'
// // import '@assets/index.css'

// createApp(App)
//   .use(routes)
//   .mount('#app')