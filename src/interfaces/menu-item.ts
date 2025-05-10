export interface MenuItem {
  icon: JSX.Element;
  name: string;
  id: string;
  path?: string;
  submenus?: MenuItem[];
}
