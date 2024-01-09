import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    keenthemesIcon: "element-11",
    bootstrapIcon: "bi-app-indicator",
  },
  {
    heading: "Punto de Venta",
    route: "/PuntoDeVenta",
    keenthemesIcon: "element-11",
    bootstrapIcon: "bi bi-cash-stack",
  },
];

export default MainMenuConfig;
