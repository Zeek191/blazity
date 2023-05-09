export type MenuProps = {
  slug: string;
  name: string;
  id: string;
};

export type SubMenuProps = {
  menus: MenuProps[];
};
