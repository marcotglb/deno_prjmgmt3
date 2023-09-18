import { createApp } from 'vue'
import App from './views/AppTabs.vue'
import router from './router' // <---
import Store from './store/Store';
// import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';

import Menubar from 'primevue/menubar';
import TieredMenu from 'primevue/tieredmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import ScrollPanel from 'primevue/scrollpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
//import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primeflex/src/_elevation.scss';

import TopMenu from './views/TopMenu.vue';
import SideMenu from './views/SideMenu.vue';
import EditMenu from './views/EditMenu.vue';
import LoginMenu from './views/LoginMenu.vue';

import DeliverableForm from './components/deliverable/DeliverableForm.vue';
import DeliverableTable from './components/deliverable/DeliverableTable.vue';

import UserForm from './components/user/UserForm.vue';
import UserTable from './components/user/UserTable.vue';

const app = createApp(App)
// l'ordine è iportante. 
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('TieredMenu', TieredMenu);
app.component('TopMenu', TopMenu);
app.component('SideMenu', SideMenu);
app.component('EditMenu', EditMenu);
app.component('LoginMenu', LoginMenu);
app.component('Panel', Panel);
app.component('ScrollPanel', ScrollPanel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('InputText', InputText);
app.component('InputMask', InputMask);
app.component('Calendar', Calendar);
app.component('Textarea', Textarea);
app.component('AutoComplete', AutoComplete);
app.component('DeliverableForm', DeliverableForm);
app.component('DeliverableTable', DeliverableTable);
app.component('UserForm', UserForm);
app.component('UserTable', UserTable);
//app.component('TabView', TabView);
app.component('TabPanel', TabPanel);

app.use(PrimeVue)

app.use(Store);
//app.use(createPinia());

app.use(router).mount('#app')   // l'applicazione vue viene montanta sull'elemento app del DOM.//
//app.mount('#app');

app.config.devtools = true;

app.component('DataTable', DataTable);
app.component('Column', Column);

