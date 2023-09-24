import { createRouter, createWebHashHistory } from 'vue-router'
import DataSetsView from '../views/DataSetsView.vue'
import MapsView from '../views/MapsView.vue'
import MapView from '../views/MapView.vue'

const routes = [
  {
    path: '/',
    component: DataSetsView
  },
  {
    path: '/maps',
    component: MapsView
  },
  {
    path: '/map',
    component: MapView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
