import {
  AccountBalanceIcon,
  AccountCircleIcon,
  ArticleIcon,
  CalendarMonthIcon,
  Diversity1Icon,
  DoneAllIcon,
  FactCheckIcon,
  FeedIcon,
  FiberNewIcon,
  ListAltIcon,
  PhoneCallbackIcon,
  RestaurantIcon,
  RestaurantMenuIcon,
  SpellcheckIcon,
  SportsTennisIcon,
  Tooltip,
} from "../adapters";
import { MenuItem } from "../interfaces";

const menuItems: MenuItem[] = [
  {
    name: "Admin",
    id: "admin",
    icon: (
      <>
        <Tooltip title="Admin" arrow placement="right">
          <AccountBalanceIcon />
        </Tooltip>
      </>
    ),
    submenus: [
      {
        name: "Permisos",
        id: "permisos",
        icon: (
          <>
            <Tooltip title="Permisos" arrow placement="right">
              <SpellcheckIcon />
            </Tooltip>
          </>
        ),
        path: "/permisos",
      },
      {
        name: "Nav Logs",
        id: "nav-logs",
        icon: (
          <>
            <Tooltip title="Nav Logs" arrow placement="right">
              <ListAltIcon />
            </Tooltip>
          </>
        ),
        path: "/nav-logs",
      },
    ],
  },
  {
    name: "Noticias",
    id: "noticias",
    icon: (
      <>
        <Tooltip title="Noticias" arrow placement="right">
          <ArticleIcon />
        </Tooltip>
      </>
    ),
    submenus: [
      {
        name: "Gestión noticias",
        id: "gestion-noticias",
        icon: (
          <>
            <Tooltip title="Gestión noticias" arrow placement="right">
              <FiberNewIcon />
            </Tooltip>
          </>
        ),
        path: "/gestion-noticias",
      },
      {
        name: "Noticias",
        id: "noticias",
        icon: (
          <>
            <Tooltip title="Noticias" arrow placement="right">
              <FeedIcon />
            </Tooltip>
          </>
        ),
        path: "/noticias",
      },
    ],
  },
  {
    name: "Comedor",
    id: "comedor",
    icon: (
      <>
        <Tooltip title="Comedor" arrow placement="right">
          <RestaurantIcon />
        </Tooltip>
      </>
    ),
    submenus: [
      {
        name: "Reservas",
        id: "reservas-comedor",
        icon: (
          <>
            <Tooltip title="Reservas comedor" arrow placement="right">
              <RestaurantMenuIcon />
            </Tooltip>
          </>
        ),
        path: "/reservas-comedor",
      },
      {
        name: "Ver mis reservas",
        id: "mis-reservas",
        icon: (
          <>
            <Tooltip title="Mis Reservas" arrow placement="right">
              <FactCheckIcon />
            </Tooltip>
          </>
        ),
        path: "/mis-reservas",
      },
      {
        name: "Habilitar Consumos",
        id: "habilitar-consumos",
        icon: (
          <>
            <Tooltip title="Habilitar Consumos" arrow placement="right">
              <DoneAllIcon />
            </Tooltip>
          </>
        ),
        path: "/habilitar-consumos",
      },
    ],
  },
  {
    name: "Servicio",
    id: "servicio",
    icon: (
      <>
        <Tooltip title="Servicio" arrow placement="right">
          <AccountCircleIcon />
        </Tooltip>
      </>
    ),
    submenus: [
      {
        name: "Solicitudes servicio",
        id: "llamados-servicio",
        icon: (
          <>
            <Tooltip title="Solicitudes de Servicio" arrow placement="right">
              <PhoneCallbackIcon />
            </Tooltip>
          </>
        ),
        path: "/llamados-servicio?areaId=1",
      },
      {
        name: "Solicitudes vestieres",
        id: "llamados-vestieres",
        icon: (
          <>
            <Tooltip title="Solicitudes de Vestieres" arrow placement="right">
              <PhoneCallbackIcon />
            </Tooltip>
          </>
        ),
        path: "/llamados-vestieres?areaId=2",
      },
    ],
  },
  {
    name: "Belleza y Bienestar",
    id: "byb",
    icon: (
      <>
        <Tooltip title="Belleza y Bienestar" arrow placement="right">
          <Diversity1Icon />
        </Tooltip>
      </>
    ),
    submenus: [
      {
        name: "Mi agenda",
        id: "byb-mi-agenda",
        icon: (
          <>
            <Tooltip title="Mi agenda" arrow placement="right">
              <CalendarMonthIcon />
            </Tooltip>
          </>
        ),
        path: "/byb-mi-agenda",
      },
    ],
  },
  {
    name: "Deportes",
    id: "deportes",
    icon: (
      <>
        <Tooltip title="Deportes" arrow placement="right">
          <SportsTennisIcon />
        </Tooltip>
      </>
    ),
    submenus: [
      {
        name: "Mi agenda",
        id: "deportes-mi-agenda",
        icon: (
          <>
            <Tooltip title="Mi agenda" arrow placement="right">
              <CalendarMonthIcon />
            </Tooltip>
          </>
        ),
        path: "/deportes-mi-agenda",
      },
    ],
  },
];

export default menuItems;
