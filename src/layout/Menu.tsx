import { List } from "../adapters";
import { matchPath, useLocation, useState } from "../adapters/ReactAdapter";
import { useUser } from "../hooks";
import { MenuItem as IMenuItem } from "../interfaces";
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";
import menuItems from "./menu-items";

interface MenuItemWithOpen {
  [key: string]: boolean;
}

export default function Menu({ closeDrawer }: { closeDrawer: () => void }) {
  const { user } = useUser();

  const location = useLocation();
  const { pathname, search } = location;

  const allowedMenuItems = menuItems.reduce<IMenuItem[]>((prev, menuItem) => {
    // Buscamos el permiso del menu item en los permiso del usuario
    const permission =
      user?.permissions &&
      user?.permissions.find(
        (permission) => permission.strModule === menuItem.id
      );

    // Permitir siempre la ruta inicial
    if (menuItem.path === "/") return [...prev, menuItem];

    // Si no lo encontramos, quiere decir que el usuario no tiene permisos en ese menu item
    // Continuamos con el siguiente
    if (!permission) return prev;

    // Si sí tiene permisos y no tiene submenu items por revisar
    // lo agregamos al arreglo de menu items permitidos
    // y continuamos con el siguiente
    if (menuItem.submenus?.length === 0) return [...prev, menuItem];

    // Como tiene sub menu items, filtramos los sub menu items permitidos
    const allowedSubMenuItems = menuItem.submenus?.filter((subMenuItem) =>
      // Buscamos el permiso del submenu item en el permiso anteriormente señalado
      // Lo tiene que encontrar para que quede agregado en el arreglo de submenu items permitidos
      permission.strSubModules.find(
        (permission) => permission.strSubModule === subMenuItem.id
      )
    );

    // Si no tiene ningun menu item permitido
    // No lo agregamos y continuamos con el siguiente
    if (allowedSubMenuItems?.length === 0) return prev;

    // Si no entró a ninguno de los flujos anteriores
    // Quiere decir que el menu item es permitido y tiene al menos un sub menu item permitido
    // Entonces lo agregamos al arreglo de los permitidos
    return [...prev, { ...menuItem, submenus: allowedSubMenuItems }];
  }, []);

  const isMenuActive = (fullPath?: string) => {
    if (!fullPath) return false;

    if (fullPath === "/") return fullPath === pathname;

    const [path, querystring] = fullPath.split("?");

    const options = {
      path,
      caseSensitive: false,
      end: false,
    };

    const pathMatch = matchPath(options, pathname);

    if (!pathMatch) {
      return false;
    }

    if (!querystring) return true;

    const searchQueryParams = Object.fromEntries(new URLSearchParams(search));
    const pathQueryParams = Object.fromEntries(
      new URLSearchParams(querystring)
    );

    return Object.entries(searchQueryParams).every(
      ([key, value]) => pathQueryParams?.[key as any] === value
    );
  };

  const [openSubMenuItems, setOpenSubMenuItems] = useState<MenuItemWithOpen>(
    allowedMenuItems
      .filter((menuItem) => menuItem.submenus && menuItem.submenus.length)
      .reduce<MenuItemWithOpen>((prev, menuItem) => {
        prev[menuItem.id] =
          menuItem.submenus?.some((sm) => isMenuActive(sm.path)) ?? false;
        return prev;
      }, {})
  );

  const handleToggle = (menuItem: string) => {
    setOpenSubMenuItems((state) => ({
      ...state,
      [menuItem]: !state[menuItem],
    }));
  };

  return (
    <List component="nav">
      {allowedMenuItems.map((menuItem) => {
        return menuItem.submenus && menuItem.submenus.length ? (
          <SubMenuItem
            key={menuItem.id}
            {...menuItem}
            open={openSubMenuItems[menuItem.id]}
            handleToggle={() => handleToggle(menuItem.id)}
            submenus={menuItem.submenus}
            closeDrawer={closeDrawer}
            isMenuActive={isMenuActive}
          />
        ) : (
          <MenuItem
            key={menuItem.id}
            {...menuItem}
            closeDrawer={closeDrawer}
            active={isMenuActive(menuItem.path)}
          />
        );
      })}
    </List>
  );
}
