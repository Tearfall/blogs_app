import './bootstrap';
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { createPinia} from 'pinia';
import { ZiggyVue } from 'ziggy-js'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import  '../css/app.css';
import { Button, Select, Toast, Dialog } from 'primevue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus, faTimes, faEdit, faTrash, faHeart, faComment, faShare, faCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPlus, faTimes, faEdit, faTrash, faHeart, faComment, faShare, faCheck)

const pinia = createPinia();

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
});


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
      .use(ZiggyVue)
      .use(PrimeVue, {
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: 'light',
                }
            }
      })
      .component('Button', Button)
      .component('Select', Select)
      .component('Toast', Toast)
      .component('Dialog', Dialog)
      .mount(el)
  },
})
