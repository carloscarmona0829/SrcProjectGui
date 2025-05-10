import { Route } from '../interfaces';
import { Home, Permissions } from '../pages';
import commonRoutes from './common-routes';

const privateRoutes: Route[] = [
  ...commonRoutes,
  {
    path: '/',
    id: 'home',
    element: <Home />
  },
  {
    path: '/permisos',
    id: 'permisos',
    element: <Permissions />
  },
  // {
  //   path: '/nav-logs',
  //   id: 'nav-logs',
  //   element: <NavLogs />
  // },
  // {
  //   path: '/reservas-comedor',
  //   id: 'reservas-comedor',
  //   element: <DinningRooms />
  // },
  // {
  //   path: '/mis-reservas',
  //   id: 'mis-reservas',
  //   element: <MyReservations />
  // },
  // {
  //   path: '/llamados-servicio',
  //   id: 'llamados-servicio',
  //   element: <Callers />
  // },
  // {
  //   path: '/llamados-vestieres',
  //   id: 'llamados-vestieres',
  //   element: <Callers />
  // },
  // {
  //   path: '/habilitar-consumos',
  //   id: 'habilitar-consumos',
  //   element: <AllowConsumpitons />
  // },
  // {
  //   path: '/byb-mi-agenda',
  //   id: 'byb-mi-agenda',
  //   element: <MySchedule />
  // },
  // {
  //   path: '/deportes-mi-agenda',
  //   id: 'deportes-mi-agenda',
  //   element: <SportsMySchedule />
  // },
  // {
  //   path: '/noticias',
  //   id: 'noticias',
  //   element: <News />
  // },
  // {
  //   path: '/gestion-noticias',
  //   id: 'gestion-noticias',
  //   element: <NewsManagement />
  // }
];

export default privateRoutes;
