import { createApp, inject, provide } from 'Vue' 
import App from './views/App.vue'
import router from './router' // <---
//import mitt from 'mitt'

import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primeflex/src/_elevation.scss';

import TopMenu from './views/TopMenu.vue';
import DeliverableTable from './views/DeliverableTable.vue';
import DeliverableForm from './views/DeliverableForm.vue';

const app = createApp(App)
//const emitter = mitt();
//app.provide('emitter', emitter);

// l'ordine è iportante. 
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.component('TopMenu', TopMenu);
app.component('Panel', Panel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('DeliverableTable', DeliverableTable);
app.component('DeliverableForm', DeliverableForm);

app.use(PrimeVue)

//app.config.globalProperties.emitter = mitt();
app.use(router).mount('#app')   // l'applicazione vue viene montanta sull'elemento app del DOM.

app.component('DataTable', DataTable);
app.component('Column', Column);

