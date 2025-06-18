import './bootstrap';
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { createPinia} from 'pinia';
import  '../css/app.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus, faTimes, faEdit, faTrash, faHeart, faComment, faShare, faCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPlus, faTimes, faEdit, faTrash, faHeart, faComment, faShare, faCheck)

const pinia = createPinia();

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .component('font-awesome-icon', FontAwesomeIcon)
      .use(plugin)
      .use(pinia)
      .mount(el)
  },
})
